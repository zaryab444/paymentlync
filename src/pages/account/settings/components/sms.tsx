
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message } from 'antd';
 import { List, TextareaItem } from 'antd-mobile';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import NotificationBar from "../../../../utils/notificationBar"



import Api from "../../../../services/AllApiService"

const { TextArea } = Input;

let settingData : any;
let api = new Api();
let notificationBar = new NotificationBar();


function updateTemplateSettings(value){
  api.updateTemplateSettings(value)
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




class SmsEmail extends Component {

  currentUserData = JSON.parse(localStorage.getItem("Template"))

  state = {
  apiData : [],
    emailtemplate : '',
    smstemplate : '',



  }

  getSmsSettings(){
    api.getTemplateSettings()
    .then((response : any) => {
      if(!response.data.statuscode){
        settingData = response.data.response[0];

        let EmailData = JSON.parse(response.data.response[0].emailtemplate);
        let SmSData = JSON.parse(response.data.response[0].smstemplate);



         this.setState({
           apiData: response.data.response,
           emailtemplate : EmailData.body,
           smstemplate : SmSData.body

         }
         );
         console.log(this.state)

      }
    })
    .catch((err : any) => console.log(err));

  }

  componentDidMount(){
    this.getSmsSettings();
  }

  handleFinish = (event : any) => {
      updateTemplateSettings({...this.state.apiData,...event});
  }


render(){
  const buttonItemLayout = {
    wrapperCol: {span: 14, offset: 4},
};



return (
  <div>
  {(this.state.apiData.length > 0) &&
<Form

onFinish={this.handleFinish}


>

<Form.Item
              name="emailtemplate"
              label='Email Template '

            >
              <TextArea

placeholder="Email Template"
autoSize={{ minRows: 3, maxRows: 5 }}
defaultValue={this.state.emailtemplate}

/>
            </Form.Item>



<Form.Item
name="smstemplate"
label='SMS Template'

>


<TextArea

          placeholder="SMS Template"
          autoSize={{ minRows: 3, maxRows: 5 }}
          defaultValue={this.state.smstemplate}
        />


</Form.Item>



   <Form.Item  {...buttonItemLayout}>
              <Button  htmlType="submit" type="primary">
              Submit
              </Button>
            </Form.Item>

  </Form>

}
</div>
);

}


}

export default SmsEmail;
