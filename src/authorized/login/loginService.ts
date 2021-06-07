import axios from 'axios'


export default class Api {

    public api_token : any;
    public client : any;
    public api_url : any;

  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://pages.aztores.com/api/";
  }

  init = () => {
 //   this.api_token = getCookie("ACCESS_TOKEN");

    let headers = {
      Accept: "application/json",
    };

    // if (this.api_token) {
    //   headers.Authorization = `Bearer ${this.api_token}`;
    // }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  login = (params) => {
    return this.init().post("/Login", params);
  };

  registerUser= (params) => {
    return this.init().post("/Company/AddCompany", params);
  };

}