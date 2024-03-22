import React from "react";
import Link from "next/link";

interface SidebarLinkProps {
        href : string;
        active : boolean;
        children : React.ReactNode;
    }
export const CustomLink : React.FC<SidebarLinkProps> = ({ href, active, children }) => {
    return (
      <Link className={ `sidebar-link ${ active ? "active" : "" }` } href={ href } passHref>
          { children }
      </Link>
    );
};