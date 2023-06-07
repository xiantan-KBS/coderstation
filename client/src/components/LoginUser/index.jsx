import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Button, Avatar, Popover, List, Image } from 'antd';
import {useNavigate} from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { loginOut } from '../../store/userSlice';




function LoginUser(props) {

   
    //登录注册点击事件，点击后弹出登录注册膜态框
    // const loginAccountHandle  = ()=>{
    //     // console.log('登录');
    //     props.onOpenModal()
    // }

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const clickHandle = (index)=>{
        // console.log(index);
        if (index  === 0) {
            //跳转到个人中心
            navigate('/personal')
        } else {
            //退出登录
            dispatch(loginOut())
        }
    }


    const user = useSelector(state => state.user);
    let showContent = '';
    if (user.isLogin) {
        //已登录
        const content = <List
            dataSource={['个人中心','退出登录']}
            renderItem={(item,i) => <List.Item className={styles.item} onClick={()=>clickHandle(i)}>{item}</List.Item>}
        />
        showContent = <Popover content={content} placement="bottom" >
            <Avatar  src={<Image src={user.userInfo?.avatar}  preview={false}/>} size="large" icon={<UserOutlined/>}  className={styles.avatar}/>
        </Popover>

    } else {
        // 未登录
        showContent = <Button type='primary' size='large' onClick={props.onOpenModal}>注册/登录</Button>
    }
    return (
        <div>
            {showContent}
        </div>
    );
}

export default LoginUser;