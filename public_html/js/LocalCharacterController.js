function LocalCharacterController(characterArg, characterAnimatorArg) {

    var character = characterArg;
    var characterAnimator = characterAnimatorArg;

    /*
     * reacts on data from LocalInputReader and changes states of character and characterAnimator
     */
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
                    if (!keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]) {
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
        characterAnimator.update(updateInfo);
    };

    /*
     * changes position of local character depending on its activity, direction and speed
     * this function is called on every tick
     */
    this.changePosition = function() {
        if (character.getActivity() == Character.activity.WALK) {
            var updateInfo = {};
            switch (character.getDirection()) {
                case Character.direction.UP:
                    updateInfo.posY = character.getPosY() - character.getSpeed();
                    break;
                case Character.direction.UPLEFT:
                    updateInfo.posY = character.getPosY() - character.getSpeed();
                    updateInfo.posX = character.getPosX() - character.getSpeed();
                    break;
                case Character.direction.LEFT:
                    updateInfo.posX = character.getPosX() - character.getSpeed();
                    break;
                case Character.direction.DOWNLEFT:
                    updateInfo.posX = character.getPosX() - character.getSpeed();
                    updateInfo.posY = character.getPosY() + character.getSpeed();
                    break;
                case Character.direction.DOWN:
                    updateInfo.posY = character.getPosY() + character.getSpeed();
                    break;
                case Character.direction.DOWNRIGHT:
                    updateInfo.posY = character.getPosY() + character.getSpeed();
                    updateInfo.posX = character.getPosX() + character.getSpeed();
                    break;
                case Character.direction.RIGHT:
                    updateInfo.posX = character.getPosX() + character.getSpeed();
                    break;
                case Character.direction.UPRIGHT:
                    updateInfo.posX = character.getPosX() + character.getSpeed();
                    updateInfo.posY = character.getPosY() - character.getSpeed();
                    break;
            }
            character.update(updateInfo);
            characterAnimator.update(updateInfo);
        }
    }
}