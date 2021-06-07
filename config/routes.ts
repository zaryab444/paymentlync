import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


export default [
  
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/authorized',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/authorized/login',
            name: 'login',
            component: '../authorized/login',
          },
          {
            path: '/authorized',
            redirect: '/authorized/login',
          },
       
          {
            name: 'register',
            icon: 'smile',
            path: '/authorized/register',
            component: '../authorized/register',
          },
          {
            name: 'forget',
            icon: 'smile',
            path: '/authorized/forgetpassword',
            component: '../authorized/forgetpassword',
          },
          
          {
            path: '/authorized/payment',
            name: 'Payment',
            icon: 'dashboard',
            component: './payment',
            hideInMenu: true
          },

          {
            component: '404',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/authorized/login',
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            component: './dashboard/analysis',
          },
  {
            path: '/recurring',
            name: 'Recurring',
            icon: 'container',
            component: './recurring',
        
          },
          // {
          //   path: '/invoice',
          //   name: 'Invoice',
          //   icon: 'container',
          //   component: './invoice',
        
          // },
          {
            path: '/invoice/create',
            name: 'Create Invoice',
            icon: 'container',
            component: './invoice/create',
            hideInMenu: true
          },

          {
            path: '/customer',
            name: 'Customer',
            icon: 'user',
            component: './customer',
            
          },
          {
            path: '/customer/create',
            name: 'Create Customer',
            icon: 'user',
            component: './customer/customercreate',
            hideInMenu: true
          },

          {
            path: '/settings',
            name: 'Settings',
            icon: 'setting',
            component: './account/settings',
          },
    

          {
            component: '404',
          },
        ],
      },
    ],
  },

  {
    component: './404',
  },
];
