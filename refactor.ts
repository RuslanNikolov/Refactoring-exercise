export interface Item {
  name: string;
  sellIn: number;
  quality: number;
}

export class GildedRose {
  constructor(public items: Item[]) {}

  getModifiedFromSellin(item): Item {
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
  modifyIfBackstagePassItem(item: Item): void {
    if (item.name === "Backstage passes to a TAFKAL80ETC concert" && item.quality < 50) {
      if (item.sellIn >= 6 && item.sellIn < 11) {
        item.quality += 2;
      }
      if (item.sellIn < 6) {
        item.quality += 3;
      }
    }
  }

  updateQuality(): Item[] {
    let knownItemNames = [
      "Aged Brie",
      "Backstage passes to a TAFKAL80ETC concert",
      "Sulfuras, Hand of Ragnaros"
    ];

    let isUnknownItem = (item: Item): boolean => {
      return item.quality > 0 && !knownItemNames.includes[item.name];
    };

    return this.items.map(item => {
      if (isUnknownItem(item)) item.quality--;

      this.modifyIfBackstagePassItem(item);

      if (item.name !== "Sulfuras, Hand of Ragnaros") item.sellIn--;

      return this.getModifiedFromSellin(item);
    });
  }
}
