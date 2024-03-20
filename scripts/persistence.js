MyGame.persistence = (function () {
    'use strict';
    
    // High scores
    let highScores = {};

    let previousScores = localStorage.getItem('MyGame.highScores');
    console.log(previousScores);

    if (previousScores !== null) {
        highScores = JSON.parse(previousScores);
    }

    // Controls
    let customControls = {left: 'a', right: 'd', up: 'w'};

    let previousControls = localStorage.getItem('MyGame.customControls');
    console.log(previousControls);

    if (previousControls !== null) {
        customControls = JSON.parse(previousControls);
    }

    // High scores functions
    function addScore(key, value) {
        highScores[key] = value;
        localStorage['MyGame.highScores'] = JSON.stringify(highScores);
    }

    function removeScore(key) {
        delete highScores[key];
        localStorage['MyGame.highScores'] = JSON.stringify(highScores);
    }

    function reportScores() {
        let htmlNode = document.getElementById('high-scores-list');
        
        htmlNode.innerHTML = '';
        for (let key in highScores) {
            // htmlNode.innerHTML += ('Key: ' + key + ' Value: ' + highScores[key] + '<br/>'); 
            htmlNode.innerHTML += (highScores[key] + '<br/>'); 
        }
        // htmlNode.scrollTop = htmlNode.scrollHeight;
    }

    // Custom keys functions
    
    function getTurnLeft() {
        // console.log(customControls['left']);
        return customControls['left'];
    }

    function getTurnRight() {
        // console.log(customControls['right']);
        return customControls['right'];
    }

    function getMoveUp() {
        // console.log(customControls['up']);
        return customControls['up'];
    }

    function changeCustomControl(key, value) {
        customControls[key] = value;
        localStorage['MyGame.customControls'] = JSON.stringify(customControls);
    }

    function reportCustomControls() {
        let htmlNodeLeft = document.getElementById('id-custom-control-turn-left');
        htmlNodeLeft.innerHtml = '';
        htmlNodeLeft.innerHtml = 'Left: ' + (customControls['left']);

        let htmlNodeRight = document.getElementById('id-custom-control-turn-right');
        htmlNodeRight.innerHtml = '';
        htmlNodeRight.innerHtml = 'Right: ' + (customControls['right']);

        let htmlNodeUp = document.getElementById('id-custom-control-move-up');
        htmlNodeUp.innerHtml = '';
        htmlNodeUp.innerHtml = 'Up: ' + (customControls['up']);
    }

    return {
        get highScores() { return highScores; },
        addScore : addScore,
        removeScore : removeScore,
        reportScores : reportScores,
        // addCustomControl: addCustomControl,
        getTurnLeft: getTurnLeft,
        getTurnRight: getTurnRight,
        getMoveUp: getMoveUp,
        changeCustomControl: changeCustomControl,
        reportCustomControls: reportCustomControls
    };
}());
