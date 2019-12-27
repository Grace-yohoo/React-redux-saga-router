import React, {Component} from 'react';
import { Modal, Form, Input } from 'antd';
import {connect} from 'react-redux';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={true}
          title="创建"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
             <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入名称!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="网址">
                {getFieldDecorator('url')(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="描述">
                {getFieldDecorator('desc',{initialValue:'hello'})(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="类型">
                {getFieldDecorator('source',{initialValue:'web'})(<Input type="textarea" />)}
              </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);


//映射状态
const mapStateToProps = (state) => {
    return {
      tablelistReducer : state.tablelistReducer
    }
}

@connect(mapStateToProps)
class CollectionsPage extends React.Component {
  state = {
    visible: true,
  };


  handleCancel = () => {
    this.props.history.replace('/')
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return ;
      }
      this.props.dispatch({type:'add',data:values,data2:'add'})
      
      form.resetFields();

      this.props.history.replace('/')
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={true}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage