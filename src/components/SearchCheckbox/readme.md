## 使用示例

const Operation = ({ columns }) => {

    const [values, setValues] = useState(['name']);

    const handleChange = (values) => {
        setValues(values);
    };

    return (
        <SearchCheckbox options={columns} value={values} onChange={handleChange} />
    );

};

## 说明
    搜索+Checkbox混合组件,可用作模拟下拉.该组件不含业务逻辑;