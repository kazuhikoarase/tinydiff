package tinydiff;

/**
 * IDiff
 * @author Kazuhiko Arase
 */
public interface IDiff {
  int onp(IDiffComparable target);
  void trace(IPathTracer tracer);
}
