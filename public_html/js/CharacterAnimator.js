function CharacterAnimator(characterElement) {
//private
    var characterElement = characterElement;
    var perspective = 5;
    var mirrored = false;
    var spriteInfo = {
        'stand': {'first': 0, 'last': 2, 'fps': 3, 'cyclic': false},
        'bored': {'first': 3, 'last': 4, 'fps': 4, 'cyclic': false},
        'walk': {'first': 5, 'last': 10, 'fps': 1, 'cyclic': true},
        'take': {'first': 11, 'last': 12, 'fps': 4, 'cyclic': false},
        'takefromground': {'first': 13, 'last': 4, 'fps': 3, 'cyclic': false},
        'hadouken': {'first': 15, 'last': 17, 'fps': 6, 'cyclic': false},
        'cast': {'first': 18, 'last': 20, 'fps': 4, 'cyclic': false}
    };
    var nonCyclicForewardAnimation = true;
    var spritelyObject = changeAnimationF('stand');
    //public
    this.changeAnimation = changeAnimationF;
    this.changePerspective = changePerspectiveF;
    /*
     * changes the character's animation
     */
    function changeAnimationF(activity) {
        var resetObj = new Object();
        if (spriteInfo[activity].cyclic) {
            resetObj[spriteInfo[activity].last] = function(obj) {
                obj.spSet("current_frame", spriteInfo[activity].first - 1);
            }
        } else {
            nonCyclicForewardAnimation = true;
            resetObj[spriteInfo[activity].last] = function(obj) {
                if (nonCyclicForewardAnimation) {
                    nonCyclicForewardAnimation = false;
                    obj.spSet("current_frame", spriteInfo[activity].last - 2);
                    obj.spSet("rewind", true);
                }
            }
            resetObj[spriteInfo[activity].first] = function(obj) {
                if (!nonCyclicForewardAnimation) {
                    nonCyclicForewardAnimation = true;
                    obj.spSet("current_frame", spriteInfo[activity].first + 2);
                    obj.spSet("rewind", false);
                }
            }
        }
        return $('#character').sprite({
            fps: spriteInfo[activity].fps,
            no_of_frames: 21,
            start_at_frame: spriteInfo[activity].first,
            on_frame: resetObj
        }).spState(perspective).active();
    }

    /*
     * changes the character's perspective
     */
    function changePerspectiveF(perspArg) {
        console.log("change perspective: " + perspArg);
        if (perspArg < 0 || perspArg > 8) {
            console.log("perspective out of range");
            return;
        } else if (perspArg == perspective) {
            return;
        }
        if (perspArg <= 5 && mirrored) {
            mirrored = false;
            $('#character').removeClass("mirror");
            console.log("remove mirror");
        } else if (perspArg > 5) {
            perspective = 10 - perspArg;
            if (!mirrored) {
                mirrored = true;
                $('#character').addClass("mirror");
            }
            console.log("add mirror");
        }
        spritelyObject.spState(perspective);
    }
}
