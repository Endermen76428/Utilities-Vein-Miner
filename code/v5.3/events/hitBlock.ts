import { world, system, BlockComponentTypes, EquipmentSlot, Player } from "@minecraft/server"
import { autoEnableAll, worksOnlyForOres } from "../variables"
import { apiEquippable } from "../lib/player/equippable"
import { borderFunctions } from "../functions/preview"
import { setTurnOff } from "../functions/turnOffTimer"
import { getBlocks } from "../lib/block/selectArea"
import { apiBlock } from "../lib/block/apiBlock"
import { apiConfig } from "../lib/player/config"
import { apiTimer } from "../lib/player/timer"

world.afterEvents.entityHitBlock.subscribe(({damagingEntity: entity, hitBlock: block, blockFace}) => {
  const player = entity as Player
  const config = apiConfig.get(player)
  const blockIds = apiBlock.formatId(block.typeId)
  const item = apiEquippable.getItemSlot(player, EquipmentSlot.Mainhand)

  if(config.showSelection) system.runJob(borderFunctions.remove(player))

  const tags = new Set(block.getTags())
  if(!player.isSneaking) return
  if(config.functionType == "off") return
  if(tags.has("bedrock_awakening:script_no_break")) return
  if(block.typeId == "minecraft:air") return
  if(block.typeId == "minecraft:bedrock") return
  if(block.getComponent(BlockComponentTypes.Inventory)) return
  if(config.onlyOreLog){
    const id = blockIds[0]
    if(!(id && worksOnlyForOres.has(id)) && !tags.has("bedrock_awakening:ore") && !tags.has("bedrock_awakening:log") && !tags.has("log")) return
  }
  if(!apiBlock.isValidDrop(player, block, item, config.cancelNoDrop)) return

  apiTimer.set(player, "utilities_vein_miner:need_show_border", 0.15)

  if(config.turnOff != 0) setTurnOff(player, config.turnOff)

  getBlocks({
    type: "preview",
    player: player,
    block: block,
    blockIds: blockIds,
    blockFace,
    origin: block,
    config: config,
    item,
  }, config.autoAll ? autoEnableAll.includes(blockIds[0] ?? "") ? "all" : undefined : undefined )
})