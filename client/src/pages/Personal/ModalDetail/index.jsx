import React, { useState, useRef } from 'react';
import { Button,  Form, Input, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { checkPasswordIsRight } from '../../../api/user';
import { updateUserInfoAsync } from '../../../store/userSlice';

function ModalDetail(props) {

    const formRef = useRef(null);
    const [passwordInfo, setPasswordInfo] = useState({
        oldpassword: "",
        newpassword: "",
        passwordConfirm: "",
    })
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const finishHandle = (data) => {
        console.log('成功', data);
        if (props.panelName === '基本信息') {
            if(!data.nickname.trim()){
                message.warning('昵称不能为空');
                return;
            }
        }
        dispatch(updateUserInfoAsync({
            userId:userInfo._id,
            newUserInfo:data,
        }))
        message.success(`${props.panelName}更新成功`);
        props.onOk();
    }


    //检查旧密码是否正确
    const checkPassword = async (_, value) => {
        //_是当前项的对象信息，value是输入框的值
        // console.log('检查旧密码是否正确');
        if (!value) {
            return;
        }
        const { data } = await checkPasswordIsRight({
            userId: userInfo._id,
            loginPwd: value
        })
        if (!data) {
            return Promise.reject('旧密码不正确')
        }

    }

    //检查新密码是否符合验证规则
    const checkNewPassword = (_, value) => {
        // console.log('检查新密码是否符合验证规则');
        if (!value) {
            return Promise.resolve();
        }
        if (value.length < 6) {
            return Promise.reject('密码长度必须大于或等于6位数')
        }
        let reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/;
        if (!reg.test(value)) {
            return Promise.reject('密码必须包含字母，数字或字符中的两种')
        }

    }

    const updatePasswordInfo = (value, key) => {
        setPasswordInfo(preState => ({
            ...preState,
            [key]: value
        }))
    }

    const updateInfo = (value,key) =>{
        // console.log(value,key);
    }

    //  重置
    const onReset = () => {
        formRef.current?.resetFields();
    }
    return (
        <>
            {props.panelName === '基本信息' ?
                //  基本信息板块
                <Form
                    name="basic1"
                    autoComplete="off"
                    //昵称回填的必须属性
                    initialValues={userInfo}
                    ref={formRef}
                    onFinish={finishHandle}
                >
                    {/* 登录密码 */}
                    <Form.Item
                        label="旧密码"
                        name="oldpassword"
                        rules={[
                            {
                                validator: checkPassword
                            }
                        ]}
                        validateTrigger='onBlur'
                    >
                        <Input.Password
                            rows={6}
                            value={passwordInfo.oldpassword}
                            autoComplete="off"
                            placeholder="如果要修改密码，请先输入旧密码"
                            onChange={(e) => updatePasswordInfo(e.target.value, 'oldpassword')}
                        />
                    </Form.Item>

                    {/* 新的登录密码 */}
                    <Form.Item
                        label="新密码"
                        name="newpassword"
                        rules={[
                            {
                                validator: checkNewPassword
                            }
                        ]}
                        validateTrigger='onBlur'
                    >
                        <Input.Password
                            rows={6}
                            value={passwordInfo.newpassword}
                            placeholder="请输入新密码(必须包含字母，数字或字符中的两种)"
                            autoComplete="off"
                            onChange={(e) => updatePasswordInfo(e.target.value, 'newpassword')}
                        />
                    </Form.Item>

                    {/* 确认密码 */}
                    <Form.Item
                        label="确认密码"
                        name="passwordConfirm"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newpassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次密码不一致'));
                                },
                            }),
                        ]}
                        validateTrigger='onBlur'
                    >
                        <Input.Password
                            rows={6}
                            placeholder="请确认密码"
                            autoComplete="off"
                            value={passwordInfo.passwordConfirm}
                            onChange={(e) => updatePasswordInfo(e.target.value, 'passwordConfirm')}
                        />
                    </Form.Item>

                    {/* 用户昵称 */}
                    <Form.Item
                        label="用户昵称"
                        name="nickname"
                    >
                        <Input
                            placeholder="昵称可选，默认为新用户"
                            value={userInfo.nickname}
                        onBlur={(e) => updateInfo(e.target.value, 'nickname')}
                        />
                    </Form.Item>

                    {/* 确认修改按钮 */}
                    <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                            确认
                        </Button>

                        <Button htmlType="button" onClick={onReset}>
                            重置
                        </Button>
                    </Form.Item>
                </Form> : props.panelName === '社交账号' ?
                    // 社交账号板块
                    <Form
                        name="basic2"
                        initialValues={userInfo}
                        autoComplete="off"
                        onFinish={finishHandle}
                    >
                        <Form.Item
                            label="邮箱"
                            name="mail"
                        >
                            <Input
                                value={userInfo.mail}
                                placeholder="请填写邮箱"
                            />
                        </Form.Item>
                        <Form.Item
                            label="QQ号"
                            name="qq"
                        >
                            <Input
                                value={userInfo.qq}
                                placeholder="请填写 QQ 号"
                            />
                        </Form.Item>
                        <Form.Item
                            label="微信"
                            name="wechat"
                        >
                            <Input
                                value={userInfo.wechat}
                                placeholder="请填写微信号"
                            />
                        </Form.Item>
                        <Form.Item
                            label="github"
                            name="github"
                        >
                            <Input
                                value={userInfo.github}
                                placeholder="请填写 github "
                            />
                        </Form.Item>

                        {/* 确认修改按钮 */}
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                确认
                            </Button>
                        </Form.Item>
                    </Form> :
                    //个人简介板块
                    <Form
                        name="basic3"
                        initialValues={userInfo}
                        autoComplete="off"
                        onFinish={finishHandle}
                    >
                        {/* 自我介绍 */}
                        <Form.Item
                            label="自我介绍"
                            name="intro"
                        >
                            <Input.TextArea
                                rows={6}
                                value={userInfo.intro}
                                placeholder="选填"
                            />
                        </Form.Item>

                        {/* 确认修改按钮 */}
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                确认
                            </Button>
                        </Form.Item>
                    </Form>}
        </>
    );
}

export default ModalDetail;