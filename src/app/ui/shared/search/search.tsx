"use client";

import React, { ChangeEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
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

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (inputValue.length >= 2) {
      params.set("q", inputValue);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex items-center gap-[10px] p-[10px]">
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button onClick={handleSearch}>검색</Button>
    </div>
  );
}

export default Search;
