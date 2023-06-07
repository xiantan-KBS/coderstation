import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag } from 'antd'
import { fetchTypeList, updateTypeId ,uodateBookTypeId, updateBookTypeId} from '../../store/typeSlice';

function TypeSelect(props) {

    //获取typeList数组
    const { typeList} = useSelector(state => state.type)
    const dispatch = useDispatch();
    const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];
    useEffect(() => {
        //如果redux中的typeList数组长度为零时，调用异步方法获取网络请求数据
        if (!typeList.length) {
            dispatch(fetchTypeList())
        }
    }, [])

    const changeType = (typeId) => {
        // console.log(typeId);
       
        if (window.location.pathname === '/issues') {
            dispatch(updateTypeId(typeId));
        } else if(window.location.pathname === '/books') {
            dispatch(updateBookTypeId(typeId))
        }

    }
    return (
        <div>
            <Tag
                color="magenta"
                value="all"
                key="all"
                style={{ cursor: "pointer" }}
                onClick={() => changeType("all")}
            >全部</Tag>
            {typeList.map((typeItem, i) => (
                <Tag
                    color={colorArr[i % colorArr.length]}
                    value={typeItem._id}
                    key={typeItem._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => changeType(typeItem._id)}
                >
                    {typeItem.typeName}
                </Tag>
            ))}
        </div>
    );
}

export default TypeSelect;