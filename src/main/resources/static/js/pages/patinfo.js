layui.use('element', function(){
  var element = layui.element;


});

layui.use('form', function(){
  var form = layui.form;

});

        var line = echarts.init(document.getElementById('line'));
        var colors = ['#DC143C', '#1E90FF']
        var option = {
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
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'收缩压',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'舒张压',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            };
        line.setOption(option);

        var ring = echarts.init(document.getElementById('ring'));
        var colors = ['#27b0b0', '#cccccc']
        var option = {
                color: colors,
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {d}%"
                },
                series: [
                    {
                        name:'患病风险',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
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
                        data:[
                            {value:400, name:'患病'},
                            {value:600, name:'健康'}
                        ]
                    }
                ]
            };
        ring.setOption(option);

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