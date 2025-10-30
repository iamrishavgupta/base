import { minikitConfig } from '@/minikit.config';
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: minikitConfig.accountAssociation,
    miniapp: minikitConfig.miniapp,
    baseBuilder: {
      ownerAddress: "0x0EC8f545AFBE870092B0e65165FffFeE8c29C688",
    },
  };

  return NextResponse.json(manifest);
}

