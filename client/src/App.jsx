import React,{useEffect, useState} from 'react';
import { Layout ,message} from 'antd';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import './App.css';
import RouterBefore from './router/RouterBefore.jsx';
import LoginForm from './components/LoginForm';
import { userInfoById, whoami } from './api/user';
import { useDispatch } from 'react-redux';
import { login } from './store/userSlice';


const { Header, Content, Footer } = Layout

function App(props) {

    //控制登录注册表单的显示
    const [isShowModal,setIsShowModal]  = useState(false);

    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchData () {
            const result = await whoami();
            if (result.data) {
               const {data:userInfo}  = await userInfoById(result.data._id);
               dispatch(login(userInfo))
            } else {
                message.warning(result.msg);
                localStorage.removeItem('token')
            }
        }

        if (localStorage.token) {
            fetchData();
        }
    },[])

    const handleOk = ()=>{
        setIsShowModal(false)
    }
    const handleCancel = ()=>{
        setIsShowModal(false)
    }

    const openModalHandle = ()=>{
        setIsShowModal(true);
    }

    return (
        <div className='App'>
            <Layout>
                {/* 头部导航 */}
                <Header className='header'><NavHeader  onOpenModal={openModalHandle}/></Header>
                {/* 路由页面 */}
                <Content className='content' >
                    <RouterBefore /> 
                </Content>
                {/* 底部信息 */}
                <Footer className='footer'><PageFooter /></Footer>
               {isShowModal &&  <LoginForm  isShow={isShowModal} onOk={handleOk} onCancel={handleCancel}/>}
            </Layout>
        </div >
    );
}

export default App;