namespace tinydiff {
  /**
   * IDiffComparable
   * @author Kazuhiko Arase
   */
  export interface IDiffComparable {
    /**
     * returns if values match at x and y.
     * @param x 0 ~ M-1
     * @param y 0 ~ N-1
     * @return
     */
    equals(x : number, y : number) : boolean;
    getM() : number;
    getN() : number;
  }
}
