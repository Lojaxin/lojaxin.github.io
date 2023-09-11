import React from 'react';
import { Form, Button } from 'antd';
import { FuzzySelcect } from '@/components';
import { usePageForm } from '@/context/form';

const Demo = () => {

    const [form] = usePageForm();

    return (
        <>
            <Form.Item name="testSelect">
                <FuzzySelcect url="/api/get/options" urlParams={{ abc: [] }} isMemo={false} />
            </Form.Item>
            <Button onClick={() => {
                form.setFields([{
                    name: 'testSelect',
                    value: {
                        label: 'DDDD',
                        value: 909
                    }
                }]);
            }}>
                修改select
            </Button>
        </>

    );

};

export default Demo;
