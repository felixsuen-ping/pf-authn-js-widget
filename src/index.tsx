import React from 'react'
import ReactDOM from 'react-dom'
import { Widget } from './Widget';

var config = {
  client_id: 'im_client',
  response_type: 'token id_token',
  onAuthorizationSuccess: function (response: Response) {
    console.log(response);
  },
};

ReactDOM.render(<Widget 
    baseUrl="https://localhost:9031"
    redirectlessConfig={config}/>, document.getElementById('root'))
