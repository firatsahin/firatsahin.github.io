(function () {
  moduleOn = () => {
    l("module on called");
    const moduleRoot = rootDiv.find(">div"),
      configRoot = moduleRoot.find("#game-config-root"),
      boardRoot = moduleRoot.find("#board-root"),
      consoleRoot = moduleRoot.find("#console-root");

    const boardSize = 9;
    let board = "";

    let attemptCount = 0,
      t1 = null,
      title = "Sudoku Game (Solver)";

    configRoot.find("button[name=solve_sudoku]").click(solveSudoku);
    configRoot.find("select[name=game_selector]").change(() => {
      loadSudokuPuzzle();

      // reset stuff after new game loaded
      attemptCount = 0;
      t1 = null;
      moduleRoot.find(">h1").text(title);

      postMsgToConsole("New puzzle loaded. Good luck!", "green", true);
    });

    function createGame() {
      configRoot.find("select[name=game_selector]").change();

      l("isBoardValid:", isBoardValid());

      moduleRoot.css("width", 40 * boardSize + 40);
    }

    function solveSudoku() {
      if (!t1) t1 = Date.now();
      const moves = getPossibleMoves();
      let empties = getEmptyFields().map((e) => ({
        idx: e,
        i: Math.floor(e / 9),
        j: e % 9,
        moves: moves.filter((_) => _.i === Math.floor(e / 9) && _.j === e % 9),
      }));
      //l(empties);

      const guarantees = empties.filter((_) => _.moves.length === 1);
      if (guarantees.length > 0) {
        // make a random guarantee move
        const randomEmpty =
            guarantees[h.getRandomInteger(0, guarantees.length - 1)],
          randomMove =
            randomEmpty.moves[
              h.getRandomInteger(0, randomEmpty.moves.length - 1)
            ];
        //l("guarantee move:", randomMove);
        setValueOf(randomMove.i, randomMove.j, randomMove.val);

        solveSudoku();
      } else {
        const nonGuarantees = empties.filter((_) => _.moves.length > 0);
        if (nonGuarantees.length > 0) {
          // make a random non-guarantee move
          const randomEmpty =
              nonGuarantees[h.getRandomInteger(0, nonGuarantees.length - 1)],
            randomMove =
              randomEmpty.moves[
                h.getRandomInteger(0, randomEmpty.moves.length - 1)
              ];
          //l("non-guarantee move:", randomMove);
          setValueOf(randomMove.i, randomMove.j, randomMove.val);

          solveSudoku();
        } else if (empties.length === 0) {
          l("CONGRATS!!");
          postMsgToConsole(
            "CONGRATS! You have solved the Sudoku puzzle programmatically.",
            "green",
          );
          solveCallback();
        } else {
          //l("WE ARE STUCK!");
          solveCallback();

          // start over
          setTimeout(() => {
            loadSudokuPuzzle();
            solveSudoku();
          });
        }
      }
    }

    function solveCallback() {
      attemptCount++;
      moduleRoot
        .find(">h1")
        .text(
          `Attempt #${attemptCount} (${Math.round((Date.now() - t1) / attemptCount)}ms/try)`,
        );
      renderBoard();
    }

    function renderBoard() {
      boardRoot.empty();
      for (let i = 0; i < boardSize; i++) {
        const row = $("<div>").addClass("board-row");
        for (let j = 0; j < boardSize; j++) {
          const col = $("<div>")
            .addClass("board-col")
            .attr({
              rowindex: i,
              colindex: j,
            })
            .text(getValueOf(i, j))
            .appendTo(row);
        }
        row.appendTo(boardRoot);
      }
    }

    createGame();

    // HELPERS - BEGIN
    function getValueOf(i, j) {
      return board[i * boardSize + j];
    }

    function setValueOf(i, j, val) {
      const idx = i * boardSize + j;
      board = board.substring(0, idx) + val + board.substring(idx + 1);
    }

    function getEmptyFields() {
      const emptyFields = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "_") emptyFields.push(i);
      }
      return emptyFields;
    }

    function getPossibleMoves() {
      const possibleMoves = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] !== "_") continue;

        const x = Math.floor(i / 9),
          y = i % 9,
          possibleVals = reducePossibleVals(x, y, "123456789");

        for (let _ of possibleVals) {
          const backup = getValueOf(x, y); // backup

          // test the move here
          setValueOf(x, y, _.toString());
          if (isBoardValid()) possibleMoves.push({ i: x, j: y, val: _ });

          setValueOf(x, y, backup); // restore
        }
      }
      return possibleMoves;
    }

    function reducePossibleVals(x, y, pv) {
      for (let _ = 0; _ < 9; _++) {
        // reduce row vals
        const rowVal = getValueOf(x, _);
        if (rowVal !== "_") pv = pv.replace(rowVal, "");

        // reduce col vals
        const colVal = getValueOf(_, y);
        if (colVal !== "_") pv = pv.replace(colVal, "");

        // reduce group vals
        const i = Math.floor(x / 3),
          j = Math.floor(y / 3);
        for (let __ = 0; __ < 3; __++) {
          for (let ___ = 0; ___ < 3; ___++) {
            const grpVal = getValueOf(i * 3 + __, j * 3 + ___);
            if (grpVal !== "_") pv = pv.replace(grpVal, "");
          }
        }
      }
      return pv;
    }

    function loadSudokuPuzzle() {
      board = configRoot.find("select[name=game_selector]").val();
      renderBoard();
    }

    function isBoardValid() {
      // 1: rows validity
      for (let i = 0; i < boardSize; i++) {
        if (
          !isNineUnique(
            board.substring(i * boardSize, i * boardSize + boardSize),
          )
        )
          return false;
      }

      // 2: cols validity
      for (let i = 0; i < boardSize; i++) {
        let nineStr = "";
        for (let j = 0; j < boardSize; j++) {
          nineStr += board[j * boardSize + i];
        }
        if (!isNineUnique(nineStr)) return false;
      }

      // 3: group validity
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let nineStr = "";
          for (let _ = 0; _ < 3; _++) {
            for (let __ = 0; __ < 3; __++) {
              nineStr += getValueOf(i * 3 + _, j * 3 + __);
            }
          }
          if (!isNineUnique(nineStr)) return false;
        }
      }

      return true;
    }

    function isNineUnique(nineStr) {
      const digits = [];
      nineStr = nineStr.replaceAll("_", ""); // ignore _ chars
      for (let i = 0; i < nineStr.length; i++) {
        if (digits.indexOf(nineStr[i]) === -1) digits.push(nineStr[i]);
      }
      return digits.length === nineStr.length;
    }

    function postMsgToConsole(text, color, clear = false) {
      if (clear) consoleRoot.empty();
      $("<div>")
        .text(text)
        .css("color", color)
        .prependTo(consoleRoot)
        .hide()
        .fadeIn();
    }
    // HELPERS - END
  };

  moduleOff = () => {
    l("module off called");
  };

  l("module on-off events loaded");
})();
