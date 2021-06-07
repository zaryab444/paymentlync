import { FormattedMessage, formatMessage } from 'umi';
import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List , Row , Col ,Button,Card , Divider  , Typography , Form , Input , Switch} from 'antd';
import React, { Component, Fragment } from 'react';
import "./membership.css"
import Api from "../../../../services/AllApiService"
import NotificationBar from "../../../../utils/notificationBar"

  






let api = new Api();
let notificationBar = new NotificationBar();

let stripeValues : any;
let worldnetValues : any;
let stripePaymentsettings : any;
let worldnetPaymentsettings : any;

let processorSettingStripe : any;
let processorSettingsWorldNet : any;


function addPaymentProcessor(value : any) {

    if(value.paymentgatewayid == null){
        value.paymentgatewayid = 0;
    }
    
   api
    .SavePaymentProcessor(value)
    .then((response : any) => {
      if(!response.data.statuscode){
    
        notificationBar.openNotification("Success",response.data.statusmessage)
   
      }
      else{
        notificationBar.openNotification("Failed",response.data.statusmessage)
     
      }
     
 
    })
    .catch((err : any) => console.log(err));
}

function updatePaymentProcessor(value : any) {
   api
    .updatePaymentProcessor(value)
    .then((response : any) => {
      if(!response.data.statuscode){
        notificationBar.openNotification("Success",response.data.statusmessage)
      }
      else{
        notificationBar.openNotification("Failed",response.data.statusmessage)
      }
    })
    .catch((err : any) => console.log(err));
}





class PaymentGateway extends Component {
  
   
   public state = {
        PaymentProcessor: [],
        StripeClient : '',
        StripeSecret : '',
        WorldNetClient : '',
        WorldNetSecret : '',
    }



    getPaymentProcessor() {
        api
        .getPaymentProcessor()
        .then((response : any) => {
          if(!response.data.statuscode){
            response.data.response.filter((x : any) => {
                if(x.type == "Stripe"){
                    processorSettingStripe = x
                }
                else{
                    processorSettingsWorldNet = x
                }
            } )
         
            this.setState({ PaymentProcessor: response.data.response });
            this.showCards();
          }
          else{
            notificationBar.openNotification("Failed","Server Error")
          }
         
      
        })
        .catch((err : any) => console.log(err));
    }



    componentDidMount() {
        this.getPaymentProcessor();
      
    }

    showCards(){
        this.state.PaymentProcessor.forEach(element => {
            if(element.type == 'Stripe'){
                stripeValues = element
                stripePaymentsettings = JSON.parse(element.paymentconfiguration)
                this.setState({StripeClient : stripePaymentsettings?.clientkey})
                this.setState({StripeSecret : stripePaymentsettings?.secretkey})
            }
            if(element.type == 'WorldNet'){
                worldnetValues = element
                worldnetPaymentsettings = JSON.parse(element.paymentconfiguration)
                this.setState({WorldNetClient : worldnetPaymentsettings?.clientkey})
                this.setState({WorldNetSecret : worldnetPaymentsettings?.secretkey})
            }
        });
    }

    submitData = (event: any) => {

        console.log(event)

        if(event.hasOwnProperty('stripe')){
         //   let data = stripeValues

           let data = {...stripeValues,...{paymentconfiguration : JSON.stringify({clientkey : this.state.StripeClient, secretkey : this.state.StripeSecret})},...{isdefault : true}}

           // this.addPaymentProcessor()
            if(processorSettingStripe.paymentgatewayid == 0 || processorSettingStripe.paymentgatewayid == null){
                addPaymentProcessor(data)
                
            }else{
                updatePaymentProcessor(
                    {...processorSettingStripe,
                    ...{
                paymentconfiguration : JSON.stringify({clientkey : this.state.StripeClient, secretkey : this.state.StripeSecret})
                    }
                }
                )
            }
   
          
        }
        
        if(event.hasOwnProperty('worldnet')){
           // let data = worldnetValues
           
            let data = {...worldnetValues,...{paymentconfiguration : JSON.stringify({clientkey : this.state.WorldNetClient, secretkey : this.state.WorldNetSecret})},...{isdefault : true}}
            if(processorSettingsWorldNet.paymentgatewayid == 0 || processorSettingsWorldNet.paymentgatewayid == null){
                addPaymentProcessor(data)
            
            }else{
                updatePaymentProcessor(
                    {...processorSettingsWorldNet,
                    ...{
                paymentconfiguration : JSON.stringify({clientkey : this.state.WorldNetClient, secretkey : this.state.WorldNetSecret})
                    }
                }
                )
            }

        }
      
    }

