import { Sofia_Sans } from "@next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BigButton } from "./big_button";

interface NavProps {
  showSignIn?: boolean;
}
const sofia = Sofia_Sans({ subsets: ["latin"], variable: "--font-sofia" });

export const NavigationHeader: React.FC<NavProps> = ({ showSignIn }) => {
  const { data: sessionData } = useSession();

  return (
    <div className="mx-[50px] mt-[57px] flex items-center justify-between">
      <Link href={"/"} className={`shrink-1 text-6xl ${sofia.className}`}>
        BoVoDé
      </Link>
      <div className="flex flex-1 items-center justify-end">
        <NavigationLink link={"/about"} label={"À propos"} />
        <NavigationLink link={"/projects"} label={"Projets"} />
        <NavigationLink link={"/blog"} label={"Blog"} />
        {sessionData?.user?.admin ? (
          <NavigationLink link={"/admin"} label={"Admin"} />
        ) : null}
        {showSignIn ? (
          <button
            className="mx-[50px] text-2xl"
            onClick={
              sessionData ? () => void signOut() : () => void signIn("google")
            }
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        ) : null}

        <BigButton label="Prendre contact" redirect="/contact" className="" />
      </div>
    </div>
  );
};

interface NavigationLinkProps {
  link: string;
  label: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ link, label }) => {
  return (
    <Link href={link} className="mx-[50px] text-2xl">
      {label}
    </Link>
  );
};
