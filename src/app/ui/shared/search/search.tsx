"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "../button/PrimaryButton";
import CustomInput from "../Input/CustomInput";

type Props = {
  placeholder: string;
};

function Search({ placeholder }: Props) {
  const [inputValue, setInputValue] = useState("");
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch();
  };

  const performSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("q", inputValue.trim());
    replace(`${pathname}?${params}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-[10px] p-[10px]"
    >
      <CustomInput
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={handleKeyPress}
      />
      <PrimaryButton text="검색" htmlType="submit" />
    </form>
  );
}

export default Search;
