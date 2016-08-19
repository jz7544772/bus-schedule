var Promise = require("promise");

function ajax(options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url, true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        }
        else if(xhr.readyState === 4 && xhr.status === 404) {
            callback("ajax request failed", null);
        }
    };
    if(options.method === "POST") {
        xhr.send(options.data);
    }
    else {
        xhr.send();
    }
}

module.exports = {
    ajax: ajax
}
