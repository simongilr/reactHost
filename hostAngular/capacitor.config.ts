/* import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
 */

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Host App',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // url: 'http://192.168.1.52:8080',
  },
  plugins: {
    FederatedCapacitor: {
      liveUpdatesKey: '',
      shell: {
        name: 'shell',
      },
      apps: [
        {
          name: 'about',
          webDir: '../about/dist',
        },
        {
          name: 'list',
          webDir: '../list/dist',
        },
      ],
    },
  },
};

export default config;
