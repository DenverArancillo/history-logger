import { test, expect } from '@playwright/test'
import { Tag } from '../../../../ts/interface/database/tags'
import { faker } from '@faker-js/faker'

test.describe.configure({ mode: 'serial' });

test.describe('Tags', () => {
	let test_tag_id: number

	test('Get all tags', async ({ request }) => {
		const response = await request.get('/api/tags')
		let tagsData: Tag[] = await response.json()
		
		expect(response.status()).toEqual(200)
		expect(tagsData.length >= 0).toBeTruthy()
		expect(Array.isArray(tagsData)).toBeTruthy()
	})

	test('Get single tag', async ({ request }) => {
		const response = await request.get('/api/tags/1')
		let tagsData: Tag = await response.json()

		expect(response.status()).toEqual(200)
		expect(tagsData).toHaveProperty('id')
		expect(tagsData).toHaveProperty('tag_name')
		expect(
			typeof tagsData === 'object' && 
			!Array.isArray(tagsData) && 
			tagsData !== null
		).toBeTruthy()
	})

	test('Create tag', async ({ request }) => {
		let tag_name = `createTagName-${faker.word.adjective()}-${new Date().toLocaleString('en-PH', {timeZone: 'Asia/Manila'})}`
		const response = await request.post('/api/tags/', {
			data: { tag_name }
		})

		let tags: Tag[] = await response.json()
		let createdTag = tags.find(({ tag_name: name }) => name === tag_name)
		if (createdTag && createdTag.id) {
			test_tag_id = createdTag?.id
		} else {
			throw new Error('test data tag is undefined')
		}

		expect(response.status()).toEqual(201)
		expect(tags.length >= 0).toBeTruthy()
		expect(Array.isArray(tags)).toBeTruthy()
		
		for (let tag of tags) {
			expect(tag).toHaveProperty('id')
			expect(tag).toHaveProperty('tag_name')
		}
	})

	test('POST error missing tag_name', async ({ request }) => {
		const response = await request.post('/api/tags/')

		let errorMessage = await response.json()

		expect(response.status()).toEqual(400)
		expect(errorMessage).toHaveProperty('message')
	})

	test('Update tag', async ({ request }) => {
		let tag_name = `updateTag-${faker.word.adjective()}-${new Date().toLocaleString('en-PH', {timeZone: 'Asia/Manila'})}`
		const response = await request.put(`/api/tags/${test_tag_id}`, {
			data: { tag_name }
		})

		let tagsData: Tag = await response.json()

		expect(response.status()).toEqual(200)
		expect(tagsData).toHaveProperty('id')
		expect(tagsData).toHaveProperty('tag_name')
		expect(
			typeof tagsData === 'object' && 
			!Array.isArray(tagsData) && 
			tagsData !== null
		).toBeTruthy()
	})

	test('PUT error missing tag_name', async ({ request }) => {
		const response = await request.post(`/api/tags/${test_tag_id}`)

		let errorMessage = await response.json()

		expect(response.status()).toEqual(404)
		expect(errorMessage).toHaveProperty('message')
	})

	test('Delete tag', async ({ request }) => {
		const response = await request.delete(`/api/tags/${test_tag_id}`)
		
		expect(response.status()).toEqual(200)
		expect(await response.json()).toHaveProperty('message')

		const getResponse = await request.get(`/api/tags/${test_tag_id}`)
		expect(getResponse.status()).toEqual(404)
	})

	test('DELETE error missing tag id', async ({ request }) => {
		const response = await request.delete('/api/tags/')
		let errorMessage = await response.json()

		expect(response.status()).toEqual(404)
		expect(errorMessage).toHaveProperty('message')
	})
})