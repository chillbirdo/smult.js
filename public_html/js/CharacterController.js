function CharacterController(character) {

    this.onKeyEvent = function(keyPressed) {
        var updateInfo = new Object();
        //arrowkeys
        if (jQuery.inArray(keyPressed.keyCodeStr, LocalInputReader.arrowKeys)) {
            //activity: standing or walking?
            if (keyPressed.type == "keyup") {
                var stand = true;
                for (var arrowKey in LocalInputReader.arrowKeys) {
                    var val = LocalInputReader.arrowKeys[arrowKey];
                    if (keyPressed[val]) {
                        stand = false;
                        break;
                    }
                }
                if (stand) {
                    updateInfo.activity = Character.activity.STAND;
                }
            } else {
                if (character.getActivity() != Character.activity.WALK) {
                    updateInfo.activity = Character.activity.WALK;
                }
            }

            //direction
            if (keyPressed[LocalInputReader.arrowKeys.UPARROW]) {
                if (!keyPressed[LocalInputReader.arrowKeys.DOWNARROW]) {
                    if (keyPressed[LocalInputReader.arrowKeys.LEFTARROW]) {
                        updateInfo.direction = Character.direction.UPLEFT;
                    } else if (keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]) {
                        updateInfo.direction = Character.direction.UPRIGHT;
                    } else {
                        updateInfo.direction = Character.direction.UP;
                    }
                }
            } else if (keyPressed[LocalInputReader.arrowKeys.DOWNARROW]) {
                if (keyPressed[LocalInputReader.arrowKeys.LEFTARROW]) {
                    if (!keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]){
                        updateInfo.direction = Character.direction.DOWNLEFT;
                    }
                } else if (keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]) {
                    updateInfo.direction = Character.direction.DOWNRIGHT;
                } else {
                    updateInfo.direction = Character.direction.DOWN;
                }
            } else if (keyPressed[LocalInputReader.arrowKeys.LEFTARROW]) {
                if (!keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]) {
                    updateInfo.direction = Character.direction.LEFT;
                }
                
            } else if (keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]) {
                updateInfo.direction = Character.direction.RIGHT;
            }
        }
        //other keys
        //..

        character.update(updateInfo);
    };
}