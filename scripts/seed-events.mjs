import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '0ufm7kaw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk4VoEzagCwLkF2EJFnpn5xTpMIkbmWibz1wHrFepXnAVfB5m0mYaA2OXyTHJH4k0BqrInQRy1vTL9pm21zGQDgQwBdrRJcpctum4csokoFEUlN1bQNIHLH0ZNvOlUblTDnmymTNXYZ8FD0nBgkxpK1aaB4BXiwbpn5vtG2T9KN1ow4O66VZ',
  useCdn: false,
})

function key() {
  return Math.random().toString(36).slice(2, 10)
}

function block(text, style = 'normal') {
  return {
    _type: 'block', _key: key(), style,
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
    markDefs: [],
  }
}

function mixedBlock(spans) {
  return {
    _type: 'block', _key: key(), style: 'normal',
    markDefs: [],
    children: spans.map(s => ({
      _type: 'span', _key: key(),
      text: s.text,
      marks: s.bold ? ['strong'] : [],
    })),
  }
}

const eventContent = [
  block('On March 26, 2025, the three-day Productronica China officially kicked off at the Shanghai New International Expo Centre, bringing together cutting-edge technologies and an electrifying atmosphere that captivated attendees.'),

  mixedBlock([
    { text: 'As a pioneer in intelligent manufacturing, DH-Robotics showcased its groundbreaking innovations, including ' },
    { text: '"Dexterous Intelligence with Dual-Hand Coordination," the iFM Intelligent Flexible Motion System, Universal Plug-and-Play Automation, and High-Speed Precision Compound Motion Demonstrations."', bold: true },
    { text: ' With state-of-the-art technology and dynamic live demonstrations, DH-Robotics drew a large crowd, becoming one of the key highlights of the event.' },
  ]),

  block('Driving Innovation, Leading the Future of Smart Manufacturing', 'h4'),
  block('As intelligent manufacturing reaches new heights, companies must compete not only in speed but also in flexibility and precision.'),
  block('As an expert in core components for industrial smart manufacturing, DH-Robotics integrates precision control, force control, embedded integration, and intelligent technology to develop electric end-effector solutions that are more dexterous, more precise, and faster. These innovations are widely applied in 3C electronics, automotive manufacturing, semiconductors, new energy, and medical devices, making intelligent manufacturing simpler, more efficient, and more agile.'),

  block('Driving Innovation, Leading the Future of Smart Manufacturing', 'h4'),
  block('With exceptional flexibility and precise coordinated control, the DH-5 Dexterous Hand became a showstopper at the expo.'),

  block('Precision Collaboration: Left Hand Holds a Fork, Right Hand Serves a Bowl', 'h4'),
  block('One DH-5 Dexterous Hand firmly gripped a fork, while another balanced a bowl of Sachima, smoothly serving "food" to spectators. The crowd was amazed, with one visitor exclaiming: "It feeds better than I do!" Many eagerly lined up to experience the hand\'s flexibility and precision firsthand.'),

  block('Lifelike Hand Gesture Performance', 'h4'),
  block('In another captivating demonstration, two DH-5 Dexterous Hands waved, gestured, and danced with seamless coordination, mimicking human-like movement. With independent drive and control units for each finger, powered by high-precision force control algorithms, the DH-5 achieved remarkably realistic hand movements.'),

  block('Cutting-Edge Innovations on Display', 'h2'),

  block('iFM Intelligent Flexible Motion System – The "LEGO Master" of Industrial Automation', 'h4'),
  block('The iFM System showcased high-speed precision, modular design, and flexible configuration, allowing industries to "build automation like LEGO." This highly adaptable system is ideal for 3C electronics, new energy, automotive, and semiconductor industries, setting a new benchmark for flexible manufacturing.'),

  block('AG Series Electric Grippers – Precision Insertion, Adaptive Handling', 'h4'),
  block('With precise force control, adaptive gripping, and intelligent feedback, the AG Series Electric Grippers excelled in 3C electronics, automotive, medical, and semiconductor assembly. During the demo, an AG Gripper mounted on a robotic arm seamlessly executed blind insertion tasks for connectors, screws, and precision components—without external vision sensors.'),

  block('VLAR Voice Coil Actuators – High-Speed, High-Precision Motion Control', 'h4'),
  block('The VLAR Series enables linear, rotary, and combined movements with exceptional accuracy, even in tight spaces. Perfect for semiconductor wafer handling, 3C lens inspection, and medical automation, the demo highlighted its stability, control precision, and technological superiority.'),

  block('A Must-Visit Booth, Sparking Industry Buzz', 'h4'),
  block('Throughout the expo, the DH-Robotics team engaged with visitors in in-depth discussions on smart manufacturing trends, automation solutions, and emerging technologies. Many customers showed strong interest in our solutions, scheduling follow-up meetings to explore future collaborations.'),
]

const events = [
  { title: 'Automatica 2025', slug: 'automatica-2025', tag: 'future', date: '2025-06-24', location: 'Munich, Germany', time: '09:00–18:00' },
  { title: 'SEMICON West 2025', slug: 'semicon-west-2025', tag: 'future', date: '2025-07-22', location: 'San Francisco, USA', time: '09:00–17:00' },
  { title: 'Productronica China 2025', slug: 'productronica-china-2025', tag: 'past', date: '2025-03-26', location: 'Shanghai, China', time: '09:00–17:00' },
  { title: 'Hannover Messe 2025', slug: 'hannover-messe-2025', tag: 'past', date: '2025-03-31', location: 'Hannover, Germany', time: '09:00–18:00' },
  { title: 'CES 2025', slug: 'ces-2025', tag: 'past', date: '2025-01-07', location: 'Las Vegas, USA', time: '09:00–18:00' },
  { title: 'IROS 2024', slug: 'iros-2024', tag: 'past', date: '2024-10-14', location: 'Abu Dhabi, UAE', time: '08:30–17:30' },
  { title: 'China International Robot Show 2024', slug: 'cirf-2024', tag: 'past', date: '2024-08-21', location: 'Shanghai, China', time: '09:00–17:00' },
]

async function main() {
  console.log('Fetching existing event image asset...')
  const existing = await client.fetch(`*[_type == "event" && defined(heroImage)][0].heroImage.asset._ref`)
  const imageRef = existing ?? null

  console.log('Deleting existing events...')
  const ids = await client.fetch(`*[_type == "event"]._id`)
  if (ids.length > 0) {
    const tx = client.transaction()
    ids.forEach(id => tx.delete(id))
    await tx.commit()
    console.log(`Deleted ${ids.length} events`)
  }

  console.log('Creating 7 events...')
  const tx = client.transaction()
  events.forEach(e => {
    const doc = {
      _type: 'event',
      title: e.title,
      slug: { _type: 'slug', current: e.slug },
      tag: e.tag,
      date: e.date,
      location: e.location,
      time: e.time,
      content: eventContent.map(b => ({ ...b, _key: key() })),
    }
    if (imageRef) {
      doc.heroImage = { _type: 'image', asset: { _type: 'reference', _ref: imageRef } }
    }
    tx.create(doc)
  })
  await tx.commit()
  console.log('Done! 7 events created (2 future, 5 past).')
}

main().catch(err => { console.error(err); process.exit(1) })
