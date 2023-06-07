import { useEffect, useState } from 'react';
import PageHeader from "../../components/PageHeader"
import ScoreRank from "../Issues/ScoreRank"
import Recommend from "../Issues/Recommend"
import MyComment from "../../components/MyComment";
import { useLocation, useParams } from "react-router-dom"
import { Avatar } from 'antd';
import { getIssueById, updateIssue } from "../../api/issue"
import { userInfoById } from "../../api/user"
import { formatDate } from "../../utils/tools"
import styles from "./index.module.css"
import { useDispatch } from 'react-redux';
import { setCurrent } from '../../store/issueSlice';

function IssueDetail(props) {

    const { id } = useParams(); // 获取可能传递过来的 id
    const { state: { current } } = useLocation();
    const dispatch = useDispatch();

    //维持进入详情之前的当前页码
    useEffect(() => {
        dispatch(setCurrent(current));
    }, [])

    const [issueInfo, setIssueInfo] = useState({});
    const [issueUser, setIssueUser] = useState({});


    // 根据传递过来的 id 获取面试题详情
    useEffect(() => {
        async function fetchData() {
            // 根据问答 id 获取该问答具体的信息
            const { data } = await getIssueById(id);
            setIssueInfo(data);

            // 获取 userId 对应的用户
            const result = await userInfoById(data.userId);
            setIssueUser(result.data);

            // 该问答的浏览数 +1
            updateIssue(data._id, {
                scanNumber: ++data.scanNumber
            })
        }
        fetchData();
    }, [])


    return (
        <div className={styles.container}>
            <PageHeader title="问题详情" />
            <div className={styles.detailContainer}>
                <div className={styles.leftSide}>
                    <div className={styles.question}>
                        <h1>{issueInfo?.issueTitle}</h1>
                        <div className={styles.questioner}>
                            <Avatar size="small" src={issueUser?.avatar} />
                            <span className={styles.user}>{issueUser?.nickname}</span>
                            <span>发布于：{formatDate(issueInfo?.issueDate)}</span>
                        </div>
                        <div className={styles.content}>
                            <div dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}></div>
                        </div>
                    </div>
                    {/* 下方评论模块 */}
                    <MyComment
                        issueInfo={issueInfo}
                        commentType={1}
                        targetId={id}
                    />
                </div>
                {/* 右侧 */}
                <div className={styles.rightSide}>
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

export default IssueDetail;