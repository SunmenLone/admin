layui.use('element', function(){
  var element = layui.element;


});

layui.use('form', function(){
  var form = layui.form;

});

layui.use('table', function(){
    var table = layui.table;
    //执行渲染
    table.render({
    elem: '#ser_table', //指定原始表格元素选择器（推荐id选择器）
    height: 450, //容器高度
    page: true,
    cols: [[{ field: 'id', title: '序号', width: 80 },
           { field: 'name', title: '名称', width: 300 },
           { field: 'expired', title: '期限', width: 140 },
           { field: 'times', title: '次数', width: 100 },
           { field: 'type', title: '适用人群', width: 100 },
           { field: 'price', title: '价格', width: 100 },
           { field: 'status', title: '状态', width: 120 },
           { field: 'time', title: '时间', width: 140 },
           { field: 'opt', title: '操作', width: 120 }
           ]], //设置表头

});

});