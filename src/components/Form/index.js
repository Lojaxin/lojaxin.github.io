import React, { useEffect, useState } from 'react';
import { Form } from 'antd';

export * from './hooks';

const useFormItemAttrs = (name) => {
    const [attrs, setAttrs] = useState({});

    useEffect(() => {
        const token = window.PubSub.subscribe(`form_item_${name}`, (__, values) => {
            values && setAttrs(values);
        });
        return () => {
            window.PubSub.unsubscribe(token);
        };
    }, [name]);

    return attrs;
};

//定义一个自己的Form.Item;
const FormItem = ({
    children,
    form,
    name,
    ...rest
}) => {

    const attrs = useFormItemAttrs(form, name);

    return <Form.Item form={form} {...rest} {...attrs}>{children}</Form.Item>;
};

export default FormItem;

