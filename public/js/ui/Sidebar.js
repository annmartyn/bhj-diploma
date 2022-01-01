//const { response } = require("express");

/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
    static initToggleButton() {
        const toggleButton = document.getElementsByClassName('sidebar-toggle')[0];
        const bodyMenu = document.getElementsByClassName('sidebar-mini')[0];
        toggleButton.onclick = () => {
            bodyMenu.classList.toggle('sidebar-open sidebar-collapse');
        };
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
    static initAuthLinks() {
      const reg = document.getElementsByClassName('menu-item_register')[0];
      const login = document.getElementsByClassName('menu-item_login')[0];
      const logout = document.getElementsByClassName('menu-item_logout')[0];
      reg.addEventListener('click', () => App.getModal('register').open());
      login.addEventListener('click', () => App.getModal('login').open());
      logout.addEventListener('click', () => User.logout(() => {
          App.setState('init');
          App.update();
      }))
  };
}