import React, { useMemo } from 'react';
import { Button } from 'antd';
// import _ from 'lodash';
import { CheckCircleOutlined } from '@ant-design/icons';

const ProgressSteps = ({
    status,
    extraIcon = null,
    title = '',
    describe = ''
}) => {

    const renderIcon = useMemo(() => {
        if (extraIcon){ return extraIcon; }
        switch (status){
            case 'finish':
                return <div className="step-render-icon"><CheckCircleOutlined /></div>;
            case 'process':
                return (
                    <Button>按钮</Button>
                );
            default:
                return <div className="step-gray-dot" />;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, extraIcon]);

    return (
        <div className={`progress-step-item step-${status}`}>
            <div className="progress-step-line"/>
            <div className="progress-step-cont">
                <div className="progress-step-icon">
                    { renderIcon }
                </div>
                <p>{title}</p>
                <div>{describe}</div>
            </div>
        </div>
    );
   
};

export default ProgressSteps;
