export interface Item {
    name: string;
    sellIn: number;
    quality: number;
}

const knownItemNames: { [key: string]: string } = {
    BRIE: "Aged Brie",
    BACKSTAGE_PASS: "Backstage passes to a TAFKAL80ETC concert",
    SULFURAS: "Sulfuras, Hand of Ragnaros"
};

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

export class GildedRose {
    constructor(public items: Item[]) { }

    updateQuality(): Item[] {
        const updateUnknownItem = (item: Item): Item => {
            let newItem = { ...item }

            if (newItem.quality > 0 && !Object.values(knownItemNames).includes[newItem.name]) {
                newItem.quality--;
            }

            return newItem;
        }
        const updateBackstagePassItem = (item: Item): Item => {
            let newItem = { ...item }

            if (newItem.name !== knownItemNames.BACKSTAGE_PASS || newItem.quality >= 50) {
                return;
            }
            if (newItem.sellIn >= 6 && newItem.sellIn < 11) {
                newItem.quality += 2;
            }
            if (newItem.sellIn < 6) {
                newItem.quality += 3;
            }

            return newItem;
        };

        const updateFromSellin = (item: Item): Item => {
            let newItem = { ...item }

            if (newItem.name !== knownItemNames.SULFURAS) {
                newItem.sellIn--;
            }
            if (newItem.sellIn > 0) {
                return;
            }
            if (newItem.name === knownItemNames.BRIE && newItem.quality < 50) {
                newItem.quality++;
            }
            if (newItem.name === knownItemNames.BACKSTAGE_PASS) {
                newItem.quality = 0;
            }
            if (newItem.name !== knownItemNames.SULFURAS && newItem.quality > 0) {
                newItem.quality--;
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
