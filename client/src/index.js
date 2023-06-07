import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


//引入路由
import { BrowserRouter as Router } from 'react-router-dom';


//引入andt组件库
// import 'antd/dist/reset.css';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';


//引入redux
import { Provider } from 'react-redux';
import store from './store'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <App />
            </ConfigProvider>
        </Provider>
    </Router>

)