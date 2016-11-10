/**
 * Created by Donghui Huo on 2016/4/26.
 */
var localeLanguage = 'zh-CN';
var name = "baseurl=";
var nameLanguage = "locale=";
var baseUrl = "/"
var ca = document.cookie.split(';');
for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
        baseUrl = c.substring(name.length, c.length);
        break;
    }
    if (c.indexOf(nameLanguage) == 0) {
        localeLanguage = c.substring(name.length, c.length);
        break;
    }
}
module.exports = {
    locale: localeLanguage,
    baseUrl: baseUrl,
    endpoints: {
        gettokenbyclient: baseUrl + 'gettokenbyclient',
        initlogin: baseUrl + 'initlogin',
        gettokenbypassword: baseUrl + 'gettokenbypassword',
        dashboardleftmenu: baseUrl + 'leftmenu',
        roles: baseUrl + 'role/list',
        users: baseUrl + 'user/list',
        deleteuser: baseUrl + 'user/delete',
        userinfo: baseUrl + 'user/info',
        userinfooptionupdate: baseUrl + 'user/info/rule/update',
        userupdate: baseUrl + 'user/update',
        //dashboardleftmenu: '/demoData/dashboardFramework/leftmenu.json'
    }
}
