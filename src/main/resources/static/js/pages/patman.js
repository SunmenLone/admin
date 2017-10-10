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
    elem: '#pat_table', //指定原始表格元素选择器（推荐id选择器）
    height: 380, //容器高度
    page: true,
    cols: [[{ field: 'id', title: '序号', width: 80 },
           { field: 'name', title: '姓名', width: 80 },
           { field: 'gender', title: '性别', width: 60 },
           { field: 'age', title: '年龄', width: 60 },
           { field: 'phone', title: '手机号', width: 160 },
           { field: 'idno', title: '身份证号', width: 180 },
           { field: 'address', title: '地址', width: 240 },
           { field: 'evares', title: '评估结果', width: 120 },
           { field: 'count', title: '订单购买数量', width: 120 },
           { field: 'opt', title: '操作', width: 100 },
           ]], //设置表头

});

});