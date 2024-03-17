// --------------------------------------------------------------
//
// Renders a Background object.
//
// spec = {
//    image: ,
//    startPoint: {x: , y: }
// }
//
// --------------------------------------------------------------
MyGame.render.Background = (function(graphics) {
    'use strict';

    function render(spec) {
        if (spec.imageReady) {
            graphics.drawImage(spec.image, spec.startPoint, spec.size);
            console.log("image ready!");
        }
    }

    return {
        render: render
    };
}(MyGame.graphics));
