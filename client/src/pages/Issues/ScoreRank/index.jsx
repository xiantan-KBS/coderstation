import React, { useEffect, useState } from 'react';
import  {Card } from 'antd'
import { getUserByScoreRank } from '../../../api/user';
import ScoreItem from './ScoreItem';



function ScoreRank(props) {

    const [userScoreRank,setUserScoreRank] = useState([]);
     useEffect(()=>{
        async function fecthData () {
            const {data}  = await getUserByScoreRank();
            setUserScoreRank(data);
        }
        fecthData()
     },[])
    return (
        <Card title="积分排行榜">
            {userScoreRank.map((userInfo,i) => (<ScoreItem  key={userInfo._id} {...userInfo} rank={i+1}/>))}
        </Card>
    );
}

export default ScoreRank;