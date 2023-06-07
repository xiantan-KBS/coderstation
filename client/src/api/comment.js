import request from './index';



//添加问答评论
export async function addComment (data) {
    console.log(data);
    return await request.post('/api/comment',data)
}

//  根据问答id获取相对应的评论数据
export async function getIssueCommentById (id,params) {
    return await request.get(`/api/comment/issuecomment/${id}`,{
        params:{
            ...params
        }
    });
}

// 根据书籍id获取相对应的书籍数据
export async function getBookCommentById (id,params) {
    return await request.get(`/api/comment/bookcomment/${id}`,{
        params:{
            ...params
        }
    })
}





