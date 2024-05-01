import React from "react";

interface InputErrorInterface {
  error: string;
}

function InputError({ error }: InputErrorInterface) {
  return <div className="text-red-500 mt-[10px] px-[2px]">{error}</div>;
}

export default InputError;
