import { Component,React } from 'react';
import PubSub from 'pubsub-js';


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
    }
    render() {
        return (
            <></>
        );
    }
}

export default LoadRelations;