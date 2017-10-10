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
    elem: '#doc_table', //指定原始表格元素选择器（推荐id选择器）
    height: 400, //容器高度
    page: true,
    cols: [[{ field: 'id', title: '序号', width: 80 },
           { field: 'name', title: '姓名', width: 80 },
           { field: 'account', title: '帐号', width: 140 },
           { field: 'gender', title: '性别', width: 60 },
           { field: 'phone', title: '手机号', width: 160 },
           { field: 'rank', title: '职称', width: 80 },
           { field: 'depart', title: '科室', width: 80 },
           { field: 'service', title: '服务', width: 60 },
           { field: 'status', title: '认证状态', width: 120 },
           { field: 'count', title: '订单总数', sort: true, width: 100 },
           { field: 'time', title: '加入时间', sort: true, width: 140 },
           { field: 'opt', title: '操作', width: 100 },
           ]], //设置表头

});

});