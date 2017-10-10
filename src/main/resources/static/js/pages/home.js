        layui.use('element', function(){
            var element = layui.element;
        });

        var pie = echarts.init(document.getElementById('pie'));
        var option = {
            title : {
                text: '居民健康状况',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['高危人群','中危人群','低危人群','健康人群','未评估']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['45%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '24',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:135, name:'高危人群'},
                    {value:234, name:'中危人群'},
                    {value:1548, name:'低危人群'},
                    {value:335, name:'健康人群'},
                    {value:310, name:'未评估'}
                ]
                }
            ]
        };
        pie.setOption(option);

        var bar1 = echarts.init(document.getElementById('bar1'));
        var colors = ['#27b0b0', '#675bba']
        var option = {
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                legend: {
                    data:['医生', '居民'],
                    y: 'bottom'
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: ['第1周','第2周','第3周','第4周']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '医生：人',
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '居民：人',
                        position: 'right',
                        axisLine: {
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name:'医生',
                        type:'bar',
                        data:[48, 72, 256, 196]
                    },
                    {
                        name:'居民',
                        type:'bar',
                        yAxisIndex: 1,
                        data:[128, 96, 72, 88]
                    }
                ]
            };
        bar1.setOption(option);


        var bar2 = echarts.init(document.getElementById('bar2'));
                var colors = ['#27b0b0', '#675bba']
                var option = {
                        color: colors,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        grid: {
                            right: '20%'
                        },
                        legend: {
                            data:['订单数量', '订单额度'],
                            y: 'bottom'
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true
                                },
                                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',]
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '数量：单',
                                position: 'left',
                                axisLine: {
                                    lineStyle: {
                                        color: colors[0]
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value}'
                                }
                            },
                            {
                                type: 'value',
                                name: '额度：元',
                                position: 'right',
                                axisLine: {
                                    lineStyle: {
                                        color: colors[1]
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value}'
                                }
                            }
                        ],
                        series: [
                            {
                                name:'订单数量',
                                type:'bar',
                                data:[48, 72, 256, 196, 48, 72, 256, 196, 48, 72, 256, 196]
                            },
                            {
                                name:'订单额度',
                                type:'bar',
                                yAxisIndex: 1,
                                data:[128, 96, 72, 88, 128, 96, 72, 88, 128, 96, 72, 88]
                            }
                        ]
                    };
                bar2.setOption(option);




