define([], function() {

    return function HtmlHandler(onStartGame) {

        var loadingMessageElement = $('#loadingmessage');
        var stageElement = $('#stage');
        var nameInputElement = $('#nameinput');
        var playersConnectedElement = $('#playersconnected');

        nameInputElement.focus();
        loadingMessageElement.hide();
        stageElement.hide();
        playersConnectedElement.hide();

        $('#nameform').submit(function() {
            var localPlayerName = nameInputElement.val();
            if (localPlayerName.length >= 2) {
                $('#namedialog').remove();
                $('#loadingmessage').show();
                onStartGame(localPlayerName);
            } else {
                alert("Your name is too short!");
            }
            return false;
        });

        this.onConnected = function() {
            loadingMessageElement.hide();
            stageElement.show();
            playersConnectedElement.show();
        };

        this.updatePlayerAmount = function(playerAmount) {
            $('#playeramount').html(playerAmount);
        };

        this.createCharacterElement = function(name, id) {
            var elementId = 'character_' + id;
            var nicknameId = 'nickname_' + id;
            var speechBubbleId = 'speechbubble_' + id;
//        $('#stage').append('<div class="player"><div id="' + elementId + '" class="character"></div><div class="nickname" id="'+ nicknameId +'"><a>' + name + '</a></div><div class="speechbubble" id="' + speechBubbleId + '"></div></div>');
            $('#stage').append('<div class="player"><div id="' + elementId + '" class="character"></div><div class="nickname" id="' + nicknameId + '"><a>' + name + '</a></div></div>');
            var characterElement = $('#' + elementId);
            return characterElement;
        };

        this.addMirroringToCharacter = function(characterElement) {
            characterElement.addClass("mirror");
        };

        this.removeMirroringFromCharacter = function(characterElement) {
            characterElement.removeClass("mirror");
        };
    };
});