    stripeClientUpdate = (event : any) => {
        this.setState({StripeClient : event.target.value})
             
    }

    stripesecretUpdate = (event : any) => {
        this.setState({StripeSecret : event.target.value})
    }

    worldnetClientUpdate = (event : any) => {
        this.setState({WorldNetClient : event.target.value})
             
    }

    worldnetSecretUpdate = (event : any) => {
        this.setState({WorldNetSecret : event.target.value})
    }


  render() {
    return (
      <Fragment>
     
          <Divider /> 
        
          <section className="paymentgate">
      <Row style={{marginTop:'1%',marginLeft:'1%',marginBottom:'1%',textAlign:'center'}}  gutter={[16, 16]}>
                    
            <Col span={10} lg={10} md={16} xs={20} sm={20}>
                           <Card >
                              <Row>
                                  <Col style={{marginTop:'5%',textAlign:'center'}} span={24}>
                                 <img style={{width:'35%'}} src={processorSettingStripe?.logo}/>
                                  </Col>
                              </Row>
                              <Form
                                  onFinish={this.submitData}
                                  name="StripeForm"
                                  className="login-form"
                              >
                              <Row style={{padding:'15px'}}>
                                  <Col span={24}>
                                      <div style={{display:'flex'}}>
                                          <span style={{width:'100px'}}>Client Key : </span>
                                     
                                          <Input
                                          value={this.state.StripeClient}
                                          onChange={this.stripeClientUpdate}
                                          placeholder="Please Input Value"/>
                                        
                                          </div>

                                    
                                  </Col>
                                  <Col style={{marginTop:'2%'}} span={24}>
                                  <div style={{display:'flex'}}>
                                          <span style={{width:'100px'}}>Secret Key :</span>
                                       
                                          <Input value={this.state.StripeSecret}
                                              onChange={this.stripesecretUpdate}
                                           placeholder="Please Input Value"/>
                                       
                                          </div>

                                      
                                  </Col>
                               

                                  <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked />

                                  <Form.Item name="stripe" style={{display:'none'}}>
                                          <Input value="true" placeholder="Please Input Value"/>
                                          </Form.Item>
                                    
                                       <div style={{width:'100%',textAlign:'center',marginTop:'10px'}}>
                                          <Button type="primary" htmlType={'submit'} > 
  Configure
</Button>
</div>
                              </Row>
                              </Form>
                          </Card>
                      </Col>


{/* asds */}






 <Col span={10} lg={10} md={16} xs={20} sm={20}>
                           <Card >
                              <Row>
                                  <Col style={{marginTop:'5%',textAlign:'center'}} span={24}>
                                 <img style={{width:'60%'}} src={processorSettingsWorldNet?.logo}/>
                                  </Col>
                              </Row>
                              <Form
                                  onFinish={this.submitData}
                                  name="WorldnetForm"
                                  className="login-form"
                              >
                              <Row style={{padding:'15px'}}>
                                  <Col span={24}>
                                      <div style={{display:'flex'}}>
                                          <span style={{width:'100px'}}>Client Key : </span>
                                     
                                          <Input
                                          value={this.state.WorldNetClient}
                                          onChange={this.worldnetClientUpdate}
                                          placeholder="Please Input Value"/>
                                        
                                          </div>

                                    
                                  </Col>
                                  <Col style={{marginTop:'2%'}} span={24}>
                                  <div style={{display:'flex'}}>
                                          <span style={{width:'100px'}}>Secret Key :</span>
                                       
                                          <Input value={this.state.WorldNetSecret}
                                              onChange={this.worldnetSecretUpdate}
                                           placeholder="Please Input Value"/>
                                       
                                          </div>

                                      
                                  </Col>
                               
                                  <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked />


                                  <Form.Item name="worldnet" style={{display:'none'}}>
                                          <Input value="true" placeholder="Please Input Value"/>
                                          </Form.Item>
                                    
                                       <div style={{width:'100%',textAlign:'center',marginTop:'10px'}}>
                                          <Button type="primary" htmlType={'submit'} > 
  Configure
</Button>
</div>
                              </Row>
                              </Form>
                          </Card>
                      </Col>











                  </Row>
                  </section>
      </Fragment>
    );
  }
}

export default PaymentGateway;
