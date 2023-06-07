import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import styles from './index.module.css';
import {Tag} from 'antd';
import {useNavigate} from 'react-router-dom';
import {formatDate} from '../../../utils/tools'
import { userInfoById } from '../../../api/user';

function IssueItem(props) {

    const navigate = useNavigate();

    const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];
    const [nickname,setNickname] = useState('');
  
    const { typeList } = useSelector(state => state.type);


    //  一开始根据传入的问答信息中的userId直接获取用户的信息
    useEffect(()=>{
        async function fetchData () {
            const {data}  = await userInfoById(props.issueInfo.userId);
            setNickname(data.nickname)
        }
        
        //有id才发请求，因为父组件执行两遍
        if (props.issueInfo?.userId) {
            fetchData()
        }
    },[props.issueInfo.userId])

    //返回当前的type对象
    const type = typeList.find(it=>props.issueInfo.typeId === it._id)


    return (
        <div className={styles.container}>
            {/* 回答数 */}
            <div className={styles.issueNum}>
                <div>{props.issueInfo.commentNumber}</div>
                <div>回答</div>
            </div>
            {/* 浏览数 */}
            <div className={styles.issueNum}>
                <div>{props.issueInfo.scanNumber}</div>
                <div>浏览</div>
            </div>
            {/* 问题内容 */}
            <div className={styles.issueContainer}>
                <div className={styles.top} onClick={() => navigate(`/issue/${props.issueInfo._id}`,{
                    state:{
                        current:props.current,
                    }
                })}>{props.issueInfo.issueTitle}</div>
                <div className={styles.bottom}>
                    <div className={styles.left}>
                        <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>{type?.typeName}</Tag>
                    </div>
                    <div className={styles.right}>
                        <Tag color="volcano">{nickname}</Tag>
                        <span>{formatDate(props.issueInfo.issueDate, "year")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssueItem;