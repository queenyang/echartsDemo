// https://www.echartsjs.com/examples/zh/editor.html?c=lines-bmap-effect
// https://echarts.apache.org/examples/zh/editor.html?c=doc-example/scatter-visualMap-piecewise
// https://echarts.apache.org/examples/zh/editor.html?c=map-usa

var geoCoordMap = getData().geoCoordMap;
var SHData = getData().SHData;

var convertData = function (data) {
    var res = [];
    data.forEach(dataItem => {
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if(fromCoord && toCoord) {
            res.push([{
                coord: fromCoord
            },{
                coord: toCoord
            }]);
        }
    });
    return res;
}
var color = ['#a6c84c', '#ffa022', '#46bee9'];
var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

option = {
    backgroundColor: '#404a59',
    title: {
        text: '带有尾迹特效的产品销量图',
        subtext: '2D Map',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item'
    },
    geo: {
        map: 'china',
        label: {
            // show: true,
            color: '#9c9c9c',
            emphasis: {
                color: '#9c9c9c',
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [
        {
            type: 'lines',
            zlevel: 2,
            // effect: {
            //     show: true,
            //     period: 6,
            //     trailLength: 0,
            //     symbol: planePath,
            //     symbolSize: 15,
            // },
            lineStyle: {
                color: color[0],
                width: 1,
                opacity: 0.4,
                curveness: -0.2,
            },
            data: convertData(SHData)
        }, 
        {
            type: 'lines',
            zlevel: 3,
            coordinateSystem: 'geo', //使用地理坐标系
            effect: {
                // constantSpeed: 20,
                period: 4,
                show: true,
                trailLength: 0.4,
                symbolSize: 2
            },
            lineStyle: {
                color: '#e3f3ba',
                width: 0,
                opacity: 0.4,
                curveness: -0.2
            },
            data: convertData(SHData),
            animation: false,
        }, 
        {
            type: 'effectScatter',
            coordinateSystem: 'geo', //使用地理坐标系
            zlevel: 2,
            rippleEffect: {  // 涟漪特效相关配置
                brushType: 'stroke',
                period: 4,   // 动画的周期，秒数
            },
            label: {
                show: true,
                position: 'right',
                formatter: '{b}: {@[2]}',  //{b}：数据名
            },
            symbolSize: function (val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[0]
                }
            },
            data: SHData.map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
            })
        }
    ]
};