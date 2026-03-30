---
title: "Why Is My WoW Addon Not Showing Up? The Most Common Mistake (and How to Fix It)"
description: "A quick guide on fixing the most common reason a World of Warcraft addon doesn't show up in the in-game AddOn list: folder and .toc name mismatches."
tags: ["World of Warcraft", "Addon Development", "Troubleshooting", "WoW Classic", "Retail WoW"]
---

# Why Is My WoW Addon Not Showing Up? The Most Common Mistake (and How to Fix It)

If you're developing a World of Warcraft addon or installing one manually, you've likely run into this frustrating scenario: you carefully drop the addon into your `Interface/AddOns` directory, boot up the game, click the "AddOns" button on the character select screen, and... **it's not there.** 

Your other addons are showing up fine, but your specific addon is completely invisible. Why does this happen?

In 90% of these cases, the issue comes down to one fundamental rule of the World of Warcraft client that is easy to overlook.

## The Problem: The Folder and `.toc` Name Mismatch

World of Warcraft has a strict requirement for how it discovers and loads addons. For the game client to recognize an addon, **the name of the addon's folder MUST exactly match the name of its `.toc` (Table of Contents) file.**

If there is even a single letter difference, an extra space, or a mismatch in casing, the game will completely ignore the addon.

### An Example of the Mistake

Let's say you are building an addon called "Services Bulletin Board". 

* You name your folder: `ServiceBoard`
* Inside that folder, you create your setup file: `ServicesBulletinBoard.toc`

When World of Warcraft scans the `AddOns` directory, it looks at the folder named `ServiceBoard` and expects to find a file named `ServiceBoard.toc` inside it. Because it finds `ServicesBulletinBoard.toc` instead, it assumes the folder is invalid or broken and skips it entirely.

## The Solution

To fix this, you simply need to make sure the folder name and the `.toc` filename are identical (excluding the `.toc` extension). 

You have two ways to resolve this:

### Option 1: Rename the Folder (Recommended)
Change the name of the folder containing your addon to match the `.toc` file.
* **Folder:** `ServicesBulletinBoard`
* **File inside:** `ServicesBulletinBoard.toc`

### Option 2: Rename the `.toc` File
Change the name of the `.toc` file to match the folder.
* **Folder:** `ServiceBoard`
* **File inside:** `ServiceBoard.toc`

*Note: If you choose Option 2, make sure to also update any build scripts or documentation that references the old `.toc` name!*

## Summary Checklist for Missing Addons

If you've fixed the naming mismatch and your addon is *still* not showing up, run through this quick checklist:

1. **Check for Double Folders:** Sometimes extracting a ZIP file creates a folder within a folder (e.g., `AddOns/MyAddon/MyAddon/MyAddon.toc`). The `.toc` file must be directly inside the first folder.
2. **Restart the Client:** WoW only scans for new addons when the game launches or when you reach the character selection screen. If you added the files while logged into a character, you need to completely log out to the character select screen (or restart the game) for it to show up.
3. **Load Out of Date Addons & The `## Interface:` Tag:** If your addon is showing up in the list but is disabled or glowing red, make sure to check the "Load out of date AddOns" box at the top right of the AddOn list. This usually means the version declared in your `.toc` file doesn't match the current game patch.

### Understanding `## Interface:` (Why Your Addon is "Out of Date")

Even if your folder and `.toc` names match perfectly, your addon might still be flagged as out-of-date. This is controlled by the very first line of your `.toc` file, which tells the game client what version(s) of WoW the addon was built for.

Often, developers want one single addon download to work across **all** versions of WoW (Retail, Classic Era, Cataclysm Classic, etc.). You can achieve this by supplying a comma-separated list of interface numbers. 

For example, a modern, multi-version addon might start like this:
```toc
## Interface: 11508, 20505, 30403, 40401, 110100, 120001
```

Here is what those numbers actually mean:
* `11508` = Classic Era / Season of Discovery (1.15.x patch)
* `20505` = Burning Crusade Classic (2.5.x patch)
* `30403` = Wrath of the Lich King Classic (3.4.x patch)
* `40401` = Cataclysm Classic (4.4.x patch)
* `110100` = Retail / The War Within (11.1.x patch)
* `120001` = Midnight / Future expansion placeholder (12.0.x patch)

By including all of these numbers in your `## Interface:` tag, the game client will recognize your addon as "up to date" no matter which version of WoW the player is logging into!

By keeping your folder names and `.toc` files perfectly synced, you'll save yourself a lot of headaches in your WoW addon development journey!
