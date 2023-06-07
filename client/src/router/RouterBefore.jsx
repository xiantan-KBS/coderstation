import React, { useEffect, useState} from 'react';
import RouterConfig from './index';
import { useLocation } from 'react-router-dom';
import routerArr from './routerBeforeConfig';
import { useSelector } from 'react-redux';
import { Alert } from "antd";

function RouterBefore(props) {
    const { pathname } = useLocation();
    const [isDefend, setIsDefend] = useState(false)
    const { isLogin } = useSelector(state => state.user)

    useEffect(()=>{
        const routerObj = routerArr.find(routerObj => routerObj.path === pathname.toLowerCase());
        setIsDefend(routerObj?.needLogin);
    },[])
    const closeHandle = ()=>{
        window.location.pathname = '/'
    }

    return (
        <>
            {(isDefend && !isLogin) ? <Alert
                message="请先登录"
                type="warning"
                closable
                onClose={closeHandle}
            /> : <RouterConfig />
            }
        </>
    );
}

export default RouterBefore;