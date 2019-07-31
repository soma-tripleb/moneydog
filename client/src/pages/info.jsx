import React, {Component} from 'react';
import {Row, Col, Input, Layout, Form, DatePicker, TimePicker, Select, Button, Avatar} from 'antd';

const {Header, Footer, Content} = Layout;
const {Option} = Select;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 12},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
  },
};

import 'antd/dist/antd.less';

class Info extends Component {
  state = {
    text: 'Info Page',
  };

  render() {
    return (
        <>
          <div>
            <h1>{this.state.text}</h1>
          </div>
          <Row>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
              <Layout>
                <Header>
                  <h1 style={{lineHeight: '64px', color: '#fff'}}></h1>
                </Header>

                <Content style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Avatar icon='user' shape='square' style={{
                    width: 100,
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}/>
                  <Input size='large' placeholder='Enter Price'
                         style={{width: '33%', margin: 'auto', marginTop: '1rem'}}/>
                  <Form {...formItemLayout}>
                    <div className='form-flex-container' style={{
                      padding: '1rem',
                      margin: '1rem',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <Col span={12}>
                        <Form.Item label='Name'/>
                        <Form.Item label='Description'/>
                        <Form.Item label='First bill'/>
                        <Form.Item label='Remind me'/>
                        <Form.Item label='Currency'/>
                      </Col>
                      <Col span={12}>
                        <Input placeholder="Enter name" id="name"/>
                        <Input placeholder="Enter description" id="warning"/>
                        <DatePicker style={{width: '100%'}}/>
                        <Input placeholder="I'm the content" id="success"/>
                        <TimePicker style={{width: '100%'}}/>
                        <Select defaultValue="1">
                          <Option value="1">￦</Option>
                          <Option value="2">$</Option>
                        </Select>
                      </Col>
                    </div>
                  </Form>
                </Content>
                <Footer>
                  <Button type="primary" icon="plus" size='large'>Add</Button>
                </Footer>
              </Layout>
            </div>
          </Row>
        </>
    )
  }
}

export default Info;
