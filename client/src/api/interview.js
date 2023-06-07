import request from "./index";

/**
 * 获取所有分类的面试题标题
 */

export async function getInterviewTitle() {
  return await request.get("/api/interview/interviewTitle");
}

/**
 * 根据面试题 id 获取面试题
 */

export async function getInterviewById(interviewId) {
  return await request.get(`/api/interview/${interviewId}`);
}
