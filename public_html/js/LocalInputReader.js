function LocalInputReader( onInputEvent) {
    $('body').keydown(function(event) {
        event.preventDefault();//browser no longer reacts on that keys
        var keyCodeStr = ""; 
        switch (event.keyCode) {
            case 38: keyCodeStr = "upArrow"; break;
            case 40: keyCodeStr = "downArrow"; break;
            case 37: keyCodeStr = "leftArrow"; break;
            case 39: keyCodeStr = "rightArrow"; break;
        }
        
        onInputEvent( keyCodeStr);
    })
}

