// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //look at each element in the row to check if more than 1 elements are 1
      var result = this.get(rowIndex).reduce(function(numFound, square) {
        return numFound + square;
      }, 0);
      return result > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      return _.range(this.get('n')).some(function(rowIndex) {
        return this.hasRowConflictAt(rowIndex);
      }.bind(this));
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var result = this.rows().reduce(function(numFound, row) {
        return numFound + row[colIndex];
      }, 0);
      return result > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      return _.range(this.get('n')).some(function(colIndex) {
        return this.hasColConflictAt(colIndex);
      }.bind(this));
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalIndex) {
      if (majorDiagonalIndex >= 0) {
        var colIndex = majorDiagonalIndex;
        var rowIndex = 0
      } else {
        var colIndex = 0;
        var rowIndex = Math.abs(majorDiagonalIndex);
      }

      var diagonal = [];
      while(this._isInBounds(rowIndex, colIndex)){
        diagonal.push(this.get(rowIndex)[colIndex]);

        rowIndex++;
        colIndex++;
      }

      var result = diagonal.reduce(function(numFound, square) {
        return numFound + square;
      }, 0);

      return result > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var firstMajorDiagonalIndex = -(this.get('n') - 2);
      var lastMajorDiagonalIndex = this.get('n') - 2;

      return _.range(firstMajorDiagonalIndex, lastMajorDiagonalIndex + 1).some(function(majorDiagonalIndex) {
        return this.hasMajorDiagonalConflictAt(majorDiagonalIndex);
      }.bind(this));
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalIndex) {
      var topRightColIndex = this.get('n') - 1;
      if (minorDiagonalIndex <= topRightColIndex) {
        var colIndex = minorDiagonalIndex;
        var rowIndex = 0;
      } else {
        var colIndex = topRightColIndex;
        var rowIndex = minorDiagonalIndex - colIndex;
      }

      var diagonal = [];
      while(this._isInBounds(rowIndex, colIndex)){
        diagonal.push(this.get(rowIndex)[colIndex]);

        rowIndex++;
        colIndex--;
      }

      var result = diagonal.reduce(function(numFound, square) {
        return numFound + square;
      }, 0);

      return result > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var sqrOnMinorDiagonal = {
        colIndex: this.get('n') - 1,
        rowIndex: this.get('n') - 2
      };
      var firstMinorDiagonalIndex = 1;
      var lastMinorDiagonalIndex = sqrOnMinorDiagonal.colIndex + sqrOnMinorDiagonal.rowIndex;

      return _.range(firstMinorDiagonalIndex, lastMinorDiagonalIndex + 1).some(function(minorDiagonalIndex) {
        return this.hasMinorDiagonalConflictAt(minorDiagonalIndex);
      }.bind(this));
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
