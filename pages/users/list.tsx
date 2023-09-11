import React from "react";
import { Table } from "antd";
import Link from 'next/link'
import UserLayout from './';
import http from '../../api/request';

function UserList(props) {
    const { userList } = props || {};

    const columns = [
        {
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: '操作',
            dataIndex: 'extra',
            key: 'extra',
            render: (text, record) => {
                return (
                    <Link href={`/users/detail?id=${record._id}`}>
                        <a>详情</a>
                    </Link>
                )
            }
        }
    ];

    return (
        <UserLayout>
            <>
                <Table rowKey="_id" dataSource={userList} columns={columns} />
            </>
        </UserLayout>
    )
}

UserList.getInitialProps = async (ctx) => {
    const result = await http.get('/api/users/queryAll');
    return { userList: result?.data };
}

export default UserList;