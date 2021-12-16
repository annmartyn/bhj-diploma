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
    localStorage.setItem(JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
    static unsetCurrent() {
        localStorage.removeItem(this.id);
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
      const currentUser = localStorage.user;
      return localStorage.getItem(currentUser);
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
                if (response.succes == false) {
                    this.unsetCurrent();
                } else {
                    this.setCurrent(response.user);
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
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      body: data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
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
          body: data,
          callback: (err, response) => {
            if (response && response.success) {
                this.setCurrent(response.user);
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
                this.unsetCurrent();
            }
            callback(err, response);
        }
      });
  };
}
