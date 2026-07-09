import { NextResponse } from 'next/server';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export async function GET() {
  const content = `# ${SITE_NAME}
> ${SITE_DESCRIPTION}

## About The Lav Forge
We are an elite World of Warcraft Addon and WeakAura development studio. We specialize in building private addons from scratch for competitive players, Mythic+ pushers, and professional gold farmers.

## Authoritative Guides

### What is a World of Warcraft Addon?
A World of Warcraft addon is a custom piece of software that modifies the game's default User Interface (UI). Since its initial launch in 2004, Blizzard Entertainment has allowed players to write scripts in Lua that interact with the game engine to display information, automate UI tasks, and completely overhaul how the game looks and feels.

At the highest levels of competitive play, information processing is the only bottleneck. Custom addons solve this by converting raw game data into an actionable tactical advantage.

### WeakAuras vs Custom Addons
WeakAuras is a powerful addon framework capable of displaying complex visuals and running advanced Lua logic. While WeakAuras is excellent for tracking buffs, debuffs, and cooldowns, a custom addon built from scratch is often better for complex, full-screen UI overhauls, advanced auction house automation, and proprietary guild tools that require extreme performance and zero bloat.

### Programming Languages for WoW Addons
World of Warcraft addons are built using two languages:
1. **Lua**: The logic language. It handles all the math, API calls, event handling, and data processing.
2. **XML**: The structural language. It defines the frames, buttons, and layouts of the user interface.

## Contact and Services
For inquiries regarding custom addon development, please join our Discord server or contact us via our website.

- **Discord**: https://discord.gg/yESkPhPBZn
- **Website**: ${SITE_URL}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
