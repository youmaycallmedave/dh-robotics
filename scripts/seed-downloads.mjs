import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '0ufm7kaw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk4VoEzagCwLkF2EJFnpn5xTpMIkbmWibz1wHrFepXnAVfB5m0mYaA2OXyTHJH4k0BqrInQRy1vTL9pm21zGQDgQwBdrRJcpctum4csokoFEUlN1bQNIHLH0ZNvOlUblTDnmymTNXYZ8FD0nBgkxpK1aaB4BXiwbpn5vtG2T9KN1ow4O66VZ',
  useCdn: false,
})

const categories = await client.fetch(`*[_type == "productCategory"]{ _id, slug }`)
const series     = await client.fetch(`*[_type == "productSeries"]{ _id, slug, "catId": category._ref }`)
const products   = await client.fetch(`*[_type == "product"]{ _id, slug, "seriesId": series._ref }`)

const byCat  = Object.fromEntries(categories.map(c => [c.slug.current, c._id]))
const bySer  = Object.fromEntries(series.map(s => [s.slug.current, s._id]))
const byProd = Object.fromEntries(products.map(p => [p.slug.current, p._id]))

// Given a series slug, get its category id
const serCat = Object.fromEntries(series.map(s => [s.slug.current, s.catId]))
// Given a product slug, get its series id and category id
const prodSer = Object.fromEntries(products.map(p => [p.slug.current, p.seriesId]))
const prodCat = Object.fromEntries(products.map(p => {
  const ser = series.find(s => s._id === p.seriesId)
  return [p.slug.current, ser?.catId]
}))

const existing = await client.fetch(`*[_type == "download"]._id`)
if (existing.length) {
  const tx = client.transaction(); existing.forEach(id => tx.delete(id)); await tx.commit()
  console.log(`Deleted ${existing.length} existing downloads`)
}

const ref = id => ({ _type: 'reference', _ref: id })

// items: each has cat, ser, prod — all 3 filled
// For category-level: cat + first series of that cat + first product of that series
// For series-level: ser + its cat + first product of that series
// For product-level: prod + its series + its category

const firstProdOfSer = slug => products.find(p => p.seriesId === bySer[slug])?.slug.current
const firstSerOfCat  = slug => series.find(s => s.catId === byCat[slug])?.slug.current

