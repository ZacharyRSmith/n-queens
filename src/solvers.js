/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board( { n: n } );

  for(var i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }

  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var _findSolutionsForRow = function(rowIndex, colsRemaining) { // colsRemaining === cols not already occupied by rook
    // for each of the colsRemaining, find the solution where this row has
    colsRemaining.forEach(function(colIndex, i) {
      board.togglePiece(rowIndex, colIndex);
      var newColsRemaining = colsRemaining.slice();
      newColsRemaining.splice(i, 1);

      if (rowIndex === board.get('n') - 1) {
        solutionCount++;
        board.togglePiece(rowIndex, colIndex);
      } else {
        _findSolutionsForRow(rowIndex + 1, newColsRemaining);
        board.togglePiece(rowIndex, colIndex);
      }
    });
  };
  var board = new Board({ n: n });
  var colsRemaining = _.range(0, n);
  var solutionCount = 0;

  // start with the 0th row:
  _findSolutionsForRow(0, colsRemaining);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// for each row, try finding a 
