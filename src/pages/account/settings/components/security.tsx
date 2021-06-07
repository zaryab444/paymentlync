import React, { Component } from 'react';

import { List, Form , Input , Button , Divider , Row , Col} from 'antd';

import QuickBooksOnline  from "./qb"

class SecurityView extends Component {
  

 public state = {
    showMenulist : true
}


showOtherMenu = () =>{
  this.setState({ showMenulist: false });
  //this.state.showMenulist = false
}
returnToMenu = () => {
  this.setState({ showMenulist: true });
}
  getData = () => [
    {
      title: 'Change Password',
      description: (
        <>
          
        </>
      ),
      actions: [
        <a key="Modify" onClick={this.showOtherMenu}>
        Modify
        </a>,
      ],
    },
    
  ];
 
  handleFinish = () => {

  }

  render() {
    const data = this.getData();
 
    return (
      <React.Fragment>
      
        {this.state.showMenulist && 
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />

            
            </List.Item>
          )}
        />
      }

      {!this.state.showMenulist &&
      
      
      
      <Form
      layout="vertical"
      onFinish={this.handleFinish}


    >
      <Form.Item
        name="password"
        label='Old Password'
        rules={[
          {
            required: true,
            message:  'password is required' ,
          },
        ]}
      >
        <Input.Password type="text" />
      </Form.Item>


      <Form.Item
        name="newpassword"
        label='New Password'
        rules={[
          {
            required: true,
            message:  'New password is required' ,
          },
        ]}
      >
        <Input.Password type="text" />
      </Form.Item>

      <Form.Item
        name="cpassword"
        label='Confirm Password'
        rules={[
          {
            required: true,
            message:  'Confirm password is required' ,
          },
        ]}
      >
        <Input.Password type="text" />
      </Form.Item>

      <Form.Item>
              <Button htmlType="submit" type="primary">
              Update
              </Button>
              <Button style={{marginLeft:'8px'}} onClick={this.returnToMenu} >
              Cancel
              </Button>
            </Form.Item>

      </Form>
      }
        </React.Fragment>
      
    );
  }
}

export default SecurityView;
