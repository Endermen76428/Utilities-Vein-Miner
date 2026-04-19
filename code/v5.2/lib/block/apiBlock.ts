import { world, Block, GameMode, Player, ItemStack } from "@minecraft/server"
import { apiDeleteBlocks } from "../player/deleteBlocks"
import { canDropNone } from "../../variables"

export const apiBlock = new class apiBlock {
  formatId(id: string): string[] {
    if(id == "unlit_redstone_torch") return ["minecraft:redstone_torch", id]
    if(id.includes("lit_")) return [id.replace("lit_", ""), id]
    return [id]
  }

  getFaceDregress(face: string): 0 | 1 | 2 | 3 | 4 | 5 {
    return facesList[face ?? "Down"] ?? 0
  }

  isValidDrop(player: Player, block: Block, item?: ItemStack, cancel = true): boolean {
    if(player.getGameMode() == GameMode.Creative) return true
    if(apiDeleteBlocks.get(player).has(block.typeId)) return true
    if(hasDropChance.has(block.typeId)) return true
    if(block.getTags().includes("bedrock_awakening:block_has_chance_drop")) return true
    const loot = world.getLootTableManager().generateLootFromBlock(block, item)
    if(!cancel || (loot && loot.length > 0)) return true
    return false
  }
}

const facesList: { [key: string]: 0 | 1 | 2 | 3 | 4 | 5 } = {
  "North": 2,
  "East": 3,
  "South": 0,
  "West": 1,
  "Up": 5,
  "Down": 4
}

const hasDropChance = new Set(canDropNone)