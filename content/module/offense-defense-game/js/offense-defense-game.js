(function () {
    let dangerMoverInterval = null; let timeCountdownInterval = null;

    moduleOn = () => {
        let moduleRoot = rootDiv.find(">div");
        l("module on called");

        // GAME HELPERS - START
        function updateScore(change) {
            if (change) score += parseInt(change) || 0;
            let currentLevel = getLevel();
            if (score >= levels[currentLevel].target) {
                $("<div>").text('CONGRATS! YOU WON LEVEL ' + (currentLevel + 1) + '!').css('color', 'green').prependTo($("div#console-root")).hide().fadeIn();
                if (levels[currentLevel + 1])
                    $("<button>").text('Move on to the Next Level').css({'width': '100%', 'height': 40}).click(function () {
                        setLevel(getLevel() + 1);
                        prepareLevel();
                    }).appendTo($("div#matrix-root")).hide().fadeIn();
                else
                    $("<button>").text('Finished! Start Over The Game').css({
                        'width': '100%',
                        'height': 40
                    }).click(function () {
                        setLevel(0);
                        prepareLevel();
                    }).appendTo($("div#matrix-root")).hide().fadeIn();
                clearInterval(dangerMoverInterval);
                clearInterval(timeCountdownInterval);
                changeGameStateTo('stop');
            }
            if (score <= -levels[currentLevel].target) {
                $("<div>").text('YOU HAVE LOST LEVEL ' + (currentLevel + 1) + '!').css('color', 'red').prependTo($("div#console-root")).hide().fadeIn();
                $("<button>").text('Retry This Level Again').css({'width': '100%', 'height': 40}).click(function () {
                    prepareLevel();
                }).appendTo($("div#matrix-root")).hide().fadeIn();
                clearInterval(dangerMoverInterval);
                clearInterval(timeCountdownInterval);
                changeGameStateTo('stop');
            }
            $("b#score-elm").text(score);
        }

        function updateTime() {
            let min = Math.floor(timeLeft / 60);
            let sec = timeLeft % 60;
            $("b#time-elm").text(min + ':' + (sec < 10 ? '0' : '') + sec);
        }

        function drawMatrix(m, el) {
            el.empty();
            m.forEach(function (mRow, i) {
                let row = $("<div>").addClass('matrix-row');
                mRow.forEach(function (mCol, j) {
                    $("<div>").addClass('matrix-col').attr({
                        'rowindex': i,
                        'colindex': j
                    }).text(m[i][j].val).data('obj', m[i][j]).appendTo(row);
                });
                row.appendTo(el);
            });
        }

        function prepareLevel() {
            changeGameStateTo('stop'); // stop the game if it runs
            let currentLevel = getLevel();
            $("b#target-elm").text(levels[currentLevel].target);
            score = 0;
            updateScore();

            $("div#game-root").css('width', 40 * levels[currentLevel].cols);
            $("div#desc-root").html('<b>' + (currentLevel !== 999 ? 'Level ' + (currentLevel + 1) : 'Custom Level') + ': </b><span>' + levels[currentLevel].desc + '</span>')

            // generate matrix
            matrix = [];
            for (let i = 0; i < levels[currentLevel].rows; i++) { // creation
                let inner = [];
                for (let j = 0; j < levels[currentLevel].cols; j++) {
                    inner.push({rowIndex: i, colIndex: j, val: h.getRandomInteger(1, levels[currentLevel].boxMax)});
                }
                matrix.push(inner);
            }
            l("matrix:", matrix);

            drawMatrix(matrix, $("div#matrix-root"));

            // put our selection to a random box
            $("div#matrix-root").find(".matrix-row").eq(h.getRandomInteger(0, levels[currentLevel].rows - 1)).find(".matrix-col").eq(h.getRandomInteger(0, levels[currentLevel].cols - 1).toString()).addClass('selected');

            // put danger to a random box
            $("div#matrix-root").find(".matrix-row").eq(h.getRandomInteger(0, levels[currentLevel].rows - 1)).find(".matrix-col").eq(h.getRandomInteger(0, levels[currentLevel].cols - 1).toString()).addClass('danger');

            clearInterval(dangerMoverInterval);
            dangerMoverInterval = setInterval(function () { // move danger randomly
                if (gameState !== 'play') return;
                let dangerEl = $("div#matrix-root").find(".matrix-row .matrix-col.danger");
                let dangerData = dangerEl.removeClass('danger').data('obj');
                let selectedData = $("div#matrix-root").find(".matrix-row .matrix-col.selected").data('obj');
                let nextRowIndex = dangerData.rowIndex;
                let nextColIndex = dangerData.colIndex;

                let selectedNeighbours = [];
                if (levels[currentLevel].dangerBehaviour === 'randomMove') {
                    if (levels[currentLevel].selfDefense) { // if self-defense is on > check neighbours first
                        let neighbours = getNeighboursByEl(dangerEl);
                        selectedNeighbours = neighbours.filter(".selected").first();
                    }

                    if (selectedNeighbours.length > 0) { // go to selected neighbour directly (as a self-defense)
                        nextRowIndex = selectedNeighbours.data('obj').rowIndex;
                        nextColIndex = selectedNeighbours.data('obj').colIndex;
                    } else { // otherwise > select random neighbour to go
                        let neighbours = getNeighbourIndexesByIJ(dangerData.rowIndex, dangerData.colIndex);
                        let decidedNeighbour = neighbours[h.getRandomInteger(0, neighbours.length - 1)];

                        nextRowIndex = decidedNeighbour[0];
                        nextColIndex = decidedNeighbour[1];
                    }
                } else if (levels[currentLevel].dangerBehaviour === 'chaseMe') {
                    let rowDif = selectedData.rowIndex - dangerData.rowIndex,
                        colDif = selectedData.colIndex - dangerData.colIndex;

                    // checking other side diffs too (if other side is closer, use that direction instead) [!smarter chasing!]
                    if (rowDif !== 0) {
                        let rowDif2 = (selectedData.rowIndex + ((rowDif > 0 ? -1 : 1) * levels[currentLevel].rows)) - dangerData.rowIndex;
                        if (Math.abs(rowDif2) < Math.abs(rowDif)) rowDif = rowDif2;
                    }
                    if (colDif !== 0) {
                        let colDif2 = (selectedData.colIndex + ((colDif > 0 ? -1 : 1) * levels[currentLevel].cols)) - dangerData.colIndex;
                        if (Math.abs(colDif2) < Math.abs(colDif)) colDif = colDif2;
                    }
                    //l(rowDif, colDif);

                    if (levels[currentLevel].withDiagonals) { // with diagonals (more strict chasing)
                        if (rowDif === 0 && colDif === 0) { // danger on us already > then needs to go away
                            nextRowIndex = (dangerData.rowIndex + (h.getRandomInteger(0, 1) === 0 ? 1 : -1)).mod(levels[currentLevel].rows);
                            nextColIndex = (dangerData.colIndex + (h.getRandomInteger(0, 1) === 0 ? 1 : -1)).mod(levels[currentLevel].cols);
                        } else {
                            if (rowDif !== 0) nextRowIndex = (dangerData.rowIndex + (rowDif > 0 ? 1 : -1)).mod(levels[currentLevel].rows);
                            if (colDif !== 0) nextColIndex = (dangerData.colIndex + (colDif > 0 ? 1 : -1)).mod(levels[currentLevel].cols);
                        }
                    } else { // without diagonals (cooler chasing)
                        if (dangerData.rowIndex === selectedData.rowIndex && dangerData.colIndex === selectedData.colIndex) { // danger on us already > then needs to go away
                            if (h.getRandomInteger(0, 1) === 0) nextRowIndex = (dangerData.rowIndex + (h.getRandomInteger(0, 1) === 0 ? 1 : -1)).mod(levels[currentLevel].rows);
                            else nextColIndex = (dangerData.colIndex + (h.getRandomInteger(0, 1) === 0 ? 1 : -1)).mod(levels[currentLevel].cols);
                        } else {
                            if (h.getRandomInteger(0, 1) === 0) { // find same row first
                                if (rowDif !== 0) nextRowIndex = (dangerData.rowIndex + (rowDif > 0 ? 1 : -1)).mod(levels[currentLevel].rows);
                                else if (colDif !== 0) nextColIndex = (dangerData.colIndex + (colDif > 0 ? 1 : -1)).mod(levels[currentLevel].cols);
                            } else { // find same col first
                                if (colDif !== 0) nextColIndex = (dangerData.colIndex + (colDif > 0 ? 1 : -1)).mod(levels[currentLevel].cols);
                                else if (rowDif !== 0) nextRowIndex = (dangerData.rowIndex + (rowDif > 0 ? 1 : -1)).mod(levels[currentLevel].rows);
                            }
                        }
                    }

                }
                let nextEl = $("div#matrix-root").find(".matrix-row").eq(nextRowIndex).find(".matrix-col").eq(nextColIndex);
                if (nextEl.hasClass('selected')) {
                    let change = nextEl.data('obj').val;
                    $("<div>").text('Your enemy stepped on you! (-' + change + ' point)').css('color', 'red').prependTo($("div#console-root")).hide().fadeIn();
                    updateScore(-change);
                }
                nextEl.addClass('danger');
            }, levels[currentLevel].interval);

            timeLeft = levels[currentLevel].time;
            updateTime();
            clearInterval(timeCountdownInterval);
            timeCountdownInterval = setInterval(function () {
                if (gameState !== 'play') return;
                timeLeft--;
                updateTime();
                if (timeLeft <= 0) { // time over
                    $("<div>").text('YOU HAVE LOST LEVEL ' + (currentLevel + 1) + '! (Time is over!)').css('color', 'red').prependTo($("div#console-root")).hide().fadeIn();
                    $("<button>").text('Try This Level Again').css({'width': '100%', 'height': 40}).click(function () {
                        prepareLevel();
                    }).appendTo($("div#matrix-root")).hide().fadeIn();
                    clearInterval(dangerMoverInterval);
                    clearInterval(timeCountdownInterval);
                    changeGameStateTo('stop');
                }
            }, 1000);

            $("<button>").text('Start!').css({'width': '100%', 'height': 40}).click(function () {
                $("<div>").text((currentLevel !== 999 ? 'Level ' + (currentLevel + 1) : 'Custom level') + ' started, good luck!').css('color', 'blue').prependTo($("div#console-root").empty()).hide().fadeIn();
                changeGameStateTo('play');
                $(this).remove();
            }).appendTo($("div#matrix-root")).hide().fadeIn();

            normalizeForMobile();
        }

        function getNeighboursByEl(el) {
            let neighbours = $();
            let elData = el.data('obj');
            let currentLevel = getLevel();
            for (let i = elData.rowIndex - 1; i <= elData.rowIndex + 1; i++) {
                for (let j = elData.colIndex - 1; j <= elData.colIndex + 1; j++) {
                    if (i === elData.rowIndex && j === elData.colIndex) continue;
                    if (!levels[currentLevel].withDiagonals && Math.pow(i - elData.rowIndex, 2) + Math.pow(j - elData.colIndex, 2) === 2) continue;
                    neighbours = neighbours.add($("div#matrix-root").find(".matrix-row .matrix-col[rowindex=" + i.mod(levels[currentLevel].rows) + "][colindex=" + j.mod(levels[currentLevel].cols) + "]"));
                }
            }
            return neighbours;
        }

        function getNeighbourIndexesByIJ(rowIndex, colIndex) {
            let neighbours = [];
            let currentLevel = getLevel();
            for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
                for (let j = colIndex - 1; j <= colIndex + 1; j++) {
                    if (i === rowIndex && j === colIndex) continue;
                    if (!levels[currentLevel].withDiagonals && Math.pow(i - rowIndex, 2) + Math.pow(j - colIndex, 2) === 2) continue;
                    neighbours.push([i.mod(levels[currentLevel].rows), j.mod(levels[currentLevel].cols)]);
                }
            }
            return neighbours;
        }

        function moveOurElementTo(direction) {
            let currentLevel = getLevel();
            let selectedEl = $("div#matrix-root").find(".matrix-row .matrix-col.selected");
            let selectedData = selectedEl.removeClass('selected').data('obj');
            let nextRowIndex = selectedData.rowIndex;
            let nextColIndex = selectedData.colIndex;
            switch (direction) {
                case 'left': // left
                    nextColIndex = (selectedData.colIndex - 1).mod(levels[currentLevel].cols);
                    break;
                case 'up': // up
                    nextRowIndex = (selectedData.rowIndex - 1).mod(levels[currentLevel].rows);
                    break;
                case 'right': // right
                    nextColIndex = (selectedData.colIndex + 1).mod(levels[currentLevel].cols);
                    break;
                case 'down': // down
                    nextRowIndex = (selectedData.rowIndex + 1).mod(levels[currentLevel].rows);
                    break;
            }
            let nextEl = $("div#matrix-root").find(".matrix-row").eq(nextRowIndex).find(".matrix-col").eq(nextColIndex);
            if (nextEl.hasClass('danger')) {
                let change = nextEl.data('obj').val;
                $("<div>").text('You stepped on your enemy! (+' + change + ' point)').css('color', 'green').prependTo($("div#console-root")).hide().fadeIn();
                updateScore(change);
            }
            nextEl.addClass('selected');
        }
        // GAME HELPERS - END

        // GAME - START
        let gameState = "stop";
        function changeGameStateTo(newGs) {
            gameState = newGs;
        }
        let levels = [
            {rows:12, cols:12, interval:600, boxMax:10, target:100, time:30, dangerBehaviour:'randomMove', withDiagonals:false, selfDefense:false, desc:"Your enemy randomly moves. Your aim is to step on it (before it steps on you)."},
            {rows:10, cols:10, interval:500, boxMax:20, target:150, time:45, dangerBehaviour:'randomMove', withDiagonals:true, selfDefense:false, desc:"Your enemy randomly moves again but this time it can move to diagonal directions too."},
            {rows:11, cols:11, interval:550, boxMax:15, target:200, time:60, dangerBehaviour:'randomMove', withDiagonals:false, selfDefense:true, desc:"Your enemy randomly moves with self-defense behaviour (which means if you come very close to it, it will make a back move to step on you)."},
            {rows:9, cols:9, interval:500, boxMax:20, target:250, time:60, dangerBehaviour:'randomMove', withDiagonals:true, selfDefense:true, desc:"Your enemy moves with self-defense behaviour and including diagonal directions too."},

            {rows:12, cols:12, interval:450, boxMax:25, target:300, time:60, dangerBehaviour:'chaseMe', withDiagonals:false, desc:"Your enemy is in Chaser Mode this time. It will be chasing you. But luckily it can only move to non-diagonal directions."},
            {rows:11, cols:11, interval:400, boxMax:30, target:400, time:60, dangerBehaviour:'chaseMe', withDiagonals:true, desc:"Your enemy chases you again and this time it is more passionately chasing. Good luck. (You can use its chasing behavior as your advantage by the way)"},

            {rows:11, cols:11, interval:300, boxMax:20, target:400, time:60, dangerBehaviour:'randomMove', withDiagonals:true, selfDefense:true, desc:"Your enemy randomly moves including diagonal directions. But faster!"},
        ];
        levels[999] = {rows:12, cols:12, interval:600, boxMax:10, target:50, time:60, dangerBehaviour:'randomMove', withDiagonals:true, selfDefense:false, desc:"This is CUSTOM level that you can create with whatever settings you want."};
        let levelDdl = $("select#level-ddl").change(function () { // level ddl change event
            prepareLevel();
            let selectedLevel = parseInt($(this).val()) || 0;
            if (selectedLevel === 999) { // custom level selected
                customLevelConfigDiv.slideDown('ease-out').find("[binding^='customLevel.']").each(function () {
                    let colname = $(this).attr('binding').replace('customLevel.', '');
                    //l(this, colname, levels[999][colname]);
                    if ($(this).attr('type') === 'checkbox')
                        $(this).prop('checked', levels[999][colname]);
                    else
                        $(this).val(levels[999][colname]);
                });
            } else customLevelConfigDiv.slideUp('ease-out');
        });
        levels.forEach(function (o, i) {
            $("<option>").attr('value', i).text(i !== 999 ? 'Level ' + (i + 1) : 'Custom').appendTo(levelDdl);
        });
        function getLevel() {
            return parseInt($("select#level-ddl").val()) || 0;
        }
        function setLevel(lvl) {
            $("select#level-ddl").val(lvl || 0)
        }
        let score; let matrix; let timeLeft;

        prepareLevel(); // prepare the current level

        // our element's move event (keyboard arrow keys)
        let oneArrowKeyIsDown = null;
        $(window).on("keydown.offense-defense", function (e) {
            if (gameState !== 'play') return;
            if ([37, 38, 39, 40].indexOf(e.which) === -1) return;
            if (oneArrowKeyIsDown && oneArrowKeyIsDown === e.which) return; // to avoid keystroking
            e.preventDefault(); // prevent viewport scrolling with arrow keys
            oneArrowKeyIsDown = e.which;
            let direction = '';
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
            moveOurElementTo(direction);
        }).on("keyup", function () {
            oneArrowKeyIsDown = null;
        });

        // our element's move event (mouse or touch)
        $("#mobile-controller-root a.movement-button").click(function () {
            if (gameState !== 'play') return;
            let direction = $(this).attr('direction');
            moveOurElementTo(direction);
        });

        // custom level config part events
        let customLevelConfigDiv = $("div#custom-level-config-root");
        customLevelConfigDiv.find("button[name=custom-level-apply-settings]").click(function () {
            customLevelConfigDiv.find("[binding^='customLevel.']").each(function () {
                let colname = $(this).attr('binding').replace('customLevel.', '');
                //l(this, colname, levels[999][colname]);
                if ($(this).attr('type') === 'checkbox')
                    levels[999][colname] = $(this).prop('checked');
                else if ($(this).attr('type') === 'number') {
                    let number = parseInt($(this).val());
                    if (number) levels[999][colname] = number;
                } else
                    levels[999][colname] = $(this).val();
            });
            l("custom level changed to:", levels[999]);
            prepareLevel();
        });

        // normalizations for mobile mode
        function normalizeForMobile() {
            if (window.matchMedia("screen and (max-width: 550px)").matches) {
                //l("normalize for mobile");
                let currentLevel = getLevel();
                let windowWidth = $(window).width();
                let gameRootWidth = $("div#game-root").css('width', '100%').width();
                let cellWHToBe = gameRootWidth / levels[currentLevel].cols;
                let currentCellWH = parseInt($("#matrix-root .matrix-row .matrix-col").first().css('width'));
                l("gameRootWidth:", gameRootWidth, "currentCellWH:", currentCellWH, "cellWHToBe:", cellWHToBe);

                if (cellWHToBe < currentCellWH)
                    $("#matrix-root .matrix-row .matrix-col").css({
                        'width': cellWHToBe,
                        'height': cellWHToBe,
                        'line-height': (cellWHToBe - 2) + 'px'
                    });
                else if (40 * levels[currentLevel].cols < gameRootWidth)
                    $("#matrix-root .matrix-row").css({
                        'margin-left': (gameRootWidth - 2 - (40 * levels[currentLevel].cols)) / 2
                    });

                $("#console-root").css('margin-bottom', 150);
                $("#mobile-controller-root").show();
            } else {
                //l("mobile normalize not needed");
            }
        }
        // GAME - END


    }

    moduleOff = () => {
        l("module off called");

        $(window).off("keydown.offense-defense"); // remove global event on module off

        // clear intervals too
        clearInterval(dangerMoverInterval);
        clearInterval(timeCountdownInterval);
    }

    l("module on-off events loaded");

})();