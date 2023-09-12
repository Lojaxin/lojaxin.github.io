import React from "react";
import { Button } from 'antd';
import Router from 'next/router';
import { connect } from 'react-redux';


const Home = (props) => {
    console.log('%c [ props ]-7', 'font-size:13px; background:pink; color:#bf2c9f;', props)


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

//读取仓库的userInfo
function mapStateToProps(state) {
    return { mdDocs: state.pageData.mdDocs }
}
export default connect(mapStateToProps)(Home);