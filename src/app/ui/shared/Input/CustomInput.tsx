import { Input } from "antd";
import React from "react";

type Props = {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: any;
  onPressEnter?: any;
};

function CustomInput({
  type,
  placeholder,
  value,
  onChange,
  onPressEnter,
}: Props) {
  return (
    <Input
      className="w-1/2"
      allowClear
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onPressEnter={onPressEnter}
    />
  );
}

export default CustomInput;
