
export function renderHtml(content: string, folders: string) {
    const HTML_TEM = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SVG PREVIEW</title>
        <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css" />
        <script src="https://unpkg.com/vue@next"></script>
        <script src="https://unpkg.com/element-plus"></script>
        <style>
          html {
            --border-color: rgb(240, 241, 242);
          }
          * {
            margin: 0;
            padding: 0;
          }
          li,
          ol,
          ul {
            list-style: none;
          }
        </style>
    
        <style>
          #app {
            width: 1000px;
            padding-top: 20px;
            margin: 0 auto;
          }
          .width-100 {
            width: 100px;
          }
          .header-form {
            display: flex;
            align-items: center;
            padding: 12px;
            border: 1px solid var(--border-color);
            background-color: #fff;
          }
          .title {
            margin-top: 20px;
            padding: 12px;
            border: 1px solid var(--border-color);
          }
          .list {
            display: flex;
            flex-wrap: wrap;
            border-left: 1px solid var(--border-color);
          }
          .icon-item {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 16.56%;
            height: 140px;
            border-right: 1px solid var(--border-color);
            border-bottom: 1px solid var(--border-color);
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .icon-item .icon-item-name {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%);
            width: 100%;
            color: #1f1f1f;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            text-overflow: ellipsis;
            padding: 12px;
          }
          .title {
            color: #333333;
            margin-top: 20px;
            padding: 12px;
            font-size: 30px;
            border: 1px solid var(--border-color);
          }
          .icon-item .icon-item-component {
            margin-top: 20px;
          }
          svg {
            transition: all 0.3s ease;
          }
          .svg-icon {
            display: inline-block;
            width: 1em;
            height: 1em;
            font-style: normal;
            vertical-align: -2px;
            outline: none;
            stroke: currentColor;
          }
          .icon-item:hover .icon-item-component svg {
            transform: scale(1.5);
          }
          .folder-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            padding: 10px;
            border: 1px solid var(--border-color);
          }
          .folder {
            flex: 0 0 16.56%;
          }
          .folder-icon {
            display: inline-block;
            height: 1em;
            width: 1em;
            vertical-align: middle;
            margin: -3px 3px 0 0;
            background-size: cover;
            background-image: url("data:image/png;base64,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");
          }
        </style>
      </head>
      <body>
        <div id="app">
          <el-affix :offset="0">
            <div class="header-form">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="线宽">
                  <el-slider class="width-100" v-model="strokeWidth" :min="1" :max="5" :step="1" show-stops />
                </el-form-item>
                <el-form-item label="图标大小">
                  <el-input-number class="width-100" v-model="fontSize" />
                </el-form-item>
                <el-form-item label="拐角">
                  <el-select class="width-100" v-model="strokeLinecap">
                    <el-option v-for="(item, index) in linecapOptions" :key="index" :value="item" />
                  </el-select>
                </el-form-item>
                <el-form-item label="端点">
                  <el-select class="width-100" v-model="strokeLinejoin">
                    <el-option v-for="(item, index) in linejoinOptions" :key="index" :value="item" />
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-color-picker class="width-100" v-model="color" show-alpha></el-color-picker>
                </el-form-item>
              </el-form>
            </div>
          </el-affix>
          <div v-if="folders.length" class="folder-list">
            <a v-for="(folder, index) in folders" :key="index" class="folder" :href="folder"><i class="folder-icon"></i>{{folder.split('/').pop()}} </a>
          </div>
          <div class="icon-wrap" :style="{color: color, fontSize: fontSize + 'px'}">
            <h3 class="title">图标</h3>
            <ul class="list">
              ${content}
            </ul>
          </div>
        </div>
        <script>
          Vue.createApp({
            data: () => ({
              color: "#333333",
              strokeWidth: 1,
              fontSize: 30,
              strokeLinecap: "miter",
              strokeLinejoin: "butt",
              linecapOptions: ["arcs", "bevel", "miter", "miter-clip", "round"],
              linejoinOptions: ["butt", "square", "round"],
              folders: [${folders}]
            }),
            mounted() {
              this.getIconList();
            },
            methods: {
              getIconList() {
                const iconList = document.querySelectorAll("li.icon-item");
                Array.from(iconList).forEach((ele) => {
                  ele.addEventListener("click", () => this.onClick(ele.id));
                });
              },
              onClick(text) {
                try {
                  this.copy(text);
                  this.$message({
                    type: "success",
                    dangerouslyUseHTMLString: true,
                    message: \`复制成功:<strong>\${text}</strong>\`
                  });
                } catch (error) {
                  this.$message({
                    type: "error",
                    message: error.message
                  });
                }
              },
              copy(text) {
                const input = document.createElement("input");
                input.value = text;
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
              }
            }
          })
            .use(ElementPlus)
            .mount("#app");
        </script>
      </body>
    </html>
    `
    return HTML_TEM
}

