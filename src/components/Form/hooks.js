import _ from 'lodash';
import { Form } from 'antd';

//扩展原有的form
export const useCustomForm = () => {
    const [form] = Form.useForm();

    // if (form.__UNIQ_ID__) { return; }
    // form.__UNIQ_ID__ = Number(Date.now() + Math.random().toString().substr(3, 4)).toString(36);
    //给form绑定setAttrs方法
    form.setAttrs = (list) => {
        _.forEach(list, value => {
            window.PubSub.publish(`form_item_${value?.name}`, value?.attrs);
        });
    };

    return [form];
};