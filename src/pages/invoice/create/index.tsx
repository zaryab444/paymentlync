import React, { useState,useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Row,Col,Card,Input,Button,Form,Select,DatePicker, Dropdown, Divider} from 'antd';
import TextArea from "antd/es/input/TextArea";
import {initialInvoice,initialProductLine} from "./data/initialdata";
import {
  CloseCircleOutlined,
  CloseOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { CirclePicker  } from 'react-color'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';







const InvoicePage = () => {

  const [Invcolor, setColor] = useState('#000000')

  const handleColorChange = ({ hex  }) => {
    setColor(hex)
    console.log(hex)
  }



  const colorPicker = (
    <Card style={{
      padding:'15px',
      borderRadius:'15px',
    

    }}>
    <CirclePicker 
    
    onChangeComplete={ handleColorChange }/>
    </Card>
  );
  

  

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];



    const [invoice, setInvoice] = useState({ ...initialInvoice })
    const [subTotal, setSubTotal] = useState();
    const [saleTax, setSaleTax] = useState();
    const {Option}=Select;
    const addRow=()=>{
        const productLines = [...invoice.productLines, { ...initialProductLine }]
        setInvoice({ ...invoice, productLines })
    }
    const handleChange = (name, value) => {
        if (name !== 'productLines') {
          const newInvoice = { ...invoice }
          newInvoice[name] = value

          setInvoice(newInvoice)
        }
    }
    const handleRemove = (i)  =>   {
        const productLines = invoice.productLines.filter((productLine, index) => index !== i)
        setInvoice({ ...invoice, productLines })
    }
    const handleProductLineChange = (index, name, value) => {
        value=value.target.value;
    const productLines = invoice.productLines.map((productLine, i) => {
      if (i === index) {
        const newProductLine = { ...productLine }

        if (name === 'description') {
          newProductLine[name] = value;
        } else {
          if (
            value[value.length - 1] === '.' ||
            (value[value.length - 1] === '0' && value.includes('.'))
          ) {
            newProductLine[name] = value
          } else {
            const n = parseFloat(value)

            newProductLine[name] = (n ? n : 0).toString()
          }
        }

        return newProductLine
      }

      return { ...productLine }
    })

    setInvoice({ ...invoice, productLines })
  }
    const calculateAmount = (quantity, rate) => {
    const quantityNumber = parseFloat(quantity)
    const rateNumber = parseFloat(rate)
    const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

    return amount.toFixed(2)
  }
    useEffect(() => {
    let subTotal = 0
    invoice.productLines.forEach((productLine) => {
      const quantityNumber = parseFloat(productLine.quantity)
      const rateNumber = parseFloat(productLine.rate)
      const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

      subTotal += amount
    })

    setSubTotal(subTotal)
  }, [invoice.productLines])
    useEffect(() => {
    const match = invoice.taxLabel.match(/(\d+)%/)
    const taxRate = match ? parseFloat(match[1]) : 0
    const saleTax = subTotal ? (subTotal * taxRate) / 100 : 0

    setSaleTax(saleTax)
    }, [subTotal, invoice.taxLabel])
  return (
   <React.Fragment>
     <div className="invoiceCreate">
    <PageContainer 
     
      >
      <Card style={{margin:'25px'}}>
      <Form
                      name="normal_invoice"
                     
                      initialValues={{ remember: true }}
                  >
<Row>

  <Col offset={2} span={3}>
  <img src="http://react-material.fusetheme.com/assets/images/logos/fuse.svg" style={{height:'160px'
  ,width:'160px',
  position:'absolute',
  right:'36px'}}/>
    </Col>
  <Col span={10}>
    <Row>
      <Col>
  <Divider type="vertical" style={{height:'160px',marginRight:'25px'}}/></Col>
  <Col>
  <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Please input your Company Name!',
                              },
                            ]}
                            style={{marginBottom:"0px"}}
                          >
                            <Input size="large" bordered={false} placeholder="Your Company"
                                   onChange={(e) => handleChange('companyName', e.target.value)}
                                   defaultValue={invoice.companyName}/>
                          </Form.Item>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Please input your name!',
                              },
                            ]}
                            style={{marginBottom:"0px"}}
                          >
                          <Input bordered={false}
                                 onChange={(e) => handleChange('name', e.target.value)}
                                 defaultValue={invoice.name} placeholder="Your name" />
                          </Form.Item>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Please input company aAddress!',
                              },
                            ]}
                            style={{marginBottom:"0px"}}
                          >
                          <Input bordered={false}
                                 onChange={(e) => handleChange('companyAddress', e.target.value)}
                                 defaultValue={invoice.companyAddress} placeholder="Company's address" />
                          </Form.Item>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Please input City, State Zip!',
                              },
                            ]}
                            style={{marginBottom:"0px"}}
                          >
                          <Input bordered={false}
                                 onChange={(e) => handleChange('companyAddress2', e.target.value)}
                                 defaultValue={invoice.companyAddress2}
                                 placeholder="City, State Zip" />
                          </Form.Item>
                          <Form.Item>
                              <Select
                                style={{fontSize:"14px"}}
                                placeholder="Select a country"
                                onChange={(value) => handleChange('companyCountry',value)}
                                defaultValue={invoice.companyCountry}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                bordered={false}
                              >
                                <Option value="United States">United States</Option>
                                <Option value="canada">Canada</Option>
                                <Option value="mexico">Mexico</Option>
                              </Select>
                          </Form.Item>
</Col>
                          </Row>

  </Col>
  <Col  span={8}> 
  <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Please enter document type!',
                              },
                            ]}
                          >
                          <Input bordered={false}
                                 style={{fontSize:"30px",fontWeight:"400"}}
                                 onChange={(e) => handleChange('title', e.target.value)}
                                 defaultValue="INVOICE  IN-12345"
                                 placeholder="Document" />
                          </Form.Item>
                          <Form.Item style={{ marginBottom: "0px" }}>
                                <Form.Item
                                  rules={[{ required: true }]}
                                  style={{ display: 'inline-block', width: '100px',marginBottom: "0px" }}
                                >
                                  <Input bordered={false}
                                         onChange={(e) => handleChange('invoiceDateLabel', e.target.value)}
                                         defaultValue={invoice.invoiceDateLabel}
                                        />
                                </Form.Item>
                                <Form.Item
                                  rules={[{ required: true }]}
                                  style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                >
                                   <DatePicker
                                       onChange={(value) => handleChange('invoiceDate', value)}
                                       defaultValue={invoice.invoiceDate}
                                       bordered={false} />
                                </Form.Item>
                            </Form.Item>
                           <Form.Item style={{ marginBottom: 0 }}>
                                <Form.Item
                                  rules={[{ required: true }]}
                                  style={{ display: 'inline-block', width: '100px' }}
                                >
                                  <Input bordered={false} 
                                  onChange={(e) => handleChange('invoiceDueDateLabel', e.target.value)}
                                         defaultValue={invoice.invoiceDueDateLabel}
                                  />
                                </Form.Item>
                                <Form.Item
                                  rules={[{ required: true }]}
                                  style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                >
                                   <DatePicker
                                       onChange={(value) => handleChange('invoiceDueDate', value)}
                                         defaultValue={invoice.invoiceDueDate}
                                       bordered={false} />
                                </Form.Item>
                            </Form.Item>
                          </Col>
</Row>


<Row style={{marginTop:'25px'}}>

<Col offset={2} span={3}>
<h1 className="clientHeading">CLIENT </h1>
  </Col>
<Col span={6}>
  <Row>
    <Col>
<Divider type="vertical" style={{height:'160px',marginRight:'25px'}}/></Col>
<Col>
<Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Please input client\'s name!',
                              },
                            ]}
                            style={{marginBottom:"0px"}}
                          >
                          <Input bordered={false}
                                 onChange={(e) => handleChange('clientName', e.target.value)}
                                 defaultValue={invoice.clientName}
                                 placeholder="Client's name" />
                          </Form.Item>

                          <Form.Item
                        
                        style={{marginBottom:"0px"}}
                      >
                      <Input bordered={false}
                             onChange={(e) => handleChange('clientAddress2', e.target.value)}
                           
                             placeholder="Email" />
                      </Form.Item>

                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Please input client\'s address!',
                              },
                            ]}
                            style={{marginBottom:"0px"}}
                          >
                          <Input bordered={false}
                                 onChange={(e) => handleChange('clientAddress', e.target.value)}
                                 defaultValue={invoice.clientAddress}
                                 placeholder="Clients's address" />
                          </Form.Item>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Please input City, State Zip!',
                              },
                            ]}
                            style={{marginBottom:"0px"}}
                          >
                          <Input bordered={false}
                                 onChange={(e) => handleChange('clientAddress2', e.target.value)}
                                 defaultValue={invoice.clientAddress2}
                                 placeholder="City, State Zip" />
                          </Form.Item>
                          <Form.Item>
                              <Select
                                style={{fontSize:"14px"}}
                                placeholder="Select a Country"
                                onChange={(value) => handleChange('clientCountry', value)}
                                defaultValue={invoice.clientCountry}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                bordered={false}
                              >
                                <Option value="unitedstates">United States</Option>
                                <Option value="canada">Canada</Option>
                                <Option value="mexico">Mexico</Option>
                              </Select>
                          </Form.Item>
                       
