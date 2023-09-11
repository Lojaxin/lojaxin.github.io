import React from "react";
import { Button } from 'antd';
import Router from 'next/router'


export default (props) => {

    const handleClick = () => {
        Router.push('/users')
    }
    return (
        <>
            <div className="default-color">首页</div>
            <Button onClick={handleClick}>跳转到 users</Button>
        </>
    )
}