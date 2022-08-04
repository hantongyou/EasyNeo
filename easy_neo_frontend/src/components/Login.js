import { Component,React } from 'react';
import { UserOutlined} from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import axios from "axios"
import PubSub from 'pubsub-js'

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {currentUser:"UNAUTHORISED"};
        
    }
    // 登录
    login =async()=>{
        let username = document.getElementById("username").value;
        let passwd = document.getElementById("userpasswd").value;
        let tmp = {"username": username,"userpasswd":passwd}
        let sendData = JSON.stringify(tmp);
        sendData = JSON.parse(sendData);
        // 登录验证，登录成功则保留状态
        let res = await axios.post("/backend",sendData);
        // 当验证成功即为username，验证失败则为UNAUTHORISED
        // this.setState({currentUser:res.data})
        PubSub.publish("isAuth",{currentUser:res.data});
        if(res.data !== "UNAUTHORISED")
        message.success("登陆成功")
        else
        message.warning("登录失败！请检查您的用户名和密码！")
        
    }
    componentDidMount(){
        this.isAuth = PubSub.subscribe("isAuth",(msg,data)=>{
            this.setState(data)    
        })
        
    }
    componentWillUnmount(){
        // 取消订阅
        PubSub.unsubscribe(this.isAuth)
        PubSub.publish("isAuth",this.state)
    }
    // shouldComponentUpdate(){

    // }
    render() {
        if(!this.state.currentUser || this.state.currentUser==="UNAUTHORISED")
        return (
            <div>
                <br/><br/>
                <Input id='username' size="large" placeholder="输入您的账号" prefix={<UserOutlined />} style={{width:"50%",marginLeft:"25%"}}/>
                <br/><br/>
                <Input.Password id='userpasswd' placeholder="输入您的密码" style={{width:"50%",marginLeft:"25%"}}/>
                <br/><br/>
                <Button type="primary" style={{marginLeft:"47.5%"}} onClick={this.login}>登录</Button>
            </div>
        );
        else return(<>
            <h1>欢迎登陆！ {this.state.currentUser}</h1>
        </>)
    }
}

export default Login;