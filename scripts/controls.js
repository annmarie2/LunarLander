MyGame.input.Controls = function () {
    
    let turnLeft = 'a';
    let turnRight = 'd';
    let moveUp = 'w';

    function changeTurnLeft(key) {
        turnLeft = key;
    }

    function changeTurnRight(key) {
        turnRight = key;
    }

    function changeMoveUp(key) {
        moveUp = key;
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