import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/admin/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Admin Page",
  description:
    "Contains Everything you need to build a successful organization",
};

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Mint NFTS",
    href: "/admin/mint",
  },
  {
    title: "Add Members",
    href: "/admin/add-member",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden p-10 pb-16 space-y-6 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
          <p className="text-muted-foreground">
            Where you can monitor and maintain your organization.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
