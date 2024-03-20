MyGame.input.Controls = function () {
    
    // let turnLeft = 'a';
    // let turnRight = 'd';
    // let moveUp = 'w';

    function changeTurnLeft(key, persistence) {
        persistence.changeCustomControl('left', key);
        // turnLeft = key;
    }

    function changeTurnRight(key, persistence) {
        persistence.changeCustomControl('right', key);
        // turnRight = key;
    }

    function changeMoveUp(key, persistence) {
        persistence.changeCustomControl('up', key);
        // moveUp = key;
    }

    let api = {
        get turnLeft() { return turnLeft; },
        get turnRight() { return turnRight; },
        get moveUp() { return moveUp; },
        changeTurnLeft: changeTurnLeft,
        changeTurnRight: changeTurnRight,
        changeMoveUp: changeMoveUp
    };

    return api;

};