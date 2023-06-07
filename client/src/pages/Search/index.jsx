import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Empty, Pagination } from 'antd'
import styles from '../Issues/index.module.css';
import PageHeader from '../../components/PageHeader'
import AddIssue from '../Issues/AddIssue'
import Recommend from '../Issues/Recommend'
import ScoreRank from '../Issues/ScoreRank'
import { getIssueByPage } from '../../api/issue';
import { getBookByPage } from '../../api/book';
import IssueItem from '../Issues/IssueItem';
import SearchItem from './SearchItem';

function Search(props) {

    const { state } = useLocation();
    const [pagesInfo, setPagesInfo] = useState({
        current: 1,   //当前页
        pageSize: 15,  //一页显示多少条数据
        total: 0    //数据总数
    })

    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let resultData = [];  //存储网络请求的数据
            let searchParams = {
                current: pagesInfo.current,
                pageSize: pagesInfo.pageSize,
                issueStatus: true,
            }
            if (state.selectType === 'issue') {
                //问答搜索
                searchParams.issueTitle = state.value;
                const { data } = await getIssueByPage(searchParams);
                resultData = data;
            } else {
                //书籍搜索
                searchParams.bookTitle = state.value;
                const { data } = await getBookByPage(searchParams);
                resultData = data;
            }

            setPagesInfo({
                current: resultData.currentPage,
                pageSize: resultData.eachPage,
                total: resultData.count,
            })
            setSearchData(resultData.data)
        }

        if (state) {
            fetchData()
        }

    }, [pagesInfo.current, pagesInfo.pageSize, state.value, state.selectType])



    const handlePageChange = (current, pageSize) => {
        // console.log(pageSize);
        setPagesInfo(state => ({
            ...state,
            current,
            pageSize,
        }))
    }

    return (
        <div className="container">
            <PageHeader title="搜索列表" style={{ height: 60 }} />
            <div className={styles.issueContainer}>
                {/* 左边部分 */}
                <div className={styles.leftSide}>
                    {/* 搜索内容 */}
                    <SearchItem searchData={searchData} selectType={state.selectType} />
                    {/* 分页显示 */}
                    {
                        searchData.length > 0 ? (
                            <div className="paginationContainer">
                                <Pagination showQuickJumper
                                    defaultCurrent={pagesInfo.current}
                                    showSizeChanger
                                    pageSizeOptions={[5, 10, 15, 20]}
                                    {...pagesInfo} onChange={handlePageChange} />
                            </div>
                        ) : (<Empty style={{ marginTop: 150 }} />)
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

export default Search;

