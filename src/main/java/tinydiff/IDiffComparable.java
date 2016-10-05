package tinydiff;

/**
 * IDiffComparable
 * @author Kazuhiko Arase
 */
public interface IDiffComparable {
  /**
   * returns if values match at x and y.
   * @param x 0 ~ M-1
   * @param y 0 ~ N-1
   * @return
   */
  boolean equals(int x, int y);
  int getM();
  int getN();
}
