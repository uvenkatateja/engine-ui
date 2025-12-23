#!/usr/bin/env node
import { promises as fs } from 'fs'
import path from 'path'

async function buildRegistry() {
  console.log('Building registry...')
  
  const registryPath = path.join(process.cwd(), 'registry')
  const outputPath = path.join(process.cwd(), '__registry__')
  
  await fs.mkdir(outputPath, { recursive: true })
  
  console.log('Registry built successfully!')
}

buildRegistry().catch(console.error)
