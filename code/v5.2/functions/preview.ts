import { world, system, Player, Vector3 } from "@minecraft/server"
import { accuracyTestList } from "../lib/accuracyTest"

export const borderFunctions = new class BorderFunctions {
  *show(player: Player, blocks: Vector3[], accuracy = false, edgeType: number): Generator<void> {
    const scanFaces = new Set<number>()
    for(const pos of blocks) scanFaces.add((pos.x << 20) ^ (pos.y << 10) ^ pos.z)

    const scannedBlocks = new Map<number, BlockAproved>()

    for(const pos of blocks){
      const x = pos.x, y = pos.y, z = pos.z
      const blockKey = (x << 20) ^ (y << 10) ^ z

      for(const offset of facesList){
        const nx = x + offset.x
        const ny = y + offset.y
        const nz = z + offset.z
        const neighborKey = (nx << 20) ^ (ny << 10) ^ nz

        if(!scanFaces.has(neighborKey)) continue

        const face = offset.face
        const oppositeFace = offset.opposite
        const block = scannedBlocks.get(blockKey) ?? { block: pos, face: new Set<string>() }
        const neighborBlock = scannedBlocks.get(neighborKey) ?? { block: { x: nx, y: ny, z: nz }, face: new Set<string>() }

        if(face && oppositeFace){
          block.face.add(face)
          neighborBlock.face.add(oppositeFace)
        }

        scannedBlocks.set(blockKey, block)
        scannedBlocks.set(neighborKey, neighborBlock)
      }
    }

    const accuracyTest = accuracy ? accuracyTestList[1] : accuracyTestList[0]

    for(const [_, {block, face}] of scannedBlocks){
      if(face.has("north") && face.has("south") && face.has("east") && face.has("west") && face.has("up") && face.has("down")) continue
      if(!accuracyTest(face)) continue

      yield
      try {
        const entity = player.dimension.spawnEntity("utilities_vein_miner:selected_block", {x: block.x + 0.5, y: block.y + 0.5, z: block.z + 0.5})
        entity.addTag(`utilities_vein_miner_owner:${player.id}`)

        system.runTimeout(() => {
          if(entity.isValid) entity.playAnimation("animation.utilities_vein_miner.selected_block.edges", {
            players: [player],
            nextState: "none",
            stopExpression: `v.show = true; v.type = ${edgeType -1};` + [...face.values()].map(value => `v.${value}=true;`).join("")
          })
        }, 2)
      } catch {}
    }
  }

  *remove(player: Player): Generator<void> {
    const edges = player.dimension.getEntities({type: "utilities_vein_miner:selected_block", tags: [`utilities_vein_miner_owner:${player.id}`]})
    for(const entity of edges){
      try { entity.remove() } catch {}
      yield
    }
  }
}

const facesList: FaceListInfo[] = [
  { x: 0, y: 0, z: -1, face: "north", opposite: "south" },
  { x: 0, y: 0, z: 1, face: "south", opposite: "north" },
  { x: 1, y: 0, z: 0, face: "east", opposite: "west" },
  { x: -1, y: 0, z: 0, face: "west", opposite: "east" },
  { x: 0, y: 1, z: 0, face: "up", opposite: "down" },
  { x: 0, y: -1, z: 0, face: "down", opposite: "up" },

  { x: 0, y: -1, z: -1, face: "bn", opposite: "ts"},
  { x: 0, y: -1, z: 1, face: "bs", opposite: "tn"},
  { x: 1, y: -1, z: 0, face: "be", opposite: "tw"},
  { x: -1, y: -1, z: 0, face: "bw", opposite: "te"},
  { x: 0, y: 1, z: -1, face: "tn", opposite: "bs"},
  { x: 0, y: 1, z: 1, face: "ts", opposite: "bn"},
  { x: 1, y: 1, z: 0, face: "te", opposite: "bw"},
  { x: -1, y: 1, z: 0, face: "tw", opposite: "be"},

  { x: -1, y: 0, z: -1, face: "nw", opposite: "se"},
  { x: -1, y: 0, z: 1, face: "sw", opposite: "ne"},
  { x: 1, y: 0, z: -1, face: "ne", opposite: "sw"},
  { x: 1, y: 0, z: 1, face: "se", opposite: "nw"},

  { x: 1, y: 1, z: 1},
  { x: 1, y: 1, z: -1},
  { x: 1, y: -1, z: 1},
  { x: 1, y: -1, z: -1},
  { x: 1, y: 1, z: 1},
  { x: 1, y: 1, z: -1},
  { x: 1, y: -1, z: 1},
  { x: 1, y: -1, z: -1}
]

interface FaceListInfo {
  x: number
  y: number
  z: number
  face?: string
  opposite?: string
}

export interface BlockAproved {
  block: Vector3
  face: Set<string>
}