MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, rotation, size) {
        context.save();

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.x / 2,
            center.y - size.y / 2,
            size.x, size.y);

        context.restore();
    }

    function drawText(spec) {
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fillStyle;
        context.strokeStyle = spec.strokeStyle;
        context.textBaseline = 'top';

        context.translate(spec.position.x, spec.position.y);
        context.rotate(spec.rotation);
        context.translate(-spec.position.x, -spec.position.y);


        context.fillText(spec.text, spec.position.x, spec.position.y);
        context.strokeText(spec.text, spec.position.x, spec.position.y);

        context.restore();
    }

    function drawImage(image, startPoint, size) {
        context.save();
        context.drawImage(image, startPoint.x, startPoint.y, size.width, size.height);
        context.restore();
    }

    function drawTerrain(lst) {
        context.strokeStyle = "#c57773";

        let segmentWidth = canvas.width / (lst.length - 1);

        context.save();

        let region = new Path2D();

        // Create path
        region.moveTo(0, lst[0]);
        for (let i = 1; i < lst.length; i++) {
            region.lineTo(i * segmentWidth, lst[i]);
        }
        region.lineTo(canvas.width, canvas.height);
        region.lineTo(0, canvas.height);
        region.lineTo(0, lst[0]);

        // Create fill gradient
        const grd = context.createLinearGradient(canvas.width / 2, canvas.height * .40, canvas.width / 2, canvas.height);
        grd.addColorStop(0, "#bb5e66");
        grd.addColorStop(1, "#191929");

        // Fill the terrain
        context.fillStyle = grd;
        context.fill(region);
        context.stroke(region);

        context.restore();
    }

    // --------------------------------------------------------------
    //
    // Draw a rectangle to the canvas with the following attributes:
    //      center: { x: , y: },
    //      size: { x: , y: },
    //      rotation:       // radians
    //
    // --------------------------------------------------------------
    function drawRectangle(rect, fillStyle, strokeStyle) {
        context.save();
        context.translate(rect.center.x, rect.center.y );
        context.rotate(rect.rotation);
        context.translate(-rect.center.x, -rect.center.y);
        
        context.fillStyle = fillStyle;
        context.fillRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);
        
        context.strokeStyle = strokeStyle;
        context.strokeRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);

        context.restore();
    }

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawText: drawText,
        drawImage: drawImage,
        drawTerrain: drawTerrain,
        drawRectangle: drawRectangle
    };

    return api;
}());
