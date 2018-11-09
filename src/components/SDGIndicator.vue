<template>
<div class="SDGIndicator">
  <div class="title">
    <p>SDG指標</p>
  </div>
  <ve-line :data="tainanSDG" :settings="chartSettings" :extend="extend"></ve-line>
  <ul class="table">
    <div class="rowStyle">
      <span>地區</span>
      <span>2013</span>
      <span>2014</span>
      <span>2015</span>
      <span>2016</span>
      <span>2017</span>
      <span>2018</span>
    </div>
    <li v-for="item in areaSDG">
      <div class="rowStyle">
        <span>{{item.area}}</span>
        <span>{{item[2013]}}</span>
        <span :class="amplitudeStyle(item[2014])">{{item[2014]}}</span>
        <span :class="amplitudeStyle(item[2015])">{{item[2015]}}</span>
        <span :class="amplitudeStyle(item[2016])">{{item[2016]}}</span>
        <span :class="amplitudeStyle(item[2017])">{{item[2017]}}</span>
        <span :class="amplitudeStyle(item[2018])">{{item[2018]}}</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "SDGIndicator",
  data() {
    this.chartSettings = {
      axisSite: {
        right: ['比率']
      },
      yAxisType: ['KMB', 'percent'],
      yAxisName: ['數值', '比率']
    }
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    }
    return {
      areas: ["新營區", "鹽水區", "白河區",
        "柳營區", "後壁區", "東山區", "麻豆區", "下營區", "六甲區", "官田區", "大內區", "佳里區", "學甲區", "西港區", "七股區", "將軍區", "北門區", "新化區", "新市區", "善化區", "安定區", "山上區", "玉井區", "楠西區", "南化區", "左鎮區", "仁德區", "歸仁區", "關廟區", "龍崎區", "永康區", "東區", "南區",
        "中西區", "北區", "安南區", "安平區"
      ],
      tainanSDG: {
        columns: ['年份', '臺南年車禍總數', '比率'],
        rows: []
      },
      areaSDG: []
    }
  },
  methods: {
    getTainanSDG: function() {
      axios.get("http://104.199.170.116/api/sdg")
        .then(response => {
          let tainanData = response.data.items
          console.log(tainanData)
          tainanData.forEach((item, index, array) => {
            let rate
            if (index != 0) {
              rate = (item.total - array[index - 1].total) / array[index - 1].total
              rate = rate.toFixed(2)
            }
            this.tainanSDG.rows.push({
              '年份': String(item.year),
              '臺南年車禍總數': item.total,
              '比率': rate || "0"
            })
          })

        }).catch(error => {
          console.log(error)
        })
    },
    getAreaSDG: function() {
      this.areas.forEach(area => {
        axios.get(`http://104.199.170.116/api/sdg/${area}`)
          .then(response => {
            let areaData = response.data.items
            let rate
            let str
            let objectString
            objectString = areaData.map((item, index, array) => {
              str = ""
              str += areaData[index].total
              if (index != 0) {
                rate = (item.total - array[index - 1].total) / array[index - 1].total
                if (rate.toFixed(2) > 0) {
                  str += " ↑ " + Math.abs((rate * 100).toFixed()) + "%"
                } else {
                  if (rate.toFixed(2) < 0) {
                    str += " ↓ " + Math.abs((rate * 100).toFixed()) + "%"
                  } else {
                    str += " - " + Math.abs((rate * 100).toFixed()) + "%"
                  }
                }
              }
              return str
            })
            let data = {
              area: "",
              2013: objectString[0],
              2014: objectString[1],
              2015: objectString[2],
              2016: objectString[3],
              2017: objectString[4],
              2018: objectString[5],
            }
            data.area = area
            this.areaSDG.push(data)
          }).catch(error => {
            console.log(error)
          })
      })
    },
    amplitudeStyle: function(areaSDGItme) {
      areaSDGItme = areaSDGItme.split(" ")
      if (areaSDGItme.includes("↑")) {
        return "fontGreen"
      } else {
        if (areaSDGItme.includes("↓")) {
          return "fontRed"
        } else {
          return "fontYellow"
        }
      }
    }
  },
  created() {
    this.getTainanSDG(),
      this.getAreaSDG()
  }
}
</script>

<style lang="scss" scoped>
@import 'mixin';
.title {
    @include titleStyle;
}
ul {
    list-style: none;
    padding: 0;
    .rowStyle {
        display: flex;
        width: 100%;
        justify-content: space-around;
        align-items: center;
    }
    span {
        min-width: 140px;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
    }
}
.fontGreen {
    color: #4caf50;
}
.fontRed {
    color: #ff2222;
}
.fontYellow {
    color: #ffc107;
}
</style>
