import {load} from 'cheerio'

const $ = load(`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg t="1614062916021" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1195"
    width="200" height="200" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <style type="text/css"></style>
    </defs>
    <path
        d="M571.712 89.6a38.4 38.4 0 0 1 6.272 76.288l-6.272 0.512H170.688a4.288 4.288 0 0 0-3.968 2.56l-0.32 1.728v682.624c0 1.792 1.088 3.328 2.56 3.968l1.728 0.32h682.624a4.288 4.288 0 0 0 3.968-2.56l0.32-1.728V452.288a38.4 38.4 0 0 1 76.288-6.272l0.512 6.272v401.024c0 41.984-31.872 76.544-72.768 80.64l-8.32 0.448H170.688a81.088 81.088 0 0 1-80.64-72.768l-0.448-8.32V170.688c0-41.984 31.872-76.544 72.768-80.64l8.32-0.448h401.024z m242.944-17.088a38.4 38.4 0 0 1 63.936 42.048l-3.456 5.248-409.792 524.48a38.4 38.4 0 0 1-63.936-42.048l3.456-5.248 409.792-524.48z"
        p-id="1196" fill="#1BB393"></path>
</svg>`)

console.log($('svg').parent().html())

