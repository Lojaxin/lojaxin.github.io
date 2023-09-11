import React from "react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import UserLayout from './';

//动态导入,如果这个组件不是页面必须的,可以使用动态导入
const UserDetailInfo = dynamic(import('../../components/UserDetail'), { ssr: false })

function UserDetail(props) {
    console.log('%c [ UserDetailprops ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', props)
    const router = useRouter();

    //也可以在方法中动态导入
    // const doFn = async ()=>{
    //     const moment =  await import('moment');
    //     const date = moment.format('YYYY-MM-DD HH:mm:ss');
    // }

    const { id } = router.query ?? {};

    return (
        <UserLayout>
            <UserDetailInfo id={id} />
        </UserLayout>
    )
}

//读取仓库的userInfo
function mapStateToProps(state) {
    return { user: state.pageData.userInfo }
}

export default connect(mapStateToProps)(UserDetail);