import { PlusOutlined } from '@ant-design/icons';
import { Col , Row , Button, Divider, message, Input, Drawer , Space,Tooltip , Tabs , Card } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';
import {SendOutlined} from '@ant-design/icons';
import { useHistory } from "react-router"


const { Search } = Input;
/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {

 
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  let history = useHistory();

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();


  function createInvoice() {
    history.push("/invoice/create")
  }


  const { TextArea } = Input;

  const { TabPane } = Tabs;


  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Invoice No',
      dataIndex: 'key',
      tip: '规则名称是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: 'Amount',
      dataIndex: 'key',
      valueType: 'textarea',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: 'Unpaid', status: 'Default' },
        1: { text: 'Processing', status: 'Processing' },
        2: { text: 'Paid', status: 'Success' },
        3: { text: 'Failed', status: 'Error' },
      },
    },
    {
      title: 'CreatedOn',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
	
	  {
        title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
 
		<Space size="middle">
            <Tooltip title="Action">
            <Button onClick=
			{() => setRow(record)}
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

      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <Button type="primary" onClick={() => createInvoice()}>
            <PlusOutlined /> Create Invoice
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />

</Card>


      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}



      <Drawer



        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined)
        }}
        closable={false}
      >

<Tabs defaultActiveKey="1" >
    <TabPane tab="Notes" key="1">


        <h1>{row?.name}</h1>
        <br />
        <h4>Invoice No : {row?.key}</h4>
        <h4>Amount     : $100.00</h4>

       <Divider />

       <Row>
       <Col>
       <h4>Message</h4>
       </Col>
        <Col offset={8}>
     
       <TextArea rows={6}
       style={{ width: '360px' , marginTop : '-35px' }}
       />
       <span className="textDescription">this is message text box in here you will type text message and send it to the reciver</span>
       </Col>
       </Row>
 
       <Divider />
       <Row   style={{ marginTop: 8 }}
       >
         <Col>
       You Have 300 Sms Credit Left
       </Col>
       <Col offset={12}>
       <Button type="primary">Send SMS</Button>
         </Col>
       </Row>

       </TabPane>
       <TabPane tab="Chat" key="2">

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

       </TabPane>



       </Tabs>

      </Drawer>
  </React.Fragment>
  );
};

export default TableList;
