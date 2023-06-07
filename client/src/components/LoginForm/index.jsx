import React, { useState, useRef, useEffect } from 'react';
import { Modal, Radio, Form, Input, Checkbox, Button, Row, Col, message } from 'antd';
import { useDispatch } from 'react-redux'
import styles from './index.module.css';
import { getCaptcha, isUserExist, userRegister, userLogin,userInfoById} from '../../api/user';
import { login } from '../../store/userSlice';


function LoginForm(props) {

    //控制当前表单是登录还是注册
    const [value, setValue] = useState(1)
    //改变表单是登录还是注册
    const changeHandle = ({ target: { value } }) => {
        // console.log(value);
        setValue(value);
        onReset()
    }


    //验证码状态
    const [captcha, setCaptcha] = useState('');
    const fetchCaptcha = async () => {
        const result = await getCaptcha();
        setCaptcha(result)
    }
    useEffect(() => {
        onReset();
    }, [props.isShow])


    const formRef = useRef(null);
    const dispatch = useDispatch();
    //提交表单且数据验证成功后回调事件
    const onFinish = async (formData) => {
        // console.log(formData); //表单数据
        if (value === 1) {
            //登录的逻辑
            const result = await userLogin(formData);
            if (result.code === 0) {
                const { data,token } = result.data;
                if (data) {
                    //登录成功，但还有两种情况，账号是否异常
                    if (!data.enabled) {
                        //账号异常被冻结
                        message.warning('账号存在异常被冻结了，请联系上报管理员');
                        fetchCaptcha();
                    } else {
                        //把token存储在locaStorage中
                        localStorage.setItem('token', token);
                        //登录成功，根据i获取用户信息，存储用户信息 (第二参数是用来指定当前登录是用户手动登录)
                        const {data: userInfo} = await userInfoById(data._id,true)
                        dispatch(login(userInfo));
                        message.success('登录成功', 1);
                        props.onCancel();
                    }
                } else {
                    //  未查到用户信息，账号或密码错误
                    message.error('账号或密码错误', 1)
                    fetchCaptcha();
                }
            } else {
                message.error(result.msg, 1);
                fetchCaptcha();
            }

        } else {
            //注册的逻辑
            const result = await userRegister(formData);
            if (result.code === 0) {
                //注册成功，存入用户信息
                message.success('用户注册成功，默认密码为123456', 1)
                dispatch(login(result.data));
                //关闭模态框
                props.onCancel();
            } else {
                //注册失败，弹出错误，重新请求验证码
                message.error(result.msg, 1);
                fetchCaptcha();
            }
        }
    }

    //提交表单且数据验证失败后回调事件
    const onFinishFailed = () => {
        // console.log('失败');
        message.warning('请完完成表单每一项', 1)
    }

    //  重置表单和请求验证码
    const onReset = () => {
        formRef.current?.resetFields();
        fetchCaptcha()
    }

    //重新请求新的验证码
    const captchaClickHandle = () => {
        fetchCaptcha()
    }

    //验证账号名是否已注册存在
    const validateLoginIdExist = async (_, value) => {
        if (!value) return;
        const { data } = await isUserExist(value);
        if (data) {
            //账号已存在
            // message.warning('你输入的账号已存在，请重新填写')
            return Promise.reject('你输入的账号已存在，请重新填写')
        }
    }



    let formContent = '';
    if (value === 1) {
        //  登录表单
        formContent =
            <Form
                name="login"
                labelCol={{
                    span: 4,
                }}
                ref={formRef}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size='large'
            >
                <Form.Item
                    label="登录账号"
                    name="loginId"
                    rules={[{ required: true, message: '账号不能为空，请填写账号' }]}
                >
                    <Input placeholder='请输入你的登录账号' />
                </Form.Item>

                <Form.Item
                    label="登录密码"
                    name="loginPwd"
                    rules={[{ required: true, message: '密码不能为空，请填写密码' }]}
                >
                    <Input.Password placeholder='请输入你的登录密码，新用户默认为123456' autoComplete='off' />
                </Form.Item>
                <Form.Item
                    label="验证码"
                    name="captcha"
                    rules={[{ required: true, message: '验证码不能为空，请填写右侧验证码' }]}
                >
                    <Row align="middle">
                        <Col span={16}>
                            <Input placeholder='请输入验证码' />
                        </Col>
                        <Col span={6}>
                            <div
                                className={styles.captchaImg}
                                onClick={captchaClickHandle}
                                dangerouslySetInnerHTML={{ __html: captcha }}
                            ></div>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4 }}>
                    <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                        登录
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
    } else {
        //注册表单
        formContent = <Form
            name="register"
            labelCol={{
                span: 4,
            }}
            ref={formRef}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size='large'
        >
            <Form.Item
                label="登录账号"
                name="loginId"
                rules={[{ required: true, message: '账号不能为空，请填写账号' }, {
                    validator: validateLoginIdExist
                }]}
                validateTrigger='onBlur'
            >
                <Input placeholder='请输入账号' />
            </Form.Item>
            <Form.Item
                label="用户昵称"
                name="nickname"
            >
                <Input placeholder='请输入昵称，不填写默认为新用户xxx' />
            </Form.Item>

            <Form.Item
                label="验证码"
                name="captcha"
                rules={[{ required: true, message: '验证码不能为空，请填写右侧验证码' }]}
            >
                <Row align="middle">
                    <Col span={16}>
                        <Input placeholder='请输入验证码' />
                    </Col>
                    <Col span={6}>
                        <div
                            className={styles.captchaImg}
                            onClick={captchaClickHandle}
                            dangerouslySetInnerHTML={{ __html: captcha }}
                        ></div>
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4 }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                    注册
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    重置
                </Button>
            </Form.Item>
        </Form>
    }

    return (
        <Modal title="注册/登录" open={props.isShow} onOk={props.onOk} onCancel={props.onCancel} footer={null}>
            <Radio.Group defaultValue={value} onChange={changeHandle} buttonStyle='solid' className={styles.radioGroup} size='large'>
                <Radio.Button value={1} className={styles.radioButton}>登录</Radio.Button>
                <Radio.Button value={2} className={styles.radioButton}>注册</Radio.Button>
            </Radio.Group>
            {/* 登录注册显示部分 */}
            <div className={styles.container}> {formContent}</div>
        </Modal>
    );
}

export default LoginForm;