import { minikitConfig } from '@/minikit.config'
import { NextResponse } from 'next/server'

export async function GET() {
  // Build manifest for Farcaster / Base Mini App
  const manifest = {
    accountAssociation: minikitConfig.accountAssociation,
    frame: {
      version: minikitConfig.miniapp.version,
      name: minikitConfig.miniapp.name,
      iconUrl: minikitConfig.miniapp.iconUrl,
      homeUrl: minikitConfig.miniapp.homeUrl,
      imageUrl: minikitConfig.miniapp.splashImageUrl,
      buttonTitle: 'Open Calendar',
      splashImageUrl: minikitConfig.miniapp.splashImageUrl,
      splashBackgroundColor: minikitConfig.miniapp.splashBackgroundColor,
      webhookUrl: minikitConfig.miniapp.webhookUrl,
    },
    baseBuilder: {
      ownerAddress: '0x0EC8f545AFBE870092B0e65165FffFeE8c29C688',
    },
  }

  // Return proper JSON response
  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
