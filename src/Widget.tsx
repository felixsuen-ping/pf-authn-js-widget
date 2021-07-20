import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "@ping-identity/pf-authn-js-widget";

interface Props {
    divId?: string,
    flowId?: string,
    logo?: string,
    deviceProfileScript?: string,
    baseUrl: string
}

const Widget = (props: Props) => {
  useEffect(() => {
    // creating the options object
    let options: Authn.Options = { divId: "authnwidget" };
    if (props.flowId)
      options = { ...options, flowId: props.flowId };
    if (props.logo)
      options = { ...options, logo: props.logo };
    // if (props.invokeReCaptcha)
    //   options = { ...options, invokeReCaptcha: props.invokeReCaptcha };
    // if (props.checkRecaptcha)
    //   options = { ...options, checkRecaptcha: props.checkRecaptcha };
    // if (props.grecaptcha)
    //   options = { ...options, grecaptcha: options.grecaptcha };
    if (props.deviceProfileScript)
      options = { ...options, deviceProfileScript: options.deviceProfileScript };
    console.log(options);

    let authnWidget: Authn.Widget = new AuthnWidget (props.baseUrl, options);
    // if (props.redirectlessConfig)
    //   authnWidget.initRedirectless(props.redirectlessConfig);
    // else
    authnWidget.init();
  }, [])
  return (<div id="authnwidget" />);
}

Widget.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  flowId: PropTypes.string,
  logo: PropTypes.string,
  invokeReCaptcha: PropTypes.func,
  checkRecaptcha: PropTypes.string,
  grecaptcha: PropTypes.object,
  deviceProfileScript: PropTypes.string,
  redirectlessConfig: PropTypes.object,
}

export default Widget;