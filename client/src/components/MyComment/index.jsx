import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Avatar, Button, Input, Form, message, List, Pagination, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { userInfoById } from "../../api/user"
import { formatDate } from "../../utils/tools"
import { updateIssue } from "../../api/issue"
import { updateBook } from "../../api/book"
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import styles from "./index.module.css"
import { addComment, getIssueCommentById ,getBookCommentById} from '../../api/comment';
import { updateUserInfoAsync } from '../../store/userSlice';

/**
 * 评论组件
 * @param {*} props 
 * @returns 
 */
function MyComment(props) {

    const editorRef = useRef();
    const { isLogin, userInfo } = useSelector(state => state.user);
    const [value, setValue] = useState('');
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })
    const [commentList, setCommentList] = useState([])
    const [addCount, setAddCount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchCommentList() {
            let data = null;
            if (props.commentType === 1) {
                //  问答评论
                const result = await getIssueCommentById(props?.targetId, {
                    current: pageInfo.current,
                    pageSize: pageInfo.pageSize,
                });
                // console.log(result);
                data = result.data;

            } else if(props.commentType === 2) {
                // 书籍评论
                const result = await getBookCommentById(props?.targetId, {
                    current: pageInfo.current,
                    pageSize: pageInfo.pageSize,
                });
                // console.log(result);
                data = result.data;
            }
            setPageInfo({
                current: data.currentPage,
                pageSize: data.eachPage,
                total: data.count,
            })

            for (const item of data.data) {
                const res = await userInfoById(item.userId);
                item.userInfo = res.data;
            }
            setCommentList(data.data);
           
        }
        fetchCommentList();
    }, [addCount, pageInfo.current])


    const onSubmit = async () => {
        // console.log("添加评论");
        let newComment = null;
        if (props.commentType === 1) {
            //问答评论添加
            newComment = editorRef.current.getInstance().getHTML();
            if (newComment === '<p><br></p>') {
                newComment = '';
            }
        } else if (props.commentType === 2) {
            //书籍评论
            newComment = value;
        }

        if (!newComment) {
            message.warning('请添加评论');
            return;
        }

        //添加评论的数据
        const data = {
            userId: userInfo._id,
            // typeId:null,
            commentContent: newComment,
            commentType: props.commentType,
            // bookId: null,
            // issueId: props.targetId,
        }
        if (props.commentType === 1) {
            data.typeId =props.issueInfo.typeId;
            data.issueId =  props.targetId;
            data.bookId = null;
        } else if (props.commentType === 2) {
            data.typeId =props.bookInfo.typeId;
            data.bookId = props.targetId;
            data.issueId = null;
        }

        await addComment(data)

        if (props.commentType === 1) {
            //清空编辑器内容
            editorRef.current.getInstance().reset();
            //更新问答评论数
            updateIssue(props.targetId, {
                commentNumber: ++props.issueInfo.commentNumber
            })
        } else if (props.commentType === 2) {
            setValue('');
            updateBook(props.targetId, {
                commentNumber: ++props.bookInfo.commentNumber
            })
        }


        message.success('评论添加成功，积分+5')
        setAddCount(preState => preState + 1);   //评论增加,页面重新发送请求


        //更新用户积分(在redux中更新)
        dispatch(updateUserInfoAsync({ userId: userInfo._id, newUserInfo: { ...userInfo, points: userInfo.points + 5 } }))
    }

    const handlePageChange = (current, pageSize) => {
        // console.log(current,pageSize);
        setPageInfo(state => ({
            ...state,
            current,
            pageSize,
        }))
    }

    return (
        <div className={styles["container"]}>
            {isLogin ? <Avatar src={userInfo.avatar} size='large' className={styles.avatar} /> : <Avatar icon={<UserOutlined />} className={styles.nologin} />}
            <Form.Item>

                {
                    props?.commentType === 1 ?
                        (
                            <Editor
                                initialValue=""
                                previewStyle="vertical"
                                height="270px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                language='zh-CN'
                                ref={editorRef}
                                className="editor"
                            />
                        ) : (
                            <Input.TextArea
                                rows={4}
                                placeholder={isLogin ? "" : "请登录后评论..."}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                        )
                }
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    disabled={isLogin ? false : true}
                    onClick={onSubmit}
                >
                    添加评论
                </Button>
            </Form.Item>
            {/* 评论列表 */}
            {
                commentList?.length > 0
                &&
                <List
                    dataSource={commentList}
                    header="当前评论"
                    itemLayout="horizontal"
                    renderItem={(item) => (
                        <div className={styles.box}>
                            <div className={styles.right}>
                                <Avatar src={item?.userInfo.avatar} size={'large'} />
                            </div>
                            <div className={styles.left}>
                                <p className={styles.time}>{formatDate(item.commentDate)}</p>
                                <div className={styles.content} dangerouslySetInnerHTML={{ __html: item.commentContent }}></div>
                            </div>
                        </div>
                    )}
                />
            }

            {/* 分页 */}
            {
                commentList?.length > 0 ? (
                    <div className={styles.paginationContainer}>
                        <Pagination showQuickJumper defaultCurrent={1} total={pageInfo.total} onChange={handlePageChange} />
                    </div> 
                ) : (
                    // <div style={{
                    //     fontWeight: "200",
                    //     textAlign: "center",
                    //     margin: "50px"
                    // }}
                    // >暂无评论</div>
                    <Empty description='暂无评论' style={{ marginTop: 80 }} />
                )
            }
        </div>
    )
}


export default MyComment