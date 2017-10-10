layui.use('element', function(){
  var element = layui.element;


});

        layui.use('table', function(){
            var table = layui.table;
            //执行渲染
            table.render({
            elem: '#docodr_table', //指定原始表格元素选择器（推荐id选择器）
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