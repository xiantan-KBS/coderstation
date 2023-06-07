import request from './index';


/**
 * 分页获取问答
 */
export  async function getIssueByPage(params) {
    // console.log('issueAPi>>>>',params);
    return await request.get('/api/issue',{
        params:{
            ...params
        }
    })
  }
  
  /**
   * 新增问答
   */
  export async function addIssue(newIssue) {
    // console.log(newIssue);
    return await request.post("/api/issue",newIssue)
  }
  
  /**
   * 根据 id 获取问答详情
   */
  
  export async  function getIssueById(issueId) {
    return await request.get(`/api/issue/${issueId}`)
  }
  
  /**
   * 修改问答（主要是回答数和浏览数）
   */
  export async function updateIssue(issueId, newIssueInfo) {
    // return request(`/api/issue/${issueId}`, {
    //   method: "PATCH",
    //   data: newIssueInfo,
    // });

    return await request.patch(`/api/issue/${issueId}`,newIssueInfo)
  }
  