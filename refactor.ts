export interface Item {
    name: string;
    sellIn: number;
    quality: number;
}

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

export class GildedRose {
    constructor(public items: Item[]) { }

    updateQuality(): Item[] {
        const updateUnknownItem = (item: Item): Item => {
            let newItem = { ...item }
            const knownItemNames = [
                "Aged Brie",
                "Backstage passes to a TAFKAL80ETC concert",
                "Sulfuras, Hand of Ragnaros"
            ];
            if (newItem.quality > 0 && !knownItemNames.includes[newItem.name])
                newItem.quality--;

            return newItem;
        }
        const updateBackstagePassItem = (item: Item): Item => {
            let newItem = { ...item }

            if (newItem.name === "Backstage passes to a TAFKAL80ETC concert" && newItem.quality < 50) {
                if (newItem.sellIn >= 6 && newItem.sellIn < 11) {
                    newItem.quality += 2;
                }
                if (newItem.sellIn < 6) {
                    newItem.quality += 3;
                }
            }
            return newItem;
        };

        const updateFromSellin = (item: Item): Item => {
            let newItem = { ...item }
            if (newItem.name !== "Sulfuras, Hand of Ragnaros") newItem.sellIn--;

            if (newItem.sellIn < 0) {
                if (newItem.name === "Aged Brie" && newItem.quality < 50) {
                    newItem.quality++;
                }
                if (newItem.name === "Backstage passes to a TAFKAL80ETC concert") {
                    newItem.quality = 0;
                }
                if (newItem.name !== "Sulfuras, Hand of Ragnaros" && newItem.quality > 0) {
                    newItem.quality--;
                }
            }
            return newItem;
        };

        return this.items.map(item => pipe(
            updateUnknownItem,
            updateBackstagePassItem,
            updateFromSellin
        )(item)
        );
    }
}
