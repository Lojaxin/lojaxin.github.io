import React from 'react';
import PropTypes from 'prop-types';
import { assign, isEmpty, cloneDeep, cloneDeepWith, isFunction, isNil, get } from 'lodash';
import { Form, Table, Button, Tooltip } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import FormList from './FormList';
import { getFormName } from './util';

/**
 * 根据customKey为动态增减数据源追加索引
 * @param {*} dataSource 数据源
 * @param {*} list 核心索引数组
 * @param {*} customKey 索引key
 */
const combineDataSource = (dataSource, list, customKey) => {
    //列表都是根据dataSource渲染的行数,根据columns渲染的列数(单元格)
    try {
        /**
         * 解决从中间删除导致后续添加的行数据丢失的问题；因为从中间删除之后；
         * 索引变了。但是key跟fieldKey 没变；导致回显不上
         */
        let newList = list.map((item) => {
            let { name } = item;
            return {
                ...item,
                fieldKey: name,
                key: name,
                realname: [customKey, name],
            };
        });
        return newList.map((data, index) => {
            // 这里一定要复制一份新数据源副本，不然会造成数据新增重复。
            const item = assign({}, (dataSource[index] || {}));
            item[customKey] = data;
            return item;
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('动态表单：组装表单数据错误 ' + JSON.stringify(e));
        return [];
    }
};

/**
 * 取列的第一行数据赋值整列
 * @param {*} e 点击事件
 * @param {*} item 当前列配置数据
 * @param {*} form 表单实例
 * @param {*} name 当前表单节点
 */
const copyColData = (e, item, form, name) => {
    e.preventDefault();
    const data = cloneDeep(form.getFieldValue(name));
    const { dataIndex, afterCopyColData } = item;
    const firstLine = data && data[0] || {};
    const copyValue = get(firstLine, dataIndex);

    // 如果第一行有数据并且整个数据大于1行，执行赋值逻辑
    if (!isNil(copyValue) && copyValue !== '' && data.length > 1) {
        const newData = data.map((__, index) => {

            return {
                name: [...name, index, ...(dataIndex.split('.'))],
                value: copyValue
            };
        });

        form.setFields(newData);

        if (isFunction(afterCopyColData)) {
            afterCopyColData(newData);
        }
    }
};


const requiredTitle = text => {
    return (
        <span className="ant-form-item-required ant-form-item-no-colon">
            {window.I18N_T && window.I18N_T(text) || text}
        </span>
    );
};

const wrapperTitle = (item, form, name) => {
    return (
        <div className="copy-content">
            <span>{item.title}</span>
            <Tooltip title="同步为第一行数据">
                <SmileOutlined
                    className="copy-col"
                    onClick={e => copyColData(e, item, form, name)}
                />
            </Tooltip>
        </div>
    );
};

const customizer = (value) => {
    if (React.isValidElement(value)) {
        // eslint-disable-next-line no-console
        console.warn('dynamic table columns 属性 不支持是 react element; 推荐更改为 function');
        return React.cloneElement(value);
    }
};

/**
 * 增强表格配置
 * 1. 根据列必填显示必填标签
 * 2. 根据列复制开启复制列数据
 * @param {*} columns 原始表格列配置
 * @param {*} form 表单实例
 * @param {*} name 当前表单path
 */
const enhanceColumns = (columns, form, name) => {
    if (!columns || isEmpty(columns)) {
        return [];
    }

    return cloneDeepWith(columns, customizer).map(item => {
        item.title = isFunction(item.title) ? item.title() : item.title;
        if (item.required) {
            item.title = requiredTitle(item.title);
        }
        if (item.copy) {
            item.title = wrapperTitle(item, form, name);
        }
        return item;
    });
};


const DynamicTable = React.forwardRef((props, ref) => {
    const {
        name,
        form,
        columns,
        customKey = 'yKey',
        showAddBtn,
        customAdd,
        prefixName,
        addText = '新增',
        max,
        ...rest
    } = props;

    const dynamicFormName = React.useCallback(() => {
        return getFormName(name, prefixName);
    }, [name, prefixName]);

    const formName = dynamicFormName();

    // 取索引值中的key为表格的唯一键值
    const rowKey = React.useCallback(record => {
        return record[customKey].key;
    }, [customKey]);

    // 通过ref暴露operations
    const formListRef = React.useRef();

    React.useImperativeHandle(ref, () => ({
        operations: formListRef?.current?.operations
    }));

    const renderAddition = React.useCallback(operation => {
        let showBtn = showAddBtn;
        if (max) {
            showBtn = !operation.getListLimit().isMax;
        }

        if (showBtn) {
            return (
                <Button
                    className="dynamic-add"
                    type="primary"
                    onClick={() => {
                        if (isFunction(customAdd)) {
                            customAdd(operation);
                            return;
                        }
                        operation.add();
                    }}
                >
                    {addText}
                </Button>
            );
        }
        return null;
    }, [addText, customAdd, max, showAddBtn]);

    return (
        <FormList
            name={name}
            form={form}
            ref={formListRef}
            prefixName={prefixName}
            max={max}
            {...rest}
        >
            {(fields, operation, { errors }) => {
                // 获取当前动态增减组件的数据源值
                const dataSource = form.getFieldValue(formName) || [];
                // 给数据源追加customKey索引
                const newDataSource = combineDataSource(dataSource, fields, customKey);
                // 获取表格组件配置
                const customColumns = columns(operation);
                // 增强配置能力
                const enhancedColumns = enhanceColumns(customColumns, form, formName);

                const tableProps = {
                    ...rest,
                    rowKey,
                    columns: enhancedColumns,
                    dataSource: newDataSource
                };
                return (
                    <div className="dynamic-table">
                        <Table {...tableProps} />
                        {renderAddition(operation)}
                        <Form.ErrorList errors={errors} />
                    </div>
                );
            }}
        </FormList>
    );

});

DynamicTable.displayName = 'DynamicTable';

export default DynamicTable;


DynamicTable.propTypes = {
    // 动态增减组件表单名
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,

    // form 实例
    form: PropTypes.object.isRequired,

    // 表格配置渲染【函数】！！入参为 operation
    columns: PropTypes.func.isRequired,

    // 父动态增减组件表单名称（只有在动态增减嵌套动态增减的子组件上才需要配置）
    prefixName: PropTypes.string,

    // 自定义索引属性key，默认为yKey
    customKey: PropTypes.string,

    // 自定义新增按钮文案（默认 新增）
    addText: PropTypes.string,

    // 是否显示新增按钮（用于自定义新增按钮样式，位置，逻辑的场景 —— 文件上传）
    showAddBtn: PropTypes.bool,

    // 自定义新增按钮逻辑
    customAdd: PropTypes.func,

    // 最大添加行数,注意:超过行数只隐藏了添加按钮,依旧可以复制
    max: PropTypes.number,

};

DynamicTable.defaultProps = {
    showAddBtn: true
};
