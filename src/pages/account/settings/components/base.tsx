import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import NotificationBar from "../../../../utils/notificationBar"
import styles from './BaseView.less';
import Api from "../../../../services/AllApiService"


let imgFile : any;




let settingsData : any;
let api = new Api();
let notificationBar = new NotificationBar();





function updateUserSettings(value){
  api
  .updateUserSettings(value)
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



function saveUserSettings(value){
  api
  .saveUserSettings(value)
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


class BaseView extends Component {

currentUserData = JSON.parse(localStorage.getItem("UserInfo"))

state = {
  apiData : [],
  id  : 0,
  companyid: this.currentUserData?.entityid,
  userroleid: this.currentUserData?.userroleid,
  name : '',
  phone:'',
  fax:'',
  website:'',
  address1:'',
  address2:'',
  country : '',
  city:'',
  state:'',
  zip:'',
  fileurl:''


}

  getUserSettings() {

    api
    .getUserSettings()
    .then((response : any) => {
      if(!response.data.statuscode){
        settingsData = response.data.response[0];
        this.setState(
          {
            apiData:response.data.response,
            id:response.data.response[0].id,
            name :response.data.response[0].name,
            phone:response.data.response[0].phone,
            fax:response.data.response[0].fax,
            website:response.data.response[0].website,
            address1:response.data.response[0].address1,
            address2:response.data.response[0].address2,
            country:response.data.response[0].country,
            city:response.data.response[0].city,
            state:response.data.response[0].state,
            zip:response.data.response[0].zip,
            fileurl:response.data.response[0].fileurl == null ? 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' : response.data.response[0].fileurl
           }

        );



        console.log(this.state)

      }
      else{
      }


    })
    .catch((err : any) => console.log(err));
}



componentDidMount() {
  this.getUserSettings();

}

  view: HTMLDivElement | undefined = undefined;



  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handleFinish = (event : any) => {
    if(settingsData.id == null || settingsData.id == 0){
      saveUserSettings({...this.state,...event});
    }else{
      updateUserSettings({...this.state,...event});
    }


  };


  updateCompany(event : any){
    this.setState({
      name: event.target.value
    });
  }

  handleUpload = (info: any) => {

    let reader = new FileReader();
    reader.onload = async (e : any) => {
      this.setState(
        {fileurl : e.target.result})

    };
    reader.readAsDataURL(info.file.originFileObj);



};

  render() {


    return (
       <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          {(this.state.apiData.length > 0) &&

          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={this.state.apiData[0]}

          >
            <Form.Item
              name="name"
              label='Company name'
              rules={[
                {
                  required: true,
                  message:  'Company name is required' ,
                },
              ]}
            >
              <Input type="text" defaultValue={this.state.name}/>
            </Form.Item>

             <Form.Item
              name="phone"
              label='Phone'
              rules={[
                {
                  required: true,
                  message: 'Please provide valid number',
                }
              ]}
            >
               <Input defaultValue={this.state?.phone}
        className={styles.phone_number}

      />
            </Form.Item>


            <Form.Item
              name="fax"
              label='Fax'

            >
              <Input  defaultValue={this.state?.fax}/>
            </Form.Item>
            <Form.Item
              name="website"
              label='Website'

            >
              <Input value={this.state?.website}/>
            </Form.Item>
            <Form.Item
              name="address1"
              label='Address line 1'
              rules={[
                {
                  required: true,
                  message: 'Address  is required',
                },
              ]}
            >
              <Input defaultValue={this.state?.address1}/>
            </Form.Item>

            <Form.Item
              name="address2"
              label='Address line 2'

            >
              <Input defaultValue={this.state?.address2}/>
            </Form.Item>



            <Form.Item
              name="country"
              label='Country'
              rules={[
                {
                  required: true,
                  message: 'Please provide country',
                },
              ]}
            >
                <Input defaultValue={this.state?.country}/>
            </Form.Item>



            <Form.Item
              name="city"
              label='City'
              rules={[
                {
                  required: true,
                  message:  'Please provide city',
                },
              ]}
            >
                <Input defaultValue={this.state?.city}/>
            </Form.Item>


            <Form.Item
              name="state"
              label='State'
              rules={[
                {
                  required: true,
                  message: 'Please provide state' ,
                },
              ]}
            >
                <Input defaultValue={this.state?.state}/>
            </Form.Item>
            <Form.Item
              name="zip"
              label='Zip code'
              rules={[
                {
                  required: true,
                  message:'Please provide Zip code',
                }

              ]}
            >
               <Input defaultValue={this.state?.zip}
        className={styles.zipcode}

      />
            </Form.Item>


            <Form.Item>
              <Button htmlType="submit" type="primary">
              Update
              </Button>
            </Form.Item>

          </Form>
          }
        </div>
        {(this.state.apiData.length > 0) &&
        <div className={styles.right}>

        <div className={styles.avatar_title}>
     Avatar
    </div>
    <div className={styles.avatar}>
      <img src={this.state.fileurl} alt="avatar" />
    </div>
    <Upload showUploadList={false} onChange={this.handleUpload}>
      <div className={styles.button_view}>
        <Button >
          <UploadOutlined />
       Change avatar
        </Button>
      </div>
    </Upload>


        </div>
  }
      </div>
    );
  }
}

export default BaseView;
