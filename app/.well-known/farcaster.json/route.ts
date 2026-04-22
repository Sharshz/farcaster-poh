import { NextConfig } from 'next';

export async function GET() {
  const appUrl = process.env.APP_URL || 'https://example.com';
  
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMmVmNzkwRGQ3OTkzQTM1ZkQ4NDdDMDUzRURkQUU5NDBEMDU1NTk2In0",
      payload: "eyJkb21haW4iOiJhcHAuZXhhbXBsZS5jb20ifQ",
      signature: "MHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAyMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwYzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxNzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEyNDdhNDhlZGJmMTMwZDU0MmIzMWQzZTg1ZDUyOTAwMmEwNDNkMjM5NjZiNWVjNTNmYjhlNzUzZmIyYzc1MWFmNTI4MWFiYTgxY2I5ZDE3NDAyY2YxMzQxOGI2MTcwYzFiODY3OTExZDkxN2UxMzU3MmVkMWIwYzNkYzEyM2Q1ODAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjVmMTk4MDg2YjJkYjE3MjU2NzMxYmM0NTY2NzNiOTZiY2VmMjNmNTFkMWZiYWNkZDdjNDM3OWVmNjU0NjU1NzJmMWQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOGE3YjIyNzQ3OTcwNjUyMjNhMjI3NzY1NjI2MTc1NzQ2ODZlMmU2NzY1NzQyMjJjMjI2MzY4NjE2YzZjNjU2ZTY3NjUyMjNhMjI2NDJkMzQ0YjMzMzMzNjUyNDY3MDc0MzE0NTYxNjQ2Yjc1NTE0ODU3NDg2ZDc5Mzc1Mzc1Njk2YjQ0MzI0ZjM1NGE2MzRhNjM2YjVhNGM3NDUzMzczODIyMmMyMjZmNzI2OTY3Njk2ZTIyM2EyMjY4NzQ3NDcwNzMzYTJmMmY2YjY1Nzk3MzJlNjM2ZjY5NmU2MjYxNzM2NTJlNjM2ZjYmZTIyM2EyMjYzNzI2ZjczNzM0ZjcyNjk2NzY5NmUyMjNhNjY2MTY3MzY1N2QwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA"
    },
    miniapp: {
      version: "1",
      name: "PoH Verify",
      homeUrl: appUrl,
      iconUrl: `https://picsum.photos/seed/poh-icon/512/512`,
      splashImageUrl: `https://picsum.photos/seed/poh-splash/512/512`,
      splashBackgroundColor: "#000000",
      webhookUrl: `${appUrl}/api/webhook`,
      subtitle: "Verify your humanity",
      description: "A fast, secure way to verify your proof of humanity on Farcaster.",
      screenshotUrls: [
        `https://picsum.photos/seed/poh-ss1/800/1200`
      ],
      primaryCategory: "social",
      tags: ["poh", "web3", "identity", "base", "farcaster"],
      heroImageUrl: `https://picsum.photos/seed/poh-hero/1200/630`,
      tagline: "Be real on Base",
      ogTitle: "PoH Verify",
      ogDescription: "Verify your humanity on Farcaster.",
      ogImageUrl: `https://picsum.photos/seed/poh-og/1200/630`,
      noindex: true
    }
  };

  return Response.json(manifest);
}
