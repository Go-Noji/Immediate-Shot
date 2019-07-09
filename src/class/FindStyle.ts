export class FindStyle {

  readonly root: HTMLElement;

  private elements: HTMLElement[];

  private _isHTMLElement(target: any): target is HTMLElement {
    return  target !== null;
  }

  private _findChildren(parent: HTMLElement) {
    this.elements.push(parent);

    const children = parent.children;

    for (let i = 0, max = children.length; i < max; i = (i + 1) | 0) {
      const target = children.item(i);

      if ( ! this._isHTMLElement(target)) {
        continue;
      }

      this._findChildren(target);
    }
  }

  constructor(root: HTMLElement) {
    this.root = root;

    this.elements = new Array();

    this._findChildren(root);
  }

  public find(property: string, value: string): HTMLElement[] {
    let result = new Array();

    for (let i = 0, max = this.elements.length; i < max; i = (i + 1) | 0) {
      if (window.getComputedStyle(this.elements[i]).getPropertyValue(property) !== value) {
        continue;
      }

      result.push(this.elements[i]);
    }

    return result;
  }

}
