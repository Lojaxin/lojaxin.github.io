(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 7819:
/***/ ((module) => {

// Exports
module.exports = {
	"color": "MenuList_color__FHOl3"
};


/***/ }),

/***/ 8740:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ LayoutApp)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/app.js
var app = __webpack_require__(7544);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: external "@ant-design/icons"
const icons_namespaceObject = require("@ant-design/icons");
// EXTERNAL MODULE: ./components/MenuList/index.module.scss
var index_module = __webpack_require__(7819);
var index_module_default = /*#__PURE__*/__webpack_require__.n(index_module);
;// CONCATENATED MODULE: ./components/MenuList/index.tsx






/* harmony default export */ function MenuList({ pathname  }) {
    const { 0: curPath , 1: setCurPath  } = (0,external_react_.useState)();
    const MENU_LIST = [
        {
            key: "/",
            icon: /*#__PURE__*/ jsx_runtime_.jsx(icons_namespaceObject.UserOutlined, {}),
            label: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/",
                className: (index_module_default()).color,
                children: "首页"
            })
        },
        {
            key: "/users",
            icon: /*#__PURE__*/ jsx_runtime_.jsx(icons_namespaceObject.VideoCameraOutlined, {}),
            label: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/users",
                children: "用户"
            })
        }
    ];
    (0,external_react_.useEffect)(()=>{
        setCurPath(pathname);
    }, [
        pathname
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu, {
        theme: "dark",
        mode: "inline",
        selectedKeys: [
            curPath
        ],
        items: MENU_LIST
    });
}

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
;// CONCATENATED MODULE: external "redux"
const external_redux_namespaceObject = require("redux");
;// CONCATENATED MODULE: ./store/action-types.ts
/** 修改用户信息 */ const SET_USER_INFO = "SET_USER_INFO";

;// CONCATENATED MODULE: ./store/reducers/pageDataReducer.ts

const initialState = {
    userInfo: null
};
const reducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            };
        default:
            return state;
    }
};
/* harmony default export */ const pageDataReducer = (reducer);

;// CONCATENATED MODULE: ./store/reducers/index.ts


//整合所有的reducer
/* harmony default export */ const reducers = ((0,external_redux_namespaceObject.combineReducers)({
    pageData: pageDataReducer
}));

;// CONCATENATED MODULE: ./store/index.ts


//这里为什么将仓库作为一个方法? 服务端渲染如果只是一个对象的话，那么每个用户访问都是同一个仓库
function initialStore(initState) {
    const store = (0,external_redux_namespaceObject.legacy_createStore)(reducers, initState);
    return store;
}
//根据环境来创建仓库
const getStoreByEnv = (initState)=>{
    if (true) {
        //服务端渲染
        return initialStore(initState);
    } else {}
};

;// CONCATENATED MODULE: ./pages/_app.tsx












const { Header , Content , Footer , Sider  } = external_antd_.Layout;
class LayoutApp extends app["default"] {
    constructor(props){
        super(props);
        this.store = getStoreByEnv(props.storeState);
        this.state = {
            isLoading: false
        };
    }
    //重写_app,需要手动调用getInitialProps
    static async getInitialProps({ Component , router , ctx  }) {
        const store = getStoreByEnv({
            pageData: initialState
        });
        let options = {
            url: "/api/users/queryById",
            params: {
                id: "64e712d8f84c945b1096aefb"
            }
        };
        if (ctx.req && ctx.req.headers.cookie) {
            options.headers = {
                cookie: ctx.req.headers.cookie
            };
        }
        //获取用户信息
        // const res = await http.request(options);
        // res?.data && store.dispatch({ type: TYPES.SET_USER_INFO, payload: res.data });
        store.dispatch({
            type: SET_USER_INFO,
            payload: {
                name: "zd"
            }
        });
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return {
            pageProps,
            storeState: store.getState()
        };
    }
    componentDidMount() {
        this.routeChangeStart = ()=>{
            this.setState({
                isLoading: true
            });
        };
        this.routeChangeComplete = (url)=>{
            this.setState({
                isLoading: false
            });
        };
        router_default().events.on("routeChangeStart", this.routeChangeStart);
        router_default().events.on("routeChangeComplete", this.routeChangeComplete);
    }
    componentWillUnmount() {
        router_default().events.off("routeChangeStart", this.routeChangeStart);
        router_default().events.off("routeChangeComplete", this.routeChangeComplete);
    }
    render() {
        const { Component , pageProps , router  } = this.props;
        const { isLoading  } = this.state;
        return /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
            store: this.store,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_antd_.Layout, {
                style: {
                    height: "100vh",
                    minHeight: "600px"
                },
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Sider, {
                        breakpoint: "lg",
                        collapsedWidth: "0",
                        defaultCollapsed: false,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                className: "page-logo-img",
                                src: "/images/hesuan.jpg"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(MenuList, {
                                pathname: router?.pathname
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_antd_.Layout, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Header, {
                                style: {
                                    padding: 0,
                                    background: "#ccc"
                                }
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Content, {
                                style: {
                                    margin: "24px 16px 0"
                                },
                                children: isLoading ? /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Spin, {
                                    size: "large"
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                                    ...pageProps
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Footer, {
                                style: {
                                    textAlign: "center"
                                },
                                children: "Ant Design \xa92023 Created by Ant UED"
                            })
                        ]
                    })
                ]
            })
        });
    }
}


/***/ }),

/***/ 5725:
/***/ ((module) => {

"use strict";
module.exports = require("antd");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,664,544], () => (__webpack_exec__(8740)));
module.exports = __webpack_exports__;

})();