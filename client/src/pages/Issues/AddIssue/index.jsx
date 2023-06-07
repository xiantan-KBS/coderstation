import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {Button ,message} from 'antd';

function AddIssue(props) {

    const {isLogin}  = useSelector(state=>state.user);

    const navigate = useNavigate()

    const clickHandle = ()=>{
        if (isLogin) {
            //登录成功，跳转到添加发问页面
            navigate('/addissue');
        } else {
            message.warning('请先登录账号')
        }
    }

    return (
        <Button
            type="primary"
            size="large"
            style={{
                width: "100%",
                marginBottom: "30px"
            }}
            onClick={clickHandle}
        >我要发问</Button>
    );
}

export default AddIssue;