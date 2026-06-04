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

function block(text, style = 'normal', marks = []) {
  return {
    _type: 'block',
    _key: key(),
    style,
    children: [{ _type: 'span', _key: key(), text, marks }],
    markDefs: [],
  }
}

function listItem(text, listItem = 'bullet', level = 1) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem,
    level,
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
    markDefs: [],
  }
}

const articleContent = [
  block('Embodied AI Is Moving Into Real Industrial Environments', 'h4'),
  block('Embodied AI is rapidly evolving from research concepts into practical industrial applications. As humanoid robots, dexterous hands, and intelligent manipulation systems continue to advance, manufacturers are beginning to explore how these technologies can improve productivity, flexibility, and automation efficiency.'),
  block('At DH-Robotics, we are seeing this transition happen in real time.'),
  block('Our dexterous hands, electric grippers, and adaptive gripping solutions are already being integrated into embodied AI projects across automotive manufacturing, 3C electronics assembly, logistics handling, research platforms, and humanoid robot applications.'),
  block('This video showcases a collection of DH-Robotics embodied intelligence cases — highlighting how robotic manipulation is becoming a real productivity tool inside industrial automation environments.'),

  {
    _type: 'videoEmbed',
    _key: key(),
    url: 'https://www.youtube.com/watch?v=NpEaa2P7qZI',
    duration: '03:30',
  },

  block('Watch the Video: DH-Robotics Embodied AI Case Collection', 'h4'),
  block('From precision gripping to flexible manipulation, these robots are no longer limited to laboratory demonstrations. They are beginning to perform real industrial tasks in real production scenarios.'),
  block('The video includes applications such as:', 'normal', ['strong']),
  listItem('Humanoid robot manipulation'),
  listItem('Dual-arm coordinated operation'),
  listItem('Precision gripping and force control'),
  listItem('Flexible assembly tasks'),
  listItem('Logistics handling and transportation'),
  listItem('Industrial automation integration'),
  listItem('Teleoperation and remote manipulation'),
  listItem('Adaptive gripping in complex environments'),

  {
    _type: 'callout',
    _key: key(),
    text: 'DH-Robotics specializes in electric grippers, dexterous hands, force-controlled gripping solutions, and intelligent end-effectors for industrial automation and embodied AI applications.',
  },

  block('Precision Gripping for Industrial Automation', 'h4'),
  block('Reliable gripping is one of the core technologies behind embodied intelligence.'),
  block('DH-Robotics electric grippers are designed to provide:', 'normal', ['strong']),
  listItem('High repeatability and positioning accuracy'),
  listItem('Real-time force control'),
  listItem('Stable gripping performance'),
  listItem('Flexible adaptation to different object shapes'),
  listItem('Compact integration for robotic arms and humanoid robots'),
  block('In industrial automation environments, these capabilities help robots complete repetitive and highly precise operations more efficiently.'),
  block('Applications include:', 'normal', ['strong']),
  listItem('Automotive component handling'),
  listItem('Battery cell gripping and transfer'),
  listItem('3C electronics assembly'),
  listItem('Material loading and unloading'),
  listItem('Sorting and logistics automation'),

  block('Dexterous Hands Enable More Human-Like Manipulation', 'h4'),
  block('As embodied AI develops, dexterous manipulation becomes increasingly important.'),
  block('DH-Robotics dexterous hands are designed to support more advanced robotic interaction with the physical world. Through multi-finger coordination, precise motion control, and adaptive grasping capabilities, robots can perform tasks that require greater flexibility and interaction.'),
  block('Typical embodied AI scenarios include:', 'normal', ['strong']),
  listItem('Humanoid robot operation', 'number'),
  listItem('Remote manipulation and teleoperation', 'number'),
  listItem('Research and AI data collection', 'number'),
  listItem('Human-robot interaction', 'number'),
  listItem('Flexible object handling', 'number'),
  block('These technologies help robots move beyond simple pick-and-place actions toward more intelligent and adaptive operation.'),
]

const posts = [
  { title: 'Embodied AI Is Moving Into Real Industrial Environments', slug: 'embodied-ai-industrial-environments', category: 'insights', date: '2025-05-15', featured: true },
  { title: 'DH-Robotics at Automatica 2025', slug: 'dh-robotics-automatica-2025', category: 'news', date: '2025-05-08' },
  { title: 'New Electric Gripper Series for Humanoid Robots', slug: 'new-electric-gripper-humanoid-robots', category: 'news', date: '2025-04-22' },
  { title: 'Force Control Technology in Modern Manufacturing', slug: 'force-control-technology-manufacturing', category: 'insights', date: '2025-04-10' },
  { title: 'DH-Robotics Partners with Leading EV Manufacturers', slug: 'dh-robotics-ev-manufacturers-partnership', category: 'news', date: '2025-03-28' },
  { title: 'Dexterous Hands for Next-Generation Automation', slug: 'dexterous-hands-next-generation-automation', category: 'insights', date: '2025-03-14' },
  { title: 'Expanding Robotic Solutions for 3C Electronics Assembly', slug: 'robotic-solutions-3c-electronics-assembly', category: 'news', date: '2025-02-20' },
]

async function main() {
  console.log('Deleting existing news documents...')
  const existing = await client.fetch(`*[_type == "news"]._id`)
  if (existing.length > 0) {
    const tx = client.transaction()
    existing.forEach(id => tx.delete(id))
    await tx.commit()
    console.log(`Deleted ${existing.length} documents`)
  }

  console.log('Creating 7 news posts...')
  const tx = client.transaction()
  posts.forEach(p => {
    tx.create({
      _type: 'news',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      category: p.category,
      date: p.date,
      featured: p.featured ?? false,
      content: articleContent.map(block => ({ ...block, _key: key() })),
    })
  })
  await tx.commit()
  console.log('Done! 7 news posts created.')
}

main().catch(err => { console.error(err); process.exit(1) })
