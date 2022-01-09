/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {

    static URL = '/account';
  /**
   * Получает информацию о счёте
   * */
   static get(id = '', callback) {
    let user = User.current();
    if (!user) {
      return;
    };

    Account.list(user, (err, response) => {
      if (!err) {
        response.data.forEach(item => {if (id === item.id) {
            callback(item);
          }
        });
      };
    });
  };
}
