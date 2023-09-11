import React from 'react';
import { Button, Form, Input } from 'antd';
import { DynamicTable } from 'Src/components';


const Demo = () => {

    const [form] = Form.useForm();

    const columns = operation => {
        return [{
            title: '名字',
            dataIndex: 'name',
            render: (value, row) => {
                return (
                    <Form.Item {...row.yKey} name={[row.yKey.name, 'chargeType']} rules={[{ required: true, message: '请选择费用名称' }]}>
                        <Input />
                    </Form.Item>
                );
            }
        }, {
            title: '操作',
            dataIndex: 'control',
            width: 120,
            editable: true,
            render: (__, record, index) => {
                return (
                    <>
                        <Button
                            onClick={() => {
                                operation.remove(index);
                            }}>
                            删除
                        </Button>
                        <Button
                            onClick={() => {
                                operation.copy(index, ['id']);
                            }}
                        >
                            复制
                        </Button>
                    </>
                );
            }
        }];
    };

    const handleClick = () => {
        // console.log(form.getFieldsValue());
        const value = [{
            chargeType: 123
        }, {
            chargeType: 456
        }];
        form.setFields([{ name: 'dynamic-table', value: value }]);
    };

    return (
        <div>
            <Button onClick={handleClick}>设置列表</Button>
            <Form form={form}>
                <DynamicTable columns={columns} name="dynamic-table" form={form} />
            </Form>
        </div>
    );
};

export default Demo;