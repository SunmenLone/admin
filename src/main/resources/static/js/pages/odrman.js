layui.use('element', function(){
  var element = layui.element;


});

layui.use('form', function(){
  var form = layui.form;

});

layui.use('laydate', function(){
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#time', //指定元素
        type: 'datetime',
        format: 'y-MM-dd HH:mm:ss'
    });
});

layui.use('table', function(){
    var table = layui.table;
    //执行渲染
    table.render({
    elem: '#odr_table', //指定原始表格元素选择器（推荐id选择器）
    height: 400, //容器高度
    page: true,
    cols: [[{ field: 'time', title: '订单时间', width: 110 },
           { field: 'odrno', title: '订单编号', width: 110 },
           { field: 'gdsname', title: '商品名称', width: 120 },
           { field: 'duration', title: '服务期限', width: 220 },
           { field: 'docname', title: '医生', width: 70 },
           { field: 'patname', title: '居民', width: 70 },
           { field: 'phone', title: '居民电话', width: 140 },
           { field: 'total', title: '总次数', width: 90 },
           { field: 'left', title: '剩余次数', width: 90 },
           { field: 'price', title: '指导价格', width: 90 },
           { field: 'status', title: '交易状态', width: 90 },
           ]], //设置表头

});

});