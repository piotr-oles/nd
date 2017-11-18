
export class Scene {
  private items;

  constructor() {
    this.items = {};
  }

  addItem(name, item) {
    this.items[name] = item;
  }

  removeItem(name: string) {
    delete this.items[name];
  }

  getItems() {
    return Object.assign({}, this.items);
  }

  getItem(name: string) {
    return this.items[name];
  }

  hasItem(name: string): boolean {
    return !!this.items[name];
  }

  forEachItem(callback: (item, name: string) => void): void {
    Object.keys(this.items).forEach((name) => callback(this.items[name], name));
  }
}
