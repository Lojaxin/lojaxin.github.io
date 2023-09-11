import React, { useState, useCallback, useEffect } from 'react';
import { cloneDeep, size } from 'lodash';
import { Form, Button, AutoComplete, Tag } from 'antd';
export default function Page() {
    const [form] = Form.useForm();

    const handeClick = () => {
        form.setFields([{ name: 'testGet', value: ['test1@qq.com', 'test2@163.com'] }]);
    };

    return (
        <>
            <Form form={form} onValuesChange={valu => { console.log(valu, form?.getFieldsValue()); }}>
                <Form.Item name="testGet">
                    <ComponentsName />
                </Form.Item>
            </Form>
            <Button onClick={handeClick}>按钮</Button>
        </>
    );
}

const ComponentsName = ({
    value = [],
    onChange,
    ...rest
}) => {
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState();

    //输入
    const handleSearch = (val) => {
        setInputValue(val);
        let res = [];
        if (!val || val.indexOf('@') > -1) {
            res = [];
            if (val.indexOf('.com') > -1) {
                handleSelect(val);
            }
        } else {
            res = ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
                value: `${val}@${domain}`,
                label: `${val}@${domain}`,
            }));
        }
        setOptions(res);
    };

    //标签删除
    const handleTagClose = (val, e) => {
        const newValues = value.filter(item => item !== val);
        onChange?.(newValues);
        e.preventDefault();
    };

    //校验后设置value & 清空输入框
    const handleSelect = (val) => {
        if (!value.some(item => item === val)) { onChange?.([...value, val]); }
        setInputValue(undefined);
        setOptions([]);
    };

    const handleKeyDown = useCallback((e) => {
        if (!inputValue && e.keyCode === 8) {
            //键盘删除
            const newValues = cloneDeep(value);
            if (size(newValues) > 0) { newValues.pop(); }
            onChange?.(newValues);
        }
    }, [value, onChange, inputValue]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div style={{ display: 'flex' }}>
            {
                value.map((item, index) => (
                    <Tag
                        key={`${item}_${index}`}
                        color="#2db7f5"
                        closable
                        onClose={(e) => handleTagClose(item, e)}
                    >
                        {item}
                    </Tag>
                ))
            }
            <AutoComplete
                {...rest}
                onSearch={handleSearch}
                onSelect={handleSelect}
                placeholder=""
                options={options}
                value={inputValue}
            />
        </div>
    );
};