function CharacterController(character) {

    this.onKeyEvent = function(keyPressed) {
        var updateInfo = new Object();
        //arrowkeys
        if (jQuery.inArray(keyPressed.keyCodeStr, LocalInputReader.arrowKeys)) {
            //activity: standing or walking?
            console.log("EVENT");
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

//            //direction
//            if (keyPressed["upArrow"]) {
//                if (keyPressed["leftArrow"]) {
//                    updateInfo.direction = Character.direction.UPLEFT;
//                } else if (keyPressed["rightArrow"]) {
//                    updateInfo.direction = Character.direction.UPRIGHT;
//                } else {
//                    updateInfo.direction = Character.direction.UP;
//                }
//            } else if (keyPressed["downArrow"]) {
//                if (keyPressed["leftArrow"]) {
//                    updateInfo.direction = Character.direction.DOWNRIGHT;
//                } else if (keyPressed["rightArrow"]) {
//                    updateInfo.direction = Character.direction.DOWNLEFT;
//                } else {
//                    updateInfo.direction = Character.direction.DOWN;
//                }
//            } else if (keyPressed["leftArrow"]) {
//                updateInfo.direction = Character.direction.LEFT;
//            } else if (keyPressed["rightArrow"]) {
//                updateInfo.direction = Character.direction.RIGHT;
//            }
        }
        //other keys
        //..

        character.update(updateInfo);
    };
}