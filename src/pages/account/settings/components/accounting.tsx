import React, { Component } from 'react';

import { List, Form , Input , Button , Divider , Row , Col} from 'antd';

import QuickBooksOnline  from "./qb"

class Accounting extends Component {
  

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
      title: 'Accounting Package',
      description: (
        <>
        <Divider />
        <Row>
          <Col span={8}>
         <h4  >QuickBooks</h4>
         </Col>   
         <Col span={2} offset={14}>
         <QuickBooksOnline />
         </Col>   
         </Row>
         <Divider />
         <Row>
          <Col span={8}>
         <h4  >FreshBooks</h4>
         </Col>   
         <Col span={2} offset={14}>
         <Button
         style={{marginLeft:'-80px'}}
         type="primary" >Connect To <img 
         
         style={{height:'auto',width:'50px',marginTop:'-4px',marginLeft:'9px'}}
         src="https://staging.clique.center/apps/dashboard/assets/images/freshbook_logo.png"></img></Button>
         </Col>   
         </Row>
        </>
      ),
   
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
            <List.Item>
              <List.Item.Meta title={item.title} description={item.description} />

            
            </List.Item>
          )}
        />
      }


        </React.Fragment>
      
    );
  }
}

export default Accounting;
