package com.jybl.admin.security;

import com.jybl.admin.util.EncryptUtils;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;

public class CredentialsMatcher extends SimpleCredentialsMatcher {

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        UsernamePasswordToken authcToken = (UsernamePasswordToken) token;
        Object tokenCredentials = EncryptUtils.md5(authcToken.getUsername()+String.valueOf(authcToken.getPassword()));
        Object accountCredentials = getCredentials(info);
        return accountCredentials.equals(tokenCredentials);
    }

}
