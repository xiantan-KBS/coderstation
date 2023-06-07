import  request from  './index';


//请求验证码
export async function getCaptcha () {
    return  await request.get('/res/captcha');
}


//判断账号是否存在
export async function isUserExist (loginId) {
    return  await request.get(`/api/user/userIsExist/${loginId}`);
}

//用户注册
export async function userRegister (data) {
    return  await request.post('/api/user',data);
}

//用户登录
export async function userLogin (data) {
   
    return  await request.post('/api/user/login',data);
}


//查找当前用户信息
export async function whoami (data) {
    return  await request.get('/api/user/whoami');
}

//根据id查找用户信息(第二参数是用来指定当前登录是用户手动登录)
export async function userInfoById (id,isUserLogin=false) {
    return  await request.get( `/api/user/${id}`,{
        params:{
            isUserLogin
        }
    });
}


/**
 * 获取积分前十的用户
 */
export async function getUserByScoreRank(){
    return  await request.get("/api/user/scorerank")
  }



//更新用户积分信息
export async function updateUserInfo (id,newUserInfo){
    return await request.patch(`/api/user/${id}`,newUserInfo)
}


/**
 * 根据用户 id 确认密码是否正确
 */

export async function checkPasswordIsRight(data) {
    return await request.post("/api/user/passwordcheck", data);
  }