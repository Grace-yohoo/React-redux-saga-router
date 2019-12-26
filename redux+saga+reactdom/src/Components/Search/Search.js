import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import 'antd/dist/antd.css';

/** 
 * 搜索
 */

class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };
  getFields() {
    const count = this.state.expand ? 4 : 2; 
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={`name ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }
  
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} >
        <Row gutter={24} >{this.getFields()}</Row>
        <Row style={{marginTop:"100px"}}>
          <Col span={24} style={{textAlign: "right", marginTop:"-60px"}} >
            <Button type="primary" htmlType="submit" >
              搜索
            </Button>
            <Button style={{ marginLeft: 8  }} onClick={this.handleReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);


class Mysearch extends React.Component{
    render(){
        return <WrappedAdvancedSearchForm />
    }
}
export default Mysearch;