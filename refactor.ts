export interface Item {
  name: string;
  sellIn: number;
  quality: number;
}

export class GildedRose {
  constructor(public items: Item[]) {}

  getUpdatedItems(): Item[] {
    return this.items.map(item => {
      if (this.isUnknownItem(item)) item.quality--;

      this.updateBackstagePassItem(item);

      if (item.name !== "Sulfuras, Hand of Ragnaros") item.sellIn--;

      return this.getUpdatedFromSellin(item);
    });
  }

  getUpdatedFromSellin(item): Item {
    if (item.sellIn < 0) {
      if (item.name === "Aged Brie" && item.quality < 50) {
        item.quality++;
      }
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        item.quality = 0;
      }
      if (item.name !== "Sulfuras, Hand of Ragnaros" && item.quality > 0) {
        item.quality--;
      }
    }
    return item;
  }
  updateBackstagePassItem(item: Item): void {
    if (item.name === "Backstage passes to a TAFKAL80ETC concert" && item.quality < 50) {
      if (item.sellIn >= 6 && item.sellIn < 11) {
        item.quality += 2;
      }
      if (item.sellIn < 6) {
        item.quality += 3;
      }
    }
  }

  isUnknownItem = (item: Item): boolean => {
    let knownItemNames = [
      "Aged Brie",
      "Backstage passes to a TAFKAL80ETC concert",
      "Sulfuras, Hand of Ragnaros"
    ];
    return item.quality > 0 && !knownItemNames.includes[item.name];
  };
}
