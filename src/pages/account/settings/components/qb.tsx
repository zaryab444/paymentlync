import React from 'react'

class QuickBooksOnline extends React.Component {

    public callbackURL = "http://www.google.com/";

    componentDidMount() {
        this.init();
      }
     
      async init() {
        let script1 = document.createElement('script') 
        script1.src = "https://appcenter.intuit.com/Content/IA/intuit.ipp.anywhere-1.3.3.js"
        script1.type = "text/javascript"
        script1.onload = () => {
          let script2 = document.createElement('script') 
          script2.src = "https://appcenter.intuit.com/Content/IA/intuit.ipp.anywhere-1.3.3.js"
          script2.type = "text/javascript"
          script2.onload = () => {
            let script3 = document.createElement('script') 
            script3.innerHTML = `
              intuit.ipp.anywhere.setup({
                grantUrl: 'http://www.google.com',
                datasources: {
                    quickbooks : true,
                    payments : true
                },
                  paymentOptions:{
                    intuitReferred : true
                }
              });
            `
            script3.type = "text/javascript"
     
            document.getElementsByTagName("head")[0].appendChild(script3)
            console.log("i am script 3")
          }
          document.getElementsByTagName("head")[0].appendChild(script2)
        }
        document.getElementsByTagName("head")[0].appendChild(script1)
      }
     
      render() {
        return (
          <div dangerouslySetInnerHTML={{__html: "<ipp:connectToIntuit></ipp:connectToIntuit>"}}></div>
        )
      }
}

export default QuickBooksOnline