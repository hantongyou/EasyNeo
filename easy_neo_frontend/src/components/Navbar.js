import 'antd/dist/antd.css';
import { Button,Avatar,Space} from 'antd';
import { UserOutlined,CaretDownOutlined} from '@ant-design/icons';
import { Component,React } from 'react';
import { Link, BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import PubSub from 'pubsub-js';

import Login from './Login';
import UploadFile from './UploadFile';
import LoadEntities from './LoadEntities';
import LoadRelations from './LoadRelations';

import '../style/main.css'
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {currentUser:"UNAUTHORISED"};
    }
    componentDidMount(){
        this.isAuth = PubSub.subscribe("isAuth",(msg,data)=>{
            this.setState(data);
        })
    }
    componentWillUnmount(){
        //取消订阅
        PubSub.unsubscribe(this.isAuth);
    }
    userQuit = ()=>{
        PubSub.publish("isAuth",{currentUser:"UNAUTHORISED"})
    }

    render() {
        
        return (
            <div>
            <div style={{ float: 'right' }}>
                            <Avatar size='large' icon={<UserOutlined />} />&nbsp;&nbsp;
                            <Space onChange={this.changeUser}>
                               {this.state.currentUser}
                            </Space>
                            <CaretDownOutlined/>&nbsp;&nbsp;
                            <Button type='text' onClick={this.userQuit}>注销</Button>
                        </div>
                        <br/><br/>
            <div style={{margin:"15px"}}>
            <BrowserRouter>
                <Link to={"/Login"}><Button type='default' shape="rectangle" className='NavCell'>登录</Button></Link>
                <Link to={"/UploadFile"}><Button type='default' shape="rectangle" className='NavCell'>上传文件</Button></Link>
                <Link to={"/LoadEntities"}><Button type='default' shape="rectangle" className='NavCell'>实体导入</Button></Link>
                <Link to={"/LoadRelations"}><Button type='default' shape="rectangle" className='NavCell'>关系导入</Button></Link>
            
            <Routes>
                <Route path='/Login' element={<Login/>}/>
                <Route path='/UploadFile' element={<UploadFile/>}/>
                <Route path='/LoadEntities' element={<LoadEntities/>}/>
                <Route path='/LoadRelations' element={<LoadRelations/>}/>
                <Route path='/'  element={<Navigate to="/Login"/>} />
            </Routes>
            </BrowserRouter>
            </div>
            
            </div>
        );
    }
}

export default Navbar;