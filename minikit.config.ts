export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "Birthday Calendar",
    description: "A simple app to track and celebrate birthdays 🎂", // ✅ Added
    ogTitle: "Birthday Calendar", // ✅ Added
    ogDescription: "Never miss a birthday again! 🎉", // ✅ Added
    iconUrl: "/icon.png",
    homeUrl: "https://your-vercel-url.vercel.app",
    heroImageUrl: "/hero.png",
    splashImageUrl: "/splash.png",
    splashBackgroundColor: "#ffffff",
    webhookUrl: "https://your-vercel-url.vercel.app/api/webhook"
  },
};
