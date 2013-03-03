
(function($) {
    $(function() {

        var localCharacter = new Character('#character');
        var localCharacterController = new CharacterController(localCharacter);
        var localInputReader = new LocalInputReader(localCharacterController.onKeyEvent);
        
        var game = new Game( localCharacter);
    });
})(jQuery);
