import { CloseCircleOutlined } from '@ant-design/icons';
import { Divider , Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, TimePicker } from 'antd';
import type { FC} from 'react';
import React, { useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import styles from './style.less';
import Api from "../../../services/AllApiService"
import NotificationBar from "../../../utils/notificationBar"
import { useHistory } from 'react-router';

type InternalNamePath = (string | number)[];


interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<AdvancedFormProps> = ({ submitting, dispatch }) => {

  const api = new Api();
  const notificationBar = new NotificationBar();

  let history = useHistory();

  const [form] = Form.useForm();
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          {/* <div className={styles.errorField}>{fieldLabels[key]}</div> */}
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values: Record<string, any>) => {
    setError([]);
  
    console.log(values)

    api
    .createCustomer({...values,...{name:values.firstname + values.lastname}})
    .then((response : any) => {
      if(!response.data.StatusCode){
        notificationBar.openNotification("Success","Customer Created Successfully")
        history.push("/customer")
      // localStorage.setItem("Token",response.data.Response.Token)
      
      }
      else{
        notificationBar.openNotification("Failed",response.data.statusmessage)
       // console.log("failed")
      }
     
 
    })
    .catch((err : any) => console.log(err));




  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer 
     
      >
        <Card title="Add Customer"
         className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label="First Name"
                name="firstname"
                rules={[{ required: true, message: 'First Name Is Required' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
         

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label="Middle Name"
                name="middlename"
  
              >
                <Input placeholder="Middle Name" />
              </Form.Item>
            </Col>

           
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label="Last Name"
                name="lastname"
                rules={[{ required: true, message: 'LastName Is required' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email Is required' }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item
                label="Phone 1"
                name="phone1"
                rules={[{ required: true, message: 'Phone Is Required' }]}
              >
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            <Form.Item
                label="Phone 2"
                name="phone2"
               
              >
                <Input placeholder="Phone 2" />
              </Form.Item>
            </Col>
          </Row>
          <Col span={6}>
              <Form.Item
                label="Website"
                name="weburl"
                // rules={[{ required: true, message: '请选择' }]}
              >
                <Input   
                  style={{ width: '100%' }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="google.com"
                />
              </Form.Item>
            </Col>
          <Row>

          </Row>
          < Divider />
        
       <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Street Address"
                name="billaddress1"
                rules={[{ required: true, message: 'Address is Required' }]}
              >
                <Input placeholder="Line 1" />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Street Address"
                name="billaddress2"
                // rules={[{ required: true, message: '请选择' }]}
              >
                <Input placeholder="Line 2" />
              </Form.Item>
            </Col>
         
          </Row>
          <Row gutter={16}>
         
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label="City"
                name="billcity"
                rules={[{ required: true, message: 'City is Required' }]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label="State"
                name="billstate"
                rules={[{ required: true, message: 'State is required' }]}
              >
               <Input placeholder="State" />
              </Form.Item>
            </Col>
           

            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label="Zip Code"
                name="billpostalcode"
                rules={[{ required: true, message: 'Zip code is required' }]}
              >
                <Input placeholder="Zip Code" />
              </Form.Item>
            </Col>

            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label="Country"
                name="billcountry"
                rules={[{ required: true, message: 'Country is required' }]}
              >
                <Input placeholder="Country" />
              </Form.Item>
            </Col>

          
          </Row>
        </Card>
     
      </PageContainer>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          Add Customer
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: Record<string, boolean> } }) => ({
  submitting: loading.effects['formAndadvancedForm/submitAdvancedForm'],
}))(AdvancedForm);
