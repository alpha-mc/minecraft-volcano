import console from 'node:console'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const PACK_NAME = 'minecraft-volcano'

if (process.platform !== 'win32') {
  console.error('ERROR: This script is only for Windows.')
  process.exit(1)
}

const localAppDataPath = process.env['LOCALAPPDATA']
if (!localAppDataPath) {
  console.error('ERROR: LOCALAPPDATA environment variable is not set.')
  process.exit(1)
}

const mojangPath = path.join(
  localAppDataPath,
  'Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang',
)

const resourcePackPath = path.join(
  mojangPath,
  'development_resource_packs',
)

const behaviorPackPath = path.join(
  mojangPath,
  'development_behavior_packs',
)

async function installPacks() {
  const packs = await fs.promises.readdir(path.join(import.meta.dirname, '../dist'))

  packs.forEach(async (pack) => {
    const packPath = path.join(import.meta.dirname, '../dist', pack)
    const manifest = (await fs.promises.readFile(path.join(packPath, 'manifest.json'))).toString()

    try {
      const manifestModules: { type: string }[] = JSON.parse(manifest)['modules']
      if (manifestModules.some(module => module['type'] === 'resources')) {
        await fs.promises.cp(packPath, path.join(resourcePackPath, PACK_NAME), { recursive: true })
      }
      else {
        await fs.promises.cp(packPath, path.join(behaviorPackPath, PACK_NAME), { recursive: true })
      }
    }
    catch (e) {
      console.warn(`${pack}: ${e}`)
    }
  })
}

installPacks()
