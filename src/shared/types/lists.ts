export type IIsSelected = 'selected' | 'none' | 'not__all'
export interface IList {
  id: number
  title: string
  is_sorted: boolean
  selected: IIsSelected
  items: IListItem[]
}

export interface IListItem {
  title: string
  color: string
  length: number
  is_selected: boolean
}
