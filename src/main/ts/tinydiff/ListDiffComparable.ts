namespace tinydiff {

  /**
   * createListDiffComparable
   * @author Kazuhiko Arase
   */
  function createListDiffComparable<T>(
      a : T[], b : T[]) : IDiffComparable {
    return {
      equals : (x, y) => a[x] === b[y],
      getM : () => a.length,
      getN : () => b.length
    };
  }
}
