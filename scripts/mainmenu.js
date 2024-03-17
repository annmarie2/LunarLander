MyGame.screens['main-menu'] = (function(game, objects, renderer, graphics) {
    'use strict';

    let myBackground = objects.Background({  // ADDED THIS!!
        imageSrc: 'assets/dust_bunnies.jpg',
        startPoint: { x: 0, y: 0 },
        size: { width: graphics.canvas.width, height: graphics.canvas.height }
    });

    // function renderBackground() {
    //     let imageReady = false;
    //     let image = new Image();
    
    //     image.onload = function() {
    //         imageReady = true;

    //         image.src = "assets/dust_bunnies.jpg";
    //         let startPoint = { x: 0, y: 0 };
    //         let size = { width: graphics.canvas.width, height: graphics.canvas.height };
    //         graphics.drawImage(image, startPoint, size);

    //     };
    //     console.log(imageReady);
    // }

    function initialize() {
        // renderBackground();
        renderer.Background.render(myBackground);

        //
        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {game.showScreen('game-play'); });
        
        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() { game.showScreen('high-scores'); });
        
        document.getElementById('id-help').addEventListener(
            'click',
            function() { game.showScreen('help'); });
        
        document.getElementById('id-about').addEventListener(
            'click',
            function() { game.showScreen('about'); });

    }
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics));
