import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import menuStyle from './index.module.scss';


export default function ({
    pathname
}) {

    const [curPath, setCurPath] = useState<string>();

    const MENU_LIST = [
        {
            key: '/',
            icon: <UserOutlined />,
            label: <Link href='/' className={menuStyle.color}>首页</Link>,
        },
        {
            key: '/users',
            icon: <VideoCameraOutlined />,
            label: <Link href='/users'>用户</Link>,
        }
    ]

    useEffect(() => {
        setCurPath(pathname)
    }, [pathname])

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[curPath]}
            items={MENU_LIST}
        />
    )

}