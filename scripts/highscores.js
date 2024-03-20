MyGame.screens['high-scores'] = (function(game, persistence) {
    'use strict';
    
    function initialize() {
        persistence.reportScores();

        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() { 
                game.showScreen('main-menu'); 
            });
    }
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game, MyGame.persistence));
