import { Component,React } from 'react';
import PubSub from 'pubsub-js';
import { Button, message } from 'antd';
import axios from 'axios';

class LoadRelations extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount(){
        // this.isAuth 是否经过用户验证
        this.isAuth = PubSub.subscribe("isAuth",(msg,data)=>{
            this.setState(data);
        })
    }
    componentWillUnmount(){
        PubSub.unsubscribe(this.isAuth)
        PubSub.publish("isAuth",{currentUser: this.state.currentUser})
    }
    loadRelations = async() =>{
        let res = await axios.get("/backend/addRelations")
        if(res.statusText==="OK"&& res.data==="创建关系成功")
            message.success(res.data)
        else if(res.statusText==="OK")
            message.warn("请按照（实体A）-[关系r]-（实体B）的形式上传csv文件！")
        else message.warn("导入有误，请检查数据或重新尝试！")
    }
    render() {
        if(this.state.currentUser && this.state.currentUser!=="UNAUTHORISED")
        return (
            <div>
                <h1>关系导入</h1>
                <Button type='primary' onClick={this.loadRelations}>开始关系导入</Button>
            </div>
        )
        else return(
            <div>
                <h1>请您先登录再进行关系导入操作！</h1>
            </div>
        )
    }
}

export default LoadRelations;