import axios from 'axios';


//创建实例
const instance= axios.create({
    timeout:3000,
})



//请求拦截
instance.interceptors.request.use(config=>{
    // console.log('请求拦截',config);
    

    //  把token放在请求头中
    let token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;   //请求头中添加token
    }
    
    

    return config
},error=>{
    console.log(error);
})


//响应拦截
instance.interceptors.response.use(response=>{
    // console.log(response);
    return response.data;
},error=>{
    console.log(error);
})


export default instance;

