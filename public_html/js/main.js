
(function($) {
    $(function() {

        var character = new Character('#character');
        var characterController = new CharacterController(character);
        var localInputReader = new LocalInputReader(characterController.onKeyEvent);
        
//        var test = {
//            "EINS":1,
//            "ZWEI":2,
//            "DREI":3
//        };
//        for( var key in test){
//            console.log("KEY: " + key);
//        }
//        if( jQuery.inArray("EINS",test)){
//            console.log( "SUPER!")
//        }
//        console.log( "TEST: " + test.EINS.text);
        
    });
})(jQuery);
