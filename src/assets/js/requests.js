const url = 'http://194.190.152.45:80/';

export function get(additionalURL, jwtoken) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url + additionalURL, false);
    xhr.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.send();

    if (xhr.status >= 200 && xhr.status < 300) {
        return xhr.response;
    } else {
        return {
            status: xhr.status,
            statusText: xhr.statusText
        }
    }
}

export function post(body, additionalURL) {
    var xhr = new XMLHttpRequest();

    body = JSON.stringify(body);
    console.log('RequestBody: ' + body);

    xhr.open('POST', url + additionalURL, false);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.send(body);

    if (xhr.status >= 200 && xhr.status < 300) {
        return xhr.response;
    } else {
        return {
            status: xhr.status,
            statusText: xhr.statusText
        }
    }
}

export function postAuthed(body, additionalURL, jwtoken) {
    var xhr = new XMLHttpRequest();

    body = JSON.stringify(body);
    console.log('RequestBody: ' + body);

    xhr.open('POST', url + additionalURL, false);
    console.log(jwtoken);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.send(body);

    if (xhr.status >= 200 && xhr.status < 300) {
        return xhr.response;
    } else {
        return {
            status: xhr.status,
            statusText: xhr.statusText
        }
    }
}