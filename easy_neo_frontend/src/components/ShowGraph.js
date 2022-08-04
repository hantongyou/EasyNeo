import {React,Component} from "react";
import {Input,Space} from "antd";
import PubSub from "pubsub-js";
import * as NeoVis from "neovis.js"
import config from "../config/graphConfig"

const{Search} = Input


var neoViz;

class ShowGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        this.isAuth = PubSub.subscribe("isAuth", (msg, data) => {
          this.setState(data);
        });
      }
      componentWillUnmount() {
        PubSub.unsubscribe(this.isAuth);
        PubSub.publish("isAuth", this.state);
        
      }
    onSearch = async(e)=>{
               
        neoViz = new NeoVis.NeoVis(config);
        // 替换Cypher语句
        config.initialCypher = e;
        console.log(neoViz)
        neoViz.render();
    }
    render() {
        // 经过用户验证的授权用户
        if(this.state.currentUser && this.state.currentUser!=="UNAUTHORISED")
        return (
            <div style={{height:"100%",width:"100%"}}>
            <h1>
                请输入Cypher语句进行查询，为获得最好的体验，请限制展示数量
            </h1>
            <Search placeholder="MATCH (n)-[r]->(m) RETURN * LIMIT 50" onSearch={this.onSearch} enterButton />
            
            <div id="viz" style={{position:"absolute",height:"100%"}}>

            </div>
            </div>
        )
        else return(
            <div>
                <h1>请您先登录再进行图谱查询操作！</h1>
            </div>
        )
    }
}

export default ShowGraph;