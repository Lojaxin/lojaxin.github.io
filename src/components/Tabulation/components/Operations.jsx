import React, { useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, message } from 'antd';
import { SearchCheckbox } from '@/components';

const Operation = ({ columns, onColumnsChange, isEditColumns, extraNode }) => {

    const deafaultChecked = columns.filter(item => item.show).map(i => i.dataIndex);//默认选中项

    const [visible, setVisible] = useState(false);
    const [checkedList, setCheckedList] = useState(deafaultChecked);//选中的选项(未保存)
    const savedCheckedList = useRef(deafaultChecked); //已保存的选项

    //隐藏卡片
    const hidePopover = () => setVisible(false);
    const handleVisibleChange = (newVisible) => setVisible(newVisible);

    //多选框修改回调
    const handleChange = (values) => {
        setCheckedList(values);
    };
    //还原values的默认配置
    const handleReduction = () => {
        savedCheckedList.current = deafaultChecked;
        setCheckedList(deafaultChecked);
        onColumnsChange?.(deafaultChecked);
        hidePopover();
    };
    //保存选中的选项
    const handleSave = () => {
        if (!checkedList.length) {
            message.error('列表至少包含一列');
            return;
        }
        savedCheckedList.current = checkedList;
        //重新排序columns
        onColumnsChange?.(checkedList);
        hidePopover();
    };
    //取消选中的选项:还原至上一次的保存配置
    const handleCancel = () => {
        setCheckedList(savedCheckedList.current);
        hidePopover();
    };

    //自定义列的弹层内容
    const simulatedSelect = useMemo(() => {
        return (
            <>
                <SearchCheckbox options={columns} value={checkedList} onChange={handleChange} />
                <div className="opration-btns">
                    <Button type="primary" onClick={handleReduction}>默认</Button>
                    <Button type="primary" onClick={handleSave}>保存</Button>
                    <Button onClick={handleCancel}>取消</Button>
                </div>
            </>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns, checkedList]);

    return (
        <>
            {
                extraNode ? extraNode : null
            }
            {
                isEditColumns &&
                <Popover
                    content={simulatedSelect}
                    trigger="click"
                    arrowPointAtCenter
                    placement="bottom"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                >
                    <Button onClick={() => setVisible(true)}>自定义列</Button>
                </Popover>
            }

        </>
    );

};

export default Operation;

Operation.propTypes = {

    /** 表列的配置 */
    columns: PropTypes.arrayOf(PropTypes.shape({

        //字段名称
        dataIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,

        //表头名称
        title: PropTypes.string.isRequired,

        //是否默认展示该字段
        show: PropTypes.bool,

        //是否超出悬浮显示...
        overview: PropTypes.bool,

        //自渲染，(text,record,index) => {return reactNode}
        render: PropTypes.func,

    })).isRequired,


    /** 是否展示自定义列 */
    isEditColumns: PropTypes.bool,

    //修改自定义列后的回调,入参是选中的选项
    onColumnsChange: PropTypes.func,

};

Operation.defaultProps = {
    isEditColumns: true
};