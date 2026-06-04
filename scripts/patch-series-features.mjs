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

function key() { return Math.random().toString(36).slice(2, 10) }

// Upload placeholder as series heroImage
const imagePath = resolve('public/images/news-placeholder.webp')
const asset = await client.assets.upload('image', createReadStream(imagePath), {
  filename: 'series-placeholder.webp',
  contentType: 'image/webp',
})
console.log('Uploaded image:', asset._id)
const imageRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }

const seriesData = {
  'ag-series': {
    subtitle: 'Slim-type Electric Parallel Gripper',
    features: [
      { title: 'Compact Size & Flexible Installation' },
      { title: 'High Working Speed' },
      { title: 'Precise Force Control' },
      { title: 'Real-time Feedback' },
    ],
  },
  'pgc-series': {
    subtitle: 'Collaborative Parallel Gripper',
    features: [
      { title: 'Safe Human-Robot Collaboration' },
      { title: 'Fast Tool Change' },
      { title: 'Adaptive Gripping Force' },
      { title: 'Wide Stroke Range' },
    ],
  },
  'dh-5-series': {
    subtitle: '5-Finger Dexterous Hand',
    features: [
      { title: 'Multi-Finger Independent Control' },
      { title: 'High-Precision Force Sensing' },
      { title: 'Humanoid Robot Integration' },
      { title: 'Teleoperation Support' },
    ],
  },
  'dh-3-series': {
    subtitle: '3-Finger Adaptive Hand',
    features: [
      { title: 'Adaptive 3-Finger Grasping' },
      { title: 'Compact & Lightweight' },
      { title: 'Versatile Object Handling' },
    ],
  },
  'ae-series': {
    subtitle: 'Electric Linear Actuator',
    features: [
      { title: 'High Repeatability' },
      { title: 'Precise Positioning' },
      { title: 'Compact Integration' },
      { title: 'Multi-axis Support' },
    ],
  },
  'vlar-series': {
    subtitle: 'Voice Coil Linear Actuator',
    features: [
      { title: 'High-Speed Motion' },
      { title: 'Ultra-Precise Control' },
      { title: 'Semiconductor Grade Accuracy' },
      { title: 'Linear & Rotary Modes' },
    ],
  },
  'pghl-series': {
    subtitle: 'High-Load Parallel Gripper',
    features: [
      { title: 'Heavy Payload Capability' },
      { title: 'Industrial Grade Durability' },
      { title: 'Stable High-Force Gripping' },
    ],
  },
}

const allSeries = await client.fetch(`*[_type == "productSeries"]{ _id, slug }`)

const tx = client.transaction()
allSeries.forEach(s => {
  const data = seriesData[s.slug.current]
  if (!data) return
  tx.patch(s._id, {
    set: {
      subtitle: data.subtitle,
      heroImage: imageRef,
      features: data.features.map(f => ({ _type: 'object', _key: key(), title: f.title, description: '' })),
    },
  })
})
await tx.commit()
console.log(`Patched ${allSeries.length} series with features and heroImage`)
