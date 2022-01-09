'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  let err = '';
  let formData = new FormData();
  
  
  if (options && options.data) {
    for (let key in options.data) {
      formData.append(key, options.data[key]); 
    };
  };

  try {
    xhr.open(options.method, options.URL);
    xhr.responseType = 'json';
    xhr.send(formData);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.response.error) {
          err = xhr.response.error;
        }
        options.callback(err, xhr.response);
      }
    }
  }
  catch (error) {
    // перехват сетевой ошибки
    options.callback(error.message, null);
  }
};