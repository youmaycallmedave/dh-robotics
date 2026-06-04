import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '0ufm7kaw',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
    studioUrl: 'dh-robotics',
    appId: 'fod6s1t2t3ngykmckxkpuy61',
  }
})
