import Util from "../util"

const api = {}


// logion API
var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
    + "wxyz0123456789+/" + "=";

api.encode64 = function (input) {

    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
            + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
}


// logion API


api.error401 = function (vm) {
    vm.$router.push({
        name: 'Error401'
    })
}

api.error500 = function (vm) {
    vm.$router.push({
        name: 'Error500'
    })
}

api.getGroupConfig = function (vm) {
    vm.$http.get('static/appGroupConfig/index.json').then((res) => {
        vm.opt.wtcpAppgroup = res.data
    })
}

api.login = function (vm, to) {
    const {userName, password} = vm.form
    vm.$http.post('/login?password=' + Util.code64(password) + '&username=' + Util.code64(userName)).then((res) => {
        const resData = res.data
        if (!resData.error) {
            Util.session.set('wtcp-user-token', resData.access_token)
            vm.$router.push({
                name: to
            })
            vm.loading = false;
        } else {
            vm.$Message.error(resData.error);
            vm.loading = false;
        }
    })
}

api.logout = function (vm) {

    Util.session.remove('rights')
    Util.session.clear()
    vm.$router.push({
        name: 'local'
    })


}
api.getrights = function (vm) {
    vm.$http.get('/rights?access_token=' + Util.session.get('wtcp-user-token')).then((res) => {


        //添加自定义菜单



        const welcome = {
            ename: "welcome",
            hidden: false,
            modules: null,
            name: "欢迎页",
            opera: 'all',
        }
        // const r = {welcome: 'r'}
        res.data.data.rights.welcome= 'r'
        res.data.data.menu.unshift(welcome)


        //////////


        Util.session.set('rights', res.data)
        vm.defaults.user = res.data.data.user
        vm.defaults.menu = res.data.data.menu
        vm.defaults.rights = res.data.data.rights

        var k = 0
        var j = 0
        var go = true
        const l = vm.defaults.menu.length
        for (var i = 0; i < l; i++) {
            if (vm.defaults.rights[vm.defaults.menu[i].ename] && go) {
                k = i
                if(vm.defaults.menu[i].modules){
                    const o = vm.defaults.menu[i].modules.length
                    for (var w = 0; w < o; w++) {
                        if (vm.defaults.rights[vm.defaults.menu[i].modules[w].ename] && go) {
                            j = w
                            go = false
                        }
                    }
                }
                else{
                    j = i
                    go = false
                }


            }
        }


        if (sessionStorage.getItem("selected")) {
            vm.selected = sessionStorage.getItem("selected")
        }
        else {

            debugger
            if (res.data.data.menu[k].modules) {
                vm.selected = (res.data.data.menu[k]).ename + '-' + ((res.data.data.menu[k]).modules[j]).ename
                vm.$router.push({
                    name: vm.selected
                })
            }
            else {
                vm.selected = (res.data.data.menu[k]).ename + '-0'
                vm.$router.push({
                    name: vm.selected
                })
            }


        }
        if (sessionStorage.getItem("openname")) {
            vm.openname = [sessionStorage.getItem("openname")]
        }
        else {
            vm.openname = [(res.data.data.menu[k]).ename]
        }

        vm.watchMenu()
    })
}


api.getCaptchas = function (vm) {
    const {fontSize, bgColor, fontColor} = vm.handleCaptchasOption()
    vm.$http.get('/captchas?fontSize=' + fontSize + '&bgColor=' + bgColor + '&fontColor=' + fontColor).then((res) => {
        vm.defaults.captchas = res.data.data
    })
}

api.checkCaptchas = function (vm) {
    vm.$http.get('/captchas/check?id=' + vm.defaults.captchas.id + '&captcha=' + vm.form.captchas).then((res) => {
        const resData = res.data
        if (resData.status === 1) {
            api.login(vm, 'Main')

        } else {
            vm.$Message.destroy()
            vm.$Message.error(resData.msg)

            api.getCaptchas(vm)
            vm.loading = false;

        }

    })

}

api.changePsw = function (vm) {
    const {oldPsw, password, confirmPsw} = vm.pswChangeForm
    vm.$http.get('musers/modifyPwd?access_token=' + Util.session.get('wtcp-user-token') + '&confirmPwd=' +  Util.code64(confirmPsw)  + '&oldPwd=' + Util.code64(oldPsw)  + '&password=' + Util.code64(password)).then((res) => {
        const resData = res.data
        if (resData.status === 1) {
            vm.defaults.pswChangeShow = false
            vm.$Message.destroy()
            vm.$Message.success('修改密码成功')
            vm.$router.push({
                name: 'Logout'
            })
        } else {
            vm.$Message.destroy()
            vm.$Message.error(resData.msg)
        }
    })
}

api.changeInfo = function (vm) {


    const da = {

        name: vm.infoChangeForm.name,
        phone: vm.infoChangeForm.phone,
        sex: vm.infoChangeForm.sex.toString(),

    }


    vm.axios({
        method: 'post',

        url: 'musers/modifySelf?access_token=' + Util.session.get('wtcp-user-token'),
        params: da
    }).then((res) => {
        if (res.data.status === 1) {
            vm.defaults.infoChangeShow = false
            vm.$Message.destroy()
            vm.$Message.success('修改信息成功')

            const userid = Util.session.get('rights').data.user.id

            vm.$http.get('/rights?access_token=' + Util.session.get('wtcp-user-token')).then((res) => {
                Util.session.set('rights', res.data)
                vm.defaults.user = res.data.data.user
            })
            //
            //
            // vm.$router.push({
            //     name: 'Logout'
            // })
        } else {
            vm.$Message.destroy()
            vm.$Message.error(res.data.msg)
        }
    })
}

// api.getPswBack = function (vm) {
//     const {phone, password, confirmPsw, captcha} = vm.pswBackForm
//     vm.$http.get('/wtcp-oauth/users/pwdBack?captcha=' + captcha + '&confirmPwd=' + confirmPsw + '&password=' + password + '&phone=' + phone).then((res) => {
//         const resData = res.data
//         if (resData.status === 1) {
//             vm.$Message.destroy()
//             vm.$Message.success('密码更新成功')
//         } else {
//             vm.$Message.destroy()
//             vm.$Message.error(resData.msg)
//         }
//     })
// }


export default api
