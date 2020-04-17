export default {
    
    
    stype: '',
    svalue: '',
    
    pagesize: 10,
    
    other: '',
    
    uploadUrl: 'http://125.74.7.22:8090/wtcp-file',
    access_token: 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token')),

    stopself(e) {
        e.currentTarget.blur()
    },
    oprahfun: function (that) {        
        var op = {}
        var oj = {}
        var appHierarchy = that.$route.meta.hierarchy
        var operanum = appHierarchy.length
        var appPortal = JSON.parse(sessionStorage.getItem('wtcp-user-active-app')).portal
        var appfloor = appHierarchy[0].floor
        
        function fun2 (appunm) {
            
            var appOpera = JSON.parse(sessionStorage.getItem('wtcp-user-opera'))[appPortal][appHierarchy[appunm].base + '-' + appHierarchy[appunm].app][appHierarchy[appunm].fristclass]
            if (appOpera !== undefined) {
                
                var tiget = appHierarchy[appunm].fristclass
                
                var k = appOpera.length
                for (let i = 0; i < k; i++) {
                    
                    if (appOpera[i].match(tiget)) {
                        oj[appOpera[i].slice(-1).toUpperCase()] = true
                    } else {
                        oj[appOpera[i].slice(-1).toUpperCase()] = false
                    }
                }
            }
            else {
                oj = {}
                var tiget = appHierarchy[appunm].fristclass
            }
            op[tiget] = Object.assign({}, oj)
            
        }
        
        function fun3 (appunm) {
            
            
            var appOpera = JSON.parse(sessionStorage.getItem('wtcp-user-opera'))[appPortal][appHierarchy[appunm].base + '-' + appHierarchy[appunm].app][appHierarchy[appunm].fristclass]
            if (appOpera !== undefined) {
                var tiget = appHierarchy[appunm].secondclass
                var k = appOpera.length
                for (let i = 0; i < k; i++) {
                    if (appOpera[i].match(tiget)) {
                        oj[appOpera[i].slice(-1).toUpperCase()] = true
                    } else {
                        oj[appOpera[i].slice(-1).toUpperCase()] = false
                    }
                }
            }
            else {
                oj = {}
                var tiget = appHierarchy[appunm].secondclass
            }
            op[tiget] = Object.assign({}, oj)
            
        }
        
        if ((operanum > 1) && (appfloor === 2)) {
            for (let i = 0; i < operanum; i++) {
                fun2(i)
            }
            that.oprah = op
            op = {}
            
        }
        else if ((operanum > 1) && (appfloor === 3)) {
            for (let i = 0; i < operanum; i++) {
                fun3(i)
            }
            that.oprah = op
            op = {}
        }
        else if ((operanum === 1) && (appfloor === 2)) {
            fun2(0)
            that.oprah = oj
        }
        else if ((operanum === 1) && (appfloor === 3)) {
            fun3(0)
            that.oprah = oj
        }
        else {
            return
        }
        
        console.log(that.oprah)
        
    },
    
    fun: function (that, type, api, data, callback) {
        that.loading = true;
        that.pageload = true;
        that.axios({
            method: type,
            emulateJSON: true,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            url: api.base + api.other + api.access_token,
            params: data
        }).then(function (res) {
            callback(res, that)
            that.loading = false;
        }).catch(function () {
        });
    },
    
    newfun: function (that, type, api, data, callback) {
        
        that.axios({
            method: type,
            emulateJSON: true,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            url: api.base + api.other + api.access_token,
            params: data
        }).then(function (res) {
            callback(res, that)
            
        }).catch(function () {
        });
    },
    
    submit: function (that, type, api, data, callback) {
        that.loading = true;
        that.pageload = true;
        that.axios({
            method: type,
            emulateJSON: true,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            url: api.base + api.other + api.access_token,
            data: data
        }).then(function (res) {
            callback(res, that)
            that.loading = false;
        }).catch(function () {
        });
    },
    
    goback: function (name, that) {
        that.$router.push({
            name: name,
        })
    },
    
    ajax: function (that, type, api, data, callback) {
        that.axios({
            method: type,
            emulateJSON: true,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            url: api.base + api.other + api.access_token,
            params: data
        }).then(function (res) {
            callback(res, that)
        }).catch(function () {
        });
    },
    ajaxurl: function (that, type, api, data, callback) {
        that.axios({
            method: type,
            emulateJSON: true,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            url: api,
            params: data
        }).then(function (res) {
            callback(res, that)
        }).catch(function () {
        });
    },
    
    getHandledValue: function (num) {
        return num < 10 ? '0' + num : num
    },
    getDate: function (timeStamp) {
        const d = new Date(timeStamp )
        const year = d.getFullYear()
        const month = this.getHandledValue(d.getMonth() + 1)
        const date = this.getHandledValue(d.getDate())
        const hours = this.getHandledValue(d.getHours())
        const minutes = this.getHandledValue(d.getMinutes())
        const second = this.getHandledValue(d.getSeconds())
        let resStr  = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes+':'+second
        return resStr
    }
    
}







