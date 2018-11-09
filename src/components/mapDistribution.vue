<template>
<div class="mapDistribution">
  <div class="title">
    <p>地圖分析</p>
  </div>
  <div class="selectCondition">

  </div>
  <div id="map">
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'mapDistribution',
  data() {
    return {}
  },
  methods: {
    initMap: function() {
      var markers = []
      var heatmapList = []
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {
          lat: 23.1510064,
          lng: 120.3361285
        },
        // scrollwheel: false,
        // draggable: false,
        disableDefaultUI: 'disabled',
        disableDoubleClickZoom: 'disabled',
        minZoom: 11
      });


      var infowindow = new google.maps.InfoWindow();
      axios.get('static/tainan.json')
        .then(e => {
          var features = e.data.features
          var tainan = []; // 行政區域多邊形特徵值的陣列
          var name = []; // 行政區域名稱的陣列
          var polygonPath = []; // 繪製後的多邊形陣列
          features.forEach(function(item, index) {
            name.push(item.properties.T_Name); // 將各個行政區的名字記錄到 name 陣列中
            if (item.geometry.coordinates.length == 1) {
              // 如果行政區域只有一塊，例如南投縣
              var arr = [];
              item.geometry.coordinates[0].forEach(function(j) {
                arr.push({
                  lat: j[1],
                  lng: j[0]
                });
              });
              tainan.push(arr);
            }
            // 依序在地圖上畫出對應的多邊形
            polygonPath[index] = new google.maps.Polygon({
              paths: arr,
              strokeColor: '#000',
              strokeOpacity: .7,
              strokeWeight: 0.5,
              strokePosition: google.maps.StrokePosition.CENTER,
              // fillColor: '#f00',
              // fillOpacity: 0.35,
              map: map
            });
            // 為每個多邊形加上滑鼠點擊事件
            polygonPath[index].addListener('click', function(e) {
              var districtName = name[index]
              axios.get(`http://104.199.170.116/api/detail/2018/7/${districtName}`)
                .then(response => {
                  console.log(response)
                  markers.forEach(item => {
                    item.setMap(null)
                  })
                  // heatmapList = []
                  response.data.items.forEach(item => {
                    // heatmapList.push(new google.maps.LatLng(Number(item.gps_latitude), Number(item.gps_longitude)))
                    // var heatmap = new google.maps.visualization.HeatmapLayer({
                    //   map: map,
                    //   data: heatmapList
                    // })
                    var marker = new google.maps.Marker({
                      position: {
                        lat: Number(item.gps_latitude),
                        lng: Number(item.gps_longitude),
                      },
                      map: map,
                      icon: 'static/circle.png'

                    })
                    markers.push(marker)
                  })
                }).catch(error => {
                  console.log(error)
                })
            })
            // 設定滑鼠移到多邊形上，多邊形會變成半透明黑色
            polygonPath[index].addListener('mouseover', function(e) {
              var coordinate = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              };
              // 將資訊視窗的位置，設定為滑鼠的座標
              infowindow.setPosition(coordinate);
              // 設定資訊視窗的內容為行政區名稱
              var districtName = name[index]

              infowindow.setContent('<h2>' + districtName + '</h2>');
              // 將資訊視窗打開在地圖上
              infowindow.open(map);
              this.setOptions({
                // fillColor: '#000'
              })
            });
            // 設定滑鼠移出多邊形，多邊形會恢復半透明紅色
            polygonPath[index].addListener('mouseout', function(e) {
              this.setOptions({
                // fillColor: '#f00'
              })
            });
          });
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.initMap()
  }
}
</script>

<style lang="scss" scoped>
@import 'mixin';
.title {
    @include titleStyle;
}
#map {
    width: 95%;
    height: 85%;
    margin: 15px 30px;
}
.selectCondition {
    height: 50px;

}
</style>
