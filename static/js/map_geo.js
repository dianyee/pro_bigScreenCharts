let MapGeo = {
    init() {
        this.charts = {};
        this.loadData();
        // 地图最好不要根据窗口大小来缩放，否则容易因dom变化而报错
        Public.chartsResize(this.charts, {notResize: ['ec01_map_geoMap', 'ec02_map_bMap']});
        // Public.chartsReDraw(this.charts, null, ['ec01_map_geoMap', 'ec02_map_bMap'])
    },
    loadData() {
        const that = this;
        this.ec01_map('ec01_map_geoMap'); //geo地图
        this.ec01_map('ec02_map_bMap'); //百度地图
        this.ec03_line_blessings();
        // 地图切换事件
        $("#ec01_map_geoMap").parent().prev().find('[name=mapType]').click(function () {
            if ($(this).val() === 'geo') {
                $("#ec01_map_geoMap").parent().show().siblings('.chart-box').hide();
            } else {
                $("#ec02_map_bMap").parent().show().siblings('.chart-box').hide();
            }
        });
        this.ec04_pie_life();
    },
    ec01_map(id) {
        const that = this;
        let chart = echarts.init($("#" + id)[0]);
        this.charts[id] = chart;
        chart.setOption(com_charts);
        let com_opt = {
            grid: {
                top: '5%'
            },
            legend: {
                orient: 'vertical',
                right: '2%',
                bottom: '5%'
            },

            series: [
                {
                    name: '我的位置',
                    type: 'effectScatter',
                    symbolSize: 8 * scale,
                    itemStyle: {color: 'red'},
                    rippleEffect: {
                        scale: 10 * scale,
                        brushType: 'stroke'
                    }
                }, {
                    name: '玄奘取经路线(去)',
                    type: 'lines',
                    polyline: true,
                    lineStyle: {color: colors[0]},
                    effect: {
                        show: true,
                        symbolSize: 8 * scale,
                        constantSpeed: 50 * scale,
                        trailLength: 0.5 * scale
                    },
                    data: []
                }, {
                    name: '玄奘取经路线(去)',
                    type: 'scatter',
                    symbol: 'pin',
                    symbolSize: 24 * scale,
                    label: {
                        show: true,
                        formatter: param => {
                            return param.value[2].oldName;
                        },
                        fontSize: 16 * scale,
                        position: 'top'
                    },
                    tooltip: {
                        formatter: param => {
                            return `${param.value[2].oldName}<br>
                                    今 ${param.value[2].name}
                                    <br>${param.value[2].remark || ''}`;
                        },
                    },
                    itemStyle: {color: colors[0]},
                    data: []
                }, {
                    name: '鉴真东渡路线',
                    type: 'lines',
                    polyline: true,
                    lineStyle: {color: colors[1]},
                    effect: {
                        show: true,
                        symbolSize: 8 * scale,
                        constantSpeed: 50 * scale,
                        trailLength: 0.5 * scale
                    },
                    data: []
                }, {
                    name: '鉴真东渡路线',
                    type: 'scatter',
                    symbol: 'pin',
                    symbolSize: 24 * scale,
                    label: {
                        show: true,
                        formatter: param => {
                            return param.value[2].oldName;
                        },
                        fontSize: 16 * scale,
                        position: 'top'
                    },
                    tooltip: {
                        formatter: param => {
                            return `${param.value[2].oldName}<br>
                                    今 ${param.value[2].name}
                                    <br>${param.value[2].remark || ''}`;
                        },
                    },
                    itemStyle: {color: colors[1]},
                    data: []
                }, {
                    name: '我去过的地方',
                    type: 'scatter',
                    symbol: 'arrow',
                    symbolSize: 18 * scale,
                    label: {
                        show: true,
                        formatter: param => {
                            return param.value[2].name;
                        },
                        fontSize: 16 * scale,
                        position: 'bottom'
                    },
                    tooltip: {
                        formatter: param => {
                            return `${param.value[2].name}<br>
                                    ${param.value[2].remark}`
                        },
                    },
                    itemStyle: {color: colors[2]},
                    data: []
                }
            ].map(item => {
                return $.extend(true, item, {
                    coordinateSystem: id === 'ec01_map_geoMap' ? 'geo' : 'bmap',
                    zlevel: 1,
                })
            })
        };
        let opt_geo = $.extend(true, {}, com_opt, {
            geo: {
                map: 'world',
                roam: true,
                center: [103.1492, 36.2776],
                zoom: 5.554,
                itemStyle: {
                    areaColor: 'rgba(255,255,255,.13)',
                    borderColor: 'rgba(255,255,255,.33)'
                },
                emphasis: {
                    itemStyle: {
                        areaColor: 'rgba(255,255,255,.33)'
                    },
                }
            }
        });
        let opt_bmap = $.extend(true, {}, com_opt, {
            bmap: {
                center: [100.404, 36.915],
                // center: [103.1492, 36.2776],
                zoom: 5,
                roam: true,
                mapStyle: {
                    'styleJson': [
                        {
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#031628'
                            }
                        },
                        {
                            'featureType': 'land',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#000102'
                            }
                        },
                        {
                            'featureType': 'highway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        },
                        {
                            'featureType': 'arterial',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'arterial',
                            'elementType': 'geometry.stroke',
                            'stylers': {
                                'color': '#0b3d51'
                            }
                        },
                        {
                            'featureType': 'local',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'railway',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'railway',
                            'elementType': 'geometry.stroke',
                            'stylers': {
                                'color': '#08304b'
                            }
                        },
                        {
                            'featureType': 'subway',
                            'elementType': 'geometry',
                            'stylers': {
                                'lightness': -70
                            }
                        },
                        {
                            'featureType': 'building',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'all',
                            'elementType': 'labels.text.fill',
                            'stylers': {
                                'color': '#857f7f'
                            }
                        },
                        {
                            'featureType': 'all',
                            'elementType': 'labels.text.stroke',
                            'stylers': {
                                'color': '#000000'
                            }
                        },
                        {
                            'featureType': 'building',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#022338'
                            }
                        },
                        {
                            'featureType': 'green',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#062032'
                            }
                        },
                        {
                            'featureType': 'boundary',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#465b6c'
                            }
                        },
                        {
                            'featureType': 'manmade',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#022338'
                            }
                        },
                        {
                            'featureType': 'label',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }
                    ]
                }
            }
        });
        chart.setOption(id === 'ec01_map_geoMap' ? opt_geo : opt_bmap);


        $.get({
                url: 'https://api.asilu.com/geo/',
                dataType: 'jsonp',
            }, data => {
                let opt = chart.getOption();
                opt.series[0].data = [[data.bd09.lng, data.bd09.lat]];
                chart.setOption(opt);
            }
        );
        let opt = chart.getOption();
        //详细版：https://baijiahao.baidu.com/s?id=1596010378178932953&wfr=spider&for=pc
        let xuanZangToPoints = [
            {name: '西安', oldName: '长安'},
            // {name: '天水', oldName: '秦州'},
            {name: '兰州', oldName: '兰州'},
            {name: '武威', oldName: '凉州', remark: '武威市凉州区'},
            // {name: '张掖', oldName: '甘州'},
            // {name: '酒泉', oldName: '肃州'},
            {name: '瓜州', oldName: '安西'},
            // {name: '葫芦河', oldName: '窟窿河'},
            {name: '双塔水库', oldName: '唐代玉门关', remark: '瓜州(曾长期叫安西)县城东五十公里双塔水库'},
            {name: '哈密', oldName: '伊吾'},
            {name: '鄯善', oldName: '白力城'},
            {name: '吐鲁番', oldName: '高昌王城'},
            // {name: '布干台', oldName: '无半城'},
            {name: '焉耆', oldName: '阿耆尼'},
            {name: '阿克苏', oldName: '跋禄迦国'},
            {
                name: '托克马克',
                oldName: '碎叶',
                remark: '今吉尔吉斯之托克马克西南八公里处，是唐代四大名镇之一，另三个是安西都护府所在的龟兹镇（今库车）、疏勒镇（今喀什）、于阗镇（今和田），也是诗人李白出生地。'
            },
            {name: '', oldName: ''},
            {name: '江布尔', oldName: '恒罗斯'},
            // {name: '汗阿巴德', oldName: '窣堵利瑟那国',remark: '乌兹别克塔什干地区汗阿巴德'},
            {name: '撒马尔罕', oldName: '飒秣建国', remark: '乌兹别克斯坦撒马尔罕北三公里处，其内城东门叫中国门'},
            {name: '古佐尔', oldName: '铁门关', remark: '乌兹别克斯坦南部达尔本特之西'},

            {name: '巴米扬', oldName: '梵衍那国', remark: '阿富汗之巴米扬，有被塔利班炸毁的巴米扬立石佛像'},
            {name: '喀布尔', oldName: '迦毕试国', remark: '阿富汗喀布尔流域'},
            {name: '白沙瓦', oldName: '健陀罗国', remark: '巴基斯坦白沙瓦'},
            {name: '斯利那加', oldName: '迦湿弥罗国', remark: '今克什米尔印度控制区之斯利那加'},
            {name: '卢迪亚纳', oldName: '磔迦国', remark: '巴基斯坦旁遮普地区，经纬度可能不准'},
            {name: '卡瑙杰', oldName: '曲女城', remark: '玄奘归途中在此参加了有20余国君王和僧众参加的大法会'},
            {name: '那烂陀寺', oldName: '摩揭陀国的那烂陀寺', remark: '今印度比哈尔邦王舍城附近'},
            {name: '', oldName: '', remark: ''},
            {name: '', oldName: '', remark: ''},
        ];
        let xuanZangToline = xuanZangToPoints.map(item => geoCoordMap[item.name]).filter(item => item);
        xuanZangToPoints = xuanZangToPoints.map(item => {
            if (!geoCoordMap[item.name]) return false;
            item = geoCoordMap[item.name].concat(item);
            return item
        }).filter(item => item);
        opt.series[1].data = [{coords: xuanZangToline}];
        opt.series[2].data = xuanZangToPoints;

        let jianZhenPoints = [
            {name: '西安', oldName: '长安', remark: ''},
            {name: '陕州', oldName: '陕州', remark: ''},
            {name: '洛阳', oldName: '洛阳', remark: ''},
            {name: '开封', oldName: '汴州', remark: ''},
            {name: '扬州', oldName: '扬州', remark: ''},
            {name: '冲绳岛那霸市', oldName: '阿儿奈波岛', remark: ''},
            {name: '奄美市', oldName: '奄美大岛', remark: ''},
            {name: '屋久岛', oldName: '益救岛', remark: ''},
            {name: '佐多岬', oldName: '佐多岬', remark: ''},
            {name: '南萨摩市鹿儿岛县', oldName: '秋妻屋浦', remark: '不知地图上秋日何在，找了个差不多的地点'},
            {name: '长崎', oldName: '鹿濑？', remark: '地图上鹿濑离得比较远，找了个差不多的地点'},
            {name: '太宰府', oldName: '太宰府', remark: ''},
            {name: '难波', oldName: '难波', remark: ''},
            {name: '奈良东大寺', oldName: '奈良东大寺', remark: ''},
        ];
        let jianZhenLine = jianZhenPoints.map(item => geoCoordMap[item.name]).filter(item => item);
        jianZhenPoints = jianZhenPoints.map(item => {
            if (!geoCoordMap[item.name]) return false;
            item = geoCoordMap[item.name].concat(item);
            return item
        }).filter(item => item);
        opt.series[3].data = [{coords: jianZhenLine}];
        opt.series[4].data = jianZhenPoints;

        opt.series[5].data = [
            // 宝鸡，青岛，西安，乌鲁木齐，库尔勒，阿克苏，克拉玛依，昌吉，奎屯，吐鲁番，北京，大连，哈尔滨，杭州，苏州，西塘，上海，济南。
            {name: '宝鸡', remark: '家乡'},
            {name: '青岛', remark: '求学之地'},
            {name: '西安', remark: '家乡省城'},
            {name: '乌鲁木齐', remark: '出差'},
            {name: '库尔勒', remark: '有美丽的孔雀河'},
            {name: '阿克苏', remark: '馕正宗，'},
            {name: '克拉玛依', remark: '油田上的磕头机很多'},
            {name: '昌吉', remark: '和乌鲁木齐邻居'},
            {name: '奎屯', remark: '遇见两个伊利小姑娘'},
            {name: '吐鲁番', remark: '鄯善县到处是葡萄屋'},
            {name: '北京', remark: '北漂那些年'},
            {name: '大连', remark: '出差，大黑山，野山上的樱桃'},
            {name: '哈尔滨', remark: '出差，8月的地下室穿军大衣'},
            {name: '杭州', remark: '旅行，西湖，西塘'},
            {name: '苏州', remark: '平江路上和王之一父亲帮弹古筝的小姑娘调琴'},
            {name: '西塘', remark: '如画的江南风景'},
            {name: '上海', remark: '陆家嘴和注射器三件套'},
            {name: '济南', remark: '没看到趵突泉喷水，没听到大明湖的蛙鸣'},
        ].map(item => {
            if (!geoCoordMap[item.name]) return false;
            item = geoCoordMap[item.name].concat(item);
            return item
        }).filter(item => item);
        chart.setOption(opt);


    },
    ec03_line_blessings() {
        const chart = echarts.init($("#ec03_line_blessings")[0]);
        this.charts.ec03_line_blessings = chart;
        chart.setOption(opt_line);
        let [xData, data] = [[], []];
        let [xDataNew, dataNew] = [[], []];
        for (let i = 0; i <= 120; i++) {
            xData.push(i);
            data.push(Math.random() * 200 - 100)
        }

        chart.setOption({
            grid: {
                top: '11%',
                right: '13%'
            },
            xAxis: {
                // name:'年龄',
                nameGap: 5 * scale,
                data: xData
            },
            yAxis: {
                name: '福报',
                nameGap: 5 * scale,
                min: -110,
                max: 110
            },
            toolTip: {},
            dataZoom: { // 本图表option的个性
                type: 'inside',
            },
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: -100,
                max: 100,
                inRange: {
                    // color: ['#000', 'lightblue'],
                    color: ['red', 'yellow', 'lightgreen'],
                    // symbolSize: [30, 100]
                }
            }],
            series: [{
                data: data,
                markLine: {
                    silent: true,
                    label: {show: false},
                    symbolSize: 15 * scale,
                    data: [{
                        yAxis: -100
                    }, {
                        yAxis: 0
                    }, {
                        yAxis: 100
                    }]
                },
            }].map(item => {
                return $.extend(true, {}, seri_line, item)
            })
        });

        let message = '云谷禅师曰：' +
            '\n人未能无心（凡人都会起心动念），终为阴阳所缚，安得无数（所以有命运）？' +
            '\n但惟凡人有数（不过只有凡人是这样）。' +
            '\n极善之人。数固拘他不定。极恶之人。数亦拘他不定。（而极善极恶之人才能逃脱命运束缚）';
        let setOpt = (param) => {
            let [startTime, val] = [$("#startTime_input_show").val(), $('#blessings_input').val()];

            dataNew = data.map((item, index) => {
                if (index < startTime) {
                    return item;
                }
                if (["100", "-100"].includes(val)) {
                    return val
                }
                let range = (1 - (val > 0 ? item : -item) / 100);
                let tempVal = range * val + item + (param === 'startTime' ? 0 : Math.random() * 20 - 10);
                return tempVal > 100 ? 100 : (tempVal < -100 ? -100 : tempVal);
            });
            chart.setOption({
                series: [{
                    data: dataNew,
                    markLine: {
                        silent: true,
                        symbolSize: 15 * scale,
                        data: [{
                            yAxis: -100
                        }, {
                            yAxis: val
                        }, {
                            yAxis: 100
                        }]
                    },
                }].map(item => {
                    return $.extend(true, {}, seri_line, item)
                })
            })
            if (param !== 'startTime' && ["100", "-100"].includes(val)) {
                alert(message)
            }
        }
        $('#blessings_input').change(function () {
            let val = $(this).val();
            $("#blessings_input_show").val($(this).val());
            setOpt();
        });
        $('#startTime_input').change(function () {
            $("#startTime_input_show").val($(this).val());
            setOpt('startTime');
        });

    },
    ec04_pie_life() {
        let chart = echarts.init($("#ec04_pie_life")[0]);
        this.charts.ec04_pie_life = chart;
        chart.setOption(opt_pie);
        chart.setOption({
            legend: {show: false},
            series: [{
                center: ['30%', '50%'],
                radius: [0, '45%'],
                data: [
                    {name: '基本寿命\n(无意外)', value: 60},
                    {name: '心态', value: 13.5},
                    {name: '情绪', value: 9},
                    {name: '身体', value: 9},
                    {name: '作息', value: 4.5},
                    {name: '饮食', value: 4.5},
                    {name: '习惯', value: 4.5},
                    {
                        name: '剩余',
                        value: 45,
                        itemStyle: {
                            color: "#aaa"
                        }
                    },
                ]
            }].map(item => {
                return $.extend(true, {}, seri_pie, item)
            })
        });
        $('.ec04_pie_life').find('input').change(function () {
            let score = 0;
            let [curRate, curVal, curId] = [0,  $(this).val(), $(this).attr('id')];
            $(this).prev().val($(this).val());
            $('.ec04_pie_life').find('input').each(function (index, item) {
                let [rate, val, id] = [0, $(this).val(), $(this).attr('id')];
                switch (id) {
                    case 'mindset':
                        rate = 0.3;
                        break;
                    case 'mind' :
                    case 'body':
                        rate = 0.2;
                        break;
                    case 'workAndRest':
                    case 'diet':
                    case 'interest':
                        rate = 0.1;
                        break;
                }
                if (id === curId) {
                    curRate = rate
                }
                score += 90 * rate * (val - 0) / 10;
            });
            $("#score").text(Math.ceil(score) + 60);
            let opt = chart.getOption();
            opt.series[0].data[$(this).parent().index() + 1].value = 90 * curRate * ($(this).val() - 0) / 10;
            opt.series[0].data[7].value = 90 - score;
            chart.setOption(opt);
        }).eq(0).change()
        /*
        * 平时心态30，消极沮丧：积极乐观
        * 遇事情绪20，急躁易怒：谦和淡定
        * 身体20，懒散不动：坚持锻炼
        * 作息10，熬夜嗜睡：早起早睡
        * 饮食10，暴食重口、：规律清淡
        * 习惯爱好10，颓废庸俗：高雅艺术
        * */
    }
};
MapGeo.init();


















