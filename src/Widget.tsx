import { useEffect } from "react";
import PropTypes from "prop-types";
import AuthnWidget, { IRedirectlessConfig, IOptions, IAuthnWidget } from "@ping-identity/pf-authn-js-widget";

interface Props {
  flowId?: string,
  logo?: string,
  invokeReCaptcha?: () => void,
  checkRecaptcha?: string,
  grecaptcha?: any,
  deviceProfileScript?: string
  useActionParam?: boolean,
  baseUrl: string,
  redirectlessConfig?: IRedirectlessConfig,
}

export const Widget = (props: Props) => {

  useEffect(() => {
    let options: IOptions = { divId: "authnwidget" };
    if (props.flowId)
      options = { ...options, flowId: props.flowId };
    if (props.logo)
      options = { ...options, logo: props.logo };
    // enable recaptcha
    if (typeof (window as any).invokeReCaptcha !== 'undefined')
      options = { ...options, invokeReCaptcha: (window as any).invokeReCaptcha, checkRecaptcha: "checkRecaptcha" };
    if (typeof (window as any).grecaptcha !== 'undefined')
      options = { ...options, grecaptcha: (window as any).grecaptcha };
    if (props.useActionParam)
      options = { ...options, useActionParam: true };
    if (props.deviceProfileScript)
      options = { ...options, deviceProfileScript: props.deviceProfileScript };
    console.log(options);

    if (typeof (window as any).authnWidget !== undefined || (window as any).authWidget == null) {
      // if authnWidget is already initialized globally
      (window as any).authnWidget = new AuthnWidget(props.baseUrl, options);
      if (props.redirectlessConfig)
      (window as any).authnWidget.initRedirectless(props.redirectlessConfig);
      else
      (window as any).authnWidget.init();
    } else {
      // initialize authnWidget
      var authnWidget: IAuthnWidget = new AuthnWidget(props.baseUrl, options);
      if (props.redirectlessConfig)
        authnWidget.initRedirectless(props.redirectlessConfig);
      else
        authnWidget.init();
    }
    
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
  useActionParam: PropTypes.bool,
  deviceProfileScript: PropTypes.string,
  redirectlessConfig: PropTypes.object,
}