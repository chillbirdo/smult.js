
(function($) {
    $(function() {

//        var SERVER = 'http://smultjs.eu01.aws.af.cm/';
        var SERVER = 'http://localhost:3000';

        var htmlHandler = new HtmlHandler(onStartGame);

        function onStartGame(localPlayerName) {
            var game = new Game(localPlayerName, htmlHandler);
            var localInputReader = new LocalInputReader(game.getLocalPlayerOnKeyEventMethod());
            var socketHandler = new SocketHandler(game, SERVER);
            
            htmlHandler.updatePlayerAmount(1);//initially set the playeramount
        }
    });
})(jQuery);
