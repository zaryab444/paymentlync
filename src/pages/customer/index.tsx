import { InfoCircleOutlined, InfoOutlined, PlusOutlined } from '@ant-design/icons';
import { Col , Row , Button, Divider, message, Input, Drawer , Space,Tooltip , Table ,Tabs, Card , Tag, Radio   } from 'antd';
import React, { useState, useRef } from 'react';


import {SendOutlined} from '@ant-design/icons';
import { useHistory } from "react-router"
import Api from "../../services/AllApiService"
import ProTable from '@ant-design/pro-table';


let dataSource : any;

const { TabPane } = Tabs;

interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: Key) => boolean;
  cancelEditable: (rowKey: Key) => boolean;
}


const TableList: React.FC<{}> = () => {
 
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);

  React.useEffect(() => {
    getCustomer();
  }, []);
 let api = new Api();

 let smsTemplate = JSON.parse(localStorage.getItem("smsData"));

const [smsTemp , setTemp] = useState('')
const [singleData , setData] = useState('');

const [amount , setAmount] = useState('')
const [message , setMessage] = useState(smsTemplate)


  let history = useHistory()


  function createCustomer() {
    history.push("/customer/create")
  }


  const { TextArea } = Input;
  const { Search } = Input;

console.log("dataSource",state)
// const onSearch = value => console.log(value);

const ref = useRef<ActionType>();

function updateSms(x){
  console.log("its updated");
  setData(x)
  smsTemplate = smsTemplate.replace("[customer_name]",x.name)
  smsTemplate = smsTemplate.replace("[company_name]",x.companyname)
  setTemp(smsTemplate);
}

function getCustomer(){
  api
  .getCustomer({})
  .then((response : any) => {
    if(!response.data.StatusCode){

      setloading(false);
      ref.current.reload();

 dataSource = response.data.response
 setstate(
  dataSource
);
    }
    else{
      setloading(false);
    }
  })
  .catch((err : any) => console.log(err));
}


function sendSms(){
  api
  .sendSms({customerid:singleData?.customerid ,message :message ,amount:amount, phonenumber :singleData?.phone1 })
  .then((response : any) => {
    if(!response.data.StatusCode){

console.log("sent")
    }
    
  })
  .catch((err : any) => console.log(err));
}






  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'firstname',
    },
    {
      title: 'Phone',
      dataIndex: 'phone1',
      valueType: 'textarea',
    },
    {
      title: 'Status',
      dataIndex: 'isactive',
      hideInForm: true,
      render: () => (
        <Tag color="#2db7f5">Active</Tag>
      ),
    },
    {
      title: 'CreatedOn',
      dataIndex: 'insertedon',
      sorter: true,
      valueType: 'dateTime',

    },

	  {
        title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record : any) => [

		<Space size="middle">
            <Tooltip title="Action">
            <Button onClick=
			{() => {
        updateSms(record);
        setRow(record)}
    }
              type={"primary"}>
                <SendOutlined /></Button>
            </Tooltip>
        </Space>



      ],
    },
  ];




  return (
    <React.Fragment>
    
<Card>
 

<Row justify="end">
      <Col offset={11} span={1}><Button  block>
      All
    </Button></Col>

      <Col  span={2}> <Button block>
      In Progress
    </Button></Col>
      <Col span={2}> <Button  block>
      Waiting
    </Button></Col>
      <Col span={5  }>

    <Search style={{marginLeft:'10px'}} placeholder="please Enter"   />


    </Col>
    </Row>





{/* <Table   dataSource={state} columns={columns} loading={loading} /> */}



<ProTable



  request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: state,
          success: true,
        });
      }}
      actionRef={ref}
      debounceTime={2}
        search={false}
        toolBarRender={() => [
          <Button type="primary" onClick={() => createCustomer()}>
            <PlusOutlined /> Create Customer
          </Button>,
        ]}
        rowKey="customerid"
        columns={columns}
      />


</Card>





<Drawer



        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined)
        }}
        closable={false}
      >

<Tabs defaultActiveKey="1" >
    <TabPane tab="Generate Lync" key="1">


        <h1>{row?.firstname}</h1>
        <br />
      <Row>
       <Col span={4}>
       <h4>Amount</h4>
       </Col>
        <Col offset={4} span={15}>

       <Input placeholder="0.00"
         value={amount}
        onChange={e => setAmount(e.target.value)} 
       />

       </Col>
       </Row>

       <Divider />

       <Row>
       <Col>
       <h4>Message</h4>
       </Col>
        <Col offset={8}>

       <TextArea rows={6}
       value={smsTemp}
       onChange={e => setMessage(e.target.value)} 
       style={{ width: '360px' , marginTop : '-35px' }}
       />
       <span className="textDescription">this is message text box in here you will type text message and send it to the reciver</span>
       </Col>
       </Row>

       <Divider />
       <Row   style={{ marginTop: 8 }}
       >
         <Col span={20}>
       This message will required <b>1 Credit</b> <InfoCircleOutlined /><br />
      when you send the text message, you will have <b>20 Credits</b> remaning.
       </Col>
       <Col span={4}>
       <Button type="primary"
       
       onClick={sendSms}>Send SMS</Button>


       
         </Col>
       </Row>

       </TabPane>
       {/* <TabPane tab="Chat" key="2">

       <div>
  <div className="sender">
  <span>Sender : 02212345667</span>
  <p>Hello How Are You</p>
  </div>

  <div className="sender">
  <span>Receiver : 1212345667</span>
  <p>i am fine</p>
  </div>
</div>

       </TabPane> */}



       </Tabs>

      </Drawer>




{/*
	  <Drawer

	    width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined)
        }}
        closable={false}

	  >
            <Row>


            <Col span={24}>


                       <h1 style={{marginTop:'30px'}}>{row?.firstname}</h1>


                    <Divider />
                    <Row>
                        <Col >Amount($)</Col>
                        <Input ></Input>

                    </Row>
                    <Row>
                        <Col >Phone</Col>
                        <Input value={row?.phone1} ></Input>

                    </Row>

                    <Row>
                        <Col >Message </Col>

                        <TextArea rows={4}  />

                    </Row>
                    <Row></Row>
                    <Row>


                    <Col style={{textAlign:'right',marginTop:'20px' , justifyContent:'right'}}
                    >
                            <Button type={'primary'}  >Send Text</Button>
                        </Col>

                        </Row>


                </Col>
            </Row>
        </Drawer> */}






        </React.Fragment>
  );
};

export default TableList;
