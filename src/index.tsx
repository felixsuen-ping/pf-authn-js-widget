import ReactDOM from 'react-dom';
import { Widget } from './Widget';
import { IRedirectlessConfig, IAuthnWidget } from "@ping-identity/pf-authn-js-widget";

declare global {
  interface Window {
      grecaptcha :any;
  }
}

const grecaptcha = window.grecaptcha;

var authnWidget: IAuthnWidget;

function checkRecaptcha(token: any) {
    alert('captcha response: ' + token);
    if (token.length === 0) {
        //reCaptcha not verified
        authnWidget.clearPendingState();
        console.log('did not pass captcha try again');
    } else {
        authnWidget.dispatchPendingState(token);
    }
}

function invokeReCaptcha() {
    let token = grecaptcha.getResponse();
    console.log('token ' + token);
    if(token) {
        checkRecaptcha(token);
    }
    else {
        grecaptcha.execute();
    }
}

var config: IRedirectlessConfig = {
  client_id: 'im_client',
  response_type: 'token id_token',
  onAuthorizationSuccess: function (response: Response) {
    console.log(response);
  },
};

ReactDOM.render(
  <Widget 
    baseUrl="https://localhost:9031" 
    grecaptcha={grecaptcha}
    checkRecaptcha="checkRecaptcha"
    invokeReCaptcha={invokeReCaptcha}
    // redirectlessConfig={config}
    />,
  document.getElementById('root')
);
