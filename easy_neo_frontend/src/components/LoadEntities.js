import { Component, React } from "react";
import PubSub from "pubsub-js";
import { Select, Button, Input, message } from "antd";
import axios from "axios";

const { Option } = Select;
let children = [];

class LoadEntities extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // this.isAuth 是否经过用户验证
    this.isAuth = PubSub.subscribe("isAuth", (msg, data) => {
      this.setState(data);
    });
    this.fileInfo = PubSub.subscribe("fileInfo", (msg, data) => {
      children = [];
      for (let i = 0; i < data.field.length; i++) {
        children.push(<Option key={data.field[i]} />);
      }
    });
  }
  componentWillUnmount() {
    // 保持验证状态，除非刷新页面，否则该状态一直保持
    PubSub.unsubscribe(this.isAuth);
    PubSub.publish("isAuth", { currentUser: this.state.currentUser });
  }

  handleChange = (e) => {
    this.setState({field:e});

  };
  loadEntities = ()=>{
    let a = document.getElementById("nodeType").value;
    this.setState({"nodeType":a},async()=>{
        let req = await axios.post("/backend/addNodes",{"nodeTypes":[this.state.nodeType],"nodeAttributes":[this.state.field]})
        // 导入成功
        console.log(req)
        if(req.statusText==="OK")
        message.success(req.data);
        // 导入失败
        else
        message.warn("创建失败，请重新尝试！")
    })
    
  }
  render() {
    // 若经过用户身份验证
    if (this.state.currentUser && this.state.currentUser !== "UNAUTHORISED")
      return (
        <div>
          请选择您需要的节点类型
          <br />
          <span>
            <b>节点类别选择&nbsp;&nbsp;&nbsp;&nbsp;</b>
             {/* 用户输入需要导入的节点类型 */}
            <Input
              placeholder="请输入想要导入的节点类型"
              id="nodeType"
              style={{ width: 200 }}
            />
          </span>
          <br/>
          {this.state.currentUser}，请选择您需要的数据项作为实体节点的属性
          <br />
          <br />
          <span>
            <b>属性选择&nbsp;&nbsp;&nbsp;&nbsp;</b>
            <Select
              mode="multiple"
              onChange={this.handleChange}
              style={{
                width: 200,
              }}
            >
              {children}
            </Select>
          </span>
          <br />
          <br />
          <Button type="primary" onClick={this.loadEntities}>开始导入</Button>
        </div>
      );
    // 未经过用户身份验证
    else
      return (
        <div>
          <h1>请您先登录再进行实体导入操作！</h1>
        </div>
      );
  }
}

export default LoadEntities;
