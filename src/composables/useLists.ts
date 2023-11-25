import { ref } from 'vue'
import { fetchLists } from '@/shared/api'
import type { IList, IIsSelected } from '@/shared/types'

export const useLists = () => {
    /**------------ State --------------- */
    const lists = ref<IList[]>([])
    const active_list = ref<number>()

    /** ----------- Methods ------------- */
    async function getLists() {
        try {
            const data = await (await fetchLists()).json()
            console.log(1, data);

            if (data && Array.isArray(data))
                // set & add additional properties
                lists.value = data.map((x) => ({
                    ...x,
                    selected: 'none',
                    is_sorted: true,
                    items: Array.prototype.map.call(x.items, (y) => ({
                        ...y,
                        is_selected: false
                    }))
                }))

                console.log(2, lists.value);
                
        } catch (e) {
            console.error('Error: data fetching')
        }
    }

    function toggleSelectionList(list_id: number) {
        let list: IList = lists.value[list_id]
        const is_selected: boolean = 'selected' == list.selected
        const selected: IIsSelected =
            'selected' == list.selected ? 'none' : 'selected'

        list = {
            ...list,
            selected,
            items: list.items.map((x) => ({
                ...x,
                is_selected: !is_selected
            }))
        }

        lists.value[list_id] = list
    }

    function changeListState(list_id: number): IIsSelected {
        const list_len = lists.value[list_id].items.length
        const selected_item_len = lists.value[list_id].items.filter(
            (x) => x.is_selected
        ).length

        if (selected_item_len > 0)
            return list_len == selected_item_len ? 'selected' : 'not__all'

        return 'none'
    }

    function selectListItem(list_id: number, item_id: number) {
        lists.value[list_id].items[item_id].is_selected =
            !lists.value[list_id].items[item_id].is_selected
        lists.value[list_id].selected = changeListState(list_id)
    }

    function shuffleListItems(list: IList): string {
        const array: string[] = []
        let html: string = ''

        // add only selected list items
        list.items.forEach((el) => {
            if (el.is_selected) {
                for (let i = 0; i < el.length; i++) {
                    array.push(el.color)
                }
            }
        })

        // shuffling array
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[array[i], array[j]] = [array[j], array[i]]
        }

        // make static html
        for (let i = 0; i < array.length; i++) {
            html += `<span class="inline-block list__view--block" style="background: ${array[i]}; height: 14px; width: 14px; display: inline-block; margin: 2px"></span>`
        }

        return html
    }

    function sortOrShuffle(list_id: number) {
        lists.value[list_id].is_sorted = !lists.value[list_id].is_sorted
    }

    return {
        lists,
        active_list,
        getLists,
        toggleSelectionList,
        changeListState,
        selectListItem,
        shuffleListItems,
        sortOrShuffle
    }
}
