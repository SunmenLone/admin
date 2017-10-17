    layui.use('element', function(){
        var element = layui.element;


    });

    var duration = 0;
    var period = 'all';

    layui.use('form', function(){
        var form = layui.form;

        form.on('radio(duration)', function(data){
            duration = data.value;
            filter(duration, period);
        });

        form.on('radio(period)', function(data){
            period = data.value;
            filter(duration, period);
        });

    });

    var line = echarts.init(document.getElementById('line'));
    var colors = ['#DC143C', '#1E90FF']
    var optionLine = {
            color: colors,
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['收缩压', '舒张压']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                     name:'收缩压',
                     type:'line',
                     stack: '总量',
                     data: []
                },
                {
                     name:'舒张压',
                     type:'line',
                     stack: '总量',
                     data: []
                }
            ]
    };

    var ring = echarts.init(document.getElementById('ring'));
    var colors = ['#27b0b0', '#cccccc']
    var optionRing = {
        color: colors,
        series: [
            {
                name:'患病风险',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '29',
                            fontWeight: 'bold'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[]
            }
        ]
    };

    var bpe = null;

    $.ajax({
        url: '/patient/listDetail',
        data: {
            wechatId: getUrlParam('wechatId')
        },
        success: function(res) {

            var pe = res.patientInfo;
            $('#name').html(pe.name);
            $('#sex').html(pe.sex);
            $('#age').html(pe.age);
            $('#id_card').html(pe.id_card);
            $('#phone').html(pe.phone);
            $('#address').html(pe.address);
            $('#detailed_address').html(pe.detailed_address);

            $('#prob').html(pe.prob.toFixed(1) + '%');
            var prob = [];
            prob.push({value:pe.prob, name:pe.prob.toFixed(1) + '%'});
            prob.push({value:100-pe.prob});
            optionRing.series[0].data = prob
            ring.setOption(optionRing);

            var he = res.healthInfo;
            $('#height').html(he.height);
            $('#weight').html(he.weight);
            $('#bmi').html(Math.round(he.weight / ((he.height * 0.01) * (he.height * 0.01))));
            $('#diabetes').html(he.diabetes);
            $('#chd').html(he.chd);
            $('#stroke').html(he.stroke);
            $('#hypertension').html(he.hypertension);
            $('#family_history').html(he.family_history);
            $('#other_history').html(he.other_history);
            $('#smoke').html(he.smoke);
            $('#smoking').html(he.smoking);
            $('#drink').html(he.drink);
            $('#drinking').html(he.drinking);

            bpe = res.bloodPressure;
            var nc = 0;
            var hc = 0;
            var max_s = 0;
            var max_d = 0;
            var avg_s = 0;
            var avg_d = 0;
            var avg_r = 0;
            var x = [];
            var s = [];
            var d = [];
            for (var i = 0; i < bpe.length; i++) {
                var bp = bpe[i];
                if (bp.systolic_pressure > 140 || bp.diastolic_pressure > 90) {
                    hc ++;
                } else {
                    nc ++;
                }
                if (parseFloat(bp.systolic_pressure) > max_s) {
                    max_s = parseFloat(bp.systolic_pressure);
                }
                if (parseFloat(bp.diastolic_pressure) > max_d) {
                    max_d = parseFloat(bp.diastolic_pressure)
                }
                avg_s += bp.systolic_pressure / bpe.length;
                avg_d += bp.diastolic_pressure / bpe.length;
                avg_r += bp.rhr / bpe.length;
                x.push(bp.date);
                s.push(bp.systolic_pressure);
                d.push(bp.diastolic_pressure);
            }

            $('#nc').html(nc);
            $('#hc').html(hc);
            $('#max_s').html(max_s);
            $('#max_d').html(max_d);
            $('#avg').html(Math.ceil(avg_s) + ' / ' + Math.ceil(avg_d));
            $('#avg_r').html(Math.round(avg_r));

            optionLine.xAxis.data = x;
            optionLine.series[0].data = s;
            optionLine.series[1].data = d;
            line.setOption(optionLine);
        }
    })

    layui.use('table', function(){
        var table = layui.table;
            //执行渲染
        table.render({
            elem: '#odr_table', //指定原始表格元素选择器（推荐id选择器）
            height: 450, //容器高度
            page: true,
            cols: [[{ field: 'time', title: '订单时间', width: 120 },
                   { field: 'docname', title: '医生', width: 70 },
                   { field: 'patname', title: '居民', width: 70 },
                   { field: 'gdsname', title: '服务名称', width: 120 },
                   { field: 'duration', title: '服务期限', width: 220 },
                   { field: 'total', title: '总次数', width: 90 },
                   { field: 'left', title: '剩余次数', width: 90 },
                   { field: 'price', title: '价格', width: 90 },
                   { field: 'odrno', title: '订单编号', width: 120 },
                   { field: 'opt', title: '操作', width: 90 },
                   ]], //设置表头

        });

    });

    var filter = function(duration, period) {
        if (bpe == null) return;

        var nc = 0;
        var hc = 0;
        var max_s = 0;
        var max_d = 0;
        var avg_s = 0;
        var avg_d = 0;
        var avg_r = 0;
        var x = [];
        var s = [];
        var d = [];
        for (var i = 0; i < bpe.length; i++) {
            var bp = bpe[i];
            if ((bp.time != period && period != 'all') || (DateDiff(bp.date, new Date().Format('yyyy-MM-dd')) > duration && duration != 0)) {
                continue;
            }
            if (bp.systolic_pressure > 140 || bp.diastolic_pressure > 90) {
                hc ++;
            } else {
                nc ++;
            }
            if (parseFloat(bp.systolic_pressure) > max_s) {
                max_s = parseFloat(bp.systolic_pressure);
            }
            if (parseFloat(bp.diastolic_pressure) > max_d) {
                max_d = parseFloat(bp.diastolic_pressure)
            }
            avg_s += bp.systolic_pressure / bpe.length;
            avg_d += bp.diastolic_pressure / bpe.length;
            avg_r += bp.rhr / bpe.length;
            x.push(bp.date);
            s.push(bp.systolic_pressure);
            d.push(bp.diastolic_pressure);
        }

        $('#nc').html(nc);
        $('#hc').html(hc);
        $('#max_s').html(max_s);
        $('#max_d').html(max_d);
        $('#avg').html(Math.ceil(avg_s) + ' / ' + Math.ceil(avg_d));
        $('#avg_r').html(Math.round(avg_r));

        optionLine.xAxis.data = x;
        optionLine.series[0].data = s;
        optionLine.series[1].data = d;
        line.setOption(optionLine);
    };