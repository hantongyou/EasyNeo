import { Component, React } from "react";
import PubSub from "pubsub-js";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

  onChange(info) {
    const { status } = info.file;

    if (status !== "uploading") {
      // console.log(info.file, info.fileList);
    }

    if (status === "done") {
      message.success(`${info.file.name}文件上传成功`);
      PubSub.publish("fileInfo",{
        //数据字段
        field:info.file.response
    })
    } else if (status === "error") {
      message.error(`${info.file.name} 文件上传失败`);
    }
  },

  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  checkData = (fileInfo) =>{

    PubSub.publish("fileInfo",{
        //数据字段
        field:fileInfo.file.response
    })
  }
  render() {
    if (this.state.currentUser && this.state.currentUser !== "UNAUTHORISED")
      return (
        <div>
          <h1>您好，{this.state.currentUser}，请上传文件</h1>
          <br />
          <br />
          <Dragger {...props} name="reqFile" action="/backend/upLoadFile" maxCount={1}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或者拖动进行文件上传</p>
            <p className="ant-upload-hint">
              上传定义实体或者关系的csv文件，随后会自动解析数据项
            </p>
          </Dragger>
        </div>
      );
    else
      return (
        <div>
          <h1>请您先登录再进行文件上传操作！</h1>
        </div>
      );
  }
}

export default UploadFile;
