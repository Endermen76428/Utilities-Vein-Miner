import { world } from "@minecraft/server"

export const accuracyTestList: [((face: Set<string>) => boolean), ((face: Set<string>) => boolean)] = [
  (face) => { // Not Accuracy
    return !(
      (face.has("north") && face.has("south") && face.has("east") && face.has("west")) ||
      (face.has("north") && face.has("south") && face.has("up") && face.has("down")) ||
      (face.has("east") && face.has("west") && face.has("up") && face.has("down"))
    )
  },

  (face) => { // Accuracy
    return (
      (!face.has("north") && !face.has("east")) || (!face.has("north") && face.has("east") && face.has("ne")) || (face.has("north") && !face.has("east") && face.has("ne")) ||
      (!face.has("north") && !face.has("west")) || (!face.has("north") && face.has("west") && face.has("nw")) || (face.has("north") && !face.has("west") && face.has("nw")) ||
      (!face.has("north") && !face.has("down")) || (face.has("down") && face.has("bn") && !face.has("north")) || (!face.has("down") && face.has("bn") && face.has("north")) ||
      (!face.has("north") && !face.has("up")) || (face.has("up") && face.has("tn") && !face.has("north")) || (!face.has("up") && face.has("tn") && face.has("north")) ||

      (!face.has("south") && !face.has("east")) || (!face.has("south") && face.has("east") && face.has("se")) || (face.has("south") && !face.has("east") && face.has("se")) ||
      (!face.has("south") && !face.has("west")) || (!face.has("south") && face.has("west") && face.has("sw")) || (face.has("south") && !face.has("west") && face.has("sw")) ||
      (!face.has("south") && !face.has("down")) || (face.has("down") && face.has("bs") && !face.has("south")) || (!face.has("down") && face.has("bs") && face.has("south")) ||
      (!face.has("south") && !face.has("up")) || (face.has("up") && face.has("ts") && !face.has("south")) || (!face.has("up") && face.has("ts") && face.has("south")) ||

      (!face.has("down") && !face.has("east")) || (face.has("down") && face.has("be") && !face.has("east")) || (!face.has("down") && face.has("be")) ||
      (!face.has("down") && !face.has("west")) || (face.has("down") && face.has("bw") && !face.has("west")) || (!face.has("down") && face.has("bw")) ||
      (!face.has("up") && !face.has("east")) || (face.has("up") && face.has("te") && !face.has("east")) || (!face.has("up") && face.has("te")) ||
      (!face.has("up") && !face.has("west")) || (face.has("up") && face.has("tw") && !face.has("west")) || (!face.has("up") && face.has("tw"))
    )
  }
]