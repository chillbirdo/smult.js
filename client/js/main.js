//        var SERVER = 'http://smultjs.eu01.aws.af.cm/';
var SERVER = 'http://localhost:3000';

require(['HtmlHandler', 'Game', 'LocalInputReader', 'SocketHandler'],
        function(HtmlHandler, Game, LocalInputReader, SocketHandler) {
            var htmlHandler = new HtmlHandler(onStartGame);

            function onStartGame(localPlayerName) {
                var game = new Game(localPlayerName, htmlHandler);
                var localInputReader = new LocalInputReader(game.getLocalPlayerOnKeyEventMethod());
                var socketHandler = new SocketHandler(game, SERVER);
                
                //needs to be cleaned up, see TODO.txt
                socketHandler.registerShowSpeechBubbleFunc( htmlHandler.showSpeechBubble);
                htmlHandler.registerSendChatMessageToServerFunc( socketHandler.sendChatMessageToServer);
                htmlHandler.updatePlayerAmount(1);//initially set the playeramount
            }
        });

//        <script src="js/HtmlHandler.js" type="text/javascript"></script>
//        <script src="js/CharacterAnimator.js" type="text/javascript"></script>
//        <script src="js/Player.js" type="text/javascript"></script>
//        <script src="js/CharacterController.js" type="text/javascript"></script>
//        <script src="js/LocalCharacterController.js" type="text/javascript"></script>
//        <script src="js/RemoteCharacterController.js" type="text/javascript"></script>
//        <script src="js/LocalInputReader.js" type="text/javascript"></script>
//        <script src="js/Game.js" type="text/javascript"></script>
//        <script src="js/SocketHandler.js" type="text/javascript"></script>
//        <script src="js/main.js" type="text/javascript"></script>