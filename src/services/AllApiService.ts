import axios from 'axios'


export default class AllApiService {
  public userinfo = JSON.parse(localStorage.getItem("UserInfo"));
    public api_token : any;
    public client : any;
    public api_url : any;

  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://pages.aztores.com/api/";
  }

  init = () => {
  
    this.api_token = this.userinfo?.token;
    let headers = {
      Accept: "application/json",
    };

    if (this.api_token) {
      headers.Authorization = this.api_token;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };



// Customer Services //

  getCustomer = (params) => {
    return this.init().post("/Customer/Customers", {...params,companyid : this.userinfo?.entityid});
  };


  createCustomer = (params) => {
      return this.init().post("/Customer/AddCustomer" , {...params,companyid : this.userinfo?.entityid})
  }

// Customer Services //

// Setting Services //

getUserSettings = () => {
  return this.init().post("/Setting/Settings", {companyid : this.userinfo?.entityid});
};


saveUserSettings = (params) => {
  return this.init().post("/Setting/AddSetting", {...params,companyid : this.userinfo?.entityid});
};



updateUserSettings = (params) => {
 return this.init().post(`/Setting/${params.id}/update`, params);
};



getPaymentProcessor = () => {
  return this.init().post("/PaymentGateway/PaymentGateways", {companyid : this.userinfo?.entityid});
};

SavePaymentProcessor = (params) => {
  return this.init().post("/PaymentGateway/AddPaymentGateway", {...params,companyid : this.userinfo?.entityid});
};

updatePaymentProcessor = (params) => {
  return this.init().post(`/PaymentGateway/${params.paymentgatewayid}/update`, {...params});
};


getPaymentDetails(params){
  return this.init().get(`/Authorized/Payments?Id=${params}`);
}

savePayment = (params) => {
  return this.init().post(`/Transaction/Sale`, {...params});
};



dashboardData = () => {
  return this.init().post(`/Dashboard/Dashboards`, {companyid : this.userinfo?.entityid,type:4});
};

cardPayment = (parms) => {
  return this.init().post(`/Transaction/Sale`, {...parms});
};


PaymentData = (param) => {
  return this.init().get(`/Authorized/Payments?Id=${param}`);
};



getTemplateSettings = () => {
  return this.init().get(`/Setting/Templates?companyId=${this.userinfo?.entityid}`);
  };

  updateTemplateSettings = (params) => {

    return this.init().post(`/Setting/${params.id}/UpdateTemplate`, {...params,companyid : this.userinfo?.entityid})

  }

  sendSms = (params) => {

    return this.init().post(`/PaymentLync/SendSms`, {...params,companyid : this.userinfo?.entityid})

  }



// Setting Services //

}