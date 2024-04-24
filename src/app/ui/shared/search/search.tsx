"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "antd";

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
    if (inputValue.length >= 2) {
      params.set("q", inputValue);
    } else {
      params.delete("q");
    }
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
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={handleKeyPress}
      />
      <Button type="primary" htmlType="submit">
        검색
      </Button>
    </form>
  );
}

export default Search;
