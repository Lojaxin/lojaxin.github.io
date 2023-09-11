import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import _ from 'lodash';
import { getVariableaType } from '@/utils';

/** table的Filter组件 */
const Filter = ({ form, filterConfig, customFilter, searchText, onFilter }) => {

    /** 格式化渲染 filterConfig*/
    const renderFilter = useMemo(() => {
        return filterConfig.map(item => {
            const itemConfig = _.cloneDeep(item);
            delete itemConfig.render;
            let node;//子节点
            //自动配置简单的校验规则
            if (itemConfig.required && !itemConfig.rules) {
                itemConfig.rules = [{
                    required: true,
                    message: `请填选${itemConfig.label}`,
                }];
            }
            if (item.render) {
                node = getVariableaType(item.render, 'Function') ? item.render(form) : item.render;
                // throw new Error(`filterConfig配置项中的render必须是一个function,请检查filterConfig配置中name为 ${item.name}`);
            } else {
                //默认是Input
                node = <Input placeholder={`请输入${itemConfig.label}`} />;
            }
            return (
                <Form.Item key={itemConfig.name} id={`table-filter-${itemConfig.name}`} {...itemConfig}>
                    {node}
                </Form.Item>
            );
        });
    }, [filterConfig, form]);

    //重置
    const onReset = useCallback(() => {
        form.resetFields();
    }, [form]);

    return !_.isEmpty(filterConfig) ?
        (
            <Form form={form} onFinish={(...arg) => onFilter?.(...arg)}>
                {customFilter ? customFilter(form) : renderFilter}
                <Button type="primary" onClick={() => form?.submit?.()}>{searchText}</Button>
                <Button onClick={onReset}>重置</Button>
            </Form>
        ) : null;
};

export default Filter;

Filter.propTypes = {
    // form 实例
    form: PropTypes.object.isRequired,

    /**
     * 自定义filter配置,优先级高于filterConfig
     * 如果filter有复杂的联动逻辑,可以使用
     * 注意:这是一个function
     */
    customFilter: PropTypes.func,

    // filter配置项
    filterConfig: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        redner: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.element
        ])
    })),

    //搜索按钮的自定义文字
    searchText: PropTypes.string,

    //点击搜索后暴露所有的表单值给父组件
    onSearch: PropTypes.func,

};

Filter.defaultProps = {
    searchText: '搜索'
};