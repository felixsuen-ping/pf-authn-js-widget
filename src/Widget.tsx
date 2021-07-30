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
    if (props.invokeReCaptcha)
      options = { ...options, invokeReCaptcha: props.invokeReCaptcha };
    if (props.checkRecaptcha)
      options = { ...options, checkRecaptcha: props.checkRecaptcha };
    if (props.grecaptcha)
      options = { ...options, grecaptcha: props.grecaptcha };
    if (props.deviceProfileScript)
      options = { ...options, deviceProfileScript: props.deviceProfileScript };
    console.log(options);

    var authnWidget: IAuthnWidget = new AuthnWidget(props.baseUrl, options);

    if (props.redirectlessConfig)
      authnWidget.initRedirectless(props.redirectlessConfig);
    else
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