const items = [
  // ── Electric Grippers — category level
  { title: 'Electric Grippers Catalog', version: '2025', fileFormat: 'PDF', date: '2025-01-10', tab: 'product-manuals', cat: 'electric-grippers', ser: firstSerOfCat('electric-grippers'), prod: firstProdOfSer(firstSerOfCat('electric-grippers')) },
  { title: 'Electric Grippers Selection Guide', version: '1.0', fileFormat: 'PDF', date: '2024-11-01', tab: 'user-guides', cat: 'electric-grippers', ser: firstSerOfCat('electric-grippers'), prod: firstProdOfSer(firstSerOfCat('electric-grippers')) },

  // ── Dexterous Hands — category level
  { title: 'Dexterous Hands Overview', version: '1.0', fileFormat: 'PDF', date: '2025-02-01', tab: 'product-manuals', cat: 'dexterous-hands', ser: firstSerOfCat('dexterous-hands'), prod: firstProdOfSer(firstSerOfCat('dexterous-hands')) },

  // ── Linear Actuators — category level
  { title: 'Linear Actuators Catalog', version: '2024', fileFormat: 'PDF', date: '2024-09-15', tab: 'product-manuals', cat: 'linear-actuators', ser: firstSerOfCat('linear-actuators'), prod: firstProdOfSer(firstSerOfCat('linear-actuators')) },

  // ── AG Series — series level
  { title: 'AG Series Manual', version: 'EN.2405', fileFormat: 'PDF', date: '2024-06-20', tab: 'product-manuals', cat: 'electric-grippers', ser: 'ag-series', prod: firstProdOfSer('ag-series') },
  { title: 'AG Series 3D Model', version: '2.0', fileFormat: 'STEP', date: '2024-04-01', tab: '3d-model', cat: 'electric-grippers', ser: 'ag-series', prod: firstProdOfSer('ag-series') },
  { title: 'AG Series User Guide', version: '1.2', fileFormat: 'PDF', date: '2024-05-10', tab: 'user-guides', cat: 'electric-grippers', ser: 'ag-series', prod: firstProdOfSer('ag-series') },

  // ── PGC Series — series level
  { title: 'PGC Series Manual', version: 'CN.2406', fileFormat: 'PDF', date: '2024-06-01', tab: 'product-manuals', cat: 'electric-grippers', ser: 'pgc-series', prod: firstProdOfSer('pgc-series') },
  { title: 'PGC Series 3D Model', version: '1.5', fileFormat: 'STEP', date: '2024-03-18', tab: '3d-model', cat: 'electric-grippers', ser: 'pgc-series', prod: firstProdOfSer('pgc-series') },

  // ── AE Series — series level
  { title: 'AE Series Manual', version: '1.0', fileFormat: 'PDF', date: '2024-07-11', tab: 'product-manuals', cat: 'linear-actuators', ser: 'ae-series', prod: firstProdOfSer('ae-series') },
  { title: 'AE Series 3D Files', version: '1.1', fileFormat: 'STEP', date: '2024-01-20', tab: '3d-model', cat: 'linear-actuators', ser: 'ae-series', prod: firstProdOfSer('ae-series') },

  // ── DH-5 Series — series level
  { title: 'DH-5 Dexterous Hand Manual', version: '1.0', fileFormat: 'PDF', date: '2024-02-28', tab: 'dexterous-hand', cat: 'dexterous-hands', ser: 'dh-5-series', prod: firstProdOfSer('dh-5-series') },
  { title: 'DH-5 User Guide', version: '1.1', fileFormat: 'PDF', date: '2024-04-12', tab: 'user-guides', cat: 'dexterous-hands', ser: 'dh-5-series', prod: firstProdOfSer('dh-5-series') },

  // ── VLAR Series — series level
  { title: 'VLAR Series Manual', version: '1.0', fileFormat: 'PDF', date: '2024-05-20', tab: 'product-manuals', cat: 'linear-actuators', ser: 'vlar-series', prod: firstProdOfSer('vlar-series') },
  { title: 'VLAR Series 3D Model', version: '2.0', fileFormat: 'STEP', date: '2024-06-05', tab: '3d-model', cat: 'linear-actuators', ser: 'vlar-series', prod: firstProdOfSer('vlar-series') },

  // ── Product level — AG-95
  { title: 'AG-95 Manual', version: 'EN.2403', fileFormat: 'PDF', date: '2024-03-05', tab: 'product-manuals', cat: 'electric-grippers', ser: 'ag-series', prod: 'ag-95' },
  { title: 'AG-95 3D Model', version: '1.0', fileFormat: 'STEP', date: '2024-02-15', tab: '3d-model', cat: 'electric-grippers', ser: 'ag-series', prod: 'ag-95' },

  // ── Product level — AG-145
  { title: 'AG-145 Manual', version: 'EN.2404', fileFormat: 'PDF', date: '2024-04-20', tab: 'product-manuals', cat: 'electric-grippers', ser: 'ag-series', prod: 'ag-145' },

  // ── Product level — PGC-140
  { title: 'PGC-140 User Guide', version: '1.3.0', fileFormat: 'PDF', date: '2024-05-15', tab: 'user-guides', cat: 'electric-grippers', ser: 'pgc-series', prod: 'pgc-140' },

  // ── Plugin / Software — assigned to AG Series as most common
  { title: 'DH-Robotics SDK Plugin v2', version: '2.1.4', fileFormat: 'ZIP', date: '2024-03-10', tab: 'plugin', cat: 'electric-grippers', ser: 'ag-series', prod: 'ag-95' },
  { title: 'Control Software User Guide', version: '3.0', fileFormat: 'PDF', date: '2023-12-15', tab: 'user-guides', cat: 'electric-grippers', ser: 'ag-series', prod: 'ag-95' },
]

const tx = client.transaction()
items.forEach(item => {
  const doc = {
    _type: 'download',
    title: item.title,
    version: item.version,
    fileFormat: item.fileFormat,
    date: item.date,
    tab: item.tab,
    fileUrl: '#',
  }
  if (item.cat  && byCat[item.cat])   doc.category = ref(byCat[item.cat])
  if (item.ser  && bySer[item.ser])   doc.series   = ref(bySer[item.ser])
  if (item.prod && byProd[item.prod]) doc.product  = ref(byProd[item.prod])
  tx.create(doc)
})
await tx.commit()
console.log(`Created ${items.length} downloads`)
