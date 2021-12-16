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
    } else {
      this.element = element;
      this.registerEvents;
      this.update();
    }

  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    let createAcc = document.querySelector('.create-account');
    let accounts = document.querySelectorAll('.account');
    createAcc.onclick() = () => {
      App.getModal('#modal-new-account');
    }

    for (let i=0; i < accounts.length; i++) {
      accounts[i].onclick = () => {
        this.onSelectAccount(accounts[i]);
      }
    }
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
    let currentUser = User.current();
		if (currentUser) {
			Account.list(currentUser, (err, response) => {
				if (response && response.success) {
					this.clear();
					for (let i = 0; i < response.data.length; i++) {
            this.renderItem(response.data[i]);
          }
				} 
			});
		}
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let widgs = document.querySelectorAll('.account');
    for (let i = 0; i < widgs.length; i++) {
      widgs[i].removeItem();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let activeElem = this.element.querySelector('.active');
    let account_id = element.getAttribute('data-id');

    element.classList.add('active');
		activeElem.classList.remove('active');
		App.showPage('transactions', { 'account_id': account_id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return '<li class="account" data-id="${item.id}"><a href="#"><span>' + item.name + '</span><span>' + item.sum + '₽</span></a></li>';
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    let panel = document.querySelector('.accounts-panel');
		panel.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
		this.registerEvents();
  }
}
