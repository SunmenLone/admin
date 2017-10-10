layui.use('element', function(){
  var element = layui.element;


});

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

layui.use('laydate', function(){
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#date1', //指定元素
        format: 'y-MM-dd'
    });

    laydate.render({
        elem: '#date2', //指定元素
        format: 'y-MM-dd'
    });
});