import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import http from '../../api/request';

type FieldType = {
    userName?: string;
    pwd?: string;
};


function UserDetailInfo({ id }) {
    const [form] = Form.useForm();

    useEffect(() => {
        http.get(`/api/users/queryById?id=${id}`).then(res => {
            if (res?.data) {
                console.log('%c [ res?.data ]-17', 'font-size:13px; background:pink; color:#bf2c9f;', res?.data)
                form.setFieldsValue(res.data)
            }
        })
    }, [id])

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name="basic"
            form={form}
            // initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item<FieldType>
                label="Username"
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="pwd"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )

}

export default UserDetailInfo;