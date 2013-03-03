function Character(elementSelector) {
    //fields
    var element = $(elementSelector);
    var direction = Character.direction.UPRIGHT;
    var activity = Character.activity.STAND;
    var posX = 100;
    var posY = 100;
    var speed = 3;
    var that = this;
    var characterAnimator = new CharacterAnimator(element, direction, activity);

    this.changeDirection = function(dir) {
        direction = dir;
        characterAnimator.changePerspective(direction);
    };
    this.changeActivity = function(act) {
        activity = act;
        characterAnimator.changeAnimation(activity);
    };
    this.update = function(updateInfo) {
        if (updateInfo.activity) {
            that.changeActivity(updateInfo.activity);
        }
        if (updateInfo.direction) {
            that.changeDirection(updateInfo.direction);
        }
    };
    this.getDirection = function() {
        return direction;
    };
    this.getActivity = function() {
        return activity;
    };

    this.tick = function(){
        move();
    };

    function move(){
        if (activity == Character.activity.WALK) {
            switch (direction) {
                case Character.direction.UP:
                    posY -= speed;
                    break;
                case Character.direction.UPLEFT:
                    posY -= speed;
                    posX -= speed;
                    break;
                case Character.direction.LEFT:
                    posX -= speed;
                    break;
                case Character.direction.DOWNLEFT:
                    posX -= speed;
                    posY += speed;
                    break;
                case Character.direction.DOWN:
                    posY += speed;
                    break;
                case Character.direction.DOWNRIGHT:
                    posY += speed;
                    posX += speed;
                    break;
                case Character.direction.RIGHT:
                    posX += speed;
                    break;
                case Character.direction.UPRIGHT:
                    posX += speed;
                    posY -= speed;
                    break;
            }
        }
        element.css({'left': posX, 'top': posY});
    }
}

Character.direction = {
    "UP": 1,
    "UPRIGHT": 2,
    "RIGHT": 3,
    "DOWNRIGHT": 4,
    "DOWN": 5,
    "DOWNLEFT": 6,
    "LEFT": 7,
    "UPLEFT": 8
};

Character.activity = {
    "WALK": 1,
    "STAND": 2,
    "BORED": 3,
    "TAKE": 4,
    "TAKEFROMGROUND": 5,
    "HADOUKEN": 6,
    "CHEER": 7
};