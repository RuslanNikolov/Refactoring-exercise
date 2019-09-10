export interface Item {
    name: string;
    sellIn: number;
    quality: number;
}

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

export class GildedRose {
    constructor(public items: Item[]) { }

    updateQuality(): Item[] {
        const getUpdatedUnknowItem = (item: Item): Item => {
            const knownItemNames = [
                "Aged Brie",
                "Backstage passes to a TAFKAL80ETC concert",
                "Sulfuras, Hand of Ragnaros"
            ];
            if (item.quality > 0 && !knownItemNames.includes[item.name])
                item.quality--;

            return item;
        }
        const getUpdatedBackstagePassItem = (item: Item): Item => {
            if (item.name === "Backstage passes to a TAFKAL80ETC concert" && item.quality < 50) {
                if (item.sellIn >= 6 && item.sellIn < 11) {
                    item.quality += 2;
                }
                if (item.sellIn < 6) {
                    item.quality += 3;
                }
            }
            return item;
        };

        const getUpdatedFromSellin = (item: Item): Item => {
            if (item.name !== "Sulfuras, Hand of Ragnaros") item.sellIn--;

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


        return this.items.map(item => pipe(
            getUpdatedUnknowItem,
            getUpdatedBackstagePassItem,
            getUpdatedFromSellin
        )(item)
        );
    }
}
