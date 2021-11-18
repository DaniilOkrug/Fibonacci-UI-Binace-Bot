export function get(additionalURL) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', URL + additionalURL, false);
    xhr.send();

    if (xhr.status != 200) {
        //Error
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        return xhr.responseText;
    }
}

export function post(body, header) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', URL, false);

    xhr.setRequestHeader('Content-Type', header);

    xhr.send(body);

    if (xhr.status != 200) {
        //Error
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        return xhr.responseText;
    }
}