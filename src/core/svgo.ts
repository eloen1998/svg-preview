
import { optimize } from 'svgo'
import { load } from 'cheerio'

import fs from 'fs'

const options = {
    plugins: [
        'removeStyleElement',
        'removeScriptElement',
        'removeDimensions',
        {
            name: 'removeAttrs',
            params: {
                attrs: ['class', 'style', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill', 'p-id', 'xmlns:xlink', 'version', 't']
            }
        },
        {
            name: 'addClassesToSVGElement',
            params: {
                className: 'svg-icon'
            }
        },
        {
            name: 'addAttributesToSVGElement',
            params: {
                attributes: [
                    { fill: 'currentColor' },
                    { ':stroke-width': 'strokeWidth' },
                    { ':stroke-linecap': 'strokeLinecap' },
                    { ':stroke-linejoin': 'strokeLinejoin' }
                ]
            }
        }
    ]
}

export function renderSvg(filePath: string, fileName: string) {
    const svgFile = fs.readFileSync(filePath, 'utf8')

    // @ts-ignore 不知道怎么解决，先忽略
    const optimizedSvg = optimize(svgFile, {
        path: filePath,
        ...options
    })
    const { data } = optimizedSvg
    if (data) {
        const svg = load(data)('svg').parent().html()
        if (svg) {
            return `<li class="icon-item" id="${fileName}" >
            <div class="icon-item-name" >${fileName}</div>
            <div class="icon-item-component" > 
                ${svg}
            </div>
            </li>`
        }
    }
}

