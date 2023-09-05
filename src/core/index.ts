
import fs from 'fs'
import path from 'path'
import { renderSvg } from './svgo'
import { renderHtml } from './render'

export function dealDirectory(base: string) {
    const files = fs.readdirSync(base)

    const dir: string[] = []
    const svgFiles: string[] = []
    files.forEach((file) => {
        const filePath = path.join(base, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            dir.push(file)
        }
        
        const ext = file.split('.').pop()
        const fileName = file.split('.')[0]

        if (ext === 'svg') {
            const svg = renderSvg(filePath, fileName)
            if (svg) {
                svgFiles.push(svg)
            }
        }
    })
    return { dir, svgFiles }
}

export default function render(base: string) {
    const { svgFiles } = dealDirectory(base)
    const html = renderHtml(svgFiles.join('\n'))
    return html
}