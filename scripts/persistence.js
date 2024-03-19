MyGame.persistence = (function () {
    'use strict';
    
    let highScores = {};
    let previousScores = localStorage.getItem('MyGame.highScores');
    console.log(previousScores);

    if (previousScores !== null) {
        highScores = JSON.parse(previousScores);
    }

    function add(key, value) {
        highScores[key] = value;
        localStorage['MyGame.highScores'] = JSON.stringify(highScores);
    }

    function remove(key) {
        delete highScores[key];
        localStorage['MyGame.highScores'] = JSON.stringify(highScores);
    }

    function report() {
        let htmlNode = document.getElementById('div-console');
        
        htmlNode.innerHTML = '';
        for (let key in highScores) {
            htmlNode.innerHTML += ('Key: ' + key + ' Value: ' + highScores[key] + '<br/>'); 
        }
        htmlNode.scrollTop = htmlNode.scrollHeight;
    }

    return {
        get highScores() { return highScores; },
        add : add,
        remove : remove,
        report : report
    };
}());
