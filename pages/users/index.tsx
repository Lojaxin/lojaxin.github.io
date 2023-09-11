import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
// import http from '../../api/request';
// import Link from 'next/link'

interface UsersProps {
    children?: React.ReactElement;
    [prop: string]: any;
}

function Users({ children, ...rest }: UsersProps) {
    return (
        <div>
            <Head>
                <title>是users</title>
            </Head>
            <p>users的公共部分</p>
            {children ? React.cloneElement(children, rest) : null}
            {/* {props?.children} */}
        </div>
    )
}

//这个请求在服务端渲染的时候会执行，客户端渲染的时候不会执行
//所以这里的数据必须通过 Context 传递给子组件,并且需要将这个 Context 做持久化处理
//或者说如果需要拿到列表数据,应当在子(列表)组件中发起请求
// Users.getInitialProps = async (ctx) => {
//     const result = await http.get('/api/userList');
//     return { userList: result?.data };
// }

export default withRouter(Users);