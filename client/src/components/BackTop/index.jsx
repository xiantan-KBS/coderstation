import React, { useEffect, useState } from 'react';
import { CaretUpOutlined } from '@ant-design/icons';
import "./index.css";
import { debounce } from '../../utils/tools'

function BackTop(props) {

    const [isShow, setIsShow] = useState(false)

    useEffect(() => {

        const height = document.body.clientHeight || 600;
        // window.onwheel = (e) => {
        //     // console.log(e.pageY);
        //     if (e.pageY >= height) {
        //         setIsShow(true);
        //     }else{
        //         setIsShow(false)
        //     }
        // }
        //包装后的事件处理函数
        const eventHandle = debounce((e) => {
            // console.log(e.pageY);
            if (e.pageY >= height) {
                setIsShow(true);
            } else {
                setIsShow(false)
            }
        },20);

        window.addEventListener('wheel', eventHandle,false)


        //解除事件绑定处理函数
        return ()=>{
            window.removeEventListener('wheel',eventHandle)
        }

    }, [])


    const backTopHandle = () => {
        window.scrollTo(0, 0);
        setIsShow(false)
    }


    return (
        <>
            {isShow && <div className='backtop-container' onClick={backTopHandle}>
                <CaretUpOutlined className='icon-back' />
            </div>}
        </>
    );
}

export default BackTop;