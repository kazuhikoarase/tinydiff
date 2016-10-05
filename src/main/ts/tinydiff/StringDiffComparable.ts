namespace tinydiff {

  /**
   * createStringDiffComparable
   * @author Kazuhiko Arase
   */
  function createStringDiffComparable(
      a : string, b : string) : IDiffComparable {
    return {
      equals : (x, y) => a.charCodeAt(x) === b.charCodeAt(y),
      getM :() => a.length,
      getN : () => b.length
    }
  }
}
