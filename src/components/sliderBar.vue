<template >
<div class="sliderBar">
  <div class="logo">
    <p>好想寫程式</p>
  </div>
  <div class="menu">
    <ul>
      <li v-for="(item,index) in menus" :class="{chooseStyle:item.isChoose}" @click="changeStyle(index)">
        <router-link :to="{ name: `${item.routerName}`}">
          <font-awesome-icon :icon="`${item.icon}`" /> {{item.title}}
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'sliderBar',
  data() {
    return {
      menus: [{
        title: 'SDG指標',
        isChoose: false,
        icon: 'list-ul',
        routerName: "SDGIndicator"
      }, {
        title: '地圖分析',
        isChoose: false,
        icon: 'map',
        routerName: "mapDistribution"
      }, {
        title: '交叉比對',
        isChoose: false,
        icon: 'chart-line',
        routerName: "chartPage"
      }]
    }
  },
  methods: {
    changeStyle: function(index) {
      this.menus.forEach(item => {
        item.isChoose = false
      })
      this.menus[index].isChoose = true
    }
  },
  created() {
    let nowRoute = this.$route.path
    if (nowRoute === '/') {
      this.menus[0].isChoose = true
    }
    if (nowRoute === '/map') {
      this.menus[1].isChoose = true
    }
    if (nowRoute === '/chart') {
      this.menus[2].isChoose = true
    }
  }
}
</script>

<style lang="scss" scoped>
.sliderBar {
    color: #66615B;
    height: 100vh;
    box-shadow: inset -1px 0 0 0 #DDDDDD;
    overflow: hidden;
}
.logo {
    margin: 0 20px;
    padding: 18px 0;
    border-bottom: 1px solid rgba(102, 97, 91, 0.3);
    cursor: pointer;
    p {
        margin: 0;
        padding: 4px 0;
        font-size: 18px;
        text-align: center;
        line-height: 30px;
    }
}
ul {
    list-style: none;
    padding: 0;
    margin: 20px 0;
    overflow: hidden;
    li {
        align-items: center;
        margin: 10px 0;
        line-height: 30px;
        font-size: 14px;
        cursor: pointer;
        opacity: 0.7;
        position: relative;
        svg {
            margin-right: 15px;
            width: 30px !important;
            height: 30px;
        }
        a {
            width: 100%;
            text-decoration: none;
            color: #66615B;
            display: flex;
            padding: 10px 25px;
            box-sizing: border-box;
        }
        &:hover {
            opacity: 1;
        }
    }
}
.chooseStyle {
    color: #EB5E28;
    opacity: 1;
    a {
        color: #EB5E28;
    }
    &::after {
        border-right: 17px solid #f4f3ef;
        border-top: 17px solid transparent;
        border-bottom: 17px solid transparent;
        content: "";
        display: inline-block;
        position: absolute;
        right: -1px;
        top: 8px;
    }
}
</style>
