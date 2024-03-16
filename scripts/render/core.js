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
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height);

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

    function drawCircle(circ, fillStyle, strokeStyle) {
        context.save();
        context.translate(circ.center.x, circ.center.y );
        context.rotate(circ.rotation);
        context.translate(-circ.center.x, -circ.center.y);
        
        context.fillStyle = fillStyle;
        // context.fillRect(circ.center.x - circ.size.x / 2, circ.center.y - circ.size.y / 2, circ.size.x, circ.size.y);
        context.strokeStyle = strokeStyle;
        context.arc(circ.center.x, circ.center.y, circ.radius, circ.startAngle, circ.endAngle);

        // context.strokeArc(circ.center.x, circ.center.y, circ.radius, circ.startAngle, circ.endAngle);

        context.restore();
    }
    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawText: drawText,
        drawImage: drawImage,
        drawTerrain: drawTerrain,
        drawCircle: drawCircle
    };

    return api;
}());
