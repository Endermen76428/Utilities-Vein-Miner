import { world, system, ItemStack, Player, Vector3 } from "@minecraft/server"
import { apiDeleteBlocks } from "../lib/player/deleteBlocks"
import { borderFunctions } from "./preview"

export const breakFunctions = new class BreakFunctions {
  breakBlocks(info: BreakInfo): void {
    const { player, positions, origin, blockIds, item } = info
    info.player.onScreenDisplay.setActionBar({translate: "warning.utilities_vein_miner:breaking", with: [String(positions.length)]})

    system.runJob(this.breakAll(player, blockIds[0] ?? "", positions, origin, item))
  }

  private *breakAll(player: Player, id: string, positions: Vector3[], origin: Vector3, item?: ItemStack): Generator<void> {
    const loots: ItemStack[] = []

    const lootManager = world.getLootTableManager()
    const deleteBlocks = apiDeleteBlocks.get(player).has(id)

    for(const pos of positions){
      const block = player.dimension.getBlock(pos)
      if(!block || !block.isValid) continue

      const loot = lootManager.generateLootFromBlock(block, item)

      block.setType("minecraft:air")
      if(!deleteBlocks) loots.push(...(loot ?? []))
      yield
    }

    if(deleteBlocks) return this.removeBorder(player)

    const lootsFiltered = loots.reduce<Record<string, number>>((acc, value) => {
      acc[value.typeId] = (acc[value.typeId] ?? 0) + value.amount
      return acc
    }, {})

    for(const [key, value] of Object.entries(lootsFiltered)){
      const executions = Math.floor(value /64)
      for(let i = 0; i < executions; i++){
        player.dimension.spawnItem(new ItemStack(key, 64), origin)
        yield
      }
      if(value % 64 != 0) player.dimension.spawnItem(new ItemStack(key, value % 64), origin)
    }

    player.dimension.getEntitiesAtBlockLocation(origin).forEach(item => { if(teleportOnBreak.includes(item.typeId)) item.teleport(origin) })
    this.removeBorder(player)
  }

  private removeBorder(player: Player): void {
    system.runJob(borderFunctions.remove(player))
  }
}

const teleportOnBreak = [ "minecraft:item", "minecraft:xp_orb" ]

export type BreakType = "setAir" | "destroy" | "silk" | "fortune" | "shears"

interface BreakInfo {
  player: Player
  positions: Vector3[]
  blockIds: string[]
  origin: Vector3
  item?: ItemStack
}