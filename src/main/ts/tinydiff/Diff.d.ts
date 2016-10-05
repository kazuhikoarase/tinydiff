/**
 * tinydiff
 * @author Kazuhiko Arase
 */
declare module tinydiff {

  interface IDiff {
    onp(target : IDiffComparable) : number;
    trace(tracer : IPathTracer) : void;
  }

  interface IDiffComparable {
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

  interface IPathTracer {
    trace(deltaX : number, deltaY : number) : void;
  }

  interface IPathEditor extends IPathTracer {
    insertLeft?(posLeft : number, beginRight : number, endRight : number) : void;
    removeLeft?(beginLeft : number, endLeft : number) : void;
    insertRight?(posRight : number, beginLeft : number, endLeft : number) : void;
    removeRight?(beginRight : number, endRight : number) : void;
  }

  function createStringDiffComparable(a : string, b : string) : IDiffComparable;

  function createListDiffComparable<T>(a : T[], b : T[]) : IDiffComparable;

  function createPathEditor(target : IDiffComparable) : IPathEditor;

  function createDiff() :  IDiff;
}
