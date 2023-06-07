import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card, Upload, Image, Modal, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { updateUserInfoAsync } from "../../store/userSlice";
import { formatDate } from "../../utils/tools"
import styles from './index.module.css'
import PageHeader from "../../components/PageHeader"
import ItemForm from "./ItemForm"
import ModalDetail from "./ModalDetail"


function Personal(props) {

    const {userInfo} = useSelector(state=>state.user);

    const dispatch = useDispatch();
    const handleAvatar = (newUrl,key)=>{
            dispatch(updateUserInfoAsync({
                userId:userInfo._id,
                newUserInfo:{
                    [key]:newUrl
                }
            }))
            message.success('头像更新成功')
    }



    const [ panelName,setPanelName] =useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (name) => {
        setPanelName(name);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <PageHeader title="个人中心" />
            {/* 信息展示 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <Card title="基本信息"
                        extra={<div className={styles.edit} onClick={() => showModal("基本信息")}>编辑</div>}
                    >
                        <ItemForm info={{
                            itemName: "登录账号",
                            itemValue: userInfo.loginId,
                        }} />
                        <ItemForm info={{
                            itemName: "账号密码",
                            itemValue: "************",
                        }} />
                        <ItemForm info={{
                            itemName: "用户昵称",
                            itemValue: userInfo.nickname,
                        }} />
                        <ItemForm info={{
                            itemName: "用户积分",
                            itemValue: userInfo.points,
                        }} />
                        <ItemForm info={{
                            itemName: "注册时间",
                            itemValue: formatDate(userInfo.registerDate),
                        }} />
                        <ItemForm info={{
                            itemName: "上次登录时间",
                            itemValue: formatDate(userInfo.lastLoginDate),
                        }} />
                        <div style={{ fontWeight: 100, height: 50,lineHeight:'50px' }}>当前头像：</div>
                        <Image src={userInfo.avatar} width={100} />
                        <div style={{ fontWeight: 100, height: 50,lineHeight:'50px' }}>上传新头像：</div>
                        <Upload
                            action="/api/upload"
                            listType="picture-card"
                            maxCount={1}
                            onChange={(e) => {
                                if (e.file.status === 'done') {
                                    // 说明上传已经完成
                                    const url = e.file.response.data;
                                    handleAvatar(url, 'avatar');
                                }
                            }}
                        >
                            <PlusOutlined />
                        </Upload>
                    </Card>
                </div>
                <div className={styles.row}>
                    <Card title="社交账号"
                        extra={<div className={styles.edit} onClick={() => showModal("社交账号")}>编辑</div>}
                    >
                        <ItemForm info={{
                            itemName: "邮箱",
                            itemValue: userInfo.mail ? userInfo.mail : "未填写",
                        }} />
                        <ItemForm info={{
                            itemName: "QQ号",
                            itemValue: userInfo.qq ? userInfo.qq : "未填写",
                        }} />
                        <ItemForm info={{
                            itemName: "微信号",
                            itemValue: userInfo.wechat ? userInfo.wechat : "未填写",
                        }} />
                        <ItemForm info={{
                            itemName: "github",
                            itemValue: userInfo.github ? userInfo.github : "未填写",
                        }} />

                    </Card>
                </div>
                <div className={styles.row}>
                    <Card title="个人简介"
                        extra={<div className={styles.edit} onClick={() => showModal("个人简介")}>编辑</div>}
                    >
                        <p className={styles.intro}>
                            {userInfo.intro ? userInfo.intro : "未填写"}
                        </p>
                    </Card>
                </div>
            </div>
            {/* 修改信息对话框 */}
            <Modal
                title={panelName}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                <ModalDetail  panelName={panelName} onOk={handleOk}/>
            </Modal>
        </>
    );
}

export default Personal;