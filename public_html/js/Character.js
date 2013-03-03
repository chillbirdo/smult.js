function Character(elementSelector) {
    //fields
    var element = $(elementSelector);
    var direction = Character.direction.UPRIGHT;
    var activity = Character.activity.STAND;
    var posX = 100;
    var posY = 100;
    var speed = 1;
    var that = this;

    var characterAnimator = new CharacterAnimator(element, direction, activity);
    updatePosition();

    this.changeDirection = function( dir){
        direction = dir;
        characterAnimator.changePerspective( direction);
    };
    this.changeActivity = function( act){
        activity = act;
        characterAnimator.changeAnimation( activity);
    };
    this.update = function( updateInfo){
        if( updateInfo.activity){
            that.changeActivity( updateInfo.activity);
        }
        if( updateInfo.direction){
            that.changeDirection( updateInfo.direction);
        }
    };
    this.getDirection = function(){
        return direction;
    };
    this.getActivity = function(){
        return activity;
    };

    //movement
    this.moveUp = function() {
        posY -= speed;
        updatePosition();
    };
    this.moveRight = function() {
        posX += speed;
        updatePosition();
    };
    this.moveDown = function() {
        posY += speed;
        updatePosition();
    };
    this.moveLeft = function() {
        posX -= speed;
        updatePosition();
    };
    function updatePosition() {
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
    "WALK" : 1,
    "STAND" : 2,
    "BORED" : 3,
    "TAKE" : 4,
    "TAKEFROMGROUND" : 5,
    "HADOUKEN" : 6,
    "CHEER" : 7
};