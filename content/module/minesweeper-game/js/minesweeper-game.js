(function () {
  moduleOn = () => {
    l("module on called");
    const moduleRoot = rootDiv.find(">div"),
      configRoot = moduleRoot.find("#game-config-root"),
      boardRoot = moduleRoot.find("#board-root"),
      consoleRoot = moduleRoot.find("#console-root");

    const board = [];
    let gameGoesOn = false;

    // default config
    configRoot.find("input[name=row_count]").val(12);
    configRoot.find("input[name=col_count]").val(12);
    configRoot.find("input[name=mine_count]").val(16);

    configRoot.find("button[name=create_game]").click(createGame);

    function createGame() {
      const rows = Number(configRoot.find("input[name=row_count]").val()),
        cols = Number(configRoot.find("input[name=col_count]").val()),
        mines = Number(configRoot.find("input[name=mine_count]").val());
      //l("create game", rows, cols, mines);

      // some validations while game creation
      if (rows < 2 || cols < 2) {
        postMsgToConsole(
          'At least 2 rows & 2 columns are needed if we want to call this a "game" :)',
          "red",
        );
        return;
      }

      if (rows * cols <= mines || mines < 2) {
        postMsgToConsole(
          `Number of mines should be at least 2 & less than the number of total boxes! (Now should be less than ${rows * cols})`,
          "red",
        );
        return;
      }

      // create board object
      board.length = 0; // reset object first
      for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < cols; j++) {
          board[i].push({ isMine: false, isOpen: false });
        }
      }

      // place the mines
      while (howManyMinesOnBoard() < mines) {
        const randomI = h.getRandomInteger(0, rows - 1),
          randomJ = h.getRandomInteger(0, cols - 1);
        board[randomI][randomJ].isMine = true;
      }

      // write the numbers (which are tips to the player)
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const nbMines = howManyNeighbourMines(i, j);
          if (nbMines > 0) board[i][j].nbMines = nbMines;
        }
      }

      moduleRoot.css("width", 32 * cols + 32);
      gameGoesOn = true;

      renderBoard();

      postMsgToConsole("New game has been created. Good luck!", "green", true);
    }

    function renderBoard() {
      //l("render board");

      boardRoot.empty();
      board.forEach((rowObj, i) => {
        const row = $("<div>").addClass("board-row");
        rowObj.forEach((colObj, j) => {
          const col = $("<div>")
            .addClass("board-col")
            .attr({
              rowindex: i,
              colindex: j,
            })
            .appendTo(row)
            .click(function () {
              if (!gameGoesOn) return;

              const i = Number($(this).attr("rowindex")),
                j = Number($(this).attr("colindex"));
              //l("box clicked", i, j, board[i][j]);

              openBoxByIJ(i, j);
            })
            .contextmenu(function (e) {
              e.preventDefault();
              if (!gameGoesOn) return;

              const i = Number($(this).attr("rowindex")),
                j = Number($(this).attr("colindex"));
              //l("box right clicked", i, j, board[i][j]);

              if (board[i][j].isOpen) return;

              board[i][j].isLocked = !board[i][j].isLocked;
              renderBoard();
            });

          const numberColors = [
            "blue",
            "green",
            "red",
            "purple",
            "darkred",
            "darkblue",
            "brown",
            "black",
          ];

          if (colObj.isMine) col.text("X");
          else if (colObj.nbMines)
            col.text(colObj.nbMines).css({
              color: numberColors[colObj.nbMines - 1],
              "font-weight": "bold",
              "font-size": "1.2em",
            });
          if (colObj.isOpen) col.addClass("is-open");
          if (colObj.isLocked) col.addClass("is-locked");
          if (colObj.isExploded) col.addClass("is-exploded").text("💥");
          if (colObj.isCleared) col.addClass("is-cleared").text("🙂");
        });
        row.appendTo(boardRoot);
      });

      $("<div>")
        .html(
          `<b>${howManyMinesOnBoard() - howManyFlagsOnBoard()}</b> unflagged mines left`,
        )
        .appendTo(boardRoot);
    }

    function openBoxByIJ(i, j, isRecurse = false) {
      if (board[i][j].isOpen || board[i][j].isLocked) return;
      board[i][j].isOpen = true;

      // STEPPED ON A MINE CASE
      if (board[i][j].isMine) {
        postMsgToConsole(
          "BOOM!! YOU HAVE STEPPED ON A MINE! Try again by creating a new game.",
          "red",
        );
        board.forEach((_) => {
          _.forEach((__) => {
            if (__.isMine) {
              __.isExploded = true;
              __.isOpen = true;
            }
          });
        }); // explode all the mines if stepped on one
        gameGoesOn = false;
      } else if (!board[i][j].nbMines) {
        // recursive opening for empty boxes (auto-open)
        const nbIndexes = getNeighbourIndexesByIJ(i, j);
        nbIndexes.forEach((_) => openBoxByIJ(_[0], _[1], true));
      }

      // CLEARED ALL MINES CASE
      if (!isRecurse && !isThereAnyBoxesToClear()) {
        postMsgToConsole(
          "CONGRATS!! YOU HAVE SUCCESSFULLY CLEARED ALL THE MINES!",
          "green",
        );
        board.forEach((_) => {
          _.forEach((__) => {
            if (__.isMine) {
              __.isCleared = true;
              __.isOpen = true;
            }
          });
        }); // show all cleared mines after success
        gameGoesOn = false;
      }

      if (!isRecurse) renderBoard();
    }

    createGame();

    // HELPERS - BEGIN
    function howManyMinesOnBoard() {
      let mineCount = 0;
      board.forEach((_) => {
        _.forEach((__) => {
          if (__.isMine) mineCount++;
        });
      });
      return mineCount;
    }

    function howManyFlagsOnBoard() {
      let flagCount = 0;
      board.forEach((_) => {
        _.forEach((__) => {
          if (__.isLocked) flagCount++;
        });
      });
      return flagCount;
    }

    function isThereAnyBoxesToClear() {
      let clearBoxCount = 0;
      board.forEach((_) => {
        _.forEach((__) => {
          if (!__.isMine && !__.isOpen) clearBoxCount++;
        });
      });
      return clearBoxCount > 0;
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

    function getNeighbourIndexesByIJ(rowIndex, colIndex) {
      const nbIndexes = [];
      for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
        for (let j = colIndex - 1; j <= colIndex + 1; j++) {
          if (i === rowIndex && j === colIndex) continue; // except me
          if (i < 0 || j < 0) continue; // left-top edge handling
          if (i >= board.length || j >= board[0].length) continue; // right-bottom edge handling
          nbIndexes.push([i, j]);
        }
      }
      return nbIndexes;
    }

    function howManyNeighbourMines(rowIndex, colIndex) {
      //l("for:", rowIndex, colIndex);
      let nbMines = 0;
      const nbIndexes = getNeighbourIndexesByIJ(rowIndex, colIndex);
      nbIndexes.forEach((_) => {
        if (board[_[0]][_[1]].isMine) nbMines++;
      });
      return nbMines;
    }
    // HELPERS - END
  };

  moduleOff = () => {
    l("module off called");
  };

  l("module on-off events loaded");
})();
