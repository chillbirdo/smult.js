function LocalInputReader(onKeyEvent) {

    var keyCodeMap = {
        37: LocalInputReader.arrowKeys[0],
        38: LocalInputReader.arrowKeys[1],
        39: LocalInputReader.arrowKeys[2],
        40: LocalInputReader.arrowKeys[3]
        //other keys..
    };

    /*
     * initialize keyPressed object
     */
    var keyPressed = new Object();
    keyPressed.keyCodeStr = "";
    keyPressed.type = "";
    for( var key in LocalInputReader.keyCodeMap){
        var val = LocalInputReader.keyCodeMap[key];
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
        if (event.type == "keydown") {
            keyPressed[keyCodeStr] = true;
        } else if (event.type == "keyup") {
            keyPressed[keyCodeStr] = false;
        }
        onKeyEvent( keyPressed);
    };
    
    $('body').keydown(processInputEvent);
    $('body').keyup(processInputEvent);
}

//TODO transform to map/enum
LocalInputReader.arrowKeys = new Array( "leftArrow", "upArrow", "rightArrow", "downArrow");

