import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { resolve } from 'path'

const client = createClient({
  projectId: '0ufm7kaw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk4VoEzagCwLkF2EJFnpn5xTpMIkbmWibz1wHrFepXnAVfB5m0mYaA2OXyTHJH4k0BqrInQRy1vTL9pm21zGQDgQwBdrRJcpctum4csokoFEUlN1bQNIHLH0ZNvOlUblTDnmymTNXYZ8FD0nBgkxpK1aaB4BXiwbpn5vtG2T9KN1ow4O66VZ',
  useCdn: false,
})

const imagePath = resolve('public/images/news-placeholder.webp')

console.log('Uploading image to Sanity...')
const asset = await client.assets.upload('image', createReadStream(imagePath), {
  filename: 'news-placeholder.webp',
  contentType: 'image/webp',
})
console.log('Uploaded:', asset._id)

const events = await client.fetch(`*[_type == "event"]._id`)
console.log(`Found ${events.length} events, patching...`)

const tx = client.transaction()
events.forEach(id => {
  tx.patch(id, { set: { heroImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } } })
})
await tx.commit()

console.log('Done! heroImage set for all events.')
