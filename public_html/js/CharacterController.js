function CharacterController( character){

    this.onInputEvent = function( keyCodeStr){
        if( keyCodeStr == "upArrow"){
            switch( keyCodeStr){
                case "upArrow": moveUp(); break;
                case "downArrow": moveDown(); break;
                case "leftArrow": moveLeft(); break;
                case "rightArrow": moveRight(); break;
            }
        }
    }
    
    function moveUp(){
        
    }
    function moveDown(){
        
    }
    function moveLeft(){
        
    }
    function moveRight(){
        
    }
}