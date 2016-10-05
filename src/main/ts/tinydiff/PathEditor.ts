namespace tinydiff {

  /**
   * createPathEditor
   * @author Kazuhiko Arase
   */
  function createPathEditor(
      target : IDiffComparable) : IPathEditor {
    var x = target.getM();
    var y = target.getN();
    var editor : IPathEditor = {
      trace(deltaX, deltaY) {
        x -= deltaX;
        y -= deltaY;
        if (deltaX == 0) {
          if (editor.insertLeft) {
            editor.insertLeft(x, y, y + deltaY);
          }
          if (editor.removeRight) {
            editor.removeRight(y, y + deltaY);
          }
        } else if (deltaY == 0) {
          if (editor.removeLeft) {
            editor.removeLeft(x, x + deltaX);
          }
          if (editor.insertRight) {
            editor.insertRight(y, x, x + deltaX);
          }
        }
      }
    }
    return editor;
  }
}
