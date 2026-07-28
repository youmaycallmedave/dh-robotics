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

// Upload a set of placeholder images to reuse across media items
const files = [
  'public/images/dh56-action.jpg',
  'public/images/dh56-feat-1.jpg',
  'public/images/dh56-feat-2.jpg',
  'public/images/dh56-hero-bg.jpg',
  'public/images/service-content-1.webp',
  'public/images/service-content-2.webp',
]

const refs = []
for (const f of files) {
  const asset = await client.assets.upload('image', createReadStream(resolve(f)), {
    filename: f.split('/').pop(),
  })
  refs.push(asset._id)
  console.log('Uploaded', f, '->', asset._id)
}

const img = (i) => ({ _type: 'image', asset: { _type: 'reference', _ref: refs[i % refs.length] } })

const SAMPLE_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
const durations = ['03:30', '02:15', '04:00']

function buildMedia(offset) {
  const media = []
  // 3 videos (poster thumbnail + videoUrl + duration)
  for (let i = 0; i < 3; i++) {
    media.push({
      _type: 'object',
      _key: `vid-${i}`,
      type: 'video',
      label: `Video ${i + 1}`,
      thumbnail: img(offset + i),
      videoUrl: SAMPLE_VIDEO,
      duration: durations[i % durations.length],
    })
  }
  // 3 images (full image)
  for (let i = 0; i < 3; i++) {
    media.push({
      _type: 'object',
      _key: `img-${i}`,
      type: 'image',
      label: `Image ${i + 1}`,
      image: img(offset + i + 3),
    })
  }
  return media
}

const cases = await client.fetch(`*[_type == "caseStudy"]{ _id, title }`)

const tx = client.transaction()
cases.forEach((c, idx) => {
  tx.patch(c._id, { set: { media: buildMedia(idx) } })
})
await tx.commit()

console.log(`Filled ${cases.length} cases with 3 videos + 3 images each`)
