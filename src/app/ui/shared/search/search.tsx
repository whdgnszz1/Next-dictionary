"use client";

import React, { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "antd";

type Props = {
  placeholder: string;
};

function Search({ placeholder }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (e.target.value) {
        e.target.value.length >= 2 && params.set("q", e.target.value);
      } else {
        params.delete("q");
      }

      replace(`${pathname}?${params}`);
    },
    300
  );

  return (
    <div className="flex items-center gap-[10px] p-[10px] w-full">
      <p>키워드</p>
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-black border-[2px] outline-none py-1 px-2 rounded-lg text-sm"
        onChange={handleSearch}
      />
      <Button className="border-[2px] border-black text-semibold">검색</Button>
    </div>
  );
}

export default Search;
