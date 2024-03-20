MyGame.input.Keyboard = function (elapsedTime) {
    let that = {
        keys: {},
        handlers: {}
    };

    // added below

    // let turnLeft = 'a';
    // let turnRight = 'd';
    // let moveUp = 'w';

    // function changeTurnLeft(key) {
    //     turnLeft = key;
    // }

    // function changeTurnRight(key) {
    //     turnRight = key;
    // }

    // function changeMoveUp(key) {
    //     moveUp = key;
    // }

    // added above

    function keyPress(e) {
        that.keys[e.key] = e.timeStamp;
    }

    function keyRelease(e) {
        delete that.keys[e.key];
    }

    that.update = function (elapsedTime) {
        for (let key in that.keys) {
            if (that.keys.hasOwnProperty(key)) {
                if (that.handlers[key]) {
                    for (let i = 0; i < that.handlers[key].length; i++) {
                        that.handlers[key][i](elapsedTime);
                    }
                }
            }
        }
    };

    that.register = function (key, handler) {
        if (!that.handlers[key]) {
            that.handlers[key] = [];
        }
        that.handlers[key].push(handler);
    };

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    return that;
};
