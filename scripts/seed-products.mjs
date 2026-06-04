import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '0ufm7kaw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk4VoEzagCwLkF2EJFnpn5xTpMIkbmWibz1wHrFepXnAVfB5m0mYaA2OXyTHJH4k0BqrInQRy1vTL9pm21zGQDgQwBdrRJcpctum4csokoFEUlN1bQNIHLH0ZNvOlUblTDnmymTNXYZ8FD0nBgkxpK1aaB4BXiwbpn5vtG2T9KN1ow4O66VZ',
  useCdn: false,
})

// Clean existing
for (const type of ['product', 'productSeries', 'productCategory']) {
  const ids = await client.fetch(`*[_type == $t]._id`, { t: type })
  if (ids.length) {
    const tx = client.transaction()
    ids.forEach(id => tx.delete(id))
    await tx.commit()
    console.log(`Deleted ${ids.length} ${type}`)
  }
}

// ── Categories ──────────────────────────────────────────────
const categories = await Promise.all([
  client.create({ _type: 'productCategory', title: 'Electric Grippers', slug: { _type: 'slug', current: 'electric-grippers' }, order: 1, description: 'High-precision electric grippers for industrial automation.' }),
  client.create({ _type: 'productCategory', title: 'Dexterous Hands', slug: { _type: 'slug', current: 'dexterous-hands' }, order: 2, description: 'Multi-finger dexterous hands for humanoid robots and embodied AI.' }),
  client.create({ _type: 'productCategory', title: 'Linear Actuators', slug: { _type: 'slug', current: 'linear-actuators' }, order: 3, description: 'Electric linear actuators for precise motion control.' }),
])

console.log('Created 3 categories')

const [catGrippers, catHands, catActuators] = categories

// ── Series ───────────────────────────────────────────────────
const seriesData = [
  // Electric Grippers → 3 series
  { title: 'AG Series', slug: 'ag-series', category: catGrippers._id, order: 1, subtitle: 'Adaptive Electric Gripper', description: 'Compact adaptive electric grippers with real-time force control.' },
  { title: 'PGC Series', slug: 'pgc-series', category: catGrippers._id, order: 2, subtitle: 'Parallel Gripper Collaborative', description: 'Collaborative parallel grippers for human-robot interaction.' },
  { title: 'PGHL Series', slug: 'pghl-series', category: catGrippers._id, order: 3, subtitle: 'High-Load Parallel Gripper', description: 'Heavy-duty grippers for large payload applications.' },
  // Dexterous Hands → 2 series
  { title: 'DH-5 Series', slug: 'dh-5-series', category: catHands._id, order: 1, subtitle: '5-Finger Dexterous Hand', description: 'Five-finger dexterous hand with independent joint control.' },
  { title: 'DH-3 Series', slug: 'dh-3-series', category: catHands._id, order: 2, subtitle: '3-Finger Adaptive Hand', description: 'Three-finger adaptive gripper hand for versatile manipulation.' },
  // Linear Actuators → 2 series
  { title: 'AE Series', slug: 'ae-series', category: catActuators._id, order: 1, subtitle: 'Electric Linear Actuator', description: 'Precision electric linear actuators for automation systems.' },
  { title: 'VLAR Series', slug: 'vlar-series', category: catActuators._id, order: 2, subtitle: 'Voice Coil Linear Actuator', description: 'High-speed voice coil actuators for semiconductor and precision applications.' },
]

const createdSeries = await Promise.all(
  seriesData.map(s => client.create({
    _type: 'productSeries',
    title: s.title,
    slug: { _type: 'slug', current: s.slug },
    category: { _type: 'reference', _ref: s.category },
    order: s.order,
    subtitle: s.subtitle,
    description: s.description,
  }))
)

console.log(`Created ${createdSeries.length} series`)

const bySlug = Object.fromEntries(createdSeries.map(s => [s.slug.current, s._id]))

// ── Products ─────────────────────────────────────────────────
const productsData = [
  // AG Series
  { title: 'AG-95', slug: 'ag-95', series: 'ag-series', order: 1, subtitle: 'Stroke 0–95 mm', description: 'Compact adaptive gripper with 95mm stroke.' },
  { title: 'AG-145', slug: 'ag-145', series: 'ag-series', order: 2, subtitle: 'Stroke 0–145 mm', description: 'Wide-stroke adaptive gripper for larger workpieces.' },
  { title: 'AG-60', slug: 'ag-60', series: 'ag-series', order: 3, subtitle: 'Stroke 0–60 mm', description: 'Miniature adaptive gripper for tight spaces.' },
  // PGC Series
  { title: 'PGC-50', slug: 'pgc-50', series: 'pgc-series', order: 1, subtitle: 'Stroke 0–50 mm', description: 'Collaborative parallel gripper, 50mm stroke.' },
  { title: 'PGC-140', slug: 'pgc-140', series: 'pgc-series', order: 2, subtitle: 'Stroke 0–140 mm', description: 'Wide-stroke collaborative parallel gripper.' },
  // PGHL Series
  { title: 'PGHL-80', slug: 'pghl-80', series: 'pghl-series', order: 1, subtitle: 'Payload up to 80 kg', description: 'Heavy-duty gripper for large industrial components.' },
  // DH-5 Series
  { title: 'DH-5-V1', slug: 'dh-5-v1', series: 'dh-5-series', order: 1, subtitle: 'Standard 5-Finger Hand', description: 'Standard version of the 5-finger dexterous hand.' },
  { title: 'DH-5-V2', slug: 'dh-5-v2', series: 'dh-5-series', order: 2, subtitle: 'Enhanced 5-Finger Hand', description: 'Enhanced version with improved torque and speed.' },
  // DH-3 Series
  { title: 'DH-3-V1', slug: 'dh-3-v1', series: 'dh-3-series', order: 1, subtitle: 'Standard 3-Finger Hand', description: '3-finger adaptive hand for pick-and-place tasks.' },
  // AE Series
  { title: 'AE-C', slug: 'ae-c', series: 'ae-series', order: 1, subtitle: 'Compact Linear Actuator', description: 'Compact electric linear actuator for space-constrained applications.' },
  { title: 'AE-S', slug: 'ae-s', series: 'ae-series', order: 2, subtitle: 'Standard Linear Actuator', description: 'Standard electric linear actuator with high repeatability.' },
  // VLAR Series
  { title: 'VLAR-30', slug: 'vlar-30', series: 'vlar-series', order: 1, subtitle: 'Stroke 30 mm', description: 'High-speed voice coil actuator, 30mm stroke.' },
  { title: 'VLAR-60', slug: 'vlar-60', series: 'vlar-series', order: 2, subtitle: 'Stroke 60 mm', description: 'High-speed voice coil actuator, 60mm stroke.' },
]

const tx = client.transaction()
productsData.forEach(p => {
  tx.create({
    _type: 'product',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    series: { _type: 'reference', _ref: bySlug[p.series] },
    order: p.order,
    subtitle: p.subtitle,
    description: p.description,
  })
})
await tx.commit()

console.log(`Created ${productsData.length} products`)
console.log('\nStructure:')
console.log('Electric Grippers → AG Series (AG-95, AG-145, AG-60) | PGC Series (PGC-50, PGC-140) | PGHL Series (PGHL-80)')
console.log('Dexterous Hands   → DH-5 Series (DH-5-V1, DH-5-V2) | DH-3 Series (DH-3-V1)')
console.log('Linear Actuators  → AE Series (AE-C, AE-S) | VLAR Series (VLAR-30, VLAR-60)')
