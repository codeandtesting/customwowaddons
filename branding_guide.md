# Branding Your WoW Addon: A Guide to Custom Logos & Icons

So, you've built a killer addon for World of Warcraft—congrats! But is it *really* finished if it doesn't have its own custom branding? Whether you want a unique minimap button or a professional-looking icon in the AddOns list, custom textures are the way to go. 

In this guide, we'll walk through the exact steps we just used to brand the **Smiling Friends** Hub.

---

## 1. The Ingredients: Proper File Formats

WoW is an old-school engine, and it’s very picky about its graphics. If your image doesn't meet these criteria, it will either show up as a green box or not show up at all.

### Step A: Dimensions (Power of 2)
Your image **must** have dimensions that are a power of 2. 
- **Good:** 16x16, 32x32, 64x64, 128x128, 256x256. 
- **Bad:** 100x100, 50x50, 48x48.

### Step B: The File Format
You have two choices for formats:
- **.TGA (Truevision Graphics Adapter):** The most common choice. Save it as **32-bit** (to include an alpha channel for transparency) and **uncompressed**.
- **.BLP (Blizzard Texture):** This is WoW's proprietary format. Great for performance, but you'll need a converter (like *BLPConv*) to create them.

---

## 2. Setting the Scene: Folder Structure

Keep your files organized! For **Smiling Friends**, we placed our logo here:
`Interface\AddOns\SmilingFriends\UI\logo.tga`

> [!TIP]
> Always place custom textures inside your own AddOn’s folder to prevent conflicts with other mods.

---

## 3. Making it Official: The `.toc` File

To make your icon appear in the **Interface Options** menu and the **AddOn list** at the character select screen, you need to add a specialized tag to your `.toc` file.

**Before:**
`## IconTexture: 134400` (A generic WoW icon ID)

**After:**
`## IconTexture: Interface\AddOns\SmilingFriends\UI\logo`

> [!IMPORTANT]
> **Restart Required!** Changes to the `.toc` file are only read when the game first starts. You cannot simply `/reload` to see a metadata change here.

---

## 4. The Magic Touch: Referencing in Lua

Now, let's look at how to actually put that logo on the screen—specifically for the **Minimap Button**.

In your UI code (like `Minimap.lua`), you'll find where your button's icon texture is created. You just need to point `SetTexture` to your custom path:

```lua
-- In Minimap.lua
local icon = minimapButton:CreateTexture(nil, "ARTWORK")

-- Points to your custom TGA/BLP file (omit the extension!)
icon:SetTexture("Interface\\AddOns\\SmilingFriends\\UI\\logo")

icon:SetSize(20, 20)
icon:SetPoint("TOPLEFT", minimapButton, "TOPLEFT", 7, -6)
```

**Pro Tip:** Notice that in the Lua code, we use **double backslashes** (`\\`) for the path, because a single backslash is an "escape character" in Lua.

---

## 5. Seeing the Results

1. **If you only changed the Lua code:** Simply type `/reload` in game. Your minimap button should update instantly.
2. **If you added a new file or changed the `.toc`:** You must close WoW completely and restart the client.

And there you have it! Your addon now has that premium, custom feel that makes it stand out from the crowd. 

Happy coding! 🚀
