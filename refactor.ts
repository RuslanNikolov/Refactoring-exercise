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
  modifyBackstagePassItem(item: Item): void {
    if (item.quality < 50) {
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

    return this.items.map(item => {
      if (item.quality > 0 && !knownItemNames.includes[item.name]) item.quality--;

      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        this.modifyBackstagePassItem(item);
      }
      if (item.name !== "Sulfuras, Hand of Ragnaros") item.sellIn--;

      return this.getModifiedFromSellin(item);
    });
  }
}
