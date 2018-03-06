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
                url: '../user/info',
                data: {
                },
                success: function(res){

                    $('#useravatar').attr('src', res.user.avatar);
                    $('#username').html(res.user.alias);
                    $('#account').html(res.user.username);
                    $('input[name="alias"]').val(res.user.alias);
                    $('input[name="password"]').val(GetCookie("password"));
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


            $('#cancel').css('display', 'inline-block');
            $('#confirm').unbind('click').removeAttr('onclick').click(function(){
                $.ajax({
                    url: '../signOut',
                    data: {},
                    complete: function(){
                        window.location.href="../login.html";
                    }
                })
            });

            showModal('确认退出帐号 ' + $('#username').html() + '?');

        }

        var client = null;
        var modifyUserInfo = function() {

            if (avatar == null && !aliasChange && !passwordChange) return;

            $('#cancel').css('display', 'inline-block');
            $('#confirm').unbind('click').removeAttr('onclick').click(function() {

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
                        OSS.urllib.request("http://www.jiayibilin.com/api-stsserver/requestSTS",{method: 'GET'},function (err, response) {
                            if (err) return alert(err);
                            try {
                                result = JSON.parse(response);
                                client = new OSS.Wrapper({
                                    accessKeyId: result.AccessKeyId,
                                    accessKeySecret: result.AccessKeySecret,
                                    stsToken: result.SecurityToken,
                                    endpoint: 'oss-cn-shenzhen.aliyuncs.com',
                                    bucket: 'jybl-photo'
                                });
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
                            } catch (e) {
                                errmsg = 'parse sts response info error: ' + e.message;
                                console.log(errmsg);
                            }
                        })
                    }
                } else {
                    updateUser(param);
                }

            });

            showModal('确认修改用户信息?');

        }

        var updateUser = function(param) {

            var alias = $('input[name="alias"]').val();
            var password = $('input[name="password"]').val();

            if ( aliasChange ) {
                param['alias'] = alias;
            }

            if ( passwordChange ) {
                param['password'] = md5('jiayibilin' + password);
            }

            $.ajax({
                url: '../user/update',
                data: param,
                success: function(res) {

                    $('#cancel').css('display', 'none');
                    $('#confirm').unbind('click').removeAttr('onclick').click(function(){
                        $('#infomodal').attr('hidden', true);
                    })

                    if (res.code == 0) {
                        $('#username').html(alias);
                        if (passwordChange) {
                            SetCookie("password", $('input[name="password"]').val());
                        }
                        if (avatar != null) {
                            $('#useravatar').attr('src', avatar);
                        }
                        showModal('修改用户信息成功');
                    } else {
                        showModal('操作失败，请稍后重试');
                    }

                    avatar = null;
                    aliasChange = false;
                    passwordChange = false;

                }

            })

        }

function showModal(msg) {
    $('#prompt').html(msg);
    $('#infomodal').removeAttr('hidden');
}

function SetCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//取Cookie的值
function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        /*  alert(j); */
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal(j);//取到cookie的值
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0)
            break;
    }
    return null;
}

//取到cookie的值
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}