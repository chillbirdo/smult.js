function CharacterAnimator(initialPlayerInfo) {
    //private
    var that = this;
    var spritelyObject;
    var mirrored = false;
    var spriteInfo = {
        1: {'first': 5, 'last': 10, 'fps': 10, 'cyclic': true}, //WALK
        2: {'first': 0, 'last': 2, 'fps': 5, 'cyclic': false}, //STAND
        3: {'first': 3, 'last': 4, 'fps': 4, 'cyclic': false}, //BORED
        4: {'first': 11, 'last': 12, 'fps': 5, 'cyclic': false}, //TAKE
        5: {'first': 13, 'last': 4, 'fps': 3, 'cyclic': false}, //TAKEFROMGROUND
        6: {'first': 15, 'last': 17, 'fps': 6, 'cyclic': false}, //HADOUKEN
        7: {'first': 18, 'last': 20, 'fps': 4, 'cyclic': false}, //CHEER
    };
    var init = true;
    var nonCyclicForewardAnimation = true;

    var characterElement = createCharacterElement(initialPlayerInfo.id);

    //public
    this.update = function(updateInfo) {
        if (updateInfo.activity) {
            changeActivity(updateInfo.activity);
        }
        if (updateInfo.direction) {
            changeDirection(updateInfo.direction);
        }
        if (updateInfo.posX) {
            changePositionX(updateInfo.posX);
        }
        if (updateInfo.posY) {
            changePositionY(updateInfo.posY);
        }
    };
    //update with initial values
    this.update(initialPlayerInfo);

    /*
     * remove player's characterElement. this is called on a disconnect.
     */
    this.removeCharacterElement = function() {
        characterElement.remove();
    }

    /*
     * changes the character's position
     */
    function changePositionX(posX) {
        characterElement.css({'left': posX});
    }

    function changePositionY(posY) {
        characterElement.css({'top': posY});
    }

    /*
     * changes the character's animation
     */
    function changeActivity(activity) {
        var resetObj = new Object();
        if (spriteInfo[activity].cyclic) {
            resetObj[spriteInfo[activity].last] = function(obj) {
                obj.spSet("current_frame", spriteInfo[activity].first - 1);
            };
        } else {
            nonCyclicForewardAnimation = true;
            resetObj[spriteInfo[activity].last] = function(obj) {
                if (nonCyclicForewardAnimation) {
                    nonCyclicForewardAnimation = false;
                    obj.spSet("current_frame", spriteInfo[activity].last - 2);
                    obj.spSet("rewind", true);
                }
            };
            resetObj[spriteInfo[activity].first] = function(obj) {
                if (!nonCyclicForewardAnimation) {
                    nonCyclicForewardAnimation = true;
                    obj.spSet("current_frame", spriteInfo[activity].first + 2);
                    obj.spSet("rewind", false);
                }
            };
        }

        if (init) {
            spritelyObject = characterElement.sprite({
                fps: spriteInfo[activity].fps,
                no_of_frames: 21,
                start_at_frame: spriteInfo[activity].first,
                on_frame: resetObj
            }).spState(Player.direction.DOWN).active();
            init = false;
        } else {
            spritelyObject.spSet("fps", spriteInfo[activity].fps);
            spritelyObject.spSet("current_frame", spriteInfo[activity].first);
            spritelyObject.spSet("on_frame", resetObj);
            spritelyObject.spSet("rewind", false);
        }
    }

    /*
     * changes the character's perspective
     */
    function changeDirection(perspArg) {
        if (perspArg < 1 || perspArg > 8) {
            console.log("perspective out of range");
            return;
        }
        var perspective = perspArg;
        if (perspArg <= 5 && mirrored) {
            mirrored = false;
            characterElement.removeClass("mirror");
        } else if (perspArg > 5) {
            perspective = 10 - perspArg;
            if (!mirrored) {
                mirrored = true;
                characterElement.addClass("mirror");
            }
        }
        spritelyObject.spState(perspective);
    }

    /*
     * init CSS properties
     */
    function createCharacterElement(id) {
        var elementId = 'character_' + id;
        $('#stage').append('<div id="' + elementId + '" class="character"/>');
        var characterElement = $('#' + elementId);
        return characterElement;
    }
}
