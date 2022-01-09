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
    };
    this.element = element;
    this.registerEvents();
  }
  
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    let incButton = this.element.querySelector('.create-income-button');
    let expButton = this.element.querySelector('.create-expense-button');
    incButton.addEventListener('click', () => App.getModal( 'newIncome' ).open());
    expButton.addEventListener('click', () => App.getModal( 'newExpense' ).open());
  };
}