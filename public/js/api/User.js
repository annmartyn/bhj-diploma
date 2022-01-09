/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */

class User {

    static URL = '/user';
    id = '';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    this.id = user.id;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
    static unsetCurrent() {
        localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
      return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
    static fetch(callback) {
        createRequest({
            method: 'GET',
            URL: this.URL + '/current',
            responseType: 'json',
            callback: (err, response) => {
                if (response && response.succes) {
                  this.setCurrent({id: response.user.id, name: response.user.name});
                } else {
                  this.unsetCurrent();                    
                }
                callback(err, response);
            }
        });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      URL: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent({id: response.user.id, name: response.user.name});
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
      createRequest({
          method: 'POST',
          URL: this.URL + '/register',
          responseType: 'json',
          data,
          callback: (err, response) => {
            if (!err && response && response.user) {
                this.setCurrent({id: response.user.id, name: response.user.name});
            }
            callback(err, response);
        }
      })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
      createRequest({
          method: 'POST',
          URL: this.URL + '/logout',
          callback: (err, response) => {
            if (response && response.success) {
              callback(this.unsetCurrent());
              App.update();
            }
        }
      });
  };
}
