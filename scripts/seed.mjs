import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '0ufm7kaw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const newsItems = [
  {
    title: 'DH-Robotics First Launched high-precision "zero backlash" rotary Electric Gripper breaks the product application boundary',
    category: 'news',
    date: '2022-01-11',
    featured: true,
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'Embodied AI is rapidly evolving from research concepts into practical industrial applications. As humanoid robots, dexterous hands, and intelligent manipulation systems continue to advance, manufacturers are beginning to explore how these technologies can improve productivity, flexibility, and automation efficiency.' }], markDefs: [] },
      { _type: 'block', style: 'h4', _key: 'b2', children: [{ _type: 'span', _key: 's2', text: 'Embodied AI Is Moving Into Real Industrial Environments' }], markDefs: [] },
      { _type: 'block', style: 'normal', _key: 'b3', children: [{ _type: 'span', _key: 's3', text: 'At DH-Robotics, we are seeing this transition happen in real time. Our dexterous hands, electric grippers, and adaptive gripping solutions are already being integrated into embodied AI projects across automotive manufacturing, 3C electronics assembly, logistics handling, research platforms, and humanoid robot applications.' }], markDefs: [] },
    ],
  },
  {
    title: 'DH-Robotics AG Adaptive Gripper: A Versatile Solution from Precision Industry to Embodied Intelligence',
    category: 'news',
    date: '2022-01-11',
    featured: false,
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'The AG Adaptive Gripper represents a breakthrough in industrial automation, combining precision force control with flexible adaptation to various object shapes and sizes.' }], markDefs: [] },
      { _type: 'block', style: 'h4', _key: 'b2', children: [{ _type: 'span', _key: 's2', text: 'Key Features' }], markDefs: [] },
      { _type: 'block', style: 'normal', _key: 'b3', children: [{ _type: 'span', _key: 's3', text: 'With its compact size and high working speed, the AG Series has become the go-to solution for manufacturers looking to automate complex assembly tasks without compromising on accuracy.' }], markDefs: [] },
    ],
  },
  {
    title: 'AG Adaptive Grippers Supporting Robotics Training at Automation Lab in Bangladesh',
    category: 'news',
    date: '2022-01-11',
    featured: false,
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: "DH-Robotics is proud to support Kranti's Automation Lab in Bangladesh, providing AG Series grippers for hands-on robotics training and education." }], markDefs: [] },
    ],
  },
  {
    title: 'How Does an Electric Gripper Work?',
    category: 'insights',
    date: '2022-01-11',
    featured: false,
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'Electric grippers operate through a servo motor that drives the gripper fingers via a precision lead screw mechanism. Unlike pneumatic grippers, electric grippers provide real-time force feedback and position control.' }], markDefs: [] },
      { _type: 'block', style: 'h4', _key: 'b2', children: [{ _type: 'span', _key: 's2', text: 'The Mechanics Behind Electric Gripping' }], markDefs: [] },
      { _type: 'block', style: 'normal', _key: 'b3', children: [{ _type: 'span', _key: 's3', text: 'The key advantage is programmable force control — the gripper can apply precisely the right amount of force for fragile components, preventing damage while ensuring secure handling.' }], markDefs: [] },
    ],
  },
  {
    title: 'The Future of Remote Handling with Advanced Dexterous Hands',
    category: 'insights',
    date: '2022-01-11',
    featured: false,
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'As teleoperation and remote manipulation become increasingly important in hazardous environments, dexterous hands are at the forefront of this technological revolution.' }], markDefs: [] },
      { _type: 'block', style: 'h4', _key: 'b2', children: [{ _type: 'span', _key: 's2', text: 'Applications in Hazardous Environments' }], markDefs: [] },
      { _type: 'block', style: 'normal', _key: 'b3', children: [{ _type: 'span', _key: 's3', text: 'From nuclear facility maintenance to deep-sea exploration, DH-Robotics dexterous hands enable operators to perform complex manipulation tasks remotely with human-like dexterity.' }], markDefs: [] },
    ],
  },
  {
    title: 'Enhancing Dexterity with Neural Network-Based Motion Planning in Robotic Hands',
    category: 'insights',
    date: '2022-01-11',
    featured: false,
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'Neural network-based motion planning represents the next frontier in robotic manipulation, enabling hands to learn from human demonstration and adapt to novel objects.' }], markDefs: [] },
    ],
  },
  {
    title: 'How Electric Actuators Are Transforming Modern Industrial Automation Workflows',
    category: 'insights',
    date: '2023-03-15',
    featured: false,
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'The shift from pneumatic to electric actuators is accelerating across manufacturing sectors, driven by demands for higher precision, energy efficiency, and data-driven control.' }], markDefs: [] },
      { _type: 'block', style: 'h4', _key: 'b2', children: [{ _type: 'span', _key: 's2', text: 'Why Electric Beats Pneumatic' }], markDefs: [] },
      { _type: 'block', style: 'normal', _key: 'b3', children: [{ _type: 'span', _key: 's3', text: 'Electric actuators eliminate the need for compressors and air lines, reducing energy consumption by up to 70% while providing superior repeatability and programmability.' }], markDefs: [] },
    ],
  },
  {
    title: 'The Science of Force Control: Why Precision Matters in Modern Assembly',
    category: 'insights',
    date: '2023-02-20',
    featured: false,
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'Force control is not just about preventing damage — it is about enabling robots to perform tasks that previously required human touch and judgment.' }], markDefs: [] },
    ],
  },
  {
    title: 'Enhancing Dexterity with Real-Time Haptic Feedback in Robotic Hands',
    category: 'news',
    date: '2022-01-11',
    featured: false,
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'Real-time haptic feedback enables robotic hands to sense and respond to contact forces, slippage, and texture — bringing machine manipulation closer to human capability.' }], markDefs: [] },
    ],
  },
  {
    title: 'Learning from Demonstration: Teaching Dexterous Hands Through Human Motion Capture',
    category: 'news',
    date: '2022-01-11',
    featured: false,
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'Motion capture technology is revolutionizing how we program robotic hands. By recording human hand movements and translating them to robot trajectories, we can transfer complex manipulation skills in hours rather than weeks.' }], markDefs: [] },
    ],
  },
]

