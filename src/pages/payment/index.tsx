import React, { useState , Fragment } from 'react';
import 'antd/dist/antd.css';

import {Row,Col,Card,Divider,Input,Button,Typography,Form,notification,Modal} from 'antd';
import { useHistory } from "react-router";

import TextField from '@material-ui/core/TextField';


import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from "./stripe2/CheckoutForm";
import "./payment.css"
import Api from "../../services/AllApiService"
import queryString from 'query-string';


var stripePromise = loadStripe('pk_test_Ww9g5f0352hp6y8fNsh5m3HN');


const { confirm } = Modal;

var activeDiv = "classA"
let api = new Api();
function Payment() {


    let params = queryString.parse(location.search)
    const [paymentdata , setPaymentData] = useState()

    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const history = useHistory();
    const Text=Typography;

    function getPaymentData(){
          api
          .PaymentData(params.id)
          .then((response : any) => {
            if(!response.data.StatusCode){
                setPaymentData(response.data.response[0])
            }
          
          })
          .catch((err : any) => console.log(err));
        }
        


    React.useEffect(() => {
        getPaymentData();
      }, []);

    
    const [cardholder, setHolder] = useState('');
    const [cardnumber, setNumber] = useState('');
    const [cardmonth, setMonth] = useState('');
    const [cardyear, setYear] = useState('');
    const [cardcvv, setCVV] = useState('');

function payNow(){
    console.log(paymentdata)
    console.log(cardholder)
    let obj = {  
  "companyID": paymentdata.companyid,  
  "customerID":paymentdata.customerid,
  "amount": paymentdata.amount,
  "CreditCardInfo": 
  {
  "cardNumber":cardnumber,
  "zipCode": "12345",
  "address1": paymentdata.companyaddress1,  
  "cardHolderName": cardholder,
  "expDate": cardmonth+cardyear,
  "CreditCardType":"MasterCard"
},
  "last4Digit": null,
  "docId": "",
  "merchantName": "Test WorldNet",
  "cardType": null,
  "orderID": params.id,
  "RefNumber":params.id,
  "DocumentNo":"",
  "IsProfileSave":false
}


paynowAPI(obj)

}


function paynowAPI(data){
        
    api
    .cardPayment(data)
    .then((response : any) => {
      if(!response.data.StatusCode){
          if(response.data.response.statuscode){
            classC.classList.add("slideupdecline");
            classB.classList.add("slideuptwice");
          }
          else{
            classD.classList.add("slideupapprove");
            classB.classList.add("slideuptwice");
          }
         
      }
    
    })
    .catch((err : any) => console.log(err));
} 



    return (

        <Fragment>
     
          <Row style={{marginTop:'5%'}}>
              <Col span={8} lg={8} md={4} xs={2} sm={2}></Col>
              <Col span={8} lg={8} md={16} xs={20} sm={20}>
              {(paymentdata) && 
              <section class="paymentPage">
                  <Card style={{height:'90vh'}} hoverable>
    
                  <div className="classA" id="classA">
                      <Row style={{borderBottom:'1px solid lightgray',paddingBottom:'2%'}}>
                          <Col  span={24}>
                              <img alt="not Found" 
                style={{display:'block',marginLeft:'auto',marginRight:'auto',width:'100px',height:'100px'}} 
                src={paymentdata.logo}/>
                          </Col>
                          <Col style={{textAlign:'center',marginTop:'2%',fontSize:'16px'}} span={24}>
                              <b>{paymentdata.companyaddress1} , {paymentdata.state}<br />
                              {paymentdata.city} <br />
                              {paymentdata.zip}<br />
                               {paymentdata.country} </b>
                          </Col>
                          <Col style={{textAlign:'center',marginTop:'2%',fontSize:'24px'}} span={24}>
                              <b>$ {paymentdata.amount.toFixed(2)} </b>
                          </Col>
                          {/* <Col style={{textAlign:'center',marginTop:'2%',fontSize:'16px'}} span={24}>
                              <p>Requested on {monthNames[new Date().getMonth()]} {new Date().getDate()},{new Date().getFullYear()}</p>
                          </Col> */}
                      </Row>
                      <PaymentLine name={"Bill to"} value={paymentdata.customername}/>
                      <PaymentLine name={"Design"} value={paymentdata.amount.toFixed(2)}/>
                      <PaymentLine name={"Total Due"} value={paymentdata.amount.toFixed(2)}/>
                      <Row style={{marginBottom:'5%'}}>
                          <Col style={{textAlign:'center',marginTop:'5%'}} span={24}>
                              <Button style={{width:'90%'}} type={'primary'}
                             onClick={firstDiv}
                              
                              >PAY WITH CARD</Button>
                          </Col>
                      </Row>
    
                      </div>
    
                      <div  className="classB" id="classB">

                      <h1 className="center">
        <span className="text-muted">Pay with card</span>
      </h1>
    <Form>
         <TextField id="standard-basic" label="Card Holder Name" 
         value={cardholder}
         onChange={e => setHolder(e.target.value)} 
         />
         <TextField id="standard-basic" label="Card Number" 
          value={cardnumber}
          inputProps={{ min: 16, max: 16 }}
         onChange={e => setNumber(e.target.value)} 
         />
         <TextField id="standard-basic" label="Expiry Month" 
          value={cardmonth}
         onChange={e => setMonth(e.target.value)} 
         />
         <TextField id="standard-basic" label="Expiry Year" 
          value={cardyear}
         onChange={e => setYear(e.target.value)} 
         />
         <TextField id="standard-basic" label="CVV" 
          value={cardcvv}
         onChange={e => setCVV(e.target.value)} 
         />

<Button style={{width:'90%',marginTop:'15px'}}
 type={'primary'}
 onClick={payNow}>PAY NOW</Button>
</Form>
                     
          </div>

          <div  className="classC" id="classC">
    <img src="https://static.thenounproject.com/png/1589735-200.png" className="declineImg"></img>
    <h1 className="warning">Payment Declined</h1>
    <div onClick={showPaymentCard}>
    <img src="https://cdn.onlinewebfonts.com/svg/img_106832.png" className="retryImg"></img>
    
    <br />
    <h3>Click here to Retry</h3>
    </div>
</div>


<div  className="classD" id="classD">
    <img src="https://cdn2.iconfinder.com/data/icons/project-management-8/500/Approval-2-512.png" className="declineImg"></img>
    <h1 className="success">Payment Approved</h1>
</div>
    
        
    
                  </Card>
                  </section>
}
              </Col>
              <Col span={8} lg={8} md={4} xs={2} sm={2}></Col>
          </Row>
     
          </Fragment>
    
    
           
      );
    
    
    
      function firstDiv()
      {
    
    
        var classA = document.getElementById("classA");
        
        var classB = document.getElementById("classB");
        classA.classList.add("slideUp");
        classB.classList.add("slideUpfromDown");
    
    
      };  
      

      function showPaymentCard(){
        var classB = document.getElementById("classB");
        var classC = document.getElementById("classC");
     
        classB.classList.remove("slideuptwice");
        classC.classList.remove("slideupdecline");


      }
    
    
    
      }
    
    
    const PaymentLine=({name,value})=>{
      return(
          <div style={{borderBottom:'1px solid lightgray',padding:'4%'}}>
              <Row>
                  <Col span={12}>
                      {name}
                  </Col>
                  <Col style={{textAlign:'right'}} span={12}>
                      {value}
                  </Col>
              </Row>
          </div>
      );
    };
    
    
    
    
    
    
    
    
    export default Payment;
    