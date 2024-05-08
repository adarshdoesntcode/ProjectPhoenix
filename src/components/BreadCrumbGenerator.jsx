import { ROLES_LIST } from "@/config/roleList";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

function BreadCrumbGenerator({ crumbs, role }) {
  const content = crumbs.map((crumb, index) => {
    if (index == crumbs.length - 1) {
      return (
        <>
          {crumbs.length > 1 && <BreadcrumbSeparator />}
          <BreadcrumbItem>
            <BreadcrumbPage>
              {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </>
      );
    } else if (index === 0) {
      return (
        <BreadcrumbItem key={crumb}>
          <BreadcrumbLink key={index} href={`/${ROLES_LIST[role]}/${crumb}`}>
            {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    } else {
      return (
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem key={crumb}>
            <BreadcrumbLink
              key={index}
              href={`/${ROLES_LIST[role]}/${crumbs
                .slice(0, index + 1)
                .join("/")}`}
            >
              {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </>
      );
    }
  });
  return content;
}

export default BreadCrumbGenerator;
