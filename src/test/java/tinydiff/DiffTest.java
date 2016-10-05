package tinydiff;

import org.junit.Assert;
import org.junit.Test;

public class DiffTest {

  private void log(String s) {
    System.out.println(s);
  }

  @Test
  public void onp() {

    Assert.assertEquals(0, onp("a", "a") );
    Assert.assertEquals(2, onp("a", "aaa") );
    Assert.assertEquals(2, onp("aba", "aca") );
    Assert.assertEquals(6, onp("aaa", "bbb") );
    Assert.assertEquals(3, onp("aaa", "") );
    Assert.assertEquals(1, onp("abc", "bc") );
    Assert.assertEquals(1, onp("abc", "ac") );

    Assert.assertEquals(3, onp("an apple.", "a maple.") );
  }

  private int onp(CharSequence a, CharSequence b) {
    return new Diff().onp(new CharSequenceDiffComparable(a, b) );
  }

  @Test
  public void diff() {
    
    diff("", "");
    diff("aaa", "aaa");
    diff("aaa", "bbb");
    
    diff("aba", "bab");
    diff("aaa", "aab");
    diff("aab", "aaa");

    diff("aba", "abab");
    diff("bab", "aaba");
    diff("aaa", "aaab");
    diff("aab", "aaaa");

    diff("aaba", "bab");
    diff("abab", "aba");
    diff("aaaa", "aab");
    diff("aaab", "aaa");

    diff("baba", "bab");
    diff("bbab", "aba");
    diff("baaa", "aab");
    diff("baab", "aaa");

    diff("vvaxa", "xffxf");

    diff("here is an apple.", "here comes a maple.");
  }

  private void diff(final String l, final String r) {
    diff_(l, r);
    if (!l.equals(r) ) {
      diff_(r, l);
    }
  }

  /**
   * test edit l to r.
   * @param l
   * @param r
   */
  private void diff_(final String l, final String r) {

    final IDiffComparable target = new CharSequenceDiffComparable(l, r);

    final String[] tmpR = new String[]{ r };
    final String[] tmpL = new String[]{ l };

    final IPathTracer editor = new PathEditor(target) {
      @Override
      protected void insertLeft(int posLeft, int beginRight, int endRight) {
        log("+" + posLeft + "," + beginRight + "~" + endRight);
        tmpL[0] = tmpL[0].substring(0, posLeft) +
          r.substring(beginRight, endRight) +
          tmpL[0].substring(posLeft);
      }
      @Override
      protected void removeLeft(int beginLeft, int endLeft) {
        log("-" + beginLeft + "~" + endLeft);
        tmpL[0] = tmpL[0].substring(0, beginLeft) + 
          tmpL[0].substring(endLeft);
      }
      @Override
      protected void insertRight(int posRight, int beginLeft, int endLeft) {
        tmpR[0] = tmpR[0].substring(0, posRight) +
          l.substring(beginLeft, endLeft) +
          tmpR[0].substring(posRight);
      }
      @Override
      protected void removeRight(int beginRight, int endRight) {
        tmpR[0] = tmpR[0].substring(0, beginRight) + 
          tmpR[0].substring(endRight);
      }
    };

    log("[" + l + "] => [" + r + "]");

    // before edit
    Assert.assertEquals(l, tmpL[0]);
    Assert.assertEquals(r, tmpR[0]);

    final Diff diff = new Diff();
    diff.onp(target);
    diff.trace(editor);

    // after edit
    // l to r, r to l
    Assert.assertEquals(l, tmpR[0]);
    Assert.assertEquals(r, tmpL[0]);
  }
}
