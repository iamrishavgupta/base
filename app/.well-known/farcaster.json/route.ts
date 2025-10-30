import { minikitConfig } from '@/minikit.config';
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: minikitConfig.accountAssociation,
    frame: {
      version: "1",
      name: "Birthday Calendar",
      iconUrl: "https://base-mini-app-swart.vercel.app/icon.png",
      homeUrl: "https://base-mini-app-swart.vercel.app/",
      imageUrl: "https://base-mini-app-swart.vercel.app/hero.png",
      buttonTitle: "Open Calendar",
      splashImageUrl: "https://base-mini-app-swart.vercel.app/hero.png",
      splashBackgroundColor: "#a855f7",
      webhookUrl: "https://base-mini-app-swart.vercel.app/api/webhook",
    },
    baseBuilder: {
      ownerAddress: "0x0EC8f545AFBE870092B0e65165FffFeE8c29C688",
    },
  };

  return NextResponse.json(manifest);
}
