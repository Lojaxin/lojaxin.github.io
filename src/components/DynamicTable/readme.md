## 使用说明

##### 1. columns的配置一定是一个function
    const columns = (operation) => {
        return [{
            title: '名字',
            dataIndex: 'name',
            render: (value, row) => {
                return (
                    <Form.Item {...row.yKey} name={[row.yKey.name, 'chargeType']} rules={[{ required: true, message: '请选择费用名称' }]}>
                        <Input/>
                    </Form.Item>
                );
            }
        },{
            title: '年龄',
            dataIndex: 'age',
            render: (value, row) => {
                return (
                    <Form.Item {...row.yKey} name={[row.yKey.name, 'age']} rules={[{ required: true, message: '请选择费用名称' }]}>
                        <span>{value}</span>
                    </Form.Item>
                );
            }
        }, {
            title: '操作',
            dataIndex: 'control',
            width: 120,
            editable: true,
            render: (__, record, index) => {
                return (
                    <>
                        <Button
                            onClick={() => {
                                operation.remove(index);
                            }}>
                            删除
                        </Button>
                        <Button
                            onClick={() => {
                                operation.copy(index, ['id']);//忽略id
                            }}
                        >
                            复制
                        </Button>
                    </>
                );
            }
        }];
    };

##### 2. columns的operation是动态列表的控制器,参考formList.js组件,其他属性参考index.js组件
    //下面列举的三个属性都是必须的
    <DynamicTable columns={control => columns(control)} name="dynamic-table" form={form}/>

##### 3. 值的获取和设置
    动态列表其实也属于表单,所以我们获取值和设置值都还是使用form来控制,如form.getFieldsValue()或者form.setFields([{ name:'dynamic-table', value:value }]);

#### 4.antd版本
    "antd": "^4.22.3"
