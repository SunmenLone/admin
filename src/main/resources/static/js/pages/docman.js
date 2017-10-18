layui.use('element', function(){
  var element = layui.element;


});

layui.use('form', function(){
  var form = layui.form;

});

var table;
layui.use('table', function(){
    table = layui.table;
    //执行渲染
    table.render({
        elem: '#doc_table',
        url:  '/doctor/listAll',
        page: true,
        even: true,
        cols: [[{ field: 'id', title: '序号', width: 80 },
                { field: 'phone', title: '帐号/手机', width: 160 },
                { field: 'name', title: '姓名', width: 120 },
                { field: 'sex', title: '性别', width: 80 },
                { field: 'title', title: '职称', width: 120 },
                { field: 'department', title: '科室', width: 120 },
                { toolbar: '#ser', title: '服务', align:'center', width: 80 },
                { field: 'verify', title: '认证状态', width: 120 },
                { field: 'count', title: '订单总数', sort: true, width: 120 },
                { field: 'time', title: '加入时间', sort: true, width: 180 },
                { toolbar: '#opt', title: '操作', align:'center', width: 120 },
               ]]
    });

    table.on('tool(doc)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        console.log(data);

        if(layEvent === 'service'){

        } else if(layEvent === 'order') {

        } else if(layEvent === 'edit') {

        }

    });

});

var search = function(){

    var option = {
        where: {}
    };

    if ( $('input[name="sex"]:checked').val() != -1 ) {
        option.where['sex'] = $('input[name="sex"]:checked').val()
    }

    if ( $('input[name="kind"]:checked').val() != -1 ) {
            option.where['kind'] = $('input[name="kind"]:checked').val()
    }

    if ( $('input[name="age"]:checked').val() != -1 ) {
            option.where['age'] = $('input[name="age"]:checked').val()
        }

    if ( $('input[name="count"]:checked').val() != -1) {
            option.where['count'] = $('input[name="count"]:checked').val()
    }


    table.reload('doc_table', option);
}