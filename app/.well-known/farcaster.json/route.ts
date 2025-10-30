import { minikitConfig } from '@/minikit.config';
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: minikitConfig.accountAssociation,
    frame: {
      version: "1", // changed from "1.0.0"
      name: minikitConfig.miniapp.name,
      iconUrl: minikitConfig.miniapp.iconUrl,
      homeUrl: minikitConfig.miniapp.homeUrl,
      imageUrl: minikitConfig.miniapp.heroImageUrl,
      buttonTitle: "Open Calendar",
      splashImageUrl: minikitConfig.miniapp.splashImageUrl,
      splashBackgroundColor: minikitConfig.miniapp.splashBackgroundColor,
      webhookUrl: minikitConfig.miniapp.webhookUrl,
    },
    baseBuilder: {
      ownerAddress: "0x0EC8f545AFBE870092B0e65165FffFeE8c29C688",
    },
  };

  return NextResponse.json(manifest);
}
