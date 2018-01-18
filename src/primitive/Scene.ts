import { Item } from './Item';

type ItemsMap = {
  [name: string]: Item;
}

export class Scene {
  private items: ItemsMap;

  constructor() {
    this.items = {};
  }

  addItem(name, item: Item): this {
    this.items[name] = item;

    return this;
  }

  removeItem(name: string): this {
    delete this.items[name];

    return this;
  }

  getItems(): ItemsMap {
    return Object.assign({}, this.items);
  }

  getItem(name: string): Item {
    return this.items[name];
  }

  hasItem(name: string): boolean {
    return !!this.items[name];
  }

  eachItem(callback: (item: Item, name: string) => void): void {
    Object.keys(this.items).forEach((name) => callback(this.items[name], name));
  }
}
