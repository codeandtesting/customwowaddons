export interface PseoPageData {
  slug: string;
  serviceType: string;
  expansion: string;
  h1: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  faqs: { question: string; answer: string }[];
}

// Matrices
const services = [
  // Core Services
  { id: "custom-addon", name: "Custom Addon Development" },
  { id: "weakaura-suite", name: "WeakAura Suite" },
  { id: "ui-overhaul", name: "Complete UI Overhaul" },
  { id: "plater-profile", name: "Custom Plater Profile" },
  { id: "elvui-profile", name: "ElvUI Customization Profile" },
  { id: "details-meter-customization", name: "Details! Damage Meter Customization" },
  { id: "custom-hud", name: "Custom HUD Development" },
  { id: "custom-unit-frames", name: "Custom Unit Frames" },
  { id: "custom-action-bars", name: "Custom Action Bars" },
  
  // Gameplay & PvE
  { id: "custom-raid-addon", name: "Custom Raid Addon" },
  { id: "mythic-plus-weakauras", name: "Custom WeakAuras for Mythic+" },
  { id: "raiding-weakauras", name: "Custom WeakAuras for Raiding" },
  { id: "combat-log-analyzer", name: "Custom Combat Log Analyzer" },
  { id: "damage-meter-addon", name: "Custom Damage Meter Addon" },
  { id: "healer-raid-frames", name: "Custom Healer Raid Frames" },
  { id: "threat-meter-addon", name: "Custom Threat Meter Addon" },
  { id: "boss-mods-addon", name: "Custom Boss Mods Addon" },
  { id: "dungeon-tracker", name: "Custom Dungeon Tracker" },
  { id: "mythic-plus-timer", name: "Mythic+ Timer Addon" },
  
  // PvP & Arena
  { id: "custom-pvp-addon", name: "Custom PvP Addon" },
  { id: "arena-target-tracker", name: "Arena Target Tracker Addon" },
  { id: "battleground-map-addon", name: "Battleground Map Addon" },
  { id: "diminishing-returns-tracker", name: "Diminishing Returns Tracker" },
  { id: "enemy-cooldown-tracker", name: "Enemy Cooldown Tracker" },
  { id: "gladiator-ui", name: "Gladiator UI Suite" },
  
  // Economy, Guilds & Crafting
  { id: "guild-management-addon", name: "Custom Guild Management Addon" },
  { id: "auction-house-addon", name: "Custom Auction House Addon" },
  { id: "loot-distribution-addon", name: "Custom Loot Distribution Addon" },
  { id: "gold-farming-route", name: "Gold Farming Route Addon" },
  { id: "dkp-system-addon", name: "Custom DKP System Addon" },
  { id: "epgp-loot-addon", name: "Custom EPGP Loot Addon" },
  { id: "profession-tracker", name: "Custom Profession Tracker" },
  { id: "crafting-cost-calculator", name: "Crafting Cost Calculator Addon" },
  { id: "inventory-manager", name: "Custom Inventory Management Addon" },
  
  // Niche & RP
  { id: "casino-addon", name: "Custom Casino Addon" },
  { id: "mini-game-addon", name: "Custom Mini-Game Addon" },
  { id: "roleplay-addon", name: "Custom RP Addon" },
  { id: "transmog-helper", name: "Transmog Helper Addon" },
  { id: "custom-quest-tracker", name: "Custom Quest Tracker" },
  { id: "custom-tooltip-addon", name: "Custom Tooltip Addon" },
  { id: "pet-battle-addon", name: "Custom Pet Battle Addon" },
  { id: "achievement-tracker", name: "Custom Achievement Tracker" },
  { id: "mount-collector-addon", name: "Mount Collector Addon" },
  { id: "chat-filter-addon", name: "Custom Chat Filter Addon" },
  { id: "streamer-ui", name: "Twitch Streamer UI Addon" },
  
  // Classes
  { id: "warrior-addon", name: "Custom Addon for Warrior" },
  { id: "paladin-addon", name: "Custom Addon for Paladin" },
  { id: "hunter-addon", name: "Custom Addon for Hunter" },
  { id: "rogue-addon", name: "Custom Addon for Rogue" },
  { id: "priest-addon", name: "Custom Addon for Priest" },
  { id: "death-knight-addon", name: "Custom Addon for Death Knight" },
  { id: "shaman-addon", name: "Custom Addon for Shaman" },
  { id: "mage-addon", name: "Custom Addon for Mage" },
  { id: "warlock-addon", name: "Custom Addon for Warlock" },
  { id: "monk-addon", name: "Custom Addon for Monk" },
  { id: "druid-addon", name: "Custom Addon for Druid" },
  { id: "demon-hunter-addon", name: "Custom Addon for Demon Hunter" },
  { id: "evoker-addon", name: "Custom Addon for Evoker" },
  
  // Class Specific WeakAuras
  { id: "tank-weakauras", name: "Custom Tank WeakAuras" },
  { id: "healer-weakauras", name: "Custom Healer WeakAuras" },
  { id: "melee-dps-weakauras", name: "Custom Melee DPS WeakAuras" },
  { id: "ranged-dps-weakauras", name: "Custom Ranged DPS WeakAuras" },
  
  // Consulting
  { id: "wow-api-consulting", name: "WoW API & Lua Consulting" },
  { id: "addon-debugging-service", name: "Addon Debugging & Fixing Service" },
  { id: "lua-code-review", name: "Lua Code Review Service" },
  { id: "wow-addon-updating", name: "WoW Addon Updating Service" },
];

