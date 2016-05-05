var SERVER = 'https://young-stream-68847.herokuapp.com/';
//var SERVER = 'http://localhost:3000';

require(['HtmlHandler', 'Game', 'LocalInputReader', 'SocketHandler'],
        function(HtmlHandler, Game, LocalInputReader, SocketHandler) {
            var htmlHandler = new HtmlHandler(onStartGame);

            function onStartGame(localPlayerName) {
                var game = new Game(localPlayerName, htmlHandler);
                var localInputReader = new LocalInputReader(game.getLocalPlayerOnKeyEventMethod());
                var socketHandler = new SocketHandler(game, SERVER);

                //needs to be cleaned up, see TODO.txt
                socketHandler.registerShowSpeechBubbleFunc(htmlHandler.showSpeechBubble);
                htmlHandler.registerSendChatMessageToServerFunc(socketHandler.sendChatMessageToServer);
                htmlHandler.updatePlayerAmount(1);//initially set the playeramount
            }
        });
