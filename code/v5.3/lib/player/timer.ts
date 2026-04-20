import { world, Player } from "@minecraft/server"

export const apiTimer = new class apiTimer {
  check(player: Player, id: string): cooldownInfo {
    if(this.currentTime() > this.get(player, id)) return {finished: true, time: this.get(player, id) - this.currentTime()}
    return {finished: false, time: this.currentTime() - this.get(player, id)}
  }

  set(player: Player, id: string, time: number): void {
    player.setDynamicProperty(id, this.currentTime() + time)
  }

  private get(player: Player, id: string): number {
    const cooldown = player.getDynamicProperty(id)
    if(typeof cooldown != "number") return this.currentTime() -0.001
    return cooldown
  }

  private currentTime(): number { return new Date().getTime() /1000 }
}

interface cooldownInfo {
  finished: boolean,
  time: number
}