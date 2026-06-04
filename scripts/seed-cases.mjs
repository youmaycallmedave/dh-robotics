import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '0ufm7kaw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk4VoEzagCwLkF2EJFnpn5xTpMIkbmWibz1wHrFepXnAVfB5m0mYaA2OXyTHJH4k0BqrInQRy1vTL9pm21zGQDgQwBdrRJcpctum4csokoFEUlN1bQNIHLH0ZNvOlUblTDnmymTNXYZ8FD0nBgkxpK1aaB4BXiwbpn5vtG2T9KN1ow4O66VZ',
  useCdn: false,
})

function key() { return Math.random().toString(36).slice(2, 10) }

const AG_SERIES_ID  = 'H07Fxi73hI6t8UQQIqHekZ'
const PGC_SERIES_ID = 'H07Fxi73hI6t8UQQIqHehT'
const DH5_SERIES_ID = '9tTg6fkAf79x4iafe53cBa'

const existing = await client.fetch(`*[_type == "caseStudy"]._id`)
if (existing.length) {
  const tx = client.transaction()
  existing.forEach(id => tx.delete(id))
  await tx.commit()
  console.log(`Deleted ${existing.length} existing cases`)
}

const cases = [
  {
    _type: 'caseStudy',
    title: 'FOXCONN',
    slug: { _type: 'slug', current: 'foxconn' },
    description: 'The AG Series electric grippers were applied with robots to complete complex tasks such as grabbing and handling mobile phone shells in FOXCONN factory.',
    media: [
      { _type: 'object', _key: key(), type: 'video', label: 'Assembly Line Demo', videoUrl: 'https://www.youtube.com/watch?v=NpEaa2P7qZI', duration: '03:30' },
      { _type: 'object', _key: key(), type: 'video', label: 'Gripper Close-up', videoUrl: 'https://www.youtube.com/watch?v=NpEaa2P7qZI', duration: '01:45' },
      { _type: 'object', _key: key(), type: 'image', label: 'Factory Floor' },
    ],
    applicationProduct: {
      series: { _type: 'reference', _ref: AG_SERIES_ID },
    },
  },
  {
    _type: 'caseStudy',
    title: 'SAIC Volkswagen',
    slug: { _type: 'slug', current: 'saic-volkswagen' },
    description: 'PGC Series collaborative grippers integrated into SAIC Volkswagen\'s automotive body assembly line, improving cycle time and reducing defect rates.',
    media: [
      { _type: 'object', _key: key(), type: 'video', label: 'Welding Cell Integration', videoUrl: 'https://www.youtube.com/watch?v=NpEaa2P7qZI', duration: '02:10' },
      { _type: 'object', _key: key(), type: 'image', label: 'Robot Cell Overview' },
      { _type: 'object', _key: key(), type: 'image', label: 'Gripper on Arm' },
    ],
    applicationProduct: { series: { _type: 'reference', _ref: PGC_SERIES_ID } },
  },
  {
    _type: 'caseStudy',
    title: 'University of Hong Kong',
    slug: { _type: 'slug', current: 'university-of-hong-kong' },
    description: 'The HKU robotics team used DH-5 Dexterous Hands to win the Agile Manipulation Challenge, demonstrating precise multi-finger coordination in dexterous task scenarios.',
    media: [
      { _type: 'object', _key: key(), type: 'video', label: 'Challenge Demo', videoUrl: 'https://www.youtube.com/watch?v=NpEaa2P7qZI', duration: '04:00' },
      { _type: 'object', _key: key(), type: 'image', label: 'Award Ceremony' },
    ],
    applicationProduct: { series: { _type: 'reference', _ref: DH5_SERIES_ID } },
  },
]

const tx = client.transaction()
cases.forEach(c => tx.create(c))
await tx.commit()
console.log(`Created ${cases.length} test cases: FOXCONN, SAIC Volkswagen, University of Hong Kong`)
