
const config = require('../../../config')
let util = {}



util.baseDomain = 'http://47.92.51.100:80'
// util.baseDomain = 'http://' + config.dev.host + ':' + config.dev.port

util.title = function (title) {
  let iTitle = 'IPFS星际特工云数据中心';
  if (title) {
    iTitle += ' - ' + title;
  }
  window.document.title = iTitle;
}

util.toDefaultPage = function (routers, name, route, next) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if (notHandle) {
    next();
  }
}

util.getRouterObjByName = function (routers, name) {
  if (!name || !routers || !routers.length) {
    return null;
  }
  // debugger;
  let routerObj = null;
  for (let item of routers) {
    if (item.name === name) {
      return item;
    }
    routerObj = util.getRouterObjByName(item.children, name);
    if (routerObj) {
      return routerObj;
    }
  }
  return null;
}

util.randomColor = function() {
  const r = Math.floor(Math.random()*256),
    g = Math.floor(Math.random()*256),
    b = Math.floor(Math.random()*256)
  return r+","+g+","+b
}

util.historyBack = function() {
  history.pushState(null, null, document.URL)
  window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL)
  })
}

util.reg = {
    phone: /^(1[3|5|6|7|8|9][0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
    idCard: /^(\d{6})([1][9]|[2][0]{1})(\d{2})([1|0]{1})([1-9]{1})([0|1|2|3]{1})(\d{4})([0-9]|X|x)$/,
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,20}$/
}

util.storage = {
  get: (name) => JSON.parse(localStorage.getItem(name)),
  set: (name, val) => localStorage.setItem(name, JSON.stringify(val)),
  add: (name, val) => {
    const oldVal = Storage.get(name)
    const newVal = oldVal.concat(addVal)
    Storage.set(name, newVal)
  }
}

util.session = {
  get: (name) => JSON.parse(sessionStorage.getItem(name)),
  set: (name, val) => sessionStorage.setItem(name, JSON.stringify(val)),
  remove: (name) => sessionStorage.removeItem(name),
  clear: () => sessionStorage.clear()
}

export default util