const expansions = [
  // Retail / Modern
  { id: "retail", name: "World of Warcraft Retail" },
  { id: "the-war-within", name: "The War Within" },
  { id: "wow-midnight", name: "WoW Midnight Expansion" },
  { id: "the-last-titan", name: "WoW The Last Titan Expansion" },
  { id: "mists-of-pandaria-remix", name: "Mists of Pandaria Remix" },
  
  // Classic / Seasonal
  { id: "wow-classic", name: "WoW Classic" },
  { id: "classic-era", name: "WoW Classic Era" },
  { id: "wow-hardcore", name: "WoW Hardcore" },
  { id: "season-of-discovery", name: "Season of Discovery" },
  { id: "cataclysm-classic", name: "Cataclysm Classic" },
  { id: "wotlk-classic", name: "Wrath of the Lich King Classic" },
  { id: "tbc-classic", name: "The Burning Crusade Classic" },
  { id: "mop-classic", name: "Mists of Pandaria Classic" },
  
  // Specialized
  { id: "private-servers", name: "3.3.5a Private Servers" },
];

// Generate the database
export const pseoServicesDatabase: PseoPageData[] = [];

services.forEach((service) => {
  expansions.forEach((expansion) => {
    const slug = `${service.id}-for-${expansion.id}`;
    
    pseoServicesDatabase.push({
      slug,
      serviceType: service.name,
      expansion: expansion.name,
      h1: `Professional ${service.name} for ${expansion.name}`,
      shortDescription: `Get a pixel-perfect, highly optimized ${service.name} tailored specifically for ${expansion.name}. Built by expert Lua developers.`,
      longDescription: `Are you looking for a completely custom and highly optimized ${service.name} for ${expansion.name}? The Lav Forge specializes in building bespoke tools, interfaces, and scripts that perfectly align with your gameplay needs. Whether you are pushing high-end PvE content, dominating PvP brackets, or simply wanting a cleaner interface, our expert Lua developers will craft the perfect solution.`,
      features: [
        `Fully tailored for ${expansion.name} API and mechanics`,
        "Zero-taint code architecture to prevent UI errors",
        "Optimized for maximum FPS and minimum memory usage",
        "Custom textures, animations, and sound triggers",
        "Lifetime bug-fixing support for major patches"
      ],
      faqs: [
        {
          question: `Does this ${service.name} work with the latest ${expansion.name} patch?`,
          answer: `Yes, every ${service.name} we develop is fully tested and guaranteed to work with the latest ${expansion.name} patch seamlessly. We strictly follow Blizzard's API guidelines.`
        },
        {
          question: "How long does the development process take?",
          answer: "Depending on the complexity, initial prototypes are usually ready within 3-5 days. More complex projects involving custom textures or deep API integrations may take 1-2 weeks."
        },
        {
          question: "What if Blizzard updates the game and breaks the addon?",
          answer: "We offer maintenance and update packages to ensure your tools remain fully functional across major content updates and API changes."
        }
      ]
    });
  });
});

export function getPseoServiceBySlug(slug: string): PseoPageData | undefined {
  return pseoServicesDatabase.find((page) => page.slug === slug);
}
