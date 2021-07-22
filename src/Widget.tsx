import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {Options, PFWidget} from "@ping-identity/pf-authn-js-widget";

interface Prop {
    baseUrl: string,
    divId?: string
}

export const Widget = (props: Prop) => {
  useEffect(() => {
    let options: Options = { divId: "authnwidget" };
    console.log(options);

    const authnWidget: PFWidget = new AuthnWidget(props.baseUrl, options);
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