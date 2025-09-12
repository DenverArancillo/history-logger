import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { HistoryItem } from '../../../../ts/interface/database/historyItem'

test.describe.configure({ mode: 'serial' })

test.describe('history_items', () => {
	let historyItems: HistoryItem[]
	let createdHistoryItem: HistoryItem

	test('Get all history items', async ({ request }) => {
		const response = await request.get('/api/historyItem')
		historyItems = await response.json()

		expect(response.status()).toEqual(200)
		expect(historyItems.length).toBeGreaterThanOrEqual(0)
		expect(Array.isArray(historyItems)).toBeTruthy()
	})

	test('Get single history item', async ({ request }) => {
		let randomInt = faker.number.int({ min: 0, max: historyItems.length - 1 })

		const response = await request.get(`/api/historyItem/${historyItems[randomInt].id}`)
		let historyItem = await response.json()

		expect(response.status()).toEqual(200)
		expect(historyItem).toHaveProperty('id')
		expect(historyItem).toHaveProperty('history_item_name')
		expect(historyItem).toHaveProperty('history_item_type')
	})

	test('Create history item', async ({ request }) => {
		const historyItemType: string[] =  process.env.HISTORY_ITEM_TYPES!.split('|')
		let randomInt = faker.number.int({ min: 0, max: historyItemType.length - 1 })

		const response = await request.post('/api/historyItem', {
			data: {
				history_item_name: `createHistoryItemName-${faker.word.adjective()}-${Date.now()}`,
				history_item_type: historyItemType[randomInt]
			}
		})

		createdHistoryItem = await response.json()

		expect(response.status()).toEqual(201)
		expect(createdHistoryItem).toHaveProperty('id')
		expect(createdHistoryItem).toHaveProperty('message')
		expect(createdHistoryItem).toHaveProperty('history_item_name')
		expect(createdHistoryItem).toHaveProperty('history_item_type')
	})

	test('POST error missing body', async ({ request }) => {
		const response = await request.post('/api/historyItem')
		let errorHistoryItem = await response.json()

		expect(response.status()).toEqual(400)
		expect(errorHistoryItem).toHaveProperty('message')
		expect(errorHistoryItem.message).toEqual('Please include a history item name')
	})

	test('POST error missing history_item_name', async ({ request }) => {
		const historyItemType: string[] =  process.env.HISTORY_ITEM_TYPES!.split('|')
		let randomInt = faker.number.int({ min: 0, max: historyItemType.length - 1 })

		const response = await request.post('/api/historyItem', {
			data: { history_item_type: historyItemType[randomInt] }
		})
		let errorHistoryItem = await response.json()

		expect(response.status()).toEqual(400)
		expect(errorHistoryItem).toHaveProperty('message')
		expect(errorHistoryItem.message).toEqual('Please include a history item name')
	})

	test('POST error missing history_item_type', async ({ request }) => {
		const response = await request.post('/api/historyItem', {
			data: {
				history_item_name: `createHistoryItemName-${faker.word.adjective()}-${Date.now()}`
			}
		})
		let errorHistoryItem = await response.json()

		expect(response.status()).toEqual(400)
		expect(errorHistoryItem).toHaveProperty('message')
		expect(errorHistoryItem.message).toEqual('Please include a history item type')
	})

	test('Update history item name', async ({ request }) => {
		let updatedName = `updateHistoryItemName-${faker.word.adjective()}-${Date.now()}`
		let randomInt = faker.number.int({ min: 0, max: historyItems.length - 1 })

		const response = await request.put(`/api/historyItem/updateName/${historyItems[randomInt].id}`, {
			data: {	
				history_item_name: updatedName
			}
		})

		let updatedHistoryItem = await response.json()

		expect(response.status()).toEqual(200)
		expect(updatedHistoryItem).toHaveProperty('id')
		expect(updatedHistoryItem).toHaveProperty('history_item_name')
		expect(updatedHistoryItem).toHaveProperty('history_item_type')
		expect(updatedHistoryItem.history_item_name).toEqual(updatedName)
	})

	test('PUT error missing history_item_name', async ({ request }) => {
		let randomInt = faker.number.int({ min: 0, max: historyItems.length - 1 })

		const response = await request.put(`/api/historyItem/updateName/${historyItems[randomInt].id}`)
		let errorHistoryItem = await response.json()

		expect(response.status()).toEqual(400)
		expect(errorHistoryItem).toHaveProperty('message')
		expect(errorHistoryItem.message).toEqual('Please include a history item name')
	})

	test('Update history item type', async ({ request }) => {
		const historyItemType: string[] =  process.env.HISTORY_ITEM_TYPES!.split('|')
		let randomIntItemType = faker.number.int({ min: 0, max: historyItemType.length - 1 })
		let updatedItemType = historyItemType[randomIntItemType]

		let randomIntHistoryItem = faker.number.int({ min: 0, max: historyItems.length - 1 })

		const response = await request.put(`/api/historyItem/updateType/${historyItems[randomIntHistoryItem].id}`, {
			data: { history_item_type: updatedItemType }
		})
		let updatedHistoryItem = await response.json()

		expect(response.status()).toEqual(200)
		expect(updatedHistoryItem).toHaveProperty('id')
		expect(updatedHistoryItem).toHaveProperty('history_item_name')
		expect(updatedHistoryItem).toHaveProperty('history_item_type')
		expect(updatedHistoryItem.history_item_type).toEqual(updatedItemType)
	})

	test('PUT error missing history_item_type', async ({ request }) => {
		let randomInt = faker.number.int({ min: 0, max: historyItems.length - 1 })

		const response = await request.put(`/api/historyItem/updateType/${historyItems[randomInt].id}`)
		let errorHistoryItem = await response.json()

		expect(response.status()).toEqual(400)
		expect(errorHistoryItem).toHaveProperty('message')
		expect(errorHistoryItem.message).toEqual('Please include a history item type')
	})

	test('Delete history item', async ({ request }) => {
		const response = await request.delete(`/api/historyItem/${createdHistoryItem.id}`)
		let deletedHistoryItem = await response.json()

		expect(response.status()).toEqual(200)
		expect(deletedHistoryItem).toHaveProperty('message')
		expect(deletedHistoryItem.message).toEqual('Successfully deleted')
	})

	test('DELETE error missing history item id', async ({ request }) => {
		const response = await request.delete(`/api/historyItem/`)
		let errorHistoryItem = await response.json()

		expect(response.status()).toEqual(404)
		expect(errorHistoryItem).toHaveProperty('message')
		expect(errorHistoryItem.message).toEqual('Not found')
	})
})