import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '0ufm7kaw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sksautG0FsrfzP8dDho2sBSy9HwkSwMzCPbM7mHjthJFrVndNNneOSaLGbKZcCxY5ES28XDa0Pw8hWdAOJzfWGSk9RvrBsVXQVMttFgFD8IRoPWLc1SdmvAKjcwrNMnMUGy55MXlTXEIe7UKr8iAw3fp2xT3brgWsBEKvY6YG03QNrmSkZjC',
  useCdn: false,
})

const newsImages = [
  { slug: 'ag-adaptive-grippers-supporting-robotics-training-at-automat', url: 'https://www.figma.com/api/mcp/asset/db8045dd-26c0-4ba6-954b-5ea012ca55a1' },
  { slug: 'enhancing-dexterity-with-neural-network-based-motion-plannin', url: 'https://www.figma.com/api/mcp/asset/d2a68fc9-f65d-4e1b-9f2c-c0bdc65216df' },
  { slug: 'how-electric-actuators-are-transforming-modern-industrial-au', url: 'https://www.figma.com/api/mcp/asset/aaaabb44-18a3-4c47-bacf-0cd85bd199f6' },
  { slug: 'the-science-of-force-control-why-precision-matters-in-modern', url: 'https://www.figma.com/api/mcp/asset/9953a836-7c6c-4b33-bd07-8440efff0024' },
  { slug: 'enhancing-dexterity-with-real-time-haptic-feedback-in-roboti', url: 'https://www.figma.com/api/mcp/asset/aaaabb44-18a3-4c47-bacf-0cd85bd199f6' },
  { slug: 'learning-from-demonstration-teaching-dexterous-hands-through', url: 'https://www.figma.com/api/mcp/asset/9953a836-7c6c-4b33-bd07-8440efff0024' },
]

async function uploadImageFromUrl(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`)
  const buffer = await res.arrayBuffer()
  const asset = await client.assets.upload('image', Buffer.from(buffer), {
    filename: url.split('/').pop() + '.jpg',
    contentType: res.headers.get('content-type') || 'image/jpeg',
  })
  return asset._id
}

const allNews = await client.fetch(`*[_type == "news"]{ _id, "slug": slug.current }`)
const slugToId = Object.fromEntries(allNews.map(n => [n.slug, n._id]))

for (const item of newsImages) {
  const docId = slugToId[item.slug]
  if (!docId) { console.log(`  ✗ Not found: ${item.slug}`); continue }

  try {
    console.log(`Uploading image for: ${item.slug.slice(0, 50)}...`)
    const assetId = await uploadImageFromUrl(item.url)
    await client.patch(docId).set({
      heroImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
    }).commit()
    console.log(`  ✓ Done`)
  } catch (e) {
    console.log(`  ✗ Error: ${e.message}`)
  }
}

console.log('\nAll done!')
