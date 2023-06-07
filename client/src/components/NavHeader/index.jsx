import React,{useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Space, Select, Input } from 'antd'
import LoginUser from '../LoginUser';
import { useDispatch } from 'react-redux';
import { updateTypeId } from '../../store/typeSlice'

function NavHeader(props) {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectType ,setSelectType]  = useState('issue')

    const onChange = value => {
        setSelectType(value)
    }
    const onSearch = value => {
        if (!value) {
            //没有数据，跳转到首页
            dispatch(updateTypeId('all'))
            navigate('/');
            return;
        }

        navigate('/search',{
            state:{
                value,
                selectType,
            }
        })
    }
    return (
        <div className='headerContainer'>
            {/* logo区域 */}
            <div className="logoContainer">
                <a href='/' className="logo"></a>
            </div>
            {/* 导航栏 */}
            <nav className="navContainer">
                <NavLink to='/issues' className='navigation'>问答</NavLink>
                <NavLink to='/books' className='navigation'>书籍</NavLink>
                <NavLink to='/interviews' className='navigation'>面试题</NavLink>
                <a href="https://www.bilibili.com/video/BV1wy4y1D7JT/?spm_id_from=333.337.search-card.all.click&vd_source=2ab3edcd06aec2b87a050ed8025235d6" className='navigation' target='_blank' rel="noreferrer">视频教学</a>
            </nav>
            {/* 搜索框 */}
            <div className="searchContainer">
                <Space.Compact style={{ width: "100%" }} size='large'>
                    <Select defaultValue="issue" options={[{
                        value: "issue",
                        label: "问答"
                    }, {
                        value: "book",
                        label: "书籍"
                    }]} style={{ width: '20%' }} onChange={onChange} />
                    {/* <Input placeholder="请输入要搜索的内容" />
                    <Button type="primary">搜索</Button> */}
                    <Input.Search
                        placeholder="请输入要搜索的内容"
                        allowClear
                        enterButton="搜索"
                        onSearch={onSearch}
                        style={{
                            width: "80%",
                        }}
                    />
                </Space.Compact>
            </div>
            {/* 登录注册/用户 */}
            <div className="loginBtnContainer">
                <LoginUser onOpenModal={props.onOpenModal} />
            </div>
        </div>
    );
}

export default NavHeader;