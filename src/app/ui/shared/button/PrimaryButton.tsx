import { Button } from "antd";
import { ButtonHTMLType } from "antd/es/button";
import React from "react";

type Props = {
  text: string;
  htmlType?: ButtonHTMLType;
  onClick?: any;
};

function PrimaryButton({ text, htmlType, onClick }: Props) {
  return (
    <Button type="primary" htmlType={htmlType} onClick={onClick}>
      {text}
    </Button>
  );
}

export default PrimaryButton;
