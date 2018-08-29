
//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/Supervisor/step1/step1",
      "iconPath": "../../img/shouye.png",
      "selectedIconPath": "../../img/shouyehover.png",
      "text": "首页"
    },
    {
      "current": 0,
      "pagePath": "/pages/Supervisor/step2/step2",
      "iconPath": "../../img/guanli.png",
      "selectedIconPath": "../../img/guanlihover.png",
      "text": "考务管理"
    },
    {
      "current": 0,
      "pagePath": "/pages/Supervisor/step3/step3",
      "iconPath": "../../img/lianxiren.png",
      "selectedIconPath": "../../img/lianxirenhover.png",
      "text": "联系人"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}