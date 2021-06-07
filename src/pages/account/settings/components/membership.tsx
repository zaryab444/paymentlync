import { FormattedMessage, formatMessage } from 'umi';
import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List , Row , Col , Card , Button , Divider  , Typography } from 'antd';
import React, { Component, Fragment } from 'react';
import "./membership.css"



const dataFree = [
  '20 Monthly Credits.',
  'Limited Access.',
  'limited reports and functionality.',

];

const dataPremium = [
  '60 Monthly Credits.',
  'Unlimited Access.',
  'Dertailed reports and functionality.',

];



class Membership extends Component {
  


  render() {
    return (
      <Fragment>
      <Row gutter={[16, 24]}>
        <Col  span={12}>
        <Card  className="membershipContent">
          <div  >
        <h2> Basic </h2>
        <h3>Free</h3>
        <Button>Switch to Basics</Button>
        </div>
        <Divider />

        <List
    
      dataSource={dataFree}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />


        </Card>
        </Col>
   
        <Col  span={12}>
        <Card  className="membershipContent">
          <div>
        <h2> Premium </h2>
        <h3>$10.00 / month</h3>
        <span>This is your current plan</span>
        </div>
        <Divider />
        

        <List

      dataSource={dataPremium}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />

   
    <br />
    <small><b>Sales Tax Applies</b></small >
    
        </Card>
        </Col>
     
      </Row>
      </Fragment>
    );
  }
}

export default Membership;
