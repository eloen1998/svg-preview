
export function renderHtml(content: string) {
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
              linejoinOptions: ["butt", "square", "round"]
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

