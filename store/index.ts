import { legacy_createStore as createStore } from 'redux';
import reducers from './reducers';

//这里为什么将仓库作为一个方法? 服务端渲染如果只是一个对象的话，那么每个用户访问都是同一个仓库
export default function initialStore(initState) {
    const store = createStore(reducers, initState);
    return store;
};

//根据环境来创建仓库
export const getStoreByEnv = (initState) => {
    if (typeof window === 'undefined') {
        //服务端渲染
        return initialStore(initState);
    } else {
        //客户端渲染
        if (!window['__PABLIC_STORE__']) {
            window['__PABLIC_STORE__'] = initialStore(initState);
        }
        return window['__PABLIC_STORE__'];
    }
}