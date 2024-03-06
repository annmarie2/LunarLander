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

    function drawTerrain(color, iterations, lst) {
        // context.strokeStyle = "white";
        // TODO: MAKE BACKGROUND COLOR MATCH, 
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
        // grd.addColorStop(0, "#dbdad5");f2edd3 f5f4ed 907b7e ae828f bb5e66
        grd.addColorStop(0, "#bb5e66");
        grd.addColorStop(1, "#352122");
        // grd.addColorStop(1, "#a6a186");a6a186 82817e 61605e 352122 574446

        // Fill the terrain
        context.fillStyle = grd;
        context.fill(region);

        context.restore();

        context.save();
        context.moveTo(0, lst[0]);
        
        // highlight the top of the terrain b0989f 352122 c57773
        context.strokeStyle = "#c57773";
        for (let i = 1; i < lst.length; i++) {
            context.lineTo(i * segmentWidth, lst[i]);
        }
        context.stroke();
        context.restore;
    }

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawText: drawText,
        drawImage: drawImage,
        drawTerrain: drawTerrain
    };

    return api;
}());
