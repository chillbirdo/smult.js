define(['CharacterController', 'LocalInputReader', 'Player'], function(CharacterController, LocalInputReader, Player) {

    function LocalCharacterController(_player) {
        this.player = _player;

        var that = this;
        var sendUpdate; /*pointer to remote-push function*/

        /*
         * Sockethandler calls that function 
         */
        this.registerSendUpdateFunc = function(sendUpdateFunc) {
            sendUpdate = sendUpdateFunc;
        };

        /*
         * reacts on data from LocalInputReader and changes states of character and characterAnimator
         */
        this.onKeyEvent = function(keyPressed) {
            var updateInfo = new Object();
            updateInfo.posX = that.getPlayer().getPosX();
            updateInfo.posY = that.getPlayer().getPosY();
            updateInfo.activity = that.getPlayer().getActivity();
            updateInfo.direction = that.getPlayer().getDirection();

            //arrowkeys
            if (jQuery.inArray(keyPressed.keyCodeStr, LocalInputReader.arrowKeys)) {
                //activity: standing or walking?
                if (keyPressed.type === "keyup") {
                    var stand = true;
                    for (var arrowKey in LocalInputReader.arrowKeys) {
                        var val = LocalInputReader.arrowKeys[arrowKey];
                        if (keyPressed[val]) {
                            stand = false;
                            break;
                        }
                    }
                    if (stand) {
                        updateInfo.activity = Player.activity.STAND;
                    }
                } else {
                    if (that.getPlayer().getActivity() !== Player.activity.WALK) {
                        updateInfo.activity = Player.activity.WALK;
                    }
                }

                //direction
                if (keyPressed[LocalInputReader.arrowKeys.UPARROW]) {
                    if (!keyPressed[LocalInputReader.arrowKeys.DOWNARROW]) {
                        if (keyPressed[LocalInputReader.arrowKeys.LEFTARROW]) {
                            updateInfo.direction = Player.direction.UPLEFT;
                        } else if (keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]) {
                            updateInfo.direction = Player.direction.UPRIGHT;
                        } else {
                            updateInfo.direction = Player.direction.UP;
                        }
                    }
                } else if (keyPressed[LocalInputReader.arrowKeys.DOWNARROW]) {
                    if (keyPressed[LocalInputReader.arrowKeys.LEFTARROW]) {
                        if (!keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]) {
                            updateInfo.direction = Player.direction.DOWNLEFT;
                        }
                    } else if (keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]) {
                        updateInfo.direction = Player.direction.DOWNRIGHT;
                    } else {
                        updateInfo.direction = Player.direction.DOWN;
                    }
                } else if (keyPressed[LocalInputReader.arrowKeys.LEFTARROW]) {
                    if (!keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]) {
                        updateInfo.direction = Player.direction.LEFT;
                    }

                } else if (keyPressed[LocalInputReader.arrowKeys.RIGHTARROW]) {
                    updateInfo.direction = Player.direction.RIGHT;
                }
            }

            that.getPlayer().update(updateInfo);
            if (sendUpdate) {
                sendUpdate(updateInfo);
            }
        };
    };

    LocalCharacterController.prototype = new CharacterController();

    return LocalCharacterController;
});