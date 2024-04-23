export const BORDER = 2;

interface MenuItemStyleProps {
  path: string;
  currentPath: string;
}

export const getMenuItemClass = ({
  path,
  currentPath,
}: MenuItemStyleProps): string => {
  const isActive = currentPath.includes(path);
  const borderStyle = path === "/compare" ? `border-x-[2px]` : `border-r-[2px]`;
  return `flex items-center justify-center h-full ${borderStyle} border-t-[2px] px-6 font-bold border-black cursor-pointer ${
    isActive ? "bg-[#374484] text-white" : "bg-white text-black"
  }`;
};
