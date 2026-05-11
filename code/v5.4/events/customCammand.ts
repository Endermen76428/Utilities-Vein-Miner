import { world, system, CommandPermissionLevel, CustomCommandParamType, CustomCommandStatus as Status, Player } from "@minecraft/server"
import { configPanel, functionList } from "../functions/configUI"
import { setTurnOff } from "../functions/turnOffTimer"
import { apiConfig } from "../lib/player/config"
import { apiWarn } from "../lib/player/warn"

system.beforeEvents.startup.subscribe(({customCommandRegistry: customC}) => {
  customC.registerEnum("uvm:functions", [...functionList])
  customC.registerCommand({
    name: "uvm:veinminer",
    description: "commands.utilities_vein_miner.settings_panel",
    cheatsRequired: false,
    permissionLevel: CommandPermissionLevel.Any,
    optionalParameters: [
      {type: CustomCommandParamType.Enum, name: "uvm:functions"}
    ]
  }, (({sourceEntity: player}, type) => {
    if(!player || !(player instanceof Player)) return { status: Status.Failure }

    if(type != undefined){
      const config = apiConfig.get(player)
      config.functionType = type
      apiConfig.set(player, config)

      if(config.functionType != "off") setTurnOff(player, config.turnOff)

      system.run(() => apiWarn.notify(player, "warning.utilities_vein_miner:config_complete", {type: "action_bar",sound: "utilities_vein_miner.warn.break_amethyst"}))
      return { status: Status.Success }
    }

    system.run(() => configPanel.open(player))
    return { status: Status.Success }
  }))
})