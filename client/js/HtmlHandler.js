define([], function() {

    return function HtmlHandler(startGame) {


        var that = this;

        var loadingMessageElement = $('#loadingmessage');
        var stageElement = $('#stage');
        var nameInputElement = $('#nameinput');
        var chatInputElement = $('#chatinput');
        var playersConnectedElement = $('#playersconnected');
        var chatform = $('#chatform');
        var chatbutton = $('#chatbutton');

        var sendChatMessageToServer;

        stageElement.hide();
        playersConnectedElement.hide();
        nameInputElement.focus();
        chatbutton.attr("disabled", false);

        if ($.browser.msie) {
            window.alert("This application does not support Microsoft Internet Explorer.");
        }

        /*
         * name submission
         */
        $('#nameform').submit(function() {
            var localPlayerName = $('#nameinput').val();
            if (localPlayerName.length < 1) {
                localPlayerName = "noname";
            }
            loadingMessageElement.css('visibility', 'visible');
            $('.footer').hide();
            $('.fadeout').hide();
            startGame(localPlayerName);
            return false;
        });

        /*
         * chat message submission
         */
        $('#chatform').submit(function() {
            var chattext = chatInputElement.val();
            that.showSpeechBubble("local", chattext);
            chatInputElement.val("");
            chatbutton.attr("disabled", true);
            chatInputElement.blur();
            sendChatMessageToServer(chattext); /*send chatmessage*/
            return false;
        });

        /*
         * when connection is established
         */
        this.onConnected = function() {
            loadingMessageElement.hide();
            playersConnectedElement.show();
            stageElement.show();
            chatInputElement.focus();
            $('.footer').show();
            $('.footer').css('position', 'absolute');
        };

        /*
         * update player amount value
         */
        this.updatePlayerAmount = function(playerAmount) {
            $('#playeramount').html(playerAmount);
        };

        /*
         * add a new player
         */
        this.createCharacterElement = function(name, id) {
            var elementId = 'character_' + id;
            var nicknameId = 'nickname_' + id;
            var speechBubbleId = 'speechbubble_' + id;
            $('#stage').append(
                    '<div class="player">\n\
                        <div id="' + elementId + '" class="character">\n\
                        </div>\n\
                        <div class="nickname" id="' + nicknameId + '">'
                    + name +
                    '</div>\n\
                        <div class="speechbubble" id="' + speechBubbleId + '">\n\
                        </div>\n\
                     </div>');
//            $('#stage').append('<div class="player"><div id="' + elementId + '" class="character"></div><div class="nickname" id="' + nicknameId + '"><a>' + name + '</a></div></div>');
            var characterElement = $('#' + elementId);
            return characterElement;
        };

        /*
         * character needs to be mirrored in three perspectives
         */
        this.addMirroringToCharacter = function(characterElement) {
            characterElement.addClass("mirror");
        };
        this.removeMirroringFromCharacter = function(characterElement) {
            characterElement.removeClass("mirror");
        };

        /*
         * when a chatmessages comes in, it shall be displayed in a speechbubble
         */
        this.showSpeechBubble = function(clientId, chatMessage) {
            var speechbubble = $('#speechbubble_' + clientId);
            speechbubble.css('visibility', 'visible');
            speechbubble.html('<div class="chattext">' + chatMessage + '</div>');
            setTimeout(function() {
                speechbubble.css('visibility', 'hidden');
                chatbutton.attr("disabled", false);
                chatInputElement.focus();
            }, 3000);
        };

        /*
         * register the function for broadcasting a chatmessage
         */
        this.registerSendChatMessageToServerFunc = function(sendChatMessageToServerFunc) {
            sendChatMessageToServer = sendChatMessageToServerFunc;
        };

    };//class HtmlHandler

});//require

