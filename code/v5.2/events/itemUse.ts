import { setTurnOff } from "../functions/turnOffTimer"
import { functionList } from "../functions/configUI"
import { configPanel } from "../functions/configUI"
import { world, Player } from "@minecraft/server"
import { apiConfig } from "../lib/player/config"
import { apiWarn } from "../lib/player/warn"

world.afterEvents.itemUse.subscribe(({source: entity, itemStack: item}) => {
  const player = entity as Player
  if(!player.isSneaking) return
  if(!item.getTags().includes("minecraft:is_pickaxe")) return

  if(player.getBlockFromViewDirection({maxDistance: 7, includePassableBlocks: false})){
    if(apiConfig.get(player).quick) quickSettings(player)
    return
  }
  configPanel.open(player)
})

function quickSettings(player: Player): void {
  const config = apiConfig.get(player)
  const nextState = functionList.findIndex(value => value == config.functionType) +1

  const func = functionList[nextState >= functionList.length ? 0 : nextState]
  config.functionType = func as typeof functionList[number]

  if(config.functionType != "off") setTurnOff(player, config.turnOff)

  apiWarn.notify(player, {"rawtext":[{"translate": "warning.utilities_vein_miner:quick_setting"}, {"translate": `ui.utilities_vein_miner:config.function_type.${func}`}]}, {sound: "utilities_vein_miner.warn.orb"})
  return apiConfig.set(player, config)
}