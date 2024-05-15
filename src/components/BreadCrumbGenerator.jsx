import { ROLES_LIST } from "@/lib/config";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";
import { Link } from "react-router-dom";

function BreadCrumbGenerator({ crumbs, role }) {
  const content = crumbs.map((crumb, index) => {
    if (index == crumbs.length - 1) {
      return (
        <React.Fragment key={crumb}>
          {crumbs.length > 1 && <BreadcrumbSeparator />}
          <BreadcrumbItem>
            <BreadcrumbPage>
              {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </React.Fragment>
      );
    } else if (index === 0) {
      return (
        <BreadcrumbItem key={crumb}>
          <BreadcrumbLink asChild>
            <Link to={`/${ROLES_LIST[role]}/${crumb}`}>
              {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    } else {
      return (
        <React.Fragment key={crumb}>
          <BreadcrumbSeparator />
          <BreadcrumbItem key={crumb}>
            <BreadcrumbLink asChild>
              <Link
                to={`/${ROLES_LIST[role]}/${crumbs
                  .slice(0, index + 1)
                  .join("/")}`}
              >
                {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>
      );
    }
  });
  return content;
}

export default BreadCrumbGenerator;
