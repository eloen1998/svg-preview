
import fs from 'fs'
import path from 'path'
import { renderSvg } from './svgo'
import { renderHtml } from './render'

const serverBase = process.cwd()

export function dealDirectory(base: string) {
    const files = fs.readdirSync(base)

    const folders: string[] = []
    const svgFiles: string[] = []
    files.forEach((file) => {
        const filePath = path.join(base, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            const folderPath = path.relative(serverBase,filePath)
            folders.push(folderPath)
        }
        
        if(stat.isFile()) {
            const ext = file.split('.').pop()
            const fileName = file.split('.')[0]
    
            if (ext === 'svg') {
                const svg = renderSvg(filePath, fileName)
                if (svg) {
                    svgFiles.push(svg)
                }
            }

        }
        
    })
    return { folders, svgFiles }
}

export default function render(base: string) {
    const { svgFiles,folders } = dealDirectory(base)
    const html = renderHtml(svgFiles.join('\n'), folders.map(folder => `'/${folder}'`).join(','))
    return html
}