const eventItems = [
  {
    title: 'DH-Robotics Shines at Productronica China, Pioneering Smart Manufacturing Breakthroughs!',
    tag: 'past',
    date: '2025-03-31',
    location: 'Shanghai',
    time: '9:00 am – 6:00 pm',
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'On March 26, 2025, the three-day Productronica China officially kicked off at the Shanghai New International Expo Centre, bringing together cutting-edge technologies and an electrifying atmosphere that captivated attendees.' }], markDefs: [] },
      { _type: 'block', style: 'h4', _key: 'b2', children: [{ _type: 'span', _key: 's2', text: 'Driving Innovation, Leading the Future of Smart Manufacturing' }], markDefs: [] },
      { _type: 'block', style: 'normal', _key: 'b3', children: [{ _type: 'span', _key: 's3', text: 'DH-Robotics showcased groundbreaking innovations including Dexterous Intelligence with Dual-Hand Coordination, the iFM Intelligent Flexible Motion System, and High-Speed Precision Compound Motion Demonstrations.' }], markDefs: [] },
    ],
  },
  {
    title: 'DH-Robotics at Hannover Messe 2025 — Industrial Automation Forum',
    tag: 'future',
    date: '2025-04-05',
    location: 'Hannover, Germany',
    time: '10:00 am – 5:00 pm',
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'DH-Robotics will exhibit at Hannover Messe 2025, the world\'s leading trade fair for industrial technology. Visit us at Hall 9, Booth C24 to see our latest electric gripper innovations.' }], markDefs: [] },
    ],
  },
  {
    title: 'The University of Hong Kong Team Wins the Agile Manipulation Challenge Using PGC Collaborative Gripper',
    tag: 'past',
    date: '2025-03-31',
    location: 'Hong Kong',
    time: '8:00 am – 9:00 am',
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'The University of Hong Kong robotics team demonstrated exceptional skill at the Agile Manipulation Challenge, leveraging the PGC-140 collaborative electric gripper to achieve first place.' }], markDefs: [] },
    ],
  },
  {
    title: 'DH-Robotics Technology Summit 2025 — Embodied AI and the Future of Gripping',
    tag: 'future',
    date: '2025-06-15',
    location: 'Shenzhen',
    time: '9:00 am – 5:00 pm',
    registrationHref: '#',
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'Join us for the annual DH-Robotics Technology Summit, where industry leaders, researchers, and engineers gather to discuss the latest advances in robotic manipulation and embodied intelligence.' }], markDefs: [] },
      { _type: 'block', style: 'h4', _key: 'b2', children: [{ _type: 'span', _key: 's2', text: 'Conference Topics' }], markDefs: [] },
      { _type: 'block', style: 'normal', _key: 'b3', children: [{ _type: 'span', _key: 's3', text: 'Topics include: Force Control in Humanoid Robots, Multi-finger Coordination Algorithms, Real-time Haptic Feedback Systems, and Industrial Integration Case Studies.' }], markDefs: [] },
    ],
  },
  {
    title: 'IROS 2024 — DH-Robotics Demo at the International Robotics Exhibition',
    tag: 'past',
    date: '2024-10-14',
    location: 'Abu Dhabi',
    time: '9:00 am – 6:00 pm',
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'At IROS 2024, DH-Robotics demonstrated real-world applications of dexterous hands in unstructured environments, attracting significant attention from the global robotics research community.' }], markDefs: [] },
    ],
  },
  {
    title: 'CES 2025 — DH-Robotics Showcases Next-Gen Electric Grippers',
    tag: 'past',
    date: '2025-01-07',
    location: 'Las Vegas, USA',
    time: '10:00 am – 6:00 pm',
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'CES 2025 provided an outstanding platform for DH-Robotics to showcase its newest generation of electric grippers to a global consumer and enterprise audience.' }], markDefs: [] },
    ],
  },
  {
    title: 'Automate 2025 — North America\'s Leading Robotics Trade Show',
    tag: 'future',
    date: '2025-05-12',
    location: 'Detroit, USA',
    time: '9:00 am – 5:00 pm',
    registrationHref: '#',
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'DH-Robotics is excited to participate in Automate 2025, North America\'s largest robotics and automation showcase. We will present our complete product lineup including AG Series, EFG Series, and the DH-5 Dexterous Hand.' }], markDefs: [] },
    ],
  },
  {
    title: 'DH-Robotics Webinar: Integrating Electric Grippers in Collaborative Robot Applications',
    tag: 'future',
    date: '2025-07-10',
    location: 'Online',
    time: '2:00 pm – 3:30 pm',
    registrationHref: '#',
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'This free webinar will cover best practices for integrating DH-Robotics electric grippers with leading collaborative robot platforms including Universal Robots, FANUC, and ABB.' }], markDefs: [] },
    ],
  },
  {
    title: 'Smart Manufacturing Expo — DH-Robotics Partner Showcase',
    tag: 'past',
    date: '2024-09-20',
    location: 'Tokyo, Japan',
    time: '9:00 am – 5:00 pm',
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'DH-Robotics and its global distribution partners presented live automation demonstrations at the Smart Manufacturing Expo in Tokyo, highlighting applications in electronics assembly.' }], markDefs: [] },
    ],
  },
  {
    title: 'DH-Robotics Open Day — Factory Tour and Product Demonstration',
    tag: 'future',
    date: '2025-08-20',
    location: 'Shenzhen, China',
    time: '10:00 am – 4:00 pm',
    registrationHref: '#',
    content: [
      { _type: 'block', style: 'normal', _key: 'b1', children: [{ _type: 'span', _key: 's1', text: 'Join us for an exclusive open day at DH-Robotics headquarters. Tour our R&D and manufacturing facilities, see live product demonstrations, and meet our engineering team.' }], markDefs: [] },
    ],
  },
]

async function seed() {
  console.log('Creating news items...')
  for (const item of newsItems) {
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60)
    await client.create({
      _type: 'news',
      title: item.title,
      slug: { _type: 'slug', current: slug },
      category: item.category,
      date: item.date,
      featured: item.featured || false,
      content: item.content,
    })
    console.log(`  ✓ ${item.title.slice(0, 50)}...`)
  }

  console.log('\nCreating event items...')
  for (const item of eventItems) {
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60)
    await client.create({
      _type: 'event',
      title: item.title,
      slug: { _type: 'slug', current: slug },
      tag: item.tag,
      date: item.date,
      location: item.location,
      time: item.time,
      registrationHref: item.registrationHref || null,
      content: item.content,
    })
    console.log(`  ✓ ${item.title.slice(0, 50)}...`)
  }

  console.log('\nDone! Created', newsItems.length, 'news and', eventItems.length, 'events.')
}

seed().catch(console.error)
