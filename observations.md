** 1. How to determine if two squares are on a diagonal

If each square is assigned (x, y) coordinates, such that the top-left square's
coordinates are (0, 0), the square to its right has coordinates (1, 0),
and the square below _that_ one has coordinates (1, 1), etc...

Then, you can determine if square 1 (s1) and square 2 (s2) are in a diagonal
with this formula:

if (Math.abs(s1.x - s2.x) === Math.abs(s1.y - s1.y))
  then s1 and s2 are in a diagonal
else
  s1 and s2 are not in a diagonal

** 2. Each column has 1 and only 1 queen.

** 3. Each row has 1 and only 1 queen.

** 4. For a board of odd-sized length:

* 



** MISC:

* A reminder:
var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92][n];

