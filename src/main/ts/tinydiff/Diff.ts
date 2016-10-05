namespace tinydiff {

  interface IDiffTargetWrapper extends IDiffComparable {
    isReverse() : boolean;
  }

  /**
   * createDiff
   * @author Kazuhiko Arase
   */
  function createDiff() :  IDiff {

    var wrapper : IDiffTargetWrapper = null;

    var diff : IDiff = null;

    return {
      onp(target) {
        wrapper = createDiffTargetWrapper(target);
        diff = createDiffImpl();
        return diff.onp(wrapper);
      },
      trace(tracer) {
        if (diff == null) {
          throw 'onp before trace.';
        }
        diff.trace({
          trace(deltaX, deltaY) {
            if (wrapper.isReverse() ) {
              tracer.trace(deltaY, deltaX);
            } else {
              tracer.trace(deltaX, deltaY);
            }
          }
        } );
      }
      }

    function createDiffTargetWrapper(
      target : IDiffComparable
    ) : IDiffTargetWrapper {
      var reverse = target.getM() > target.getN();
      return {
        equals : (x, y) =>
          reverse? target.equals(y, x) : target.equals(x, y),
        getM : () => reverse? target.getN() : target.getM(),
        getN : () => reverse? target.getM() : target.getN(),
        isReverse : () => reverse
      }
    };
  }
}
