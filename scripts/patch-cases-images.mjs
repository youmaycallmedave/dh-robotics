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

const asset = await client.assets.upload('image', createReadStream(resolve('public/images/news-placeholder.webp')), {
  filename: 'case-placeholder.webp',
  contentType: 'image/webp',
})
console.log('Uploaded:', asset._id)

const imageRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }

const cases = await client.fetch(`*[_type == "caseStudy"]{ _id, media }`)

const tx = client.transaction()
cases.forEach(c => {
  // Set logo
  tx.patch(c._id, { set: { logo: imageRef } })

  // Set thumbnail on every media item that doesn't have one
  const media = c.media ?? []
  media.forEach((item, i) => {
    tx.patch(c._id, { set: { [`media[${i}].thumbnail`]: imageRef } })
  })
})
await tx.commit()

console.log(`Patched ${cases.length} cases — logo + media thumbnails set`)
