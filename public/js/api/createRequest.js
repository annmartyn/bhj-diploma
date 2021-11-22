'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}, callback) => {
    let URL = options.URL;
    const xhr = new XMLHttpRequest;
    let formData = '';

    if (options.method == 'GET' && options.body) {
        URL += '?mail=' + options.data.mail + '&password=' + options.data.password;
    } else if (options.method != 'GET' && options.body) {
        formData.append('mail', options.data.mail);
        formData.append('password', options.data.password);
    }

    try {
        xhr.open(GET, URL);
        xhr.send(formData);
    }
    catch (e) {
        // перехват сетевой ошибки
        callback(e);
    }

    xhr.responseType = 'json';

    if (callback.response) {
        console.log(response);
    } else {
        console.log(err);
    }
};
