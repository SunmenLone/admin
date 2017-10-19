layui.use('element', function(){
  var element = layui.element;


});

var form;
layui.use('form', function(){
  form = layui.form;

});

var head_pic;
var practice_pic;
layui.use('upload', function(){
  var $ = layui.jquery, upload = layui.upload;

  //普通图片上传
  var uploadInst = upload.render({
    elem: '#upload_avatar',
    auto: false,
    choose: function(obj){
      obj.preview(function(index, file, result){
        $('#head_pic').attr('src', result);
        console.log(file);
        head_pic = file;
      });
    }
  });

  var uploadInst = upload.render({
      elem: '#upload_no1',
      auto:false,
      choose: function(obj){
        obj.preview(function(index, file, result){
          $('#practice_pic').attr('src', result);
          practice_pic = file;
        });
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

$(function(form){

    if ( getUrlParam('edit') != null && getUrlParam('edit') == 1 ) {

        $('#cur_cite').html('编辑医生');
        $('#primary').html('修改');

        $.ajax({
            url:"/doctor/info",
            data: {
                phone: getUrlParam('phone')
            },
            success: function(res){

                if (res.code != 0) return;

                var doc = res.doctor;
                $('input[name="phone"]').val(doc.phone);
                $('input[name="phone"]').attr('disabled', true);
                $('input[name="password"]').val(doc.password);
                $('input[name="password"]').attr('disabled', true);
                $('input[name="name"]').val(doc.name);
                $('input:radio[value="'+ doc.sex +'"]').attr('checked', true);
                $('input[name="practice_code"]').val(doc.practice_code);
                $('#hospital option[value="' + doc.hospital + '"]').attr('selected', true);
                $('#title option[value="' + doc.title + '"]').attr('selected', true);
                $('#department option[value="' + doc.department + '"]').attr('selected', true);
                $('#head_pic').attr('src', doc.head_pic);
                $('#practice_pic').attr('src', doc.practice_pic);
                $('textarea[name="adept"]').html(doc.adept);
                $('textarea[name="experience"]').html(doc.experience);

                $('input[name="name"]').change(function(){
                    console.log('change');
                });




            }
        });
    } else {

        $('#primary').on('click', function() {


                OSS.urllib.request("http://125.216.243.114:2004/requestSTS",
                                                 {method: 'GET'},
                                                 function (err, response) {
                               if (err) return alert(err);

                               try {
                                 result = JSON.parse(response);

                                 var ext = /\.[^\.]+/.exec(head_pic.name);

                                 var client = new OSS.Wrapper({
                                             accessKeyId: result.AccessKeyId,
                                             accessKeySecret: result.AccessKeySecret,
                                             stsToken: result.SecurityToken,
                                             endpoint: 'oss-cn-shenzhen.aliyuncs.com',
                                             bucket: 'sunmen-oss'
                                           });

                                 var time = new Date().getTime();

                                 var asHead = 'doctor/head/' + time + ext;

                                 client.multipartUpload(asHead, head_pic).then(function (result) {
                                    head_pic = result.res.requestUrls[0].split('?')[0];
                                    }).catch(function (err) {
                                        alert(err);
                                        });

                                 var asPractice = 'doctor/practice/' + time + ext;

                                 client.multipartUpload(asPractice, practice_pic).then(function (result) {
                                    practice_pic = result.res.requestUrls[0].split('?')[0];
                                    add();
                                    }).catch(function (err) {
                                        alert(err);
                                        });

                               }  catch (e) {
                                  errmsg = 'parse sts response info error: ' + e.message;
                                  console.log(errmsg);
                               }

                })
        })
    }
})

var add = function(){
    $.ajax({
        url: '/doctor/add',
        data: {
            phone: $('input[name="phone"]').val(),
            password: $('input[name="password"]').val(),
            name: $('input[name="name"]').val(),
            sex: $('input[name="sex"]:checked').val(),
            practiceCode: $('input[name="practice_code"]').val(),
            hospital: $('#hospital option:selected').val(),
            title: $('#title option:selected').val(),
            department: $('#department option:selected').val(),
            headPic: head_pic,
            practicePic: practice_pic,
            adept: $('textarea[name="adept"]').val(),
            experience: $('textarea[name="experience"]').val(),
            verify: '已认证'
        },
        success: function(res){

//            layer.confirm('添加医生成功!', {
//                                        btn: ['确认'],
//                                        function(index, layero){
                                           $('#aform')[0].reset();
                                           $('#head_pic').removeAttr('src');
                                           $('#practice_pic').removeAttr('src');
//                                      }});
        }
    })
}

