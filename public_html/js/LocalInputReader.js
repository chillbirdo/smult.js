function LocalInputReader(onKeyEvent) {

    var keyCodeMap = {
        37: LocalInputReader.arrowKeys.LEFTARROW,
        38: LocalInputReader.arrowKeys.UPARROW,
        39: LocalInputReader.arrowKeys.RIGHTARROW,
        40: LocalInputReader.arrowKeys.DOWNARROW
        //other keys..
    };

    /*
     * initialize keyPressed mapping
     * eg.: LocalInputReader.arrowKeys.LEFTARROW:true, ..
     */
    var keyPressed = new Object();
    keyPressed.keyCodeStr = "";
    keyPressed.type = "";
    for (var key in keyCodeMap) {
        var val = keyCodeMap[key];
        keyPressed[val] = false;
    }

    /*
     * update keyPressed object and call Controller
     */
    var processInputEvent = function(event) {
        var keyCodeStr = keyCodeMap[event.keyCode];
        if (keyCodeStr == null) {
            return;
        }
        event.preventDefault();
        keyPressed.keyCodeStr = keyCodeStr;
        keyPressed.type = event.type;

        var samekey = false;
        if (event.type == "keydown") {
            if (keyPressed[keyCodeStr]) {
                samekey = true;
            } else {
                keyPressed[keyCodeStr] = true;
            }
        } else if (event.type == "keyup") {
            keyPressed[keyCodeStr] = false;
        }

        if (!samekey) {
            onKeyEvent(keyPressed);
        }
    };

    $('body').keydown(processInputEvent);
    $('body').keyup(processInputEvent);
}

LocalInputReader.arrowKeys = {
    "LEFTARROW": 1,
    "UPARROW": 2,
    "RIGHTARROW": 3,
    "DOWNARROW": 4
};

