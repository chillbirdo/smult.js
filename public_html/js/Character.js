function Character() {
    //fields
    var element = $('#character');
    var characterAnimator = new CharacterAnimator(element);
    var posX = 100;
    var posY = 100;
    var speed = 5;
    
    //movement
    this.moveUp = function(){
        posY -= speed;
        updatePosition();
    }
    this.moveRight = function() {
        posX += speed;
        updatePosition();
    }
    this.moveDown = function() {
        posY += speed;
        updatePosition();
    }
    this.moveLeft = function() {
        posX -= speed;
        updatePosition();
    }
    function updatePosition(){
        element.css( {'left':posX, 'top':posY});
    }
}
