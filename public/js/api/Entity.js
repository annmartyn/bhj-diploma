/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback) {
    let addURL = '?';
    for (let key in data) {
      addURL += `${key}=${data[key]}&`;
    }
    createRequest({
      method: 'GET', 
      URL: this.URL + addURL, 
      callback
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({ 
      URL: this.URL,
      method: 'PUT', 
      data,
      callback
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
      createRequest({ 
        method: 'DELETE', 
        URL: this.URL, 
        data, 
        callback
    })
  }
}
