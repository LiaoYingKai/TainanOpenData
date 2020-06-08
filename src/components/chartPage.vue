<template>
<div class="chartPage">
  <div class="title">
    <p>交叉比對</p>
  </div>
  <div class="selectCondition">
    <div class="area">
      <span>地區：</span>
      <select @change="showChart" v-model="area">
        <option v-for="item in areas" >{{item}}</option>
      </select>
    </div>
    <div class="year">
      <span>年份：</span>
      <el-radio v-for="item in years" v-model="year" :label="`${item}`" class="radioStyle" :key="`${item}`" @change="showChart">{{item}}</el-radio>
    </div>
    <div class="month">
      <span>月份：</span>
      <el-radio v-for="item in months" v-model="month" :label="`${item}`" class="radioStyle" :key="`${item}`" @change="showChart">{{item}}</el-radio>
    </div>
    <div class="chartType">
      <span>圖表類型：</span>
      <el-radio v-for="item in types" v-model="type" :label="`${item}`" class="radioStyle" :key="`${item}`" @change="showChart">{{item}}</el-radio>
    </div>
    <div class="chartType">
      <span>比對資料：</span>
      <el-radio v-for="item in comparisonData" v-model="comparison" :label="`${item}`" class="radioStyle" :key="`${item}`" @change="showChart" :disabled="area === '臺南'">{{item}}</el-radio>
    </div>
  </div>
  <div class="showChart">
    <ve-histogram :data="chartData" :extend="extend" v-if="type === '長條圖'"></ve-histogram>
    <ve-line :data="chartData" :extend="extend" v-if="type === '折線圖'"></ve-line>
    <ve-pie :data="chartData" v-if="type === '圓餅圖'"></ve-pie>
    <ve-scatter :data="chartData" :extend="extend" v-if="type === '散點圖'"></ve-scatter>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'chartPage',
  data() {
    return {
      areas: ["臺南", "新營區", "鹽水區", "白河區", "柳營區", "後壁區", "東山區", "麻豆區", "下營區", "六甲區", "官田區", "大內區", "佳里區", "學甲區", "西港區", "七股區", "將軍區", "北門區", "新化區", "新市區", "善化區", "安定區", "山上區", "玉井區", "楠西區", "南化區", "左鎮區", "仁德區", "歸仁區", "關廟區", "龍崎區", "永康區", "東區", "南區",
        "中西區", "北區", "安南區", "安平區"
      ],
      area: "臺南",
      years: [2018, 2017, 2016, 2015, 2014, 2013],
      year: 2018,
      months: ["整年", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      month: '整年',
      types: ["長條圖", "折線圖", "圓餅圖", "散點圖"],
      type: '長條圖',
      comparisonData: ["無", "雨量"],
      comparison: "無",
      chartData: {
        columns: [],
        rows: []
      },
      extend: {
        xAxis: {
          axisLabel: {
            // rotate: 15,
            interval: 0
          }
        }
      }
    }
  },
  methods: {
    showChart: function() {
      console.log(this.area, this.year, this.month, this.type)
      let {
        apiAccident,
        apiRainfail
      } = this.getApi()
      axios.get(apiAccident)
        .then(response => {
          if (this.area === "臺南") {
            this.chartData.columns = ['district', 'total']
          } else {
            if (this.month === "整年") {
              this.chartData.columns = ['month', 'total']
            } else {
              this.chartData.columns = ['day', 'total']
            }
          }
          this.chartData.rows = response.data.items
          if (this.comparison !== "無" && this.area !== '臺南') {
            axios.get(apiRainfail)
              .then(response => {
                this.chartData.columns.push('rain_rate')
                this.chartData.rows.forEach((item, index) => {
                  item.rain_rate = response.data.items[index].rain_rate
                })
              })
              .catch(error => {
                console.log(error)
              })
          }
        }).catch(error => {
          console.log(error)
        })
    },
    getApi: function() {
      let apiAccident = `http://35.189.170.189/api/accident?&year=${this.year}`
      let apiRainfail = `http://35.189.170.189/api/rain?year=${this.year}`
      if (this.area != "臺南") {
        apiAccident += `&district=${this.area}`
      }
      if (this.month === "整年") {
        apiAccident += `&kindof=month`
        apiRainfail += `&kindof=month`
      } else {
        apiAccident += `&kindof=day&month=${this.month}`
        apiRainfail += `&kindof=day&month=${this.month}`
      }
      return {
        apiAccident,
        apiRainfail
      }
    }
  },
  mounted() {
    this.showChart()
  }
}
</script>

<style lang="scss" scoped>
@import 'mixin';
.title {
    @include titleStyle;
}
.selectCondition {
    margin: 15px 30px;
    overflow: hidden;
}
.radioStyle {
    margin-left: 10px;
}
.area,
.chartType,
.month,
.year {
    margin-top: 15px;
}
.area {
    select {
        margin-left: 10px;
        width: 100px;
        border: 0;
        height: 25px;
        background-color: #f4f3ef;
        font-size: 16px;
    }
}
</style>
