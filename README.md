# connectFour

A connect four program implemented using JavaScript and HTML.

This code makes up Project 1 for EECS 368 at the University of Kansas

  Connect Four :
    Makes a 2D array with all values initialized to zero. When the user types
    a number 1 - 7 on their keyboard, the 2D array gets updated with either a
    "1" or a "2" depending on if they are player 1 or player 2, at the corresponding
    index of the 2D array. The array constantly gets scanned, and adds a chip
    at the corresponding column that the user selected.

    When a winner is found, the game ends, and the [RESET] button must be clicked
    in order for another game to start. When another game starts, all values of
    the 2D array are set back to 0, all counters (such as chip count or who was
    declared the winner) are set to 0, and the players are able to play a brand
    new game of Connect Four. The reset button can be clicked at any time to
    reset the board.
