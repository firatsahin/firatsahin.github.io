(function () {
    // module globals here
    let moduleRoot = rootDiv.find(">div");
    let step1Root = moduleRoot.find("div[step=1]");
    let step2Root = moduleRoot.find("div[step=2]");
    let step3Root = moduleRoot.find("div[step=3]");
    let fbaseApp = null; // firebase app object
    let myPlayerKey = null, me = null;
    let gameKey = null, gameInterval = null, putTargetInterval = null;

    moduleOn = () => {
        l("module on called");

        // helper functions - BEGIN
        let switchToStep = (step) => {
            $("div[step]").hide().filter("[step=" + step + "]").show();
            if (step === 2) initStep2();
            if (step === 3) initStep3();
        };
        // helper functions - END

        // step 1 - BEGIN
        // Initialize Firebase (if not initialized before)
        fbaseApp = fbaseH.startApp(fbaseApp);
        l("started2->", fbaseApp);

        step1Root.find("button[name=btn-join-game-rooms]").click(function () {
            let playerName = step1Root.find("input[name=player-name]").val().trim();
            if (!playerName) return;
            playerName = playerName[0].toLocaleUpperCase() + playerName.substr(1);

            me = {name: playerName, createdOn: firebase.database.ServerValue.TIMESTAMP, lastModifiedOn: firebase.database.ServerValue.TIMESTAMP, status: 'online'};
            myPlayerKey = firebase.database().ref('multiplayer-snake-game/players').push(me).key;
            l("myPlayerKey:", myPlayerKey);

            firebase.database().ref('multiplayer-snake-game/players/' + myPlayerKey).onDisconnect().update({status: 'offline'});
            localStorage.setItem('mp-snake-player-key', myPlayerKey); // put key to localStorage
            switchToStep(2);
        });

        let playerKey = localStorage.getItem('mp-snake-player-key');
        if (playerKey) { // if there is a key
            firebase.database().ref('multiplayer-snake-game/players').once('value', (snapshot) => {
                const data = snapshot.val();
                let foundData = null;
                for (const key in data) {
                    if (key === playerKey) {
                        foundData = data[key];
                        break;
                    }
                }
                if (foundData) {
                    myPlayerKey = playerKey;
                    me = foundData;
                    firebase.database().ref('multiplayer-snake-game/players/' + myPlayerKey).update({status: 'online'});
                    firebase.database().ref('multiplayer-snake-game/players/' + myPlayerKey).onDisconnect().update({status: 'offline'});
                    switchToStep(2);
                } else localStorage.removeItem('mp-snake-player-key');
            });
        }
        // step 1 - END


        // step 2 - BEGIN
        let step2initialized = false;
        let initStep2 = () => {
            l(myPlayerKey, me);
            step2Root.find("b[name=player-name]").text(me.name);
            let gamesListDiv = step2Root.find("div#games-list-root");

            firebase.database().ref('multiplayer-snake-game/games').on('value', (snapshot) => {
                const data = snapshot.val();
                l("rooms snapshot:", data);
                l(Object.keys(data).length);
                gamesListDiv.empty();
                let addGameDivVisible = true;
                if (data) {
                    for (const key in data) {
                        let game = data[key];
                        let numOfCurrentPlayers = (game.players ? Object.keys(game.players).length : 0);
                        let joinDisabled = (numOfCurrentPlayers === game.maxNumOfPlayers || game.state !== 'stop');
                        $("<div>").addClass('game-div').attr('data-key', key).data('room-data', game).html('Owner: <b>' + (game.owner.key === myPlayerKey ? 'me' : game.owner.name) + '</b>'
                            + '&nbsp;&nbsp; Players: ' + numOfCurrentPlayers + '/' + game.maxNumOfPlayers + '&nbsp;&nbsp; Status: ' + game.state
                            + '<br><br><button name="btn-join-game" ' + (joinDisabled ? 'disabled="disabled"' : '') + '>Join This Game</button>'
                            + (game.owner.key === myPlayerKey ? '&nbsp;&nbsp; <a href="#" name="btn-delete-game">Delete Room</a>' : '')).appendTo(gamesListDiv);
                        if (game.owner.key === myPlayerKey) addGameDivVisible = false; // if I have a game, hide 'add game' part
                    }
                }
                step2Root.find("div.add-game-div")[!addGameDivVisible ? 'addClass' : 'removeClass']('hidden');
            });

            if (!step2initialized) {
                // add game room
                $("button[name=btn-add-game]").click(function () {
                    firebase.database().ref('multiplayer-snake-game/games').push({
                        maxNumOfPlayers: parseInt(step2Root.find("div.add-game-div").find("select[name=maxNumOfPlayers]").val()) || 2,
                        owner: {key: myPlayerKey, name: me.name},
                        state: 'stop'
                    });
                });

                // join a game (step 2 > step 3)
                gamesListDiv.on("click", "button[name=btn-join-game]", function () {
                    gameKey = $(this).closest(".game-div").attr('data-key');
                    const roomData = $(this).closest(".game-div").data('room-data');
                    firebase.database().ref('multiplayer-snake-game/games').off('value'); // destroy rooms listener of step 2
                    firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/players/' + myPlayerKey).set({
                        name: me.name,
                        direction: 'right', // initial direction
                        ready: false,
                        score: 0
                    });
                    firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/players/' + myPlayerKey).onDisconnect().remove();
                    if (roomData.owner.key === myPlayerKey) firebase.database().ref('multiplayer-snake-game/games/' + gameKey).onDisconnect().update({state: 'stop'}); // if owner leaves the game, state changes to 'stop' (not for other players)
                    switchToStep(3);
                });

                // delete room
                gamesListDiv.on("click", "a[name=btn-delete-game]", function () {
                    const gameKey = $(this).closest(".game-div").attr('data-key');
                    firebase.database().ref('multiplayer-snake-game/games/' + gameKey).remove();
                });
            }
            step2initialized = true;
        };
        // step 2 - END


        // step 3 - BEGIN
        let step3initialized = false;
        let initStep3 = () => {
            l("initStep3:", myPlayerKey, me, gameKey);

            let boardOverlay = $("#board-overlay"), boardOverlayTxt = boardOverlay.find(">div").first(),
                board = $("#game-board").empty(), gameInfoDiv = $("#game-info-root").empty(),
                boardWH = [parseInt(board.css('width')), parseInt(board.css('height'))],
                scoreboardDiv = $("#scoreboard-div").empty(), playerItemWH = [null, null],
                speed = 3, timeout = 20, maxAllowedNumOfTargets = 2, targetScore = 1000;

            firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/targets').remove(); // remove targets initially (from previous game)

            firebase.database().ref('multiplayer-snake-game/games/' + gameKey).on('value', (snapshot) => {
                const game = snapshot.val();
                l("room snapshot:", snapshot.key, game);

                let numOfCurrentPlayers = (game.players ? Object.keys(game.players).length : 0);
                $("<div>").attr('data-key', snapshot.key).html('Owner: <b>' + (game.owner.key === myPlayerKey ? 'me' : game.owner.name) + '</b>'
                    + '&nbsp;&nbsp; Players: ' + numOfCurrentPlayers + '/' + game.maxNumOfPlayers + '&nbsp;&nbsp; Status: ' + game.state).appendTo(gameInfoDiv.empty());

                board.data('game-data', game);

                if (game.state === 'play') { // on play state > just update game state (for direction change & scoreboard update)
                    boardOverlay.hide(); // hide board overlay
                    $("<h3>").text('Leaderboard').appendTo(scoreboardDiv.empty());
                    $("<div>").addClass('row').html('<div class="col" style="width: 15%;"><b>Rank</b></div><div class="col" style="width: 40%;"><b>Player</b></div><div class="col"><b>Score (Last Change)</b></div>').appendTo(scoreboardDiv);
                    let leaderboard = [];
                    for (const key in game.players) {
                        const playerItem = board.find(".player-item[key='" + key + "']");
                        if (key !== myPlayerKey) { // update other users' x-y coordinates (no need for mine) [FIX for latency, trying to keep opponents' position as correct as possible]
                            if (playerItem.data('player-data').direction !== game.players[key].direction) { // only if opponent's direction was changed
                                playerItem.css({
                                    'margin-left': game.players[key].mLeft,
                                    'margin-top': game.players[key].mTop
                                });
                            }
                        }
                        playerItem.data('player-data', game.players[key]); // update player data object
                        leaderboard.push({
                            key: key,
                            name: game.players[key].name,
                            score: game.players[key].score,
                            lastScoreChange: game.players[key].lastScoreChange
                        });
                    }
                    leaderboard.sort(function (a, b) { // sort players (based on current score)
                        return (a.score > b.score ? -1 : 1);
                    });
                    scoreboardDiv.data('leaderboard-data', leaderboard);
                    leaderboard.forEach(function (player, i) {
                        if (player.key === myPlayerKey) { // for my after board info
                            const iAmLeader = (i === 0);
                            step3Root.find("div[name=iam-the-leader-div]")[iAmLeader ? 'removeClass' : 'addClass']('hidden').html(iAmLeader ? 'You are the LEADER! (<b>+' + (leaderboard.length > 1 ? player.score - leaderboard[1].score : 0) + '</b>)' : ''); // show/hide i am leader div
                            step3Root.find("div[name=points-for-leadership-div]")[iAmLeader ? 'addClass' : 'removeClass']('hidden').html(iAmLeader ? '' : '<b>' + (leaderboard[0].score - player.score) + '</b> points for leadership');
                        }
                        let lscHtml = '';
                        if (player.lastScoreChange) {
                            lscHtml = '<span style="color: ' + (player.lastScoreChange > 0 ? 'green' : 'red') + ';">(' + (player.lastScoreChange > 0 ? '+' : '') + player.lastScoreChange + ')</span>';
                            if (player.key === myPlayerKey) step3Root.find("b[name=my-last-score-change]").css('color', player.lastScoreChange > 0 ? 'green' : 'red').text((player.lastScoreChange > 0 ? '+' : '') + player.lastScoreChange);
                        }
                        $("<div>").addClass('row' + (player.key === myPlayerKey ? ' my-player' : '')).html('<div class="col" style="width: 15%;"><b>#' + (i + 1) + '</b></div><div class="col" style="width: 40%;">' + player.name + (player.key === myPlayerKey ? ' (You)' : '') + '</div><div class="col">' + player.score + ' ' + lscHtml + '</div>').appendTo(scoreboardDiv);
                    });

                    // ending the game (when target score is reached)
                    if (game.owner.key === myPlayerKey) { // owner only
                        if (leaderboard[0].score >= targetScore) { // score reached
                            firebase.database().ref('multiplayer-snake-game/games/' + gameKey).update({state: 'ended'});
                        }
                    }
                }

                if (game.state === 'stop' || game.state === 'countdown') { // on stop & countdown states > preparation for the game
                    boardOverlay.show(); // show board overlay
                    board.find("div.player-item").remove();

                    let allReady = true, i = 0;
                    for (const key in game.players) {
                        $("<div>").addClass('player-item' + (key === myPlayerKey ? ' me' : '')).attr('key', key).data('player-data', game.players[key]).html(key === myPlayerKey ? 'ME' : game.players[key].name[0]).css({
                            'margin-left': (30 * i) + 10,
                            'margin-top': (30 * i) + 10
                        }).appendTo(board);
                        playerItemWH = [parseInt(board.find(".player-item").first().css('width')), parseInt(board.find(".player-item").first().css('height'))];
                        if (!game.players[key].ready) allReady = false;
                        if (key === myPlayerKey) {
                            step3Root.find("button[name=btn-im-ready]")[game.players[key].ready ? 'hide' : 'show']();
                        }
                        i++;
                    }
                    boardOverlayTxt.html(Object.keys(game.players).length > 0 && allReady ? 'All players are ready!' + (game.owner.key !== myPlayerKey ? '<br>Game owner can start the game.' : '') : 'Waiting all players to be ready...');

                    // owner specific task (start the game button show)
                    if (game.owner.key === myPlayerKey) step3Root.find("button[name=btn-start-game]")[game.state === 'stop' && Object.keys(game.players).length > 0 && allReady ? 'show' : 'hide']();
                    boardOverlay.find("button[name=btn-one-more-round]").hide();
                }

                if (game.state === 'ended') { // on ended state > show who's the winner & ask for ready status for another game
                    boardOverlay.show(); // show board overlay
                    boardOverlayTxt.html('<span style="font-size: 20px;"><b style="background-color: #009688;color: #ffeb3b;padding: 3px;">' + scoreboardDiv.data('leaderboard-data')[0].name + '</b> is the winner!<br><br>Congrats!!!<br><br></span>'+(game.owner.key !== myPlayerKey?'<br>(Game owner can start a new round)':''));
                    firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/players/' + myPlayerKey).update({ready: false}); // set my ready state to false
                    if (game.owner.key === myPlayerKey) boardOverlay.find("button[name=btn-one-more-round]").show(); // owner can decide one more round
                }
            });

            // remove player from board on disconnection
            firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/players').on('child_removed', (snapshot) => {
                board.find("div.player-item[key='" + snapshot.key + "']").remove();
            });

            // im ready button click event
            step3Root.find("button[name=btn-im-ready]").click(function () {
                firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/players/' + myPlayerKey).update({ready: true});
                $(this).hide(); // hide button itself
            });

            // start game button click
            step3Root.find("button[name=btn-start-game]").click(function () {
                firebase.database().ref('multiplayer-snake-game/games/' + gameKey).update({
                    state: 'countdown',
                    countdownDuration: 2500 // 2.5 seconds of countdown
                });
                $(this).hide(); // hide button itself

                // reset all players' scores to zero
                board.find("div.player-item").each(function () { // for each player
                    const playerKey = $(this).attr('key');
                    if (playerKey) firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/players/' + playerKey).update({
                        score: 0,
                        lastScoreChange: null
                    });
                });
            });

            // one more round button click
            boardOverlay.find("button[name=btn-one-more-round]").click(function () {
                const game = board.data('game-data');
                if (game.owner.key === myPlayerKey) firebase.database().ref('multiplayer-snake-game/games/' + gameKey).update({state: 'stop'}); // set game state to stop(initial) > owner does
                $(this).hide(); // hide button itself
            });

            // stop game button click
            step3Root.find("button[name=btn-stop-game]").click(function () {
                firebase.database().ref('multiplayer-snake-game/games/' + gameKey).update({state: 'stop'});
                firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/targets').remove(); // remove existing targets on the board
                $(this).hide(); // hide button itself
            });

            // putting targets (reward | danger | surprise)
            let putATarget = () => {
                const gameData = board.data('game-data');
                if (!gameData || gameData.state !== 'play') return; // no game data OR other than play > then return
                if (board.find("div.target-item").length >= maxAllowedNumOfTargets) return; // if there are already enough targets, return
                if (!gameKey) return; // null gamekey data creation bug fix
                let multiply = h.getRandomInteger(1, 100);
                if (multiply > 97) multiply = 100; // 500 points (%3 possibility)
                else if (multiply > 91) multiply = 40; // 200 points (%6 possibility)
                else if (multiply > 80) multiply = 20; // 100 points (%11 possibility)
                else multiply = multiply.mod(10) + 1; // 5~50 points (%80 possibility)
                const isPositive = (multiply > 10 ? h.getRandomInteger(0, 1) === 0 : h.getRandomInteger(1, 10) !== 2); // big number case: %50 positive | small number case: %90 positive
                l("pushing target to game:", gameKey);
                firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/targets').push({
                    point: 5 * multiply * (isPositive ? 1 : -1),
                    isSurprise: ((multiply > 10 || multiply < -10) && h.getRandomInteger(1, 10) > 3), // if number is big > make it a surprise at %70 possibility
                    mLeft: h.getRandomInteger(0, boardWH[0] - 20),
                    mTop: h.getRandomInteger(0, boardWH[1] - 20),
                    removeIn: 2000 + h.getRandomInteger(0, 4000) - (multiply >= -10 && multiply < 0 ? 1500 : 0) // min: 2sec | max: 6sec. (1.5sec. reduction for open negative case)
                });
            }, removeATarget = (targetElm) => {
                if (!targetElm || targetElm.length === 0) return;
                clearTimeout(targetElm.data('removerTimeout'));
                targetElm.remove();
            };
            firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/targets').on('child_added', function (snapshot) { // new target added to the board (for everyone)
                const target = snapshot.val();
                l("new target:", snapshot.key, target);

                let targetElm = $("<div>").addClass('target-item' + (!target.isSurprise ? (target.point > 0 ? ' reward' : ' danger') : '')).attr('key', snapshot.key).text(target.isSurprise ? '???' : Math.abs(target.point)).css({
                    'margin-left': target.mLeft,
                    'margin-top': target.mTop
                }).prependTo(board).data('point', target.point).data('removerTimeout', setTimeout(function () {
                    firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/targets/' + targetElm.attr('key')).remove();
                    targetElm.remove(); // remove target
                }, target.removeIn));
            });
            firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/targets').on('child_removed', function (snapshot) { // target removed from the board (for everyone)
                const target = snapshot.val();
                l("target removed:", snapshot.key, target);
                removeATarget(board.find("div.target-item[key='" + snapshot.key + "']"));
            });

            let startAfter = null;
            if (!step3initialized) { // one-time bindings
                // game interval > makes the motion of players
                gameInterval = setInterval(function () {
                    const gameData = board.data('game-data');
                    if (!gameData || gameData.state === 'stop') return; // no game data OR stop > then return
                    if (gameData.state === 'countdown') {
                        if (!startAfter) startAfter = Date.now() + gameData.countdownDuration;
                        const secLeft = Math.ceil((startAfter - Date.now()) / 1000);
                        if (secLeft > 0) boardOverlayTxt.text('Starting in ' + secLeft + ' seconds...');
                        else {
                            if (gameData.owner.key === myPlayerKey) { // owner specific actions
                                l("update state to play here! (owner does)");
                                gameData.state = 'stop'; // to avoid multiple calls of this case
                                firebase.database().ref('multiplayer-snake-game/games/' + gameKey).update({ // update game state to 'play' (owner does)
                                    state: 'play',
                                    countdownDuration: null
                                });
                                step3Root.find("button[name=btn-stop-game]").show();// show stop game button
                            }
                        }
                        return;
                    } else startAfter = null;
                    if (gameData.state !== 'play') return; // play state below
                    board.find("div.player-item").each(function () { // each player mover logic
                        let player = $(this), playerData = player.data('player-data');
                        let newMLeft, newMTop;
                        switch (playerData.direction) {
                            case 'left': // left
                                newMLeft = parseInt(player.css('margin-left')) - speed;
                                player.css('margin-left', newMLeft.mod(boardWH[0] - playerItemWH[0]));
                                break;
                            case 'up': // up
                                newMTop = parseInt(player.css('margin-top')) - speed;
                                player.css('margin-top', newMTop.mod(boardWH[0] - playerItemWH[0]));
                                break;
                            case 'right': // right
                                newMLeft = parseInt(player.css('margin-left')) + speed;
                                player.css('margin-left', newMLeft.mod(boardWH[0] - playerItemWH[0]));
                                break;
                            case 'down': // down
                                newMTop = parseInt(player.css('margin-top')) + speed;
                                player.css('margin-top', newMTop.mod(boardWH[0] - playerItemWH[0]));
                                break;
                        }
                    });
                    targetHitCheck(); // target hit checking
                }, timeout);

                let targetHitCheck = () => {
                    const targetItems = board.find("div.target-item");
                    if (targetItems.length === 0) return;

                    const myItem = board.find("div.player-item.me"),
                        meXY = [parseInt(myItem.css('margin-left')), parseInt(myItem.css('margin-top'))];

                    targetItems.each(function () { // check for all target items on the board
                        const targetItem = $(this),
                            targetXY = [parseInt(targetItem.css('margin-left')), parseInt(targetItem.css('margin-top'))],
                            xIntersection = (meXY[0] + 15 > targetXY[0] && meXY[0] < targetXY[0] + 15),
                            yIntersection = (meXY[1] + 15 > targetXY[1] && meXY[1] < targetXY[1] + 15);
                        if (xIntersection && yIntersection) {
                            l("hit a target!", targetItem.data());
                            firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/players/' + myPlayerKey).update({ // update my score
                                score: myItem.data('player-data').score + targetItem.data('point'),
                                lastScoreChange: targetItem.data('point')
                            });
                            removeATarget(targetItem);
                            firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/targets/' + targetItem.attr('key')).remove(); // remove that target from everyone's board
                        }
                    });
                };

                // put target interval (runs on owner's machine)
                putTargetInterval = setInterval(function () {
                    const gameData = board.data('game-data');
                    if (!gameData) return;
                    if (gameData.owner.key === myPlayerKey) {
                        if (gameData.state === 'play') {
                            l("put target interval");
                            putATarget(); // put another target (has max number check inside)
                        }
                    }
                }, 800);

                // my player's direction change event
                let changeMyDirectionTo = (direction) => {
                    board.find("div.player-item.me").data('player-data').direction = direction; // update my direction locally

                    // send my x-y & new direction to firebase (for my appearance on other users)
                    firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/players/' + myPlayerKey).update({
                        direction: direction,
                        mLeft: board.find("div.player-item.me").css('margin-left'),
                        mTop: board.find("div.player-item.me").css('margin-top')
                    });
                };

                // our element's move event (keyboard)
                $(window).on("keydown.multiplayer-snake-game", function (e) {
                    if ([37, 38, 39, 40].indexOf(e.which) === -1) return;
                    e.preventDefault(); // prevent viewport scrolling with arrow keys
                    let direction = 'right'; // default value
                    switch (e.which) {
                        case 37: // left
                            direction = 'left';
                            break;
                        case 38: // up
                            direction = 'up';
                            break;
                        case 39: // right
                            direction = 'right';
                            break;
                        case 40: // down
                            direction = 'down';
                            break;
                    }
                    changeMyDirectionTo(direction);
                });

                // our element's move event (mouse or touch)
                $("#mobile-controller-root .movement-button").on((typeof window.ontouchstart === 'object' ? 'touchstart' : 'mousedown'), function (e) {
                    if (!e.defaultPrevented) e.preventDefault();
                    $(this).addClass('active');
                    if (board.data('game-data').state !== 'play') return;
                    let direction = $(this).attr('direction');
                    changeMyDirectionTo(direction);
                }).on((typeof window.ontouchstart === 'object' ? 'touchend' : 'mouseup'), function (e) {
                    $(this).removeClass('active');
                });

                // leave the game (step 3 > step 2)
                step3Root.on("click", "button[name=btn-leave-game]", function () {
                    firebase.database().ref('multiplayer-snake-game/games/' + gameKey).off('value'); // destroy room listener of step 3
                    firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/players/' + myPlayerKey).remove(); // remove my player from the game
                    firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/targets').off('child_added');
                    firebase.database().ref('multiplayer-snake-game/games/' + gameKey + '/targets').off('child_removed');
                    if (board.data('game-data').owner.key === myPlayerKey) {
                        firebase.database().ref('multiplayer-snake-game/games/' + gameKey).onDisconnect().cancel(); // cancel onDisconnect action (since we leave room with the button click)
                        firebase.database().ref('multiplayer-snake-game/games/' + gameKey).update({state: 'stop'}); // if owner leaves the game, state changes to 'stop' (not for other players)
                    }
                    gameKey = null; // clear game key
                    switchToStep(2);
                });
            }
            step3initialized = true;

            // normalizations for mobile mode
            function normalizeForMobile() {
                if (window.matchMedia("screen and (max-width: 550px)").matches || typeof window.ontouchstart === 'object') {
                    //l("normalize for mobile");
                    const boardNOverlay = board.add(boardOverlay).css('margin-left', -10),
                        scale = $(window).width() / board.outerWidth();
                    //l(board.outerWidth(), $(window).width(), scale, boardNOverlay);
                    if (scale < 1) { // scale down
                        boardNOverlay.css('transform', 'scale(' + scale + ')').each(function () {
                            const currentML = parseInt($(this).css('margin-left')) || 0;
                            $(this).css('margin-left', currentML - $(this).offset().left);
                        });
                    } else { // center the board
                        const marginLeftMore = ($(window).width() - board.outerWidth()) / 2;
                        boardNOverlay.each(function () {
                            const currentML = parseInt($(this).css('margin-left')) || 0;
                            $(this).css('margin-left', currentML + marginLeftMore);
                        });
                    }

                    scoreboardDiv.css('margin-bottom', $("#mobile-controller-root").css('height'));
                    $("#mobile-controller-root").removeClass('hidden');
                } else {
                    l("mobile normalize not needed");
                }
            }
            normalizeForMobile();
        };
        // step 3 - END
    }

    moduleOff = () => {
        l("module off called");

        if (fbaseH.isAppStarted()) {
            fbaseApp = fbaseH.stopApp(fbaseApp); // destroy app too
            l("stopped2->", fbaseApp);
        }

        $(window).off("keydown.multiplayer-snake-game"); // remove global event on module off

        // clear intervals too
        if (gameInterval !== null) clearInterval(gameInterval);
        if (putTargetInterval !== null) clearInterval(putTargetInterval);
    }

    l("module on-off events loaded");

})();