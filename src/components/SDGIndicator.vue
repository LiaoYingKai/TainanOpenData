<template>
<div class="SDGIndicator">
  <div class="title">
    <p>SDG指標</p>
  </div>
  <ve-line :data="tainanSDG" :settings="chartSettings" :extend="extend"></ve-line>
  <el-table :data="areaSDG" style="width: 100%;text-align: center;font-size:24px;">
    <el-table-column prop="area" label="地區"></el-table-column>
    <el-table-column prop="2013" label="2013"></el-table-column>
    <el-table-column prop="2014" label="2014"></el-table-column>
    <el-table-column prop="2015" label="2015"></el-table-column>
    <el-table-column prop="2016" label="2016"></el-table-column>
    <el-table-column prop="2017" label="2017"></el-table-column>
    <el-table-column prop="2018" label="2018"></el-table-column>
  </el-table>
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
        // "柳營區", "後壁區", "東山區", "麻豆區", "下營區", "六甲區", "官田區", "大內區", "佳里區", "學甲區", "西港區", "七股區", "將軍區", "北門區", "新化區", "新市區", "善化區", "安定區", "山上區", "玉井區", "楠西區", "南化區", "左鎮區", "仁德區", "歸仁區", "關廟區", "龍崎區", "永康區", "東區", "南區",
        // "中西區", "北區", "安南區", "安平區"
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
              rate = (item.total - array[index - 1].total) / item.total
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
            console.log(areaData)
            let data = {
              area: "",
              2013: areaData[0].total,
              2014: areaData[1].total,
              2015: areaData[2].total,
              2016: areaData[3].total,
              2017: areaData[4].total,
              2018: areaData[5].total,
            }
            data.area = area
            this.areaSDG.push(data)
          }).catch(error => {
            console.log(error)
          })
      })
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
</style>
