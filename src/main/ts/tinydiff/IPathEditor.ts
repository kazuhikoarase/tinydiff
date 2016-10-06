namespace tinydiff {
  /**
   * IPathEditor
   * @author Kazuhiko Arase
   */
  export interface IPathEditor extends IPathTracer {
    insertLeft?(posLeft : number, beginRight : number, endRight : number) : void;
    removeLeft?(beginLeft : number, endLeft : number) : void;
    insertRight?(posRight : number, beginLeft : number, endLeft : number) : void;
    removeRight?(beginRight : number, endRight : number) : void;
  }
}
