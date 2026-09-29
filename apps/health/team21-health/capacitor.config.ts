// Capacitor config — used when wrapping this site as a native Android APK
// Run: npm install, then npx cap add android, then npx cap sync, then open in Android Studio.

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'health.team21.app',
  appName: 'Team21',
  webDir: '.',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    backgroundColor: '#f5efe6'
  },
  server: {
    androidScheme: 'https',
    iosScheme: 'capacitor',
    hostname: 'app.team21.health'
  }
};

export default config;
