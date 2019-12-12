import React from 'react';
import {Modal,  Input,  Form,} from 'antd';


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="Name">
                {getFieldDecorator('who', {
                  rules: [{ required: true, message: 'Please input the who of collection!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Description">
                {getFieldDecorator('desc', {
                  rules: [{ required: true, message: 'Please input the desc of collection!' }],
                })(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="Type">
                {getFieldDecorator('type', {
                  initialValue: 'Android',
                })(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="Link">
                {getFieldDecorator('url', {
                  initialValue: 'www.baidu.com',
                })(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="Source">
                {getFieldDecorator('source', {
                  initialValue: 'Chrome',
                })(<Input type="textarea" />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );

export default CollectionCreateForm