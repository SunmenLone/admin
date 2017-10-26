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


    var avatar = null;
    layui.use('upload', function(){
        var $ = layui.jquery, upload = layui.upload;

        var uploadAvatar = upload.render({
            elem: '#upload_avatar',
            auto: false,
            choose: function(obj){
              obj.preview(function(index, file, result){
                $('#avatar').attr('src', result);
                avatar = file;
              });
            }
          });

    });

    var aliasChange = false, passwordChange = false;
    $(function(){

            $.ajax({
                url: '/user/info',
                data: {
                },
                success: function(res){

                    $('#useravatar').attr('src', res.user.avatar);
                    $('#username').html(res.user.alias);
                    $('#account').html(res.user.username);
                    $('input[name="alias"]').val(res.user.alias);
                    $('input[name="password"]').val(res.user.password);
                    $('#avatar').attr('src', res.user.avatar);

                    $('input[name="alias"]').change(function(){
                        console.log('alias');
                        aliasChange = true;
                    });

                    $('input[name="password"]').change(function(){
                        console.log('password');
                        passwordChange = true;
                    });

                }
            })

        })

        var logout = function() {

            $.ajax({
                url: '/signOut',
                data: {
                },
                complete: function(){
                    window.location.href="../login.html";
                }
            })
        }

        var client = null;
        var modifyUserInfo = function() {

            if (avatar == null && !aliasChange && !passwordChange) return;

            layer.confirm('确认修改用户信息?', function(index){

                var param = {
                    username: $('#account').html()
                }

                if (avatar != null) {
                    if (client != null) {
                        var time = new Date().getTime();
                        var ext = /\.[^\.]+/.exec(avatar.name);
                        var fileName = 'sysuser/head/' + time + ext;
                        client.multipartUpload(fileName, avatar).then(function (result) {
                            avatar = result.res.requestUrls[0].split('?')[0];
                            param['avatar'] = avatar;
                            updateUser(param);
                        }).catch(function (err) {
                            alert(err);
                        });
                    } else {
                        OSS.urllib.request("http://125.216.243.114:2004/requestSTS",{method: 'GET'},function (err, response) {
                            if (err) return alert(err);
                            try {
                                result = JSON.parse(response);
                                client = new OSS.Wrapper({
                                    accessKeyId: result.AccessKeyId,
                                    accessKeySecret: result.AccessKeySecret,
                                    stsToken: result.SecurityToken,
                                    endpoint: 'oss-cn-shenzhen.aliyuncs.com',
                                    bucket: 'sunmen-oss'
                                });
                                var time = new Date().getTime();
                                var ext = /\.[^\.]+/.exec(avatar.name);
                                var fileName = 'doctor/head/' + time + ext;
                                client.multipartUpload(fileName, avatar).then(function (result) {
                                    avatar = result.res.requestUrls[0].split('?')[0];
                                    param['avatar'] = avatar;
                                    updateUser(param);
                                }).catch(function (err) {
                                    alert(err);
                                });
                            } catch (e) {
                                errmsg = 'parse sts response info error: ' + e.message;
                                console.log(errmsg);
                            }
                        })
                    }
                } else {
                    updateUser(param);
                }



                layer.close(index);
            });
        }

        var updateUser = function(param) {

            var alias = $('input[name="alias"]').val();
            var password = $('input[name="password"]').val()

            if ( aliasChange ) {
                param['alias'] = alias;
            }

            if ( passwordChange ) {
                param['password'] = password;
            }

            $.ajax({
                url: '/user/update',
                data: param,
                success: function(res) {
                    console.log('update user');

                    avatar = null;
                    aliasChange = false;
                    passwordChange = false;

                }

            })

        }