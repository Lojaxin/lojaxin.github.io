import React, { useState, useEffect } from 'react';
// import _ from 'lodash';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import http from '@/api/http.js';

const CustomSelect = ({
    url,
    urlParams,
    options,
    ...rest
}) => {

    const [realOptions, setRealOptions] = useState(options || []);

    useEffect(() => {
        http.post(url, urlParams).then(res => {
            let data = res?.data?.content ?? [];
            setRealOptions(data);
        });
    }, [url, urlParams]);

    return (
        <Select
            style={{ minWidth: '200px' }}
            options={realOptions}
            {...rest}
        />
    );

};

export default CustomSelect;


CustomSelect.propTypes = {

    /** select请求路径,暂只支持post */
    url: PropTypes.string,

    /** urlParams,请求的入参 */
    urlParams: PropTypes.object

};

CustomSelect.defaultProps = {
    urlParams: {}
};