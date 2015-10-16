/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

  */

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window._findSolution = function(n, callback) {
  var _findSolutionsForRow = function(rowIndex, emptyCols) {
    // for each of the emptyCols, find the solution where this row has
    emptyCols.forEach(function(colIndex, i) {
      board.togglePiece(rowIndex, colIndex);

      if (board.hasMajorDiagonalConflictAt(colIndex - rowIndex) ||
          board.hasMinorDiagonalConflictAt(colIndex + rowIndex)) {
        board.togglePiece(rowIndex, colIndex);
        return;
      }

      if (board._isLastRow(rowIndex)) {
        solution = callback(board, solution);
        board.togglePiece(rowIndex, colIndex);
      } else {
        var newEmptyCols = emptyCols.slice();
        newEmptyCols.splice(i, 1);
        _findSolutionsForRow(rowIndex + 1, newEmptyCols);
        board.togglePiece(rowIndex, colIndex);
      }
    });
  };
  var board = new Board({ n: n });
  var emptyCols = _.range(0, n);
  var solution = 0;

  _findSolutionsForRow(0, emptyCols);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board( { n: n } );

  for(var i = 0; i < n; i++) { // WATCH ME GO DOWN THE DIAGONAL MAH!! : D D D
    board.togglePiece(i, i);
  }

  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var _findSolutionsForRow = function(rowIndex, emptyCols) {
    // for each of the emptyCols, place rook there and go to next row.
    // if this is the last row, then you've arrived at a solution.
    emptyCols.forEach(function(colIndex, i) {
      board.togglePiece(rowIndex, colIndex);

      if (board._isLastRow(rowIndex)) {
        solutionCount++;
        board.togglePiece(rowIndex, colIndex);
      } else {
        var newEmptyCols = emptyCols.slice();
        newEmptyCols.splice(i, 1);
        _findSolutionsForRow(rowIndex + 1, newEmptyCols);
        board.togglePiece(rowIndex, colIndex);
      }
    });
  };
  var board = new Board({ n: n });
  var emptyCols = _.range(0, n);
  var solutionCount = 0;

  _findSolutionsForRow(0, emptyCols);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }

  var solution = _findSolution(n, function(board, solution) {
    return board.rows().map(function(row) {
      return row.slice();
    });
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  if (!solution) {
    var solutionBoard = new Board({ n: n });
    return solutionBoard.rows();
  }
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solution = _findSolution(n, function(board, solution) {
    return solution + 1;
  });

  console.log('Number of solutions for ' + n + ' queens:', solution);
  return solution;
};
