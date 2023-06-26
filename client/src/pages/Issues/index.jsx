import React, { useEffect, useState } from 'react';
import {Pagination} from 'antd'
import styles from './index.module.css';
import PageHeader from '../../components/PageHeader'
import TypeSelect from '../../components/TypeSelect'
import AddIssue from './AddIssue'
import Recommend from './Recommend'
import ScoreRank from './ScoreRank'
import { getIssueByPage } from '../../api/issue';
import IssueItem from './IssueItem';
import { useSelector } from 'react-redux';
import {useNavigationType } from 'react-router-dom';


function Issues(props) {
    
    const {current}  = useSelector(state=>state.issue);

    const [pagesInfo,setPagesInfo] = useState({
        current,   //当前页
        pageSize: 10,  //一页显示多少条数据
        total:0    //数据总数
    })

    const [issueData,setIssueData] = useState([]);
    const {typeId}  = useSelector(state=>state.type);

    useEffect(()=>{
        async function  fetchData () {
            let searchParams = {
                current:pagesInfo.current,
                pageSize: pagesInfo.pageSize,
                issueStatus: true,
            }
            if (typeId !== 'all') {
                // console.log(typeId);
                searchParams.typeId = typeId;
                //根据typeid搜索应该重新更改为第一页开始查询
                searchParams.current = 1;
            }
            const {data} = await getIssueByPage(searchParams);
            setPagesInfo({
                current:data.currentPage,
                pageSize:data.eachPage,
                total:data.count,
            })
            setIssueData(data.data)
        }

        fetchData()
        
    },[pagesInfo.current,pagesInfo.pageSize,typeId])


    //  页面中显示问题的内容区域
    let questionData = issueData.map(issueItem=>(
        <IssueItem  issueInfo={issueItem} key={issueItem._id} current={pagesInfo.current}/>
    ))


    const handlePageChange = (current,pageSize) =>{
        // console.log(pageSize);
       setPagesInfo(state=>({
        ...state,
        current,
        pageSize,
       }))
    }

    
    return (
        <div className="container">
            <PageHeader title="问答列表">
                <TypeSelect />
            </PageHeader>
            <div className={styles.issueContainer}>
                {/* 左边部分 */}
                <div className={styles.leftSide}>
                    {/* 问答内容 */}
                    {questionData}
                    {/* 分页显示 */}
                    {
                        issueData.length > 0 ? (
                            <div className="paginationContainer">
                                <Pagination showQuickJumper
                                 defaultCurrent={pagesInfo.current}
                                 showSizeChanger
                                 pageSizeOptions={[5,10,15,20]}
                                 {...pagesInfo} onChange={handlePageChange}/>
                            </div>
                        ) : (<div className={styles.noIssue}>有问题，就来 coder station！</div>)
                    }

                </div>
                {/* 右边部分 */}
                <div className={styles.rightSide}>
                    {/* 添加问答按钮 */}
                    <AddIssue />
                    <div style={{ marginBottom: 20 }}>
                        <Recommend />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <ScoreRank />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Issues;