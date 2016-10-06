namespace tinydiff {
  /**
   * IPathTracer
   * @author Kazuhiko Arase
   */
  export interface IPathTracer {
    trace(deltaX : number, deltaY : number) : void;
  }
}
