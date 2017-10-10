layui.use('element', function(){
  var element = layui.element;


});

layui.use('table', function(){
    var table = layui.table;
    //执行渲染
    table.render({
    elem: '#docser_table', //指定原始表格元素选择器（推荐id选择器）
    height: 500, //容器高度
    page: true,
    cols: [[{ field: 'name', title: '服务名称', width: 200 },
           { field: 'duration', title: '服务期限', width: 120 },
           { field: 'type', title: '适用人群', width: 160 },
           { field: 'count', title: '次数', width: 100 },
           { field: 'price', title: '价格', width: 120 },
           { field: 'ontime', title: '上架时间', width: 140 },
           { field: 'sells', title: '购买次数', width: 100 },
           { field: 'opt', title: '操作', width: 100 },
           ]], //设置表头

});

});

layui.use('form', function(){
  var form = layui.form;

});