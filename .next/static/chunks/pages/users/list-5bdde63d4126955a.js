(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[679],{6728:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/users/list",function(){return r(7826)}])},3538:function(e,t,r){"use strict";var n=r(6154);n.Z.defaults.withCredentials=!0;var i=n.Z.create({baseURL:"http://192.168.125.159:4000",timeout:3e3});t.Z=i},7614:function(e,t,r){"use strict";r.r(t);var n=r(9534),i=r(5893),u=r(7294),a=r(9008),s=r.n(a),c=r(1163);t.default=(0,c.withRouter)((function(e){var t=e.children,r=(0,n.Z)(e,["children"]);return(0,i.jsxs)("div",{children:[(0,i.jsx)(s(),{children:(0,i.jsx)("title",{children:"\u662fusers"})}),(0,i.jsx)("p",{children:"users\u7684\u516c\u5171\u90e8\u5206"}),t?u.cloneElement(t,r):null]})}))},7826:function(e,t,r){"use strict";r.r(t);var n=r(7568),i=r(7582),u=r(5893),a=(r(7294),r(8727)),s=r(1664),c=r.n(s),d=r(7614),l=r(3538);function o(e){var t=(e||{}).userList,r=[{title:"\u59d3\u540d",dataIndex:"userName",key:"userName"},{title:"\u5e74\u9f84",dataIndex:"age",key:"age"},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"createdAt",key:"createdAt"},{title:"\u64cd\u4f5c",dataIndex:"extra",key:"extra",render:function(e,t){return(0,u.jsx)(c(),{href:"/users/detail?id=".concat(t._id),children:(0,u.jsx)("a",{children:"\u8be6\u60c5"})})}}];return(0,u.jsx)(d.default,{children:(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(a.Z,{rowKey:"_id",dataSource:t,columns:r})})})}o.getInitialProps=function(){var e=(0,n.Z)((function(e){var t;return(0,i.__generator)(this,(function(e){switch(e.label){case 0:return[4,l.Z.get("/api/users/queryAll")];case 1:return[2,{userList:null===(t=e.sent())||void 0===t?void 0:t.data}]}}))}));return function(t){return e.apply(this,arguments)}}(),t.default=o}},function(e){e.O(0,[29,260,9,774,888,179],(function(){return t=6728,e(e.s=t);var t}));var t=e.O();_N_E=t}]);