import React, { Component } from 'react';

import type { Dispatch} from 'umi';
import { FormattedMessage, connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import BaseView from './components/base';
import Membership from './components/membership';
import type { CurrentUser } from './data.d';
import SecurityView from './components/security';
import styles from './style.less';
import PaymentGateway from './components/paymentgateway'
import Accounting from './components/accounting'
import SmsEmail from './components/sms';

const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
}

type SettingsStateKeys = 'base' | 'security' | 'membership' | 'notification' | 'accounting' | 'messaging' ;
interface SettingsState {
  mode: 'inline' | 'horizontal';
  menuMap: Record<string, React.ReactNode>;
  selectKey: SettingsStateKeys;
}

class Settings extends Component<SettingsProps, SettingsState> {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: SettingsProps) {
    super(props);
    const menuMap = {
      base: "Basic Settings",
      security: "Security Settings",
      accounting:"Accounting Package",
      membership:"Membership",
      notification:"Payment Gateway",
      messaging: "Sms and email setting"

    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = (key: SettingsStateKeys) => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return <SecurityView />;
        case 'accounting':
          return <Accounting />;
      case 'membership':
        return <Membership />;
      case 'notification':
        return <PaymentGateway />;

        case 'messaging':
          return <SmsEmail/>;
      default:
        break;
    }

    return null;
  };

  render() {


    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={({ key }) => this.selectKey(key as SettingsStateKeys)}
            >
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default Settings;
