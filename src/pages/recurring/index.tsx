import { PlusOutlined } from '@ant-design/icons';
import { Col , Row , Button, Divider, message, Input, Drawer , Space,Tooltip , Tabs , Card,Modal,Dropdown,DatePicker,Select,Form } from 'antd';
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
import { useHistory } from "react-router";
import MaterialTable from "material-table";
import TextField from '@material-ui/core/TextField';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';






//



import {
  CloseCircleOutlined,
  CloseOutlined,

} from '@ant-design/icons';
import { CirclePicker  } from 'react-color'

import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { BackgroundColor, black, blue } from 'chalk';
import center from '../account/center';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));





function info() {


  Modal.info({
  //  title here
    content: (
      <div>

        <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
        <h3>Start...</h3>
        <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1">
        <FormControlLabel value="female" control={<Radio />} label="Now" />
        <FormControlLabel value="male" control={<Radio /> } label="Month Start"





        />


      </RadioGroup>
    </FormControl>

    </Col>

        <Col xs={20} sm={16} md={12} lg={8} xl={4}>


      <div style={{
height:'150px',
width:'2px',
backgroundColor:"#808080",
fontWeight: 300

  }}>

     </div>
     </Col>

     <Col xs={2} sm={4} md={6} lg={8} xl={10}>
     <h3>End...</h3>
     <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1">
        <FormControlLabel value="female" control={<Radio />} label="Month End" />
        <FormControlLabel value="male" control={<Radio />} label="Month End" />


      </RadioGroup>
    </FormControl>
    </Col>
     </Row>

      </div>
    ),
    onOk() {

    },
  });
}





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



function createData(name, calories, fat) {
  return { name, calories, fat };
}

const abc = [
  createData('testing Name', 1,  150, ),
  createData('testing Name2', 1, 150 ),
  createData('testing Name3', 2, 3),

];



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

	  // {
    //     title: 'Action',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [

		// <Space size="middle">
    //         <Tooltip title="Action">
    //         <Button onClick=
		// 	{() => setRow(record)}
    //           type={"primary"}>
    //             <SendOutlined /></Button>
    //         </Tooltip>
    //     </Space>



    //   ],
    // },
  ];



  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };





  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };





  return (

<React.Fragment>
  <Card>

<Row justify="end">
      <Col offset={11} span={1}><Button  block style={{marginRight:80}} >
     All
    </Button></Col>

      <Col  span={2}> <Button block>
      Scheduled
    </Button></Col>
      <Col span={2}> <Button  block >
      Canceled
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
        toolBarRender={(_, record) => [
          <Button type="primary" onClick={() => setRow(record)}>
            <PlusOutlined /> Create Recurring
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





        <h2  style={{fontWeight:300}}>Add Recuring  <Button style={{marginLeft:120 }}   
         type="primary"  onClick={info}>Schedule Recuring</Button>

    <Button style={{marginLeft:10 }}>Start Recuring</Button></h2>









       <Divider />

       <h2 style={{fontWeight:300}}>Recurring</h2>

       <Divider />
       <Button type="primary" onClick={showModal}>
        + Add Customer
      </Button>
      <Modal title="Add Customer" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>





      <TextField id="outlined-basic" label="Customer Name" variant="outlined" />

     <Divider/>


      <TextField id="outlined-basic" label="Amount" variant="outlined" />


      <Divider/>

      <TextField id="outlined-basic" label="Status" variant="outlined" />

      <Divider/>

      <TextField id="outlined-basic" label="Created On" variant="outlined" />

      <Divider/>

      <TextField id="outlined-basic" label="Country" variant="outlined" />



      </Modal>
<Divider/>


<TableContainer >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>



          </TableRow>
        </TableHead>
        <TableBody>
          {abc.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>

              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


    </TableContainer>
    <Button style={{marginTop:30}} type="primary" onClick={showModal} >
        + Add Product
      </Button>

      <Modal title="Add Product"   okButtonProps={{
        children: "Custom OK"
      }}
      cancelButtonProps={{
        children: "Custom cancel"
      }}
      okText="Add Product"
      cancelText="Cancel"

       visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>





      <TextField id="outlined-basic" label="Customer Name" variant="outlined" />

     <Divider/>


      <TextField id="outlined-basic" label="Amount" variant="outlined" />


      <Divider/>

      <TextField id="outlined-basic" label="Status" variant="outlined" />

      <Divider/>

      <TextField id="outlined-basic" label="Created On" variant="outlined" />

      <Divider/>

      <TextField id="outlined-basic" label="Country" variant="outlined" />



      </Modal>


      <h2   style={{marginTop:30, fontWeight:300}} >Recurring Method</h2>
      <h3 style={{fontWeight:400}}>Automatically charge a payment method on file
the customer doesn't have any void payment method on file</h3>

<Button style={{marginTop:30}} type="primary" >
        + Add Payment Method
      </Button>

      </Drawer>
  </React.Fragment>
  );
};

export default TableList;
