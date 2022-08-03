from flask import Flask, request
from py2neo import Graph,Node,Relationship,Subgraph
from flask_cors import CORS
import pandas as pd
from threading import Thread
import json

from config import NEO4J_ACCOUNT, NEO4J_HOST, NEO4J_PASSWD
import config as cfg

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['JSON_AS_ASCII'] = False

df = None
db = None

# 在Neo4j数据库实例中创建节点
def addNodes2Neo(nodeTypes,nodeAttributes):
    # 遍历每种节点

    for i in range(len(nodeTypes)):
        temp = df[nodeAttributes[i]]
        for idx,element in temp.iterrows():
            # 实体属性不定长度，直接用解包做
            tmp = Node(nodeTypes[i],**element)
            db.create(tmp)

# 在Neo4j数据库实例中创建关系
def addRelations2Neo():
    # 此处指代 p -[r]-> q的三元组关系
    # csv文件列名即为对应的实体与关系类型
    pType = df.keys()[0]
    rType = df.keys()[1]
    qType = df.keys()[2]
    relations = []
    for idx,element in df.iterrows():
        p = db.nodes.match(pType).where("_."+pType+"="+"'"+element[0]+"'").first()
        q = db.nodes.match(qType).where("_."+qType+"="+"'"+element[2]+"'").first()
        r = Relationship(p,rType,q)
        relations.append(r)
        # 创建当前事务
        # 或许由于数据质量问题，在知识图谱实例中可能不包含相关的节点
        # 对于此类节点之间的关系直接忽略
        try:
            current_transaction=Subgraph(relationships=[r])
            db.create(current_transaction)
        except:
            continue
    

@app.route('/',methods=['GET','POST'])
def index():
    # 用户验证
    reqData = request.get_json()
    reqUsr = reqData['username']
    reqPasswd = reqData['userpasswd']
    if reqUsr == cfg.USER_NAME and reqPasswd == cfg.USER_PASSWD:
        global db
        db = Graph(NEO4J_HOST, auth=(NEO4J_ACCOUNT, NEO4J_PASSWD))
        return reqUsr
    else:
        return 'UNAUTHORISED'

@app.route('/upLoadFile',methods=['GET','POST'])
def upLoadFile():
    # 此处接收用户上传文件，之后进行知识图谱的操作
    # 由于网络、电路等原因，在上传文件过程中可能会遇到问题
    try:
        reqFile = request.files['reqFile']
        global df
        df = pd.read_csv(reqFile)
        res = json.dumps([key for key in df.keys()])
        return res
    except:
        return "上传错误，请重新上传"

@app.route('/addNodes',methods=['GET','POST'])
def addNodes():
    global df
    
    nodeTypes = request.get_json()["nodeTypes"]
    nodeAttributes = request.get_json()["nodeAttributes"]
    thr = Thread(target=addNodes2Neo,args=[nodeTypes,nodeAttributes])
    thr.start()
    return "创建节点成功"

@app.route('/addRelations',methods=['GET','POST'])
def addRelations():
    global df
    if len(df.keys())!=3:
        return "文件不符合格式要求！请按照三元组的形式上传csv文件！"
    thr = Thread(target=addRelations2Neo)
    thr.start() 
    return "创建关系成功"





if __name__=="__main__":
    app.run(host="0.0.0.0",port="8088",debug=True)




