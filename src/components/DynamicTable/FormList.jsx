import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { getFormName, getInitialValue } from './util';
import { isEmpty, isNumber, omit, pick } from 'lodash';


const FormList = React.forwardRef((props, ref) => {
    const { name, children, form, defaultValue, rules, min, max, prefixName } = props;

    const [, forceUpdate] = React.useState();
    const [hasInitDefault, setHasInitDefault] = React.useState(false);

    const formListRef = React.useRef();

    React.useImperativeHandle(ref, () => ({
        operations: formListRef.current
    }));

    const dynamicFormName = React.useCallback(() => {
        return getFormName(name, prefixName);
    }, [name, prefixName]);

    const formName = dynamicFormName();

    // 基于antd的Form.List的operation追加复制单行功能
    const enhanceOperation = React.useCallback(operation => {
        const newOperation = {
            // 新增一行
            add: (value, insertIndex) => {
                operation.add(value || defaultValue, insertIndex);
            },
            remove: index => {
                operation.remove(index);
            },
            move: (from, to) => {
                operation.move(from, to);
            },
            // 复制并插入一行
            // exceptKeyList <Array> 复制时需要剔除的数据key列表
            // isCopyKeyMode <Boolean> 复制时对exceptKeyList是复制key还是剔除key
            copy: (index, exceptKeyList, isCopyKeyMode = false) => {
                const dynamicValue = form.getFieldValue(formName) || [{}];
                let copyData = Object.assign({}, dynamicValue[index]);

                if (exceptKeyList && !isEmpty(exceptKeyList)) {
                    if (!isCopyKeyMode) {
                        copyData = omit(copyData, exceptKeyList);
                    } else {
                        copyData = pick(copyData, exceptKeyList);
                    }
                }

                operation.add(copyData, index + 1);
            },
            // 强制重渲
            forceUpdate: () => {
                forceUpdate({});
            },
            // 获取当前列表是否到达最大or最小行数状态
            getListLimit: () => {
                const dynamicValue = form.getFieldValue(formName);
                const dynamicLen = isNumber(dynamicValue?.length);

                const isMin = isNumber(min)
                    && min >= 0
                    && dynamicLen
                    && dynamicValue.length <= min;

                const isMax = isNumber(max)
                    && max >= 1
                    && dynamicLen
                    && dynamicValue.length >= max;

                return {
                    isMin,
                    isMax
                };
            },
        };

        return newOperation;
    }, [defaultValue, form, formName, max, min]);

    /**
     * 如果表单没有初始值并且指定了最小条数和默认值
     * 根据条件在初始化时设置默认条数和默认值
     */
    React.useEffect(() => {
        if (
            !hasInitDefault
            && min
        ) {
            const currentValue = form.getFieldValue(formName);

            if (!currentValue || isEmpty(currentValue)) {

                const newValue = getInitialValue(min, currentValue, defaultValue);

                form.setFields([
                    {
                        name: formName,
                        value: newValue
                    }
                ]);
            }

            setHasInitDefault(true);
        }
    }, [defaultValue, form, formName, hasInitDefault, min]);

    const formListProps = {
        name,
        rules
    };

    return (
        <Form.List
            {...formListProps}
        >
            {(fields, operation, { errors }) => {
                const newOperation = enhanceOperation(operation);
                if (!formListRef.current) {
                    formListRef.current = newOperation;
                }

                return children(fields, newOperation, { errors });
            }}
        </Form.List>
    );

});

FormList.displayName = 'FormList';

export default FormList;


FormList.propTypes = {
    // 动态增减组件表单名
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,

    // form 实例
    form: PropTypes.object.isRequired,

    // 动态增减子组件
    children: PropTypes.func.isRequired,

    // 动态增减的行默认值（仅在当前行新增且没有赋值时才会新增配置的默认值）
    defaultValue: PropTypes.object,

    // 动态增减组件最小行数（初始化时会根据min补足）
    min: PropTypes.number,

    // 动态增减组件最大行数
    max: PropTypes.number,

    // 父动态增减组件表单名称（只有在动态增减嵌套动态增减的子组件上才需要配置）
    prefixName: PropTypes.string,
};