import React, { useMemo, useState, useRef } from 'react';
// import _ from 'lodash';
import { Tabulation } from '@/components';
import { Button, Select } from 'antd';

const Demo = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([1, 3, 5]);
    const tableRef = useRef();

    const filterConfig = useMemo(() => {
        return [{
            name: 'name',
            label: '名字',
            render: (...rest) => {
                console.log('%c Here 👉 ', 'font-size:16px;background-color:#fff;color:#000;', rest);
                return (<Select options={[{ label: 'zs', value: 1 }, { label: 'ls', value: 2 }]} />);
            }
        }, {
            name: 'age',
            label: '年龄',
            required: true,
        }];
    }, []);

    const columns = [{
        title: '名字',
        dataIndex: 'name',
        key: 'name',
        show: true,
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        show: false
    }];

    const CustomOperation = () => {
        const handleClick = () => {
            tableRef?.current?.onFilter?.();
        };
        return (
            <>
                <Button onClick={handleClick}>重新请求一下</Button>
            </>
        );
    };

    return (
        <Tabulation
            rowKey="id"
            url="/api/getTableList"
            filterConfig={filterConfig}
            columns={columns}
            isShowSelections={true}
            selectedRowKeys={selectedRowKeys}
            onSelected={(keys, rows) => {
                setSelectedRowKeys(keys);
                console.log(rows);
            }}
            customOperation={CustomOperation()}
            ref={tableRef}
        />
    );

};

export default Demo;
