package tinydiff;

import java.util.List;

/**
 * ListDiffComparable
 * @author Kazuhiko Arase
 */
public class ListDiffComparable<T> implements IDiffComparable {
  private final List<T> a;
  private final List<T> b;
  public ListDiffComparable(
    final List<T> a,
    final List<T> b
  ) {
    this.a = a;
    this.b = b;
  }
  public boolean equals(final int x, final int y) {
    final T _a = a.get(x);
    final T _b = b.get(y);
    return _a.hashCode() == _b.hashCode() && _a.equals(_b);
  }
  public int getM() {
    return a.size();
  }
  public int getN() {
    return b.size();
  }
}
