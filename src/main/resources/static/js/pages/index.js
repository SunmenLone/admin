layui.use('element', function(){
        var element = layui.element;
    });

    $(function(){
        $("#left_nav").each(function(){
            //取出ul下的第一个li
            var li= $(this).children().first();
            li.addClass('layui-this');
        });
    })

    layui.use('form', function(){
        var form = layui.form;

    });

    layui.use('upload', function(){
  var $ = layui.jquery, upload = layui.upload;

  //普通图片上传
  var uploadInst = upload.render({
    elem: '#upload_avatar'
    ,url: '/upload/'
    ,before: function(obj){
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result){
        $('#avatar').attr('src', result); //图片链接（base64）
      });
    },
    done: function(res){
      //如果上传失败
      if(res.code > 0){
        return layer.msg('上传失败');
      }
      //上传成功
    },
    error: function(){
      //演示失败状态，并实现重传

    }
  });
});