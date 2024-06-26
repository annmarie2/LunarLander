// --------------------------------------------------------------
//
// Creates a Background object, with functions for managing state.
//
// spec = {
//    imageSrc: ,  // Web server location of the image
//    startPoint: { x: , y: },
//    size: { width: , height: }
// }
//
// --------------------------------------------------------------
MyGame.objects.Background = function(spec) {
    'use strict';

    let imageReady = false;
    let image = new Image();

    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    let api = {
        get imageReady() { return imageReady; },
        get image() { return image; },
        get startPoint() { return spec.startPoint; },
        get size() { return spec.size; }
    };

    return api;
}
