import {
  world,
  system,
} from '@minecraft/server'

function main() {
  if (system.currentTick === 400) {
    world.sendMessage('All systems GO!')
  }
  system.run(main)
}

system.run(main)
