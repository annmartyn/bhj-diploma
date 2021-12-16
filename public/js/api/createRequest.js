'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}, callback) => {
    const xhr = new XMLHttpRequest;
    let URL = options.URL;
    let formData = new FormData;
    xhr.responseType = 'json';
    

    if (options.method == 'GET' && options.body) {
        for (let key in options.body) {
            URL += '?' + key + '=' + options.body.key + '&';
        };
        URL = URL.slice(0, -1);
    } else if (options.method != 'GET' && options.body) {
        for (let key in options.body) {
            formData.key = options.body.key;
        };
    }

    try {
        xhr.open(options.method, URL);
        if (options.data && options.data.id) {
			const formData = new FormData();
			form.append('id', options.data.id);
			xhr.send(formData);
		}
		else xhr.send(options.data);
    }
    catch (e) {
        // перехват сетевой ошибки
        options.callback(e.message);
    }
};