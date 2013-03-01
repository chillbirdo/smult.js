function CharacterController(character) {

    this.onKeyEvent = function(keyPressed) {
        var updateInfo = new Object();
        //arrowkeys
        if ( jQuery.inArray( keyPressed.keyCodeStr, LocalInputReader.arrowKeys)) {
            //activity: standing or walking?
            //console.log( "ARSCH" + keyPressed.type);
            if (keyPressed.type == "keyup") {
                console.log( "keyup");
                var stand = true;
                for (var arrowKey in LocalInputReader.arrowKeys) {
                    if (keyPressed[arrowKey]) {
                        stand = false;
                        return;
                    }
                }
                if (stand) {
                    //updateInfo.activity = Character.activity.STAND;
                    console.log( "set activity stand");
                }
            } else {
                if (character.getActivity() != Character.activity.WALK) {
                    //updateInfo.activity = Character.activity.WALK;
                   // console.log( "set activity walk");
                }
            }
            //direction
            if (keyPressed["upArrow"]) {
                if (keyPressed["leftArrow"]) {
                    updateInfo.direction = Character.direction.UPLEFT;
                } else if (keyPressed["rightArrow"]) {
                    updateInfo.direction = Character.direction.UPRIGHT;
                } else {
                    updateInfo.direction = Character.direction.UP;
                }
            } else if (keyPressed["downArrow"]) {
                if (keyPressed["leftArrow"]) {
                    updateInfo.direction = Character.direction.DOWNRIGHT;
                } else if (keyPressed["rightArrow"]) {
                    updateInfo.direction = Character.direction.DOWNLEFT;
                } else {
                    updateInfo.direction = Character.direction.DOWN;
                }
            } else if (keyPressed["leftArrow"]) {
                updateInfo.direction = Character.direction.LEFT;
            } else if (keyPressed["rightArrow"]) {
                updateInfo.direction = Character.direction.RIGHT;
            }
        }
        //other keys
        //..
        
        character.update( updateInfo);
    };
}