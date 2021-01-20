moduleOn = () => {
    let moduleRoot = rootDiv.find(">div");
    l("module on called");

    if (typeof window.ontouchstart !== 'object') { // touch screen device check
        moduleRoot.find("#desc-root").css('color', 'red').text('Touch screen device needed for testing this page.');
        return;
    }

    // our element to play with
    let ourElm = $("#our-element");
    let minWH = [150, 150];
    let maxWH = [600, 600];

    // touch event testing
    let lastTouchState = null;
    let writeTouches = () => { // logs all touches on the screen with X-Y
        moduleRoot.find("#current-state-div").empty();
        for (let i = 0; i < lastTouchState.length; i++) {
            moduleRoot.find("#current-state-div").append('Touch ' + (i + 1) + ': ' + parseInt(lastTouchState[i].screenX) + 'x' + parseInt(lastTouchState[i].screenY) + '<br>');
        }
    };

    // initial states of the element
    let ourElmXY;
    let ourElmWH;
    let ourElmRotate;

    ourElm.on({
        touchstart: function (e) {
            if (!e.defaultPrevented) e.preventDefault();
            l("touch started");
            lastTouchState = e.touches;
            writeTouches();

            if (e.touches.length === 1) ourElmXY = [parseInt(ourElm.css('margin-left')) || 0, parseInt(ourElm.css('margin-top')) || 0];
            if (e.touches.length === 2) {
                ourElmXY = [parseInt(ourElm.css('margin-left')) || 0, parseInt(ourElm.css('margin-top')) || 0];
                ourElmWH = [parseInt(ourElm.css('width')), parseInt(ourElm.css('height'))];
                ourElmRotate = ourElm.css('transform') !== 'none' ? parseInt(ourElm[0].style.transform.replace('rotate(', '')) : 0;
            }
        },
        touchmove: function (e) {
            //l("touch moving");
            if (e.touches.length === 1) { // single-touch move event (drag something)
                let xyDifs = [parseInt(e.touches[0].screenX - lastTouchState[0].screenX), parseInt(e.touches[0].screenY - lastTouchState[0].screenY)];
                ourElm.css({
                    'margin-left': ourElmXY[0] + xyDifs[0],
                    'margin-top': ourElmXY[1] + xyDifs[1]
                });
                moduleRoot.find("#current-state-div").html("Dragged to: " + xyDifs[0] + "x" + xyDifs[1]);
            }
            if (e.touches.length === 2) { // multi-touch move event (drag / zoom in-out / rotate)
                // center point calculation (for still being able to drag on 2 touch state too)
                let lastCenterPoint = [(lastTouchState[0].screenX + lastTouchState[1].screenX) / 2, (lastTouchState[0].screenY + lastTouchState[1].screenY) / 2];
                let newCenterPoint = [(e.touches[0].screenX + e.touches[1].screenX) / 2, (e.touches[0].screenY + e.touches[1].screenY) / 2];
                let centerPointDiffs = [parseInt(newCenterPoint[0] - lastCenterPoint[0]), parseInt(newCenterPoint[1] - lastCenterPoint[1])];

                // distance calculation (for zoom in-out actions)
                let lastDistance = Math.sqrt(Math.pow(lastTouchState[0].screenX - lastTouchState[1].screenX, 2) + Math.pow(lastTouchState[0].screenY - lastTouchState[1].screenY, 2));
                let newDistance = Math.sqrt(Math.pow(e.touches[0].screenX - e.touches[1].screenX, 2) + Math.pow(e.touches[0].screenY - e.touches[1].screenY, 2));
                let zoomRatio = newDistance / lastDistance;
                let distanceDiff = newDistance - lastDistance;
                let newWH = [ourElmWH[0] + distanceDiff, ourElmWH[1] + distanceDiff];

                // min-max width-height filtering
                for (let i = 0; i <= 1; i++) { // 0: width | 1: height
                    if (newWH[i] < minWH[i]) newWH[i] = minWH[i]; // min restriction
                    else if (newWH[i] > maxWH[i]) newWH[i] = maxWH[i]; // max restriction
                }

                // subtractions from margins (to keep it centered)
                let marginLSub = (newWH[0] - ourElmWH[0]) / 2;
                let marginRSub = (newWH[1] - ourElmWH[1]) / 2;

                // angle calculation (for rotate action)
                let lastAngle = Math.atan2(lastTouchState[0].screenX - lastTouchState[1].screenX, lastTouchState[0].screenY - lastTouchState[1].screenY) * (180 / Math.PI);
                let newAngle = Math.atan2(e.touches[0].screenX - e.touches[1].screenX, e.touches[0].screenY - e.touches[1].screenY) * (180 / Math.PI);
                let angleDiff = lastAngle - newAngle;
                let newRotate = (ourElmRotate + angleDiff).mod(360);

                // snap feature for rotate
                if ($("[binding='settings.snapOnRotate']").prop('checked')) {
                    let snapAngles = [0, 90, 180, 270, 360];
                    let snapSensitivity = 6;
                    snapAngles.forEach(function (snapAngle) {
                        if (newRotate < snapAngle + snapSensitivity && newRotate > snapAngle - snapSensitivity) newRotate = snapAngle.mod(360);
                    });
                }

                ourElm.css({
                    'width': newWH[0],
                    'height': newWH[1],
                    'margin-left': ourElmXY[0] + centerPointDiffs[0] - marginLSub,
                    'margin-top': ourElmXY[1] + centerPointDiffs[1] - marginRSub,
                    'transform': 'rotate(' + newRotate + 'deg)'
                });
                moduleRoot.find("#current-state-div").html("Dragged to: " + centerPointDiffs[0] + "x" + centerPointDiffs[1] +
                    "<br>Distance Ratio: " + (zoomRatio * 100).toFixed(2) + "%" +
                    "<br>Distance Diff: " + parseInt(distanceDiff) + "px" +
                    "<br>Angle Diff: " + parseInt(angleDiff));
            }
        },
        touchend: function (e) {
            l("touch ended");
            lastTouchState = e.touches;
            writeTouches();
            if (e.touches.length === 1) ourElmXY = [parseInt(ourElm.css('margin-left')) || 0, parseInt(ourElm.css('margin-top')) || 0];
        },
        touchcancel: function (e) {
            l("touch canceled");
            lastTouchState = e.touches;
            writeTouches();
            if (e.touches.length === 1) ourElmXY = [parseInt(ourElm.css('margin-left')) || 0, parseInt(ourElm.css('margin-top')) || 0];
        }
    });
}

moduleOff = () => {
    l("module off called");
}

l("module on-off events loaded");