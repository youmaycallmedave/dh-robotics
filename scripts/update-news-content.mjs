import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '0ufm7kaw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sksautG0FsrfzP8dDho2sBSy9HwkSwMzCPbM7mHjthJFrVndNNneOSaLGbKZcCxY5ES28XDa0Pw8hWdAOJzfWGSk9RvrBsVXQVMttFgFD8IRoPWLc1SdmvAKjcwrNMnMUGy55MXlTXEIe7UKr8iAw3fp2xT3brgWsBEKvY6YG03QNrmSkZjC',
  useCdn: false,
})

function block(text, style = 'normal') {
  return { _type: 'block', _key: Math.random().toString(36).slice(2), style, children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text }], markDefs: [] }
}

function bullet(text) {
  return { _type: 'block', _key: Math.random().toString(36).slice(2), style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text }], markDefs: [] }
}

function numbered(text) {
  return { _type: 'block', _key: Math.random().toString(36).slice(2), style: 'normal', listItem: 'number', level: 1, children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text }], markDefs: [] }
}

function callout(text) {
  return { _type: 'callout', _key: Math.random().toString(36).slice(2), text }
}

const richContent = [
  block('Embodied AI Is Moving Into Real Industrial Environments', 'h4'),
  block('Embodied AI is rapidly evolving from research concepts into practical industrial applications. As humanoid robots, dexterous hands, and intelligent manipulation systems continue to advance, manufacturers are beginning to explore how these technologies can improve productivity, flexibility, and automation efficiency.'),
  block('At DH-Robotics, we are seeing this transition happen in real time.'),
  block('Our dexterous hands, electric grippers, and adaptive gripping solutions are already being integrated into embodied AI projects across automotive manufacturing, 3C electronics assembly, logistics handling, research platforms, and humanoid robot applications.'),
  block('This video showcases a collection of DH-Robotics embodied intelligence cases — highlighting how robotic manipulation is becoming a real productivity tool inside industrial automation environments.'),

  { _type: 'videoEmbed', _key: Math.random().toString(36).slice(2), url: 'https://www.youtube.com/watch?v=example', duration: '03:30' },

  block('Watch the Video: DH-Robotics Embodied AI Case Collection', 'h4'),
  block('From precision gripping to flexible manipulation, these robots are no longer limited to laboratory demonstrations. They are beginning to perform real industrial tasks in real production scenarios.'),
  block('The video includes applications such as:'),
  bullet('Humanoid robot manipulation'),
  bullet('Dual-arm coordinated operation'),
  bullet('Precision gripping and force control'),
  bullet('Flexible assembly tasks'),
  bullet('Logistics handling and transportation'),
  bullet('Industrial automation integration'),
  bullet('Teleoperation and remote manipulation'),
  bullet('Adaptive gripping in complex environments'),

  callout('DH-Robotics specializes in electric grippers, dexterous hands, force-controlled gripping solutions, and intelligent end-effectors for industrial automation and embodied AI applications.'),

  block('Precision Gripping for Industrial Automation', 'h4'),
  block('Reliable gripping is one of the core technologies behind embodied intelligence.'),
  block('DH-Robotics electric grippers are designed to provide:'),
  bullet('High repeatability and positioning accuracy'),
  bullet('Real-time force control'),
  bullet('Stable gripping performance'),
  bullet('Flexible adaptation to different object shapes'),
  bullet('Compact integration for robotic arms and humanoid robots'),
  block('In industrial automation environments, these capabilities help robots complete repetitive and highly precise operations more efficiently.'),
  block('Applications include:'),
  bullet('Automotive component handling'),
  bullet('Battery cell gripping and transfer'),
  bullet('3C electronics assembly'),
  bullet('Material loading and unloading'),
  bullet('Sorting and logistics automation'),

  block('Dexterous Hands Enable More Human-Like Manipulation', 'h4'),
  block('As embodied AI develops, dexterous manipulation becomes increasingly important.'),
  block('DH-Robotics dexterous hands are designed to support more advanced robotic interaction with the physical world. Through multi-finger coordination, precise motion control, and adaptive grasping capabilities, robots can perform tasks that require greater flexibility and interaction.'),
  block('Typical embodied AI scenarios include:'),
  numbered('Humanoid robot operation'),
  numbered('Remote manipulation and teleoperation'),
  numbered('Research and AI data collection'),
  numbered('Human-robot interaction'),
  numbered('Flexible object handling'),
  block('These technologies help robots move beyond simple pick-and-place actions toward more intelligent and adaptive operation.'),
]

const featured = await client.fetch(`*[_type == "news" && featured == true][0]{ _id, title }`)

if (!featured) {
  console.log('No featured post found. Updating first post instead...')
  const first = await client.fetch(`*[_type == "news"][0]{ _id, title }`)
  await client.patch(first._id).set({ content: richContent, featured: true }).commit()
  console.log(`✓ Updated: "${first.title}"`)
} else {
  await client.patch(featured._id).set({ content: richContent }).commit()
  console.log(`✓ Updated: "${featured.title}"`)
}
