export interface PrepareInsertHistoryItem {
	id?: number,
	history_item_name: string,
	history_item_type: string
}

export interface PrepareUpdateHistoryItem {
	id: number,
	history_item_name?: string
	history_item_type?: string
}

export interface HistoryItem {
	id: number,
	history_item_name: string,
	history_item_type: string
}