
import React, {Component} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Spin, Button } from 'antd';
import 'antd/dist/antd.css';
import Myinput from '../Input/Input'
import {connect} from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router-dom';


const EditableContext = React.createContext();

//修改类
class EditableCell extends React.Component {
    getInput = () => {
      if (this.props.inputType === 'number') {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    renderCell = ({ getFieldDecorator }) => {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ],
                initialValue: record[dataIndex],
              })(this.getInput())}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
  
    render() {

      return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

//映射状态
const mapStateToProps = (state) => {
    return {
      tablelistReducer : state.tablelistReducer
    }
}


//注入props
@connect(mapStateToProps)
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      editingKey: '',
      visible: false, 
      loading: false,
    };
    
    const {tablelistReducer:{data}} = this.props;

    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '类型',
        dataIndex: 'source',
        editable: true,
      },
      {
        title: '网址',
        dataIndex: 'url',
        render :text => <a href={text} target='_blank'>链接</a>
        
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
      },
      {
        title: '内容',
        width: '25%',
        dataIndex: 'desc',
        editable: true,
      },
      {
        title: '修改',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确定要取消吗?" onConfirm={() => this.cancel(record.key)}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              修改
            </a>
          );
        },
      },
      {
        title: '删除',
        dataIndex: 'delete',
        render: (text, record) =>
          data.length >= 0 ? (
            <Popconfirm title="你确定要删除吗？" onConfirm={() => this.handleDelete(record.key)}>
              <a>删除</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.handleDelete = this.handleDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
    this.handSearch = this.handSearch.bind(this);
    this.handReset = this.handReset.bind(this);



  }
  
  //是否编辑
  isEditing = record => record.key === this.state.editingKey;
  
  //删除
  handleDelete = key => {
     console.log(key)
     this.setState({loading:true})
     this.props.dispatch({type:'del',key})
     setTimeout(()=> {
      this.setState({loading:false})

     },300)

  };

  //取消修改
  cancel = (props) => {
    this.setState({ editingKey: '' });
  };
  
  //修改方法
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return ;
      } 
      // const newData = [...this.data];
      const newData = this.props.tablelistReducer.data
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        row.key = key
        this.setState({ loading: true }) 
        this.setState({ editingKey: '' }) 
        setTimeout(() => {
            this.props.dispatch({type:'sav',row})  
            this.setState({ loading: false }) 
        }, 1000);
        

      } else {
        newData.push(row);
        console.log(row)
        this.data = newData
        this.setState({ editingKey: '' }) 
      }
    });
    
  }

  //编辑
  edit(key) {
    this.setState({ editingKey: key });
  }

  //添加方法
  handleCancel = () => {
    this.setState({ visible: false });
  };

  //新增
  handleCreate = () => {
    const { form } = this.formRef.props;
    const {tablelistReducer:{data}} = this.props
    this.setState({loading:true})
   
    form.validateFields((err, values) => {
      this.setState({visible: false });
      if (err) {
        this.setState({visible: true });
        return ;
      }
      form.resetFields();

      this.props.dispatch({type:'add',values})
     
    });
    setTimeout(()=> {
      this.setState({loading:false})
     },300)
   
  };

  //显示模态框
  showModal = () => {
    this.setState({ visible: true });
  };
  
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  //搜索方法
  handSearch(value){
    this.setState({loading:true})
    this.props.dispatch({type:'sear',value})
    setTimeout(()=> {
      this.setState({loading:false})
     },300)
  }

  //重置方法
  handReset(){
    this.setState({loading:true})
    this.props.dispatch({type:'feh'}) 
    setTimeout(()=> {
      this.setState({loading:false})
     },300)
  }

  //生命周期  加载后
  componentDidMount(){
    this.props.dispatch({type:'feh'})
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const {tablelistReducer:{data}} = this.props;

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <div>
        { data
          ?<div>

              <Myinput handSearch={this.handSearch} handReset={this.handReset}></Myinput>
              <Switch>
                  <Route exact path="/" component = {addbutton}/>           
              </Switch>
              <EditableContext.Provider value={this.props.form}>
                            <Table
                              components={components}
                              bordered
                              dataSource={data}
                              loading = {this.state.loading}
                              columns={columns}
                              rowClassName="editable-row"
                              pagination={{
                              onChange: this.cancel,
                              }}
                              rowKey={(data)=>data.key}
                            />
              </EditableContext.Provider>                          
                
            </div>
          : <Spin style={{marginLeft:'900px',marginTop:'200px'}} tip="加载中..." size='large'/>
        }


      </div>
      
    );
  }
}
      
const addbutton =function(props){
    //点击事件,跳转至Myinfo页面
    const aclick = ()=>{
      props.history.replace('/myinfo')
    }

  return(
    <div>
      <Button onClick = {aclick} style={{background:'#1890ff',color:'#fff',marginTop:"30px",marginBottom:"10px"}}>创建</Button>
    </div>
  )

}

const EditableFormTable = Form.create()(EditableTable);

//导出Mytable
class Mytable extends Component{ 
    render(){
        return <EditableFormTable />
    }
}



export default Mytable;