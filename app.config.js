const defaults = {
  version: "0.1.66",
  jsEngine: "hermes",
  platforms: [
    "ios",
    "android"
  ],
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "cover"
  },
  ios: {
    infoPlist: {
      NSLocationWhenInUseUsageDescription: "This app uses your location to show your proximity to your courts.",
      NSLocationAlwaysUsageDescription: "This app uses your location to show your proximity to your courts.",
      NSLocationUsageDescription: "This app uses your location to show your proximity to your courts.",
      NSCameraUsageDescription: "We need to access your camera so you can take a picture of your team.",
      NSPhotoLibraryUsageDescription: "We need access so you can choose a team picture from your camera roll.",
      NSPhotoLibraryAddUsageDescription: "We need access so you can choose a team picture from your camera roll."
    },
  },
  android: {
    versionCode: 34,
    blockedPermissions: ['android.permission.READ_MEDIA_IMAGES', 'android.permission.READ_MEDIA_VIDEO'
    ],
    permissions: [
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
      "CAMERA"
    ],
  },
  expo: {
    plugins: [
      [
        "react-native-maps", 
         "expo-font", 
         "expo-asset"
      ]
    ]
  }
}

export default () => {
  const variants = {
    develop: {
      name: 'Hoopfest Develop',
      slug: 'spokane-hoopfest',
      description: "",
      version: defaults.version,
      privacy: "public",
      userInterfaceStyle: "automatic",
      jsEngine: defaults.jsEngine,
      orientation: "portrait",
      icon: "./src/assets/images/appstore.develop.png",
      splash: defaults.splash,
      platforms: defaults.platforms,
      web: defaults.web,
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        bundleIdentifier: 'com.hoopfest.develop',
        runtimeVersion: "1.0.0",
        image: "latest",
        supportsTablet: false,
        requireFullScreen: true,
        infoPlist: defaults.ios.infoPlist
      },
      android: {
        package: 'com.hoopfest.develop',
        versionCode: defaults.android.versionCode,
        permissions: defaults.android.permissions,
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON_DEVELOP,
        runtimeVersion: {
          policy: "appVersion"
        },
        config: {
          googleMaps: {
            apiKey: "AIzaSyBv-OFKfkH-xDZ_8fJtYQZwZmOHAHKa91k"
          }
        }
      },
      updates: {
        fallbackToCacheTimeout: 0,
        url: "https://u.expo.dev/550d5b25-6f54-432a-bf7c-e01051912ad9"
      },
      extra: {
        eas: {
          projectId: "550d5b25-6f54-432a-bf7c-e01051912ad9"
        }
      },

      plugins: [
        "expo-build-properties",
      ]
    },
    stage: {
      name: 'Hoopfest-Stage',
      slug: 'spokane-hoopfest',
      description: "",
      version: defaults.version,
      privacy: "public",
      userInterfaceStyle: "automatic",
      jsEngine: defaults.jsEngine,
      orientation: "portrait",
      icon: "./src/assets/images/appstore.stage.png",
      splash: defaults.splash,
      platforms: defaults.platforms,
      web: defaults.web,
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        bundleIdentifier: 'com.hoopfest.staging',
        runtimeVersion: "1.0.0",
        supportsTablet: false,
        requireFullScreen: true,
        image: "latest",
        infoPlist: defaults.ios.infoPlist
      },
      // android: {
      //     package: 'com.hoopfest.stage',
      //     versionCode: defaults.android.versionCode,
      //     permissions: defaults.android.permissions,
      //     googleServicesFile: process.env.GOOGLE_SERVICES_JSON_STAGE,
      //     runtimeVersion: {
      //         policy: "appVersion"
      //     },
      //     config: {
      //         googleMaps: {
      //             apiKey: "AIzaSyBv-OFKfkH-xDZ_8fJtYQZwZmOHAHKa91k"
      //         }
      //     }
      // },
      updates: {
        fallbackToCacheTimeout: 0,
        url: "https://u.expo.dev/550d5b25-6f54-432a-bf7c-e01051912ad9"
      },
      extra: {
        eas: {
          projectId: "550d5b25-6f54-432a-bf7c-e01051912ad9"
        }
      },
      plugins: [
        "expo-build-properties"
      ]
    },
    main: {
      name: 'Hoopfest',
      slug: 'spokane-hoopfest',
      description: "",
      version: defaults.version,
      privacy: "public",
      userInterfaceStyle: "automatic",
      jsEngine: defaults.jsEngine,
      orientation: "portrait",
      icon: "./src/assets/images/appstore.png",
      splash: defaults.splash,
      platforms: defaults.platforms,
      web: defaults.web,
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        bundleIdentifier: 'com.hoopfest.production',
        runtimeVersion: "1.0.0",
        image: "latest",
        supportsTablet: false,
        requireFullScreen: true,
        infoPlist: defaults.ios.infoPlist
      },
      android: {
        package: 'com.hoopfest.stage',
        versionCode: defaults.android.versionCode,
        permissions: defaults.android.permissions,
        blockedPermissions: defaults.android.blockedPermissions,
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON_MAIN,
        runtimeVersion: {
          policy: "appVersion"
        },
        config: {
          googleMaps: {
            apiKey: "AIzaSyBv-OFKfkH-xDZ_8fJtYQZwZmOHAHKa91k"
          }
        }
      },
      updates: {
        fallbackToCacheTimeout: 0,
        url: "https://u.expo.dev/550d5b25-6f54-432a-bf7c-e01051912ad9"
      },
      extra: {
        eas: {
          projectId: "550d5b25-6f54-432a-bf7c-e01051912ad9"
        }
      },
      plugins: [
        "expo-build-properties"
      ]
    }
  }

  let v = process.env.APP_VARIANT
  const config = variants[v
  ]

  return config
}