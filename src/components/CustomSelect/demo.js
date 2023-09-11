import React from 'react';
import { Form, Button } from 'antd';
import { CustomSelect } from '@/components';
import { usePageForm } from '@/context/form';

const Demo = () => {

    const [form] = usePageForm({
        onValueChange: (value) => {
            console.log(value);
        }
    });

    return (
        <>
            <Form.Item name="testSelect">
                {/* <FuzzySelcect url="/api/get/options" urlParams={{ abc: [] }} isMemo={false} /> */}
                <CustomSelect url="/api/get/options" urlParams={{ abc: [] }} />
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
