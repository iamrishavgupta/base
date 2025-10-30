const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL || 'http://localhost:3000';

export const minikitConfig = {
  accountAssociation: {
    // Fill this after signing manifest
    "header": "",
    "payload": "",
    "signature": ""
  },
  miniapp: {
    version: "1",
    name: "Birthday Calendar",
    subtitle: "Never Forget a Birthday!",
    description: "Track all your friends' birthdays in one beautiful place. Get reminders and never miss celebrating with your loved ones.",
    screenshotUrls: [`${ROOT_URL}/screenshot.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/hero.png`,
    splashBackgroundColor: "#a855f7",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "productivity",
    tags: ["birthday", "calendar", "reminders", "social", "friends"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Never forget a birthday again",
    ogTitle: "Birthday Calendar - Track Friends' Birthdays",
    ogDescription: "Beautiful birthday tracking app to remember all your friends' special days",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;