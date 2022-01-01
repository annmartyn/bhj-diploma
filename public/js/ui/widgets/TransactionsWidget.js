/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
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
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    let createInc = document.querySelector('.create-income-button');
    let createExp = document.querySelector('.create-expense-button');
    createInc.onclick = () => {
      App.getModal('newIncome').open();
    };
    createExp.onclick = () => {
      App.getModal('newExpense').open();
    };
  }
}
