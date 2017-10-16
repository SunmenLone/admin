layui.use('element', function(){
  var element = layui.element;


});

layui.use('form', function(){
  var form = layui.form;

});

var table;
var temp;

layui.use('table', function(){
    table = layui.table;

    table.on('tool(ser)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值
      var tr = obj.tr; //获得当前行 tr 的DOM对象

      if(layEvent === 'edit'){

        console.log(data);

        $('input[name="a_name"]').val(data.name);
        $('#a_content').val(data.content);

        $('input[name="a_duration"]').val(data.duration);
        $('input[name="a_count"]').val(data.count);
        $('input[name="a_price"]').val(data.price);

        $('#btn_edit').css('display', 'inline-block');
        $('#btn_add').css('display', 'none');
        $('#modal_title').html('编辑服务');
        $('#editmodal').removeAttr('hidden');

        temp = data;

      } else if(layEvent === 'del'){ //删除

        layer.confirm('真的删除行么', function(index){
          obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
          layer.close(index);
          //向服务端发送删除指令

          del(data.id);

        });

      } else if(layEvent === 'disable'){

        $('#prompt').html('确定冻结此项服务?');
        $('#confirm').on('click', function(){
            changeStatus(data.id, 0);
        })
        $('#infomodal').removeAttr('hidden');

      } else if(layEvent === 'enable'){

        $('#prompt').html('确定激活此项服务?');
        $('#confirm').on('click', function(){
            changeStatus(data.id, 1);
        })
        $('#infomodal').removeAttr('hidden');

      }
    });

});

var search = function(){

    var option = {
        where: {}
    };

    if ( $('input[name="status"]:checked').val() != -1 ) {
        option.where['status'] = $('input[name="status"]:checked').val()
    }

    if ( $('input[name="name"]').val() != '') {
        option.where['name'] = $('input[name="name"]').val()
    }


    table.reload('ser_table', option);
}

var toAdd = function(){
    $('#modal_title').html('新增服务');
    $('#btn_add').css('display', 'inline-block');
    $('#btn_edit').css('display', 'none');

    $('input[name="a_name"]').val('');
    $('#a_content').val('');

    $('input[name="a_duration"]').val('');
    $('input[name="a_count"]').val('');
    $('input[name="a_price"]').val('');

    $('#editmodal').removeAttr('hidden');
}

var add = function(){

    $.ajax({
        url: '/service/add',
        data: {
            name: $('input[name="a_name"]').val(),
            content: $('#a_content').val(),
            riskLevelId: $('#a_kind option:selected').val(),
            kind: $('#a_kind option:selected').html(),
            duration: $('input[name="a_duration"]').val(),
            count: $('input[name="a_count"]').val(),
            price: $('input[name="a_price"]').val(),
        },
        success: function(res) {
            console.log('add');
        }
    })

}

var edit = function(){

    var data = temp;

    var param = {
        id: data.id
    };

    if ( $('input[name="a_name"]').val() != data.name ) {
        param['name'] = $('input[name="a_name"]').val();
    }

    if ( $('#a_content').val() != data.content ) {
        param['content'] = $('#a_content').val();
    }

    if ( $('#a_kind option:selected').html() != data.kind ) {
        param['riskLevelId'] = $('#a_kind option:selected').val();
        param['kind'] = $('#a_kind option:selected').html();
    }

    if ( $('input[name="a_duration"]').val() != data.duration ) {
        param['duration'] = $('input[name="a_duration"]').val();
    }

    if ( $('input[name="a_count"]').val() != data.count ) {
        param['count'] = $('input[name="a_count"]').val();
    }

    if ( $('input[name="a_price"]').val() != data.price ) {
        param['price'] = $('input[name="a_price"]').val();
    }

    $.ajax({
            url: '/service/edit',
            data: param,
            success: function(res) {
                console.log('edit');
                $('#editmodal').attr('hidden', true);
                table.reload('ser_table', {});
            }
    })

}

var del = function(id){

    $.ajax({
        url: '/service/del',
        data: {
            id: id
            },
        success: function(res) {
            console.log('del');
            table.reload('ser_table', {});
        }
    })
}

var changeStatus = function(id, status){

    $.ajax({
            url: '/service/changeStatus',
            data: {
                id: id,
                status: status
            },
            success: function(res) {
                console.log('changeStatus');
                $('#infomodal').attr('hidden', true);
                table.reload('ser_table', {});
            }
    })

}