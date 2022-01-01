/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let user = User.current();
    let option = '';
    Account.list(user, (error, response) => {
      if (!error) {
        let accs = response.data;
        for (let i = 0; i < accs.length; i++) {
          option += `<option value="${accs[i].id}">${accs[i].name}</option>`;
        }
        select = this.form.querySelector("select");
        select.innerHTML = option;
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (!error) {
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();
      } else {
        alert(error);
      }
    })
  }
}