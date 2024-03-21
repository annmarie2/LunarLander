MyGame.persistence = (function () {
    'use strict';
    
    // High scores
    let highScores = {};

    let previousScores = localStorage.getItem('MyGame.highScores');
    // console.log(previousScores);

    if (previousScores !== null) {
        highScores = JSON.parse(previousScores);
    }

    // Controls
    let customControls = {left: 'a', right: 'd', up: 'w'};

    let previousControls = localStorage.getItem('MyGame.customControls');
    // console.log(previousControls);

    if (previousControls !== null) {
        customControls = JSON.parse(previousControls);
    }

    // High scores functions
    function addScore(key, value) {
        // let highScores = JSON.parse(highScores);
        // if (highScores.length > 5) {
        //     for (let existingKey in highScores) {
        //         if (existingKey < key) {

        //         }
        //     }
        // }
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

        // Add CSS style to make the scrollbar appear
        // htmlNode.style.overflow = 'scroll';

        htmlNode.scrollTop = htmlNode.scrollHeight;
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
        console.log(customControls);
        localStorage['MyGame.customControls'] = JSON.stringify(customControls);

                // location.reload();
        reportCustomControls();
    }

    function reportCustomControls() {
        let htmlNodeLeft = document.getElementById('id-custom-control-turn-left');
        htmlNodeLeft.innerHTML = '';
        htmlNodeLeft.innerHTML = 'Left: ' + (customControls['left']);

        let htmlNodeRight = document.getElementById('id-custom-control-turn-right');
        htmlNodeRight.innerHTML = '';
        htmlNodeRight.innerHTML = 'Right: ' + (customControls['right']);

        let htmlNodeUp = document.getElementById('id-custom-control-move-up');
        htmlNodeUp.innerHTML = '';
        htmlNodeUp.innerHTML = 'Up: ' + (customControls['up']);
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
