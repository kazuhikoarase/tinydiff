namespace tinydiff {

  interface IMatch {
    x : number;
    length : number;
  }

  /**
   * createDiffImpl
   * @author Kazuhiko Arase
   */
  export function createDiffImpl() : IDiff {

    var _target : IDiffComparable;

    var matches : IMatch[];

    var snake = function(k : number, y : number) {

      var x = y - k;
      var length = 0;

      while(x < _target.getM() && y < _target.getN() &&
          _target.equals(x, y) ) {
        x += 1;
        y += 1;
        length += 1;
      }

      if (length > 0) {
        matches[y] = createMatch(x, length);
      }

      return y;
    };

    return {
      onp(target) {

        if (target.getM() > target.getN() ) {
          throw target.getM() + '>' + target.getN();
        }

        _target = target;

        matches = new Array(target.getN() + 1);
        matches[0] = createMatch(0, 0);

        var delta = target.getN() - target.getM();
        var offset = target.getM() + 1;

        var fp : number[] = new Array(target.getM() + target.getN() + 3);
        for (var i = 0; i < fp.length; i += 1) {
          fp[i] = -1;
        }

        var k : number;
        var p = -1;

        do {

          p += 1;

          for(k = -p; k < delta; k += 1) {
            fp[offset + k] = snake(k,
                Math.max(fp[offset + k - 1] + 1, fp[offset + k + 1] ) );
          }

          for(k = delta + p; k > delta; k -= 1) {
            fp[offset + k] = snake(k,
                Math.max(fp[offset + k - 1] + 1, fp[offset + k + 1] ) );
          }

          // k == delta
          fp[offset + k] = snake(k,
              Math.max(fp[offset + k - 1] + 1, fp[offset + k + 1] ) );

        } while (fp[offset + k] != target.getN() );

        // returns edit distance
        return delta + 2 * p;
      },

      trace(tracer) {

        var x = _target.getM();
        var y = _target.getN();
        var lastX : number;
        var lastY : number;

        var match : IMatch = null;

        while (x > 0 || y > 0) {

          //-------------------------
          // b only

          lastX = x;
          lastY = y;
          while (y >= 0) {
             match = matches[y];
            if (match != null && match.x <= x) {
              // found.
              break;
            }
            y -= 1;
          }
          if (lastY != y) {
            tracer.trace(lastX - x, lastY - y);
          }

          //-------------------------
          // a only

          lastX = x;
          lastY = y;
          while (x > match.x) {
            x -= 1;
          }
          if (lastX != x) {
            tracer.trace(lastX - x, lastY - y);
          }

          //-------------------------
          // match part

          lastX = x;
          lastY = y;
          while (x > match.x - match.length) {
            x -= 1;
            y -= 1;
          }
          if (lastX != x) {
            tracer.trace(lastX - x, lastY - y);
          }
        }
      }
    };
  }

  function createMatch(x : number, length : number) : IMatch {
    return {
      x : x,
      length : length,
      toString : () => 'Match(x=' + x + ',length=' + length + ')'
    };
  }
}
