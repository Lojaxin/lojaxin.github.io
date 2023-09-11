import React, { useEffect, useState, useMemo, useCallback } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import http from '@/api/http.js';

const { Option } = Select;

const FuzzySelect = ({
    url,
    urlParams,
    isMemo,
    options,
    value,
    onSearch,
    onFocus,
    ...rest
}) => {

    const [realOptions, setRealOptions] = useState([]);

    useEffect(() => {
        if (!options) {
            getOptions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = useCallback(async (keyword) => {
        let data;
        if (keyword && !isMemo) {
            data = await getOptions(keyword);
        }
        onSearch?.(keyword, data);
    }, [getOptions, onSearch, isMemo]);

    const handleFocus = (...arg) => {
        //如果当前opts项没有值,通过form.set也是能够回显的
        if (value && !realOptions.some(item => item.value === value.value)) {
            let opts = _.cloneDeep(realOptions);
            opts.push(value);
            setRealOptions(opts);
        }
        onFocus?.(...arg);
    };

    //查询Options
    const getOptions = useCallback(async (keyword) => {
        if (url) {
            const res = await http.post(url, { ...urlParams, keyword });
            let data = res?.data?.content ?? [];
            if (value && !data.some(item => item.value === value.value)) {
                data.push(value);
            }
            setRealOptions(data);
            return data;
        }
    }, [url, urlParams, value]);

    /** 渲染options */
    const renderOptions = useMemo(() => {
        if (_.isEmpty(realOptions)) { return null; }
        return realOptions.map(item => (
            <Option key={item.value} value={item.value}>{item.label}</Option>
        ));
    }, [realOptions]);

    return (
        <Select
            style={{ minWidth: '200px' }}
            {...rest}
            value={value}
            showSearch
            allowClear
            labelInValue //将value变成一个object
            optionFilterProp="children"
            onSearch={handleSearch}
            onFocus={handleFocus}
        >
            {renderOptions}
        </Select>
    );

};

export default FuzzySelect;

FuzzySelect.propTypes = {

    /** select请求路径,暂只支持post */
    url: PropTypes.string,

    /** urlParams,请求的入参 */
    urlParams: PropTypes.object,

    /** 是否开启缓存,只会请求一次 */
    isMemo: PropTypes.bool

};

FuzzySelect.defaultProps = {
    urlParams: {},
    isMemo: true
};
