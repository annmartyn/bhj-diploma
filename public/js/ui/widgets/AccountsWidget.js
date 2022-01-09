/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

//const { application } = require("express");

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('No element!');
    }
    this.element = element;
    this.currentID = '';
    this.registerEvents();
  }


  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    let createAcc = this.element.querySelector('.create-account');
    createAcc.addEventListener('click', () => App.getModal('createAccount').open());
    
    this.element.addEventListener('click', (event) => {
      this.onSelectAccount(event.target.closest('li.account'));
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let user = User.current();
		if (user) {
			Account.list(user, (err, response) => {
				if (response && response.success) {
					this.clear();
          this.renderItem(response.data);
        }
			}); 
		};
	}

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let widgs = Array.from(this.element.querySelectorAll('.account'));
    widgs.forEach(widg => widg.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    this.element.querySelectorAll('li').forEach(account => {
      if (element && element.classList.contains('account')) {
        if (account === element) {
          account.classList.add('active');
          App.showPage('transactions', { account_id: account.dataset.id });
          this.curID = account.dataset.id;
        } else {
          account.classList.remove('active');
        }
      }
    });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    let active = ' ';
    if (this.currentID = item.id) {
      active += 'active';
    }
    return '<li class="account' + active +'" data-id=' + item.id + '><a href="#"><span>' + item.name + '</span><span>' + item.sum + '₽</span></a></li>';
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    Array.from(data).forEach(item => {
      this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
    });
  }
}