</Col>
                        </Row>

</Col>

</Row>

<Row style={{padding:'50px'}} >
  
<Table  aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left"></TableCell>
            <TableCell style={{ width: 450 }} align="left">Item Description</TableCell>
            <TableCell align="center">QTY</TableCell>
            <TableCell align="center">Rate</TableCell>
            <TableCell align="right">Amount</TableCell>
          
          </TableRow>
        </TableHead>

        <TableBody>
          {invoice.productLines.map((row , i) => (
            <TableRow key={i}>

<TableCell align="left">
                
                <Button key={i} shape="circle" icon={<CloseOutlined />}  onClick={() =>handleRemove(i)} danger></Button>
                  
                  </TableCell>

              <TableCell style={{ width: 450 }} component="th" scope="row" align="left">
           
                                
                                     <Input placeholder={"Enter item name/description"} onChange={(value) => handleProductLineChange(i, 'description', value)} value={row.description} bordered={false}></Input>
                           
              </TableCell>
              <TableCell align="center">

            
                                      <Input type={"number"} bordered={false} style={{fontWeight:"600",marginTop:'3%',textAlign:'center'}} onChange={(value) => handleProductLineChange(i, 'quantity', value)} defaultValue={row.quantity} />
                                
              </TableCell>
              <TableCell align="center">
          
                                      <Input bordered={false} style={{fontWeight:"600",marginTop:'3%',textAlign:'center'}} onChange={(value) => handleProductLineChange(i, 'rate', value)} defaultValue={row.rate} />
                              

              </TableCell>
              <TableCell align="right">  

         
                                      <Input bordered={false} 
                                      style={{fontWeight:"600",marginTop:'3%',textAlign:'right'}}
                                       onChange={(value) => handleProductLineChange(i, 'rate', value)}
                                        defaultValue={row.rate} />
                                  
                                    
                                    </TableCell>
            
            </TableRow>
          ))}

<Button onClick={addRow} style={{marginTop:'10px'}} icon={<PlusOutlined />} >
                            Add Line Item
        </Button>                   
            <TableRow>
            <TableCell colSpan={4} style={{color: 'rgb(107, 114, 128)'}}>SUB TOTAL</TableCell>
            <TableCell align="right">123</TableCell>
          </TableRow>


          <TableRow>
            <TableCell colSpan={4} style={{color: 'rgb(107, 114, 128)'}}>TAX</TableCell>
            <TableCell align="right">123</TableCell>
          </TableRow>


          <TableRow>
            <TableCell colSpan={4} style={{color: 'rgb(107, 114, 128)'}}>DISCOUNT</TableCell>
            <TableCell align="right">123</TableCell>
          </TableRow>


          <TableRow>
            <TableCell colSpan={4} style={{color: 'rgb(107, 114, 128)'}}><h1>TOTAL</h1></TableCell>
            <TableCell align="right"><h1>$500.00</h1></TableCell>
          </TableRow>
        </TableBody>
      </Table>
  </Row>
</Form>
</Card>
      </PageContainer>
          <FooterToolbar> 
            <div style={{position:'absolute',left:'45px'}}>
          <Button type="primary"  icon={<PlusOutlined />} >
          Create Invoice
        </Button>

        <Button style={{marginLeft:'5px'}}  icon={<CloseOutlined />} >
Cancel
        </Button>

        </div>

                <Dropdown overlay={colorPicker} placement="topCenter">
                <Button type="primary" shape="circle"  style={{backgroundColor:Invcolor,color:Invcolor,borderColor:Invcolor,marginLeft:'10px'}}>
                  &nbsp;
                  </Button> 
                </Dropdown>
        </FooterToolbar>
        </div>
        </React.Fragment>
  );
};

export default InvoicePage;
