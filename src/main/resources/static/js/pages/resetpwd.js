layui.use('form', function(){
  var form = layui.form;

  form.on('submit(*)', function(data){
      return false;
  });

});

var countdown = 10;

function setTime(val) {
    if (countdown == 0) {
        val.removeClass('layui-btn-disabled');
        val.html('获取验证码');
        countdown = 10;
    } else {
        val.addClass('layui-btn-disabled');
        val.html('重新发送(' + countdown + ')');
        countdown--;
        setTimeout(function() {
            setTime(val);
        }, 1000)
    }
}

var getSmsCode = function() {

    $.ajax({
        url: '/user/getSmsCode',
        data: {
            phone: $('input[name="phone"]').val()
        },
        success: function(res){
            if(res.code == 0) {
                setTime($('#get_code'));
            }
        }
    })



}