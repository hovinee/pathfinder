import fs from 'fs'
import path from 'path'

// Get Slugs

export function getSlugs(dirPath: string) {
  return fs.readdirSync(dirPath)
}
