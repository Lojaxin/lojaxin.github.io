import React, { useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import { Input, Checkbox } from 'antd';
import { debounced } from '@/utils';

const CheckboxGroup = Checkbox.Group;

const SearchCheckbox = ({ options, defaultValue, value, onChange }) => {

    //如果使用了value&onChange让组件受控,那么它其实没有参与任何状态
    const [checkedList, setcheckedList] = useState(defaultValue);//首次默认选中,剩下的交由组件内部接管,不会随props.defaultValue的更新而更新
    const [keyword, setKeyword] = useState();

    const realCheckedList = useMemo(() => (value ? value : checkedList), [value, checkedList]);//实际选中项

    const realOptions = useMemo(() => {
        let filterOpts = _.cloneDeep(options);
        if (keyword) {
            let str = ['', ...keyword, ''].join('.*');
            let reg = new RegExp(str, 'ig');//i:不区分大小写 g:全局
            filterOpts = options.filter(item => reg.test(item.title));
        }
        return filterOpts;
        //不需要依赖options
        // eslint-disable-next-line comma-spacing, react-hooks/exhaustive-deps
    }, [keyword]);

    //输入框搜索-->显示
    const handleSearch = (e) => {
        const val = e.target.value;
        debounced(keyword => {
            setKeyword(keyword);
        }, val);
    };

    //单个选中的事件
    const handleChange = (values) => {
        if (!value) {
            setcheckedList(values);
        }
        onChange?.(values);
    };

    //处理全部选中
    const handleCheckAllChange = (e) => {
        const isAll = e.target.checked;
        const checkedVals = isAll ? options.map(i => i.dataIndex) : [];
        setcheckedList(checkedVals);
        onChange?.(checkedVals);
    };

    return (
        <div className="custom-select">
            <Input allowClear onChange={handleSearch} />
            {
                !keyword &&
                <p>
                    <Checkbox
                        checked={realCheckedList.length === options.length}
                        indeterminate={!_.isEmpty(realCheckedList) && realCheckedList.length !== options.length}
                        onChange={handleCheckAllChange}
                    >
                        全部
                    </Checkbox>
                </p>
            }
            <CheckboxGroup value={realCheckedList} onChange={handleChange}>
                {
                    realOptions.map((opt, index) => (
                        <div key={`${opt.dataIndex}${index}`}>
                            <Checkbox value={opt.dataIndex}>
                                {opt.title}
                            </Checkbox>
                        </div>
                    ))
                }
            </CheckboxGroup>
        </div>
    );

};

export default SearchCheckbox;

// SearchCheckbox.propTypes = {

//     /** select的所有下拉项 */
//     options: PropTypes.arrayOf(PropTypes.shape({
//         //value值
//         dataIndex: PropTypes.string.isRequired,
//         //label值
//         title: PropTypes.string.isRequired,
//     })).isRequired,

//     /** 默认选中的配置项:非受控 */
//     defaultValue: PropTypes.arrayOf[PropTypes.string],

//     /** 选中的配置项:受控,需要配合onChange */
//     value: PropTypes.arrayOf[PropTypes.string],

//     /** checkbox的选中回调 */
//     onChange: PropTypes.func

// };