
(function($) {
    $(function() {

        var character = new Character('#character');
        var characterController = new CharacterController(character);
        var localInputReader = new LocalInputReader(characterController.onKeyEvent);
        
        //character.changeActivity( Character.activity.TAKE);
        
    });
})(jQuery);
