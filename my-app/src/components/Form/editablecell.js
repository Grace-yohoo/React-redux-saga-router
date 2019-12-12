import { Button, Table, Input, InputNumber, Popconfirm, Form, Spin} from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import SearchSet from '../Search/Search'
import CollectionCreateForm from '../AddColumns/addcol'
import {observer, inject} from 'mobx-react'


const EditableContext = React.createContext();

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

//可编辑表格 父组件
@inject('store')
@observer
class EditableTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      editingKey:"",
    };
    const {handleDelete} = this.props.store.home;
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'who',
        editable: true,
      },
      {
        title:'Description',
        dataIndex:'desc',
        width:'30%',
        editable: true,
        ellipsis: true,
      },
      {
        title: 'Type',
        dataIndex: 'type',
      },
      {
        title:'Link',
        dataIndex:'url',
        editable: true,
        render: text => <a href={text} target="_blank">链接</a>,
      },
      {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        width:'15%',
      },
      {
        title: 'Source',
        dataIndex: 'source',
        editable: true,
      },
      {
        title: 'Delete',
        dataIndex: 'Delete',
        render: (text, record) =>
          this.props.store.home.data.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },  
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const  {editingKey,edit,cancel,isEditing,save}= this.props.store.home;
          const editable = isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() =>{
                      save(form, record.key)
                    }}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => {
                  cancel(record.key);
                  this.forceUpdate();
                }}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => {
                edit(record.key);
                this.forceUpdate();
              }}>
              Edit
            </a>
          );
        },
      },
    ];

  }



  componentDidMount(){
  const {store} = this.props;
  console.log(store)
  const {home:{changeData}} = store;
  fetch('http://gank.io/api/today')
    .then(result => result.json())
    .then(result => changeData(result))
    .catch(e => this.setState({ error: e }))
  }
  


  render() {
    const {store} = this.props;

    const {home:{
        data,
        isEditing,
        cancel,
        saveFormRef,
        visible,
        showModal,
        handleCancel,
        handleCreate,
        handleSearch,
        handleReset,
        loading
    }} = store;
    const components = {
      body: {
        cell: EditableCell,
      },
    };
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
          editing: isEditing(record),
        }),
      };
    });
    console.log(loading)
    return (
        <div>
          {data
           ?<div>
            <SearchSet handleSearch= {handleSearch} handleReset = {handleReset}/> 
            <Button  type="primary" onClick={showModal} style={{margin:20}}>
              Add a row
            </Button>
            <CollectionCreateForm
                wrappedComponentRef={saveFormRef}
                visible={visible}
                onCancel={handleCancel}
                onCreate={handleCreate}
            />
            <EditableContext.Provider value={this.props.form}>
                <Table
                style={{margin:20 }}
                components={components}
                bordered
                dataSource={data}
                columns={columns}
                loading={loading}
                rowClassName="editable-row"
                pagination={{
                onChange:cancel,
                }}
                rowKey= {data => data.key}
                />
            </EditableContext.Provider>
      </div>
      :<Spin style={{ marginLeft:500, marginTop:500}} />}
    </div>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

//导出的组件
class Editable extends React.Component {
    render(){
        return <EditableFormTable />
    }

}

export default Editable