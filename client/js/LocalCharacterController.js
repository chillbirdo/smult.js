function LocalCharacterController(playerArg) {

    var player = playerArg;
    var tickIntervalId;
    var sendUpdate; /*pointer to remote-push function*/

    /*
     * Sockethandler calls that function 
     */
    this.setSendUpdateFunc = function(setSendUpdateFunc) {
        sendUpdate = setSendUpdateFunc;
    }

    this.startTicking = function(interval) {
        tickIntervalId = setInterval(tick, interval);
    };

    this.stopTicking = function() {
        clearInterval(tickIntervalId);
    };

    this.getPlayer = function() {
        return player;
    }

    /*
     * reacts on data from LocalInputReader and changes states of character and characterAnimator
     */
    this.onKeyEvent = function(keyPressed) {
        var updateInfo = new Object();
        updateInfo.posX = player.getPosX();
        updateInfo.posY = player.getPosY();
        updateInfo.activity = player.getActivity();
        updateInfo.direction = player.getDirection();

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
                    updateInfo.activity = Player.activity.STAND;
                }
            } else {
                if (player.getActivity() != Player.activity.WALK) {
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

        updateAll(updateInfo);
    };

    function tick() {
        changePosition();
    }

    /*
     * changes position of local character depending on its activity, direction and speed
     * this function is called on every tick
     */
    function changePosition() {
        if (player.getActivity() == Player.activity.WALK) {
            var updateInfo = {};
            switch (player.getDirection()) {
                case Player.direction.UP:
                    updateInfo.posY = player.getPosY() - player.getSpeed();
                    break;
                case Player.direction.UPLEFT:
                    updateInfo.posY = player.getPosY() - player.getSpeed();
                    updateInfo.posX = player.getPosX() - player.getSpeed();
                    break;
                case Player.direction.LEFT:
                    updateInfo.posX = player.getPosX() - player.getSpeed();
                    break;
                case Player.direction.DOWNLEFT:
                    updateInfo.posX = player.getPosX() - player.getSpeed();
                    updateInfo.posY = player.getPosY() + player.getSpeed();
                    break;
                case Player.direction.DOWN:
                    updateInfo.posY = player.getPosY() + player.getSpeed();
                    break;
                case Player.direction.DOWNRIGHT:
                    updateInfo.posY = player.getPosY() + player.getSpeed();
                    updateInfo.posX = player.getPosX() + player.getSpeed();
                    break;
                case Player.direction.RIGHT:
                    updateInfo.posX = player.getPosX() + player.getSpeed();
                    break;
                case Player.direction.UPRIGHT:
                    updateInfo.posX = player.getPosX() + player.getSpeed();
                    updateInfo.posY = player.getPosY() - player.getSpeed();
                    break;
            }
            player.update(updateInfo);
        }
    }

    function updateAll(updateInfo) {
        player.update(updateInfo);
        if (sendUpdate) {
            sendUpdate(updateInfo);
        }
    }
}