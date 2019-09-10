export interface Item {
    name: string;
    sellIn: number;
    quality: number;
}

export class GildedRose {
    constructor(public items: Item[]) { }

    updateQuality(): Item[] {
        const isUnknownItem = (item: Item): boolean => {
            const knownItemNames = [
                "Aged Brie",
                "Backstage passes to a TAFKAL80ETC concert",
                "Sulfuras, Hand of Ragnaros"
            ];
            return item.quality > 0 && !knownItemNames.includes[item.name];
        };

        const updateBackstagePassItem = (item: Item): void => {
            if (item.name === "Backstage passes to a TAFKAL80ETC concert" && item.quality < 50) {
                if (item.sellIn >= 6 && item.sellIn < 11) {
                    item.quality += 2;
                }
                if (item.sellIn < 6) {
                    item.quality += 3;
                }
            }
        };
        const getUpdatedFromSellin = (item): Item => {
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
        };

        return this.items.map(item => {
            if (isUnknownItem(item)) item.quality--;

            updateBackstagePassItem(item);

            if (item.name !== "Sulfuras, Hand of Ragnaros") item.sellIn--;

            return getUpdatedFromSellin(item);
        });
    }
}
