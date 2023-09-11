#### 1.使用示例
    import React, { useMemo, useState, useRef } from 'react';
    // import _ from 'lodash';
    import { Tabulation } from '@/components';
    import { Button, Select } from 'antd';

    const Child = () => {

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

    export default Child;

#### 2.说明
* 1.配置url之后,dataSource将不生效;
* 2.antd的API的优先级高于Tabulation中的配置,如果使用antd的API,Tabulation提供的一些功能可能不再生效;如rowSelection;

#### 3.一份后端的列表数据

{
    total: 500,
    current: current,
    pageSize: pageSize,
    sort: [],
    content:[{
            id: 11,
            name: '张三',
            age: 18
        }, {
            id: 12,
            name: '李四',
            age: 17
        }]
}

#### 4.antd版本
    "antd": "^4.22.3",