import {notification} from 'antd';




export default class NotificationBar {

    openNotification = (reason? : any,data? : any) => {
        notification.open({
          message: reason,
          description:
            data,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
        return null;
      };
    
}

