layui.use('form', function(){
  var form = layui.form;

});


var submitLogin = function() {

    $.ajax({
        url: '/submitLogin',
        data: {
            username: $('input[name="username"]').val(),
            password: $('input[name="password"]').val()
        },
        success: function(res){
            if (res.code == 0) {
                window.location.href="/html/index.html";
            }
        }
    })
}
