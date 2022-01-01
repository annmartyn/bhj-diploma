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
    

    if (options.method == 'GET' && options.data) {
        for (let key in options.data) {
            URL += '?' + key + '=' + options.data.key + '&';
        };
        URL = URL.slice(0, -1);
    } else if (options.method != 'GET' && options.data) {
        for (let key in options.data) {
            formData.append(key, options.data.key);
        };
    }

    try {
        xhr.open(options.method, URL);
        if (options.data && options.data.id) {
			formData.append('id', options.data.id);
			xhr.send(formData);
		}
		else {
            xhr.send(options.data);
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status != 200) {
                    error = xhr.response.error;
                }
                options.callback(OverconstrainedError, xhr.response);
            }
        }
    }
    catch (error) {
        // перехват сетевой ошибки
        options.callback(error.message);
    }
};