<template>

  <div class="filter-container" @dragstart="handleDragStart">

    <div class="widget-subject">
      <div class="filter-header">
        <div class="filter-header-text"> 样式 </div>
      </div>

      <div class="filter-widget-content">
        <div
          v-for="(item, index) in assistList"
          :key="index"
          :data-id="item.id"
          draggable
          :data-index="index"
          :class="'filter-widget '+ (item.defaultClass || '')"
        >
          <div class="filter-widget-icon">
            <i :class="(item.icon || 'el-icon-setting') + ' widget-icon-i'" />
          </div>
          <div class="filter-widget-text">{{ item.label }}</div>
        </div>
      </div>
    </div>

    <div class="widget-subject">
      <div class="filter-header">
        <div class="filter-header-text">
          <span>图片</span>
        </div>
      </div>

      <div class="filter-widget-content">
        <div
          v-for="(item, index) in pictureList"
          :key="index"
          :data-id="item.id"
          :data-index="index"
          draggable
          :class="'filter-widget '+ (item.defaultClass || '')"
        >
          <div class="filter-widget-icon">
            <i :class="(item.icon || 'el-icon-setting') + ' widget-icon-i'" />
          </div>
          <div class="filter-widget-text">{{ item.label }}</div>
        </div>
      </div>
    </div>

    <input id="input" ref="files" type="file" hidden @change="handleFileChange">

  </div>

</template>

<script>
import { assistList, pictureList } from '@/components/canvas/custom-component/component-list'
import toast from '@/components/canvas/utils/toast'
import { commonStyle, commonAttr } from '@/components/canvas/custom-component/component-list'
import generateID from '@/components/canvas/utils/generateID'

export default {
  name: 'FilterGroup',
  data() {
    return {
      assistList,
      pictureList
    }
  },

  methods: {
    handleDragStart(ev) {
      ev.dataTransfer.effectAllowed = 'copy'
      const dataTrans = {
        type: 'assist',
        id: ev.target.dataset.id
      }
      ev.dataTransfer.setData('componentInfo', JSON.stringify(dataTrans))
    },
    goFile() {
      this.$refs.files.click()
    },
    handleFileChange(e) {
      const file = e.target.files[0]
      if (!file.type.includes('image')) {
        toast('只能插入图片')
        return
      }

      const reader = new FileReader()
      reader.onload = (res) => {
        const fileResult = res.target.result
        const img = new Image()
        img.onload = () => {
          const scaleWith = img.width / 400
          const scaleHeight = img.height / 200
          let scale = scaleWith > scaleHeight ? scaleWith : scaleHeight
          scale = scale > 1 ? scale : 1
          this.$store.commit('addComponent', {
            component: {
              ...commonAttr,
              id: generateID(),
              component: 'Picture',
              label: '图片',
              icon: '',
              propValue: fileResult,
              style: {
                ...commonStyle,
                top: 0,
                left: 500,
                width: img.width / scale,
                height: img.height / scale
              }
            }
          })

          this.$store.commit('recordSnapshot','handleFileChange')
        }

        img.src = fileResult
      }

      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>

  .filter-container {
    width: 240px;
    overflow: hidden auto;
    min-height: 24px;
    padding-top: 0px;
    padding-bottom: 0px;
    position: relative;
    height: 940px;
    max-height: 976px;
  }
  .filter-header {
    overflow: hidden;
    position: relative;
    margin-top: 24px;
    margin-left: 15px;
    align-items: center;
    word-break: break-all;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
  }

  .filter-header-text {
    font-size: 14px;
    max-width: 100%;
    color: gray;
    text-align: left;
    white-space: pre;
    text-overflow: ellipsis;
    position: relative;
    flex-shrink: 0;
    box-sizing: border-box;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    word-break: break-all;
  }

  .filter-widget-content {
    position: relative;
    margin-left: 5px;
  }

  .filter-widget {
    width: 100px;
    height: 36px;
    position: relative;
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#1a3685f2,endColorstr=#1a3685f2);
    font-size: 12px;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
  }

  .time-filter {
    background-color: rgba(54,133,242,.1);
    .filter-widget-icon {
        color: #3685f2;
    }
    .filter-widget-text {
        color: #3d4d66;
    }
  }
  .time-filter:hover {
    background-color: #3685f2;
    color: #fff;
    .filter-widget-icon {
        background-color: #3685f2;
        color: #fff;
    }
    .filter-widget-text {
        color: #fff;
    }
  }

  .text-filter {
    background-color: rgba(35,190,239,.1);
    .filter-widget-icon {
        color: #23beef;
    }
    .filter-widget-text {
        color: #3d4d66;
    }
  }
  .text-filter:hover {
    background-color: #23beef;
    color: #fff;
    .filter-widget-icon {
        background-color: #23beef;
        color: #fff;
    }
    .filter-widget-text {
        color: #fff;
    }
  }
  .tree-filter {
    background-color: rgba(22,160,132,.1);
    .filter-widget-icon {
        color: #37b4aa;
    }
    .filter-widget-text {
        color: #3d4d66;
    }
  }
  .tree-filter:hover {
    background-color: #37b4aa;
    .filter-widget-icon {
        color: #37b4aa;
    }
    .filter-widget-text {
        color: #fff;
    }
  }

  .filter-widget-icon {
    width: 40px;
    height: 36px;
    text-align: center;
    line-height: 1;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    display: flex;

    .widget-icon-i {
      width: 24px;
      height: 24px;
      position: relative;
      flex-shrink: 0;
      font-size: 24px!important;
      margin: auto;
      font-family: fineui;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      text-align: center;

    }
  }
  .filter-widget-text {
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    text-align: left;
    white-space: pre;
    text-overflow: ellipsis;
    position: absolute;
    inset: 0px 0px 0px 40px;
    box-sizing: border-box;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    word-break: break-all;
    cursor: pointer;

  }

  .widget-subject {
    display: flow-root;
  }

</style>
