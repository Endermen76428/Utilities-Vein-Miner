# Utilities Vein Miner

Utilities Vein Miner is an addon that has many mining functions that will make mining easier in vanilla Minecraft and even with other addons.

[Curseforge Link](https://www.curseforge.com/minecraft-bedrock/addons/utilities-vein-miner)

[MCPEDL Link](https://www.mcpedl.com/utilities-vein-miner)

![Thumb](logo/Utilities%20Vein%20Miner%20-%20MCPEDL%20v5.3.png)


# Settings:

Hold the shift and use any vanilla pickaxe (make sure you don't look at any blocks)

Or run the command "/uvm:veinminer [function:string]", If the command doesn't have a defined function parameter, it will open the panel, but with the parameter, it will quickly switch functions without opening the panel.

- **Show Edge:** Show a white border in the selected area;
- **Show Edge When Sneaking:** Make the same thing of the option above, but don't need to hit a block to show the white border (You need to enable the "Show Edge" for this option work);
- **Function:** The method used by Vein Miner to break the blocks, (exemples below);
- **Turn Off:** A Timer to automatically disable your vein miner after some time;
- **Advanced Settings:** Open advanced settings panel.

![](doc/1.0%20-%20Settings.png)

- **Max Size:** The max amount of blocks you can break;
- **Thickness:** The thickness of the edges;
- **Quick Settings:** Enable the Quick Settings;
- **Cancel When no Drops:** Cancel the Vein Miner if the block doesn't drop anything;
- **Auto "All":** Automatically turn the function to "all" when use the Vein Miner in ores or gravel;
- **Only Ore and Log:** Only enable the Vein Miner when use on ores and logs;
- **Edges Accuracy:** Corrects edge errors, may cause lag in large areas.
- **Connected Diagonals:** Consider the diagonals in the scan;
- **Delete Blocks:** Open Delete Blocks Penal.

![](doc/1.1%20-%20Advanced%20Settings.png)

- **Delete Blocks:** Delete blocks so they don't drop.

![](doc/1.2%20-%20Delete%20Blocks.png)

# Quick Settings:

To use que Quick Settings, first you need to enable this option on the settings menu.

The Quick Settings can change the function method to break blocks, hold shift and use any vanilla pickaxe (need to use in a block).

![](doc/2.0%20-%20Break%20Functions.gif)

Warning - The quick settings don't work well in the classic gui on phone, if you want to use it, use the controls "Joystick & aim crosshair" on your phone, (if you play in a Pc, don't worry)

![](doc/3.0%20-%20Correct%20Control.png)

# Tree Capitator:

The Vein Miner can break any block, so, it have a built-in tree capitator.

![](doc/4.0%20-%20TreeCapitator.gif)

# Functions:

## Function All blocks:
This function is automatically selected when you start mining ores, gravel or sand.

![](doc/4.1%20-%20all.gif)

## Function 1x1 Tunnel:

![](doc/4.2%20-%201x1%20Tunnel.gif)

## Function 1x2 Tunnel:

![](doc/4.3%20-%201x2%20Tunnel.gif)

## Function 1x3 Tunnel:

![](doc/4.4%20-%201x3%20Tunnel.gif)

## Function 3x2 Tunnel:

![](doc/4.5%20-%203x2%20Tunnel.gif)

## Function 3x2 Tunnel Small:

![](doc/4.6%20-%203x2%20Tunnel%20Small.gif)

## Function 3x3 Tunnel:

![](doc/4.7%20-%203x3%20Tunnel.gif)

## Function 3x3 Tunnel Small:

![](doc/4.8%20-%203x3%20Tunnel%20Small.gif)

## Function Mining Tunnel:

![](doc/4.9%20-%20Mining%20Tunnel.gif)

## Function Escape Tunnel:

![](doc/4.10%20-%20Escape%20Tunnel.gif)

# Enchantments:

Vein Miner has a compatibility with the enchantments:

- **Unbreaking**
- **Silk Touch** (It works with all addons)

![](doc/4.11%20-%20Silk%20Touch.gif)

- **Fortune** (It works with most add-ons.)

![](doc/4.12%20-%20Fortune.gif)

# Other Info

- This addon **don't** disable Achievements;
- This addon **don't** use player.json;
- This addon **is compatible** with other addons.

# Section for AddonMakers:

I plan to add more compatibility features in the future, but at the moment you can do it using the Bedrock Awakening Compatibility System (BACS):

> Disable Vein Miner for some block:

Add the Tag "bedrock_awakening:script_no_break", this will prevent the Vein Miner from activating, useful for blocks that have a system that can only be deactivated if the player themselves breaks it, or for multiple blocks.

**Example:**

![](doc/5.0%20-%20Disable%20Vein%20Miner.png)

> Block as a Ore:

Add the tag "bedrock_awakening:ore" to Vein Miner to identify that the block is a ore.

**Example:**

![](doc/5.1%20-%20Ore%20Tag.png)

> Block as a Log:

Add the tag "bedrock_awakening:log" to Vein Miner to identify that the block is a log.

**Example:**

![](doc/5.2%20-%20Log%20Tag.png)
