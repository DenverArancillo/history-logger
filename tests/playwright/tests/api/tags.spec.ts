import { test, expect, type APIResponse } from '@playwright/test'

test.describe.configure({ mode: 'serial' });

test.describe('Tags', () => {
	let test_tag_id: number

	test('Get all tags', async ({ request }) => {
		let tags: APIResponse = await request.get('/api/tags')
		let tagsData = await tags.json()
		
		expect(tags.status()).toEqual(200)
		expect(tagsData.length >= 0).toBeTruthy()
		expect(Array.isArray(tagsData)).toBeTruthy()
	})

	test('Get single tag', async ({ request }) => {
		let tag: APIResponse = await request.get('/api/tags/1')
		let tagsData = await tag.json()

		expect(tag.status()).toEqual(200)
		expect(tagsData).toHaveProperty('id')
		expect(tagsData).toHaveProperty('tag_name')
		expect(
			typeof tagsData === 'object' && 
			!Array.isArray(tagsData) && 
			tagsData !== null
		).toBeTruthy()
	})

	test('Create tag', async ({ request }) => {
		console.log('test_tag_id', test_tag_id)

		test_tag_id = 1
	})

	test('next test', async ({ request }) => {
		console.log('test_tag_id', test_tag_id)
	})
})