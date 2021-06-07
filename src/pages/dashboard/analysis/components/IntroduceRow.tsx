import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';

import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import type { VisitDataType } from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: VisitDataType[] }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={
          <FormattedMessage
            id="totalcredit"
            defaultMessage="Total Credit"
          />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="creditamount"
                defaultMessage="the amount of total credits you owned"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => 20}
        footer={
          <Field
            label={
              <FormattedMessage
                id="dailyusage"
                defaultMessage="Daily usage"
              />
            }
            value={`${numeral(12423).format('0,0')}`}
          />
        }
        contentHeight={46}
      >
        
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={
          <FormattedMessage id="totalInv"
           defaultMessage="Invoices" />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="inv"
                defaultMessage="Total Invoices"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(0).format('0,0')}
        footer={
          <Field
            label={
              <FormattedMessage
                id="daily inv"
                defaultMessage="Daily Invoices"
              />
            }
            value={numeral(0).format('0,0')}
          />
        }
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={
          <FormattedMessage id="Customers" 
          
          defaultMessage="Customers" />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="totalcust"
                defaultMessage="Total Customers"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(0).format('0,0')}
        footer={
          <Field
            label={
              <FormattedMessage
                id="newcust"
                defaultMessage="New Customer"
              />
            }
            value="0"
          />
        }
        contentHeight={46}
      >
        <MiniBar data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      
    <ChartCard
        bordered={false}
        loading={loading}
        title={
          <FormattedMessage id="Total Sent" 
          
          defaultMessage="Total Sent" />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="totalsent"
                defaultMessage="Total Number Of Sms Sent"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(0).format('0,0')}
        footer={
          <Field
            label={
              <FormattedMessage
                id="todaysent"
                defaultMessage="Today Sent"
              />
            }
            value="0"
          />
        }
        contentHeight={46}
      >
        <MiniBar data={visitData} />
      </ChartCard>

    </Col>
  </Row>
);

export default IntroduceRow;
