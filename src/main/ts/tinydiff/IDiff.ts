namespace tinydiff {
  /**
   * IDiff
   * @author Kazuhiko Arase
   */
  export interface IDiff {
    onp(target : IDiffComparable) : number;
    trace(tracer : IPathTracer) : void;
  }
}
