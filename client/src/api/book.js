import request from "./index";

/**
 * 分页获取书籍
 */
export async function getBookByPage(params) {

  return await request.get('/api/book', {
    params: {
      ...params
    }
  })
}

/**
 * 根据 id 获取书籍详情
 */
export async function getBookById(bookId) {
  return await request.get(`/api/book/${bookId}`);
}

/**
 * 修改问答（主要是回答数和浏览数）
 */
export async function updateBook(bookId, newBookInfo) {
  return await request.patch(`/api/book/${bookId}`, newBookInfo);
}
