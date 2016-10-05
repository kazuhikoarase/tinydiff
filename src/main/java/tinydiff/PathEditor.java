package tinydiff;

/**
 * PathEditor
 * @author Kazuhiko Arase
 */
public abstract class PathEditor implements IPathTracer {
  private int x;
  private int y;
  protected PathEditor(final IDiffComparable target) {
    x = target.getM();
    y = target.getN();
  }
  public void trace(final int deltaX, final int deltaY) {
    x -= deltaX;
    y -= deltaY;
    if (deltaX == 0) {
      insertLeft(x, y, y + deltaY);
      removeRight(y, y + deltaY);
    } else if (deltaY == 0) {
      removeLeft(x, x + deltaX);
      insertRight(y, x, x + deltaX);
    }
  }
  protected abstract void insertLeft(
      int posLeft, int beginRight, int endRight);
  protected abstract void removeLeft(int beginLeft, int endLeft);
  protected abstract void insertRight(
      int posRight, int beginLeft, int endLeft);
  protected abstract void removeRight(int beginRight, int endRight);
}
