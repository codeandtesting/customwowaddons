export const siteContent = {
  brand: "THE LAV FORGE",
  navLinks: [
    { label: "SERVICES", href: "#services" },
    { label: "EXPANSIONS", href: "#versions" },
    { label: "CAPABILITIES", href: "#capabilities" },
    { label: "WHY US", href: "#why-us" },
  ],
  hero: {
    badge: "THE LAV FORGE // ELITE WOW STUDIO",
    title: {
      part1: "CUSTOM",
      accent1: "ADDONS.",
      part2: "PRO",
      accent2: "WEAKAURAS.",
      part3: "BUILT",
      accent3: "FOR YOU.",
    },
    description: "We build custom World of Warcraft Addons and WeakAura suites from scratch. Stop settling for broken public CurseForge files. Get a custom, bug-free UI built exactly how you want it.",
    secondaryLinks: [
      { label: "[ WHAT WE DO ]", href: "#services" },
      { label: "[ VERSIONS ]", href: "#versions" },
      { label: "[ REQUEST A BUILD ]", href: "#request" },
    ],
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk-uoRFktePkkgRdbtWSGlPWlowLYAsR4-u7d2jR90lWI_1OAhtC5J9LG5EX8J2ZHTTR_lOrZbc7SDNQjpWbEiNmQ9_vcTptsW2wsCJ1QLWDwWmzfJWLayXanHRYoiP6RMtKUY_INuHGhwx1xXK5uY050pV89xJoX6ZsaUU7bU3Tin3u8D_-h8fHyqhx9Ecw6SqAMw4KWH-1WZ8C1hu28G8EMvagfpT_OoUFV4VTSiyH5iokt_3BJb-M-kYvGS9t-lywyXZnyBmSo",
  },
  services: [
    {
      id: "CORE_ENGINE",
      icon: "code",
      title: "CUSTOM ADDONS",
      description: "Full Lua development. From standalone auction scanners to custom guild trackers. Lightweight, optimized, and built to your exact specs. No bloated libraries, just pure performance.",
    },
    {
      id: "COMBAT_LOGIC",
      icon: "psychology",
      title: "PRO WEAKAURAS",
      description: "Complex WA suites. We write custom trigger logic and build raid-specific alerts that you can't find anywhere else. Predictive resource tracking and dynamic CD management.",
    },
    {
      id: "VISUAL_SYSTEMS",
      icon: "dashboard_customize",
      title: "UI SETUPS",
      description: "Complete interface overhauls. We configure ElvUI, Plater, and Details to create a clean, minimalist setup tailored to your class. Pixel-perfect alignment and professional readability.",
    },
  ],
  versions: [
    {
      title: "MIDNIGHT EXPANSION",
      description: "We script custom layout savers for the new Player Housing system, automate inventory logic, and design high-performance HUDs for the modern Retail endgame.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHEHwaczADYacp6jS7lKWfhzrr-VcX8l-NTUjkmZmK6awRPTy2SAcVxJrXkDL1nIBzPrhWugcLaPX3pQEt4_illRs99mcHitKva-bVPTqAQncsmqO8mK7SLBJPRTuZO1O2mx9tCbcIYV3txEFrIYYvsD3fz2x2Osl3gLVGNYFs_kevnV-HMpryZav6UMlnblC1zwZXUFjrWn-BeH3ncLi5rKy2Ioa2Rs1rKYO5_7SqqN3CxB4C_e_Ctjc0bscddPAQ8aqEfS4alC4",
      hoverColor: "hover:bg-[#120E8A]",
      protocol: "INITIALIZING VOID_PROTOCOL",
    },
    {
      title: "TBC ANNIVERSARY",
      description: "We build zero-lag raid frames, precise swing timers, and modern Quality-of-Life features that actually work on the Classic client. Vintage soul, modern engine.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ3g2oKR4Qt7cgner1XSQT4JU_3oGHC7m-Ow0GqC4MNQa9tm1Sfa4ThYqqao_WXt0haCkCltXB-4LtiHed-_oLfUAnqti5tR0wu2idnk2heE2qYXAM-D9C55B-402JGPoktTdaOpA6fNwApzRQadDNvRjk4UIE1lOUmB0oV9Q40D57HQHBH1lzqQWGXFuFB8-FFrRR0V_56yWz7LCS8GqXMBdSbDW1GVmPhOWdaUSLUg_0umbBKDCIEuSj9ZkZj9_x7kHR30FAibM",
      hoverColor: "hover:bg-[#3FFF00]",
      protocol: "RECALLING FEL_CHRONICLE",
    },
  ],
  whyUs: {
    title: "WHY NOT JUST USE CURSEFORGE?",
    reasons: [
      {
        id: "01_",
        title: "ZERO BLOAT",
        description: "Most public addons ship with thousands of lines of unused code. We strip everything but the essentials, reclaiming precious FPS for high-intensity mythic raiding.",
      },
      {
        id: "02_",
        title: "PATCH UPDATES",
        description: "Don't wait for an abandoned GitHub repo to update. Our development contracts include direct support for X.0 and X.X patches, ensuring your UI never breaks on reset.",
      },
      {
        id: "03_",
        title: "EXACTLY WHAT YOU WANT",
        description: "Need an addon that only tracks your guild's specific DKP system? Or a WA that triggers on a specific combat log event? If you can dream it, we can script it.",
      },
      {
        id: "04_",
        title: "1 MONTH FREE SUPPORT",
        description: "You won't feel abandoned after delivery. Found a bug? We will fix it for free during the 1-month post-delivery phase.",
      },
    ],
  },
  footer: {
    links: [
      { label: "TERMS OF SERVICE", href: "/terms" },
      { label: "PRIVACY POLICY", href: "/privacy" },
      { label: "HOW TO CREATE WOW ADDONS", href: "/how-to-create-world-of-warcraft-addon"}
    ],
    copyright: "© 2026 THE LAV FORGE. ALL RIGHTS RESERVED.",
  },
};
