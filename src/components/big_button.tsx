import Link from "next/link";
import React from "react";

interface BigButtonProps {
  label: string;
  redirect: string;
}
export const BigButton: React.FC<
  BigButtonProps & React.HTMLAttributes<HTMLLinkElement>
> = ({ label, redirect, className }) => (
  <Link
    href={redirect}
    className={`${className} translate-y-[-10px] translate-x-[4px] rounded-full  border-[2px] border-black bg-secondary px-[27px] py-[14px] text-center text-xl font-bold drop-shadow-xl hover:translate-y-0 hover:translate-x-0 hover:drop-shadow-none`}
  >
    {label}
  </Link>
);
