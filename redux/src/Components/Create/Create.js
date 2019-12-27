/**    
 * 添加，创建
 */
import React from 'react';
import { Input, Form, Modal } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="创建"
            okText="创建"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="描述">
                {getFieldDecorator('desc',{initialValue:'hello'})(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="网址">
                {getFieldDecorator('url',{initialValue:'https://www.baidu.com/'})(<Input type="textarea" />)}
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

  export default CollectionCreateForm;