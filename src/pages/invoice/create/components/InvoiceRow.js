import React from 'react';
import { Button,Form} from 'antd';
import 'antd/dist/antd.css';
import { Row,Col,Input} from 'antd';

const {TextArea}=Input;
const InvoiceRow = (props) => {
    const object=Object.assign(props);
    return (
      <div>
        <Row style={{marginBottom:0}}>
            <Col span={24}>
                <Form.Item style={{ marginBottom: 0}}>
                    <Form.Item
                      style={{ display: 'inline-block', width: 'calc(40% - 8px)' }}
                    >
                     <TextArea onChange={event => {object.description=event.target.value;console.log(object)}}  placeholder={"Enter item name/description"} bordered={false}></TextArea>
                    </Form.Item>
                    <Form.Item
                      style={{ display: 'inline-block', width: 'calc(20% - 8px)', margin: '0 8px' }}
                    >
                      <Input bordered={false} style={{fontWeight:"600",marginTop:'3%',textAlign:'center'}} defaultValue={0} />
                    </Form.Item>
                    <Form.Item
                      style={{ display: 'inline-block', width: 'calc(15% - 8px)', margin: '0 8px' }}
                    >
                      <Input bordered={false} style={{fontWeight:"600",marginTop:'3%',textAlign:'center'}} defaultValue={0} />
                    </Form.Item>
                    <Form.Item
                      style={{ display: 'inline-block', width: 'calc(20% - 10px)', margin: '0 8px' }}
                    >
                      <Input bordered={false} style={{fontWeight:"600",marginTop:'3%',textAlign:'center',paddingLeft:'20.5%'}} defaultValue={0} />
                    </Form.Item>
                    <Form.Item
                    style={{display:'inline-block',marginTop:'.7%'}}>
                        <Button onClick={event => {props.handleClick(event)}} danger>X</Button>
                    </Form.Item>
                </Form.Item>
            </Col>
        </Row>
        <Divider />
      </div>
    );
};

export default InvoiceRow;
