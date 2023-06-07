import request from './index';



/**
 * 获取类型列表
 */
export async function getType() {
    return await request.get("/api/type")
  }
  