import React from 'react';
import { Avatar } from 'antd';
import styles from './index.module.css'

function index(props) {
    // console.log(props);

    let rankNum = null;
    switch (props.rank){
        case 1:{
            rankNum = (
                <div style={{
                    color: '#ffda23',
                    fontSize: '22px'
                }} className={"iconfont icon-jiangbei"}></div>
            )
            break;
        }
        case 2:{
            rankNum = (
                <div style={{
                    color: '#c5c5c5',
                    fontSize: '22px'
                }} className={"iconfont icon-jiangbei"}></div>
            )
            break;
        }
        case 3:{
            rankNum = (
                <div style={{
                    color: '#cd9a62',
                    fontSize: '22px'
                }} className={"iconfont icon-jiangbei"}></div>
            )
            break;
        }
        default:{
            rankNum = (
                <div className={styles.rank}>{props.rank}</div>
            )
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                {rankNum}
                <div className={styles.avatar}>
                    <Avatar size="small" src={props.avatar} />
                </div>
                <div className={styles.nickname}>{props.nickname}</div>
            </div>
            <div className={styles.right}>{props.points}</div>
        </div>
    );
}

export default index;