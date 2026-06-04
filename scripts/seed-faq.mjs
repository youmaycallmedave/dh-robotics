import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '0ufm7kaw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk4VoEzagCwLkF2EJFnpn5xTpMIkbmWibz1wHrFepXnAVfB5m0mYaA2OXyTHJH4k0BqrInQRy1vTL9pm21zGQDgQwBdrRJcpctum4csokoFEUlN1bQNIHLH0ZNvOlUblTDnmymTNXYZ8FD0nBgkxpK1aaB4BXiwbpn5vtG2T9KN1ow4O66VZ',
  useCdn: false,
})

function key() { return Math.random().toString(36).slice(2, 10) }

const groups = [
  {
    title: '01. AE.1™ Details & Specs',
    order: 1,
    items: [
      { question: 'What is an Electric Linear Actuator?', answer: 'An electric linear actuator converts electrical energy into precise linear motion, ensuring desired movement in a straight line. Compared to pneumatic or hydraulic systems, electric systems provide more efficient and cleaner high-accuracy motion control.' },
      { question: 'How Does a Linear Electric Actuator Work?', answer: 'An electric linear can convert electrical energy into precise linear motion, thus ensuring desired movement in a straight line. Compared to pneumatic or hydraulic systems, electric systems provide more efficient and cleaner high-accuracy motion control. Featuring high precision and repeatability, it has a wide application in industrial automation, robotics, and intelligent manufacturing.' },
      { question: 'Industrial Applications for Electric Linear Actuators', answer: 'Electric linear actuators are widely used in industrial automation, robotics, semiconductor manufacturing, medical equipment, and precision assembly lines where repeatable, accurate linear motion is required.' },
      { question: 'Why Choose DH-Robotics Linear Electric Actuators?', answer: 'DH-Robotics actuators offer industry-leading precision, reliability, and integration with modern control systems. Our products are designed for demanding industrial environments and backed by comprehensive technical support.' },
    ],
  },
  {
    title: '02. Charging & Energy',
    order: 2,
    items: [
      { question: 'What is an Electric Linear Actuator?', answer: 'An electric linear actuator converts electrical energy into precise linear motion.' },
      { question: 'How Does a Linear Electric Actuator Work?', answer: 'Electric energy is converted to mechanical motion via a motor and lead screw or belt mechanism.' },
      { question: 'Industrial Applications for Electric Linear Actuators', answer: 'Used across automation, robotics, and precision manufacturing sectors.' },
      { question: 'Why Choose DH-Robotics Linear Electric Actuators?', answer: 'Superior precision, reliability, and support from our engineering team.' },
    ],
  },
  {
    title: '03. Ownership & Service',
    order: 3,
    items: [
      { question: 'What is an Electric Linear Actuator?', answer: 'An electric linear actuator converts electrical energy into precise linear motion.' },
      { question: 'How Does a Linear Electric Actuator Work?', answer: 'Via a motor driving a lead screw or belt system to produce controlled linear displacement.' },
      { question: 'Industrial Applications for Electric Linear Actuators', answer: 'Automation, robotics, medical devices, and semiconductor equipment.' },
      { question: 'Why Choose DH-Robotics Linear Electric Actuators?', answer: 'Quality, precision, and a dedicated service network worldwide.' },
    ],
  },
  {
    title: '04. Purchasing',
    order: 4,
    items: [
      { question: 'What is an Electric Linear Actuator?', answer: 'A device that produces linear motion from electrical input.' },
      { question: 'How Does a Linear Electric Actuator Work?', answer: 'A motor drives a screw or belt which translates rotational motion into linear displacement.' },
      { question: 'Industrial Applications for Electric Linear Actuators', answer: 'Widely used across manufacturing, robotics, and automation.' },
      { question: 'Why Choose DH-Robotics Linear Electric Actuators?', answer: 'Best-in-class performance with flexible purchasing options.' },
    ],
  },
  {
    title: '05. Company Information',
    order: 5,
    items: [
      { question: 'What is an Electric Linear Actuator?', answer: 'A device converting electrical energy to precise linear motion.' },
      { question: 'How Does a Linear Electric Actuator Work?', answer: 'Through a motor-driven mechanism that translates rotation into linear movement.' },
      { question: 'Industrial Applications for Electric Linear Actuators', answer: 'Automation, robotics, medical, semiconductor, and precision assembly.' },
      { question: 'Why Choose DH-Robotics Linear Electric Actuators?', answer: 'DH-Robotics is a leading provider of precision motion control solutions trusted by global manufacturers.' },
    ],
  },
]

const existing = await client.fetch(`*[_type == "faqGroup"]._id`)
if (existing.length > 0) {
  const tx = client.transaction()
  existing.forEach(id => tx.delete(id))
  await tx.commit()
  console.log(`Deleted ${existing.length} existing FAQ groups`)
}

const tx = client.transaction()
groups.forEach(g => {
  tx.create({
    _type: 'faqGroup',
    title: g.title,
    order: g.order,
    items: g.items.map(i => ({ _type: 'object', _key: key(), question: i.question, answer: i.answer })),
  })
})
await tx.commit()
console.log('Done! 5 FAQ groups created.')
