export interface Item {
    name: string,
    sellIn: number,
    quality: number
}

export class GildedRose {
    constructor(public items: Item[]) { }
    
    itemNames = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros']

    updateQuality(): Item[] {
        return this.items.map(item => {
            if (item.quality > 0 && !this.itemNames.includes[item.name])
                item.quality--

            if (item.name == 'Backstage passes to a TAFKAL80ETC concert' && item.quality < 50) {
                if (item.sellIn >= 6 && item.sellIn < 11) {
                    item.quality = item.quality + 2
                }
                if (item.sellIn < 6) {
                    item.quality = item.quality + 3
                }
            }
            if (item.name != 'Sulfuras, Hand of Ragnaros')
                item.sellIn--;

            if (item.sellIn < 0) {
                if (item.name === 'Aged Brie' && item.quality < 50) {
                    item.quality++
                }
                if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
                    item.quality = 0
                }
                if (item.name !== 'Sulfuras, Hand of ragnaros' && item.quality > 0) {
                    item.quality--
                }
            }
            return item;
        })
    }
}
