import React, { useState } from 'react';
import {
  useStripe, useElements,
  CardNumberElement, CardExpiryElement, CardCvcElement
} from '@stripe/react-stripe-js';
import { stripePaymentMethodHandler } from './script';

import './index.css';

import {Button} from 'antd';

const CARD_ELEMENT_OPTIONS = {
  style: {
    
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
        
      },
     
      
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
 
    
  },
};

export default function CheckoutForm(props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {


    var classA = document.getElementById("classA");
    

    // classA.classList.add("slideUp");
    // classB.classList.add("slideUpfromDown");

   
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const paymentMethodObj = {
      type: 'card',
      card: elements.getElement(CardNumberElement),
  
    };
    const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);

    stripePaymentMethodHandler({
      result: paymentMethodResult,
      amount: props.amount
    }, handleResponse);
  };

  // callback method to handle the response
  const handleResponse = response => {

    var classB = document.getElementById("classB");
    var classC = document.getElementById("classC");
    var classD = document.getElementById("classD");
    setLoading(false);
    if (response.error) {
      classC.classList.add("slideupdecline");
      classB.classList.add("slideuptwice");
    
      setErrorMsg(typeof response.error === 'string' ? response.error : response.error.message);
    
    }
    if (response.success == true){
      setLoading(true);
      classD.classList.add("slideupapprove");
      classB.classList.add("slideuptwice");

    }
    
  };

  return (
    <React.Fragment>
      
      <h1 className="center">
        <span className="text-muted">Pay with card</span>
      </h1>
      
      <hr className="mb-4" />
      <form onSubmit={handleSubmit}>

      <div className="row">
          <div className="col-md-12 mb-3">
         
         <label for="fname"> Name</label>
          <input type="text" id="fname" name="fname" placeholder="John Doe"></input>
     
            
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="cc-number">Card Number</label>
            
            <CardNumberElement
           
              id="cc-number"
              className="form-control input"
              options={CARD_ELEMENT_OPTIONS}
             
            />
            
           
          </div>
        </div>
        <hr className="mb-4" />
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expiry">Expiration Date</label>
            <CardExpiryElement
              id="expiry"
              className="form-control input" 
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>

          <hr className="mb-4" />
          <div className="col-md-6 mb-3" id="cv">
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              className="form-control input"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <hr className="mb-4" />
        {/* <button className="btn btn-dark w-100" type="submit" disabled={loading}>
          {loading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : `PAY $175.00`}
        </button> */}

        <Button style={{width:'100%'}} type={'primary'}
        onClick={handleSubmit}
        disabled={loading}
                              
                              >


{loading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : `PAY $175.00`}
                              </Button>

        
      </form>
    </React.Fragment>
  );
}