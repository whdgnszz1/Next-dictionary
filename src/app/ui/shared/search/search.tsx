"use client";

import React, { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button, Input } from "antd";

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
    <div className="flex items-center gap-[10px] p-[10px]">
      <Input type="text" placeholder={placeholder} onChange={handleSearch} />
      <Button>검색</Button>
    </div>
  );
}

export default Search;
