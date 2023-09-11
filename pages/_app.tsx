import React from 'react';
import App from 'next/app';
import { Layout, Spin } from 'antd';
import MenuList from '../components/MenuList';
import router from 'next/router';
import { Provider } from 'react-redux';
import { getStoreByEnv, } from '../store';
import { initialState } from '../store/reducers/pageDataReducer';
import * as TYPES from '../store/action-types';
import http from '../api/request';
import 'normalize.css';
import '../global.scss';

const { Header, Content, Footer, Sider } = Layout;

type RouterEvent = (url: string) => void;

export default class LayoutApp extends App {
    routeChangeStart: RouterEvent
    routeChangeComplete: RouterEvent
    store: any
    state: any
    constructor(props) {
        super(props);
        this.store = getStoreByEnv(props.storeState);
        this.state = {
            isLoading: false
        }
    }

    //重写_app,需要手动调用getInitialProps
    static async getInitialProps({ Component, router, ctx }) {

        const store = getStoreByEnv({ pageData: initialState });
        let options: any = {
            url: "/api/users/queryById",
            params: { id: '64e712d8f84c945b1096aefb' }
        }

        if (ctx.req && ctx.req.headers.cookie) {
            options.headers = {
                cookie: ctx.req.headers.cookie
            }
        }
        //获取用户信息
        // const res = await http.request(options);
        // res?.data && store.dispatch({ type: TYPES.SET_USER_INFO, payload: res.data });
        store.dispatch({ type: TYPES.SET_USER_INFO, payload: { name: 'zd' } })

        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps, storeState: store.getState() }
    }


    componentDidMount(): void {
        this.routeChangeStart = () => {
            this.setState({ isLoading: true });
        }

        this.routeChangeComplete = (url) => {
            this.setState({ isLoading: false });
        }

        router.events.on('routeChangeStart', this.routeChangeStart);
        router.events.on('routeChangeComplete', this.routeChangeComplete);

    }
    componentWillUnmount(): void {
        router.events.off('routeChangeStart', this.routeChangeStart);
        router.events.off('routeChangeComplete', this.routeChangeComplete);
    }

    render() {

        const { Component, pageProps, router } = this.props;
        const { isLoading } = this.state;

        return (
            <Provider store={this.store}>
                <Layout style={{ height: '100vh', minHeight: '600px' }}>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        defaultCollapsed={false}
                    // onBreakpoint={(broken) => {
                    //     console.log(broken);
                    // }}
                    // onCollapse={(collapsed, type) => {
                    //     console.log(collapsed, type);
                    // }}
                    >
                        <img className='page-logo-img' src='/images/hesuan.jpg' />
                        <MenuList pathname={router?.pathname} />
                    </Sider>
                    <Layout>
                        <Header style={{ padding: 0, background: '#ccc' }} />
                        <Content style={{ margin: '24px 16px 0' }}>
                            {/* 内容组件 */}
                            {
                                isLoading
                                    ? <Spin size="large" />
                                    : <Component {...pageProps} />
                            }
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </Provider>
        )
    }
}