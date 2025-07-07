"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import NextLink from "next/link";
import { Button, Image, Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import { TbMeat } from "react-icons/tb";
import { BsCashCoin } from "react-icons/bs";
import { RiAlertLine } from "react-icons/ri";
import { BiDoorOpen } from "react-icons/bi";
import { GoPeople } from "react-icons/go";

import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-full md:basis-1/5" justify="center">
        <NavbarBrand as="li" className="gap-3">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image alt="logo" height={32} src="/axonsEyeLogo.png" width={32} />
            <p className="font-bold text-inherit">AXONS Eyes</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-full" justify="start">
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            color={pathname === "/shoplifter" ? "primary" : "default"}
            href={"/shoplifter"}
            variant={pathname === "/shoplifter" ? "solid" : "light"}
          >
            Shoplifter
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            color={pathname === "/freshfood" ? "primary" : "default"}
            href={"/freshfood"}
            variant={pathname === "/freshfood" ? "solid" : "light"}
          >
            Fresh Food
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            color={pathname === "/cashroom" ? "primary" : "default"}
            href={"/cashroom"}
            variant={pathname === "/cashroom" ? "solid" : "light"}
          >
            Cash Room
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            color={pathname === "/openlid" ? "primary" : "default"}
            href={"/openlid"}
            variant={pathname === "/openlid" ? "solid" : "light"}
          >
            Open Lid
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            color={pathname === "/onduty" ? "primary" : "default"}
            href={"/onduty"}
            variant={pathname === "/onduty" ? "solid" : "light"}
          >
            On Duty
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem className="flex items-center gap-2">
            <RiAlertLine />
            <Link color="foreground" href="/shoplifter" size="lg">
              Shoplifter
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="flex items-center gap-2">
            <TbMeat />
            <Link color="foreground" href="/freshfood" size="lg">
              Fresh Food
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="flex items-center gap-2">
            <BsCashCoin />
            <Link color="foreground" href="/cashroom" size="lg">
              Cash Room
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="flex items-center gap-2">
            <BiDoorOpen />
            <Link color="foreground" href="/openlid" size="lg">
              Open Lid
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="flex items-center gap-2">
            <GoPeople />
            <Link color="foreground" href="/onduty" size="lg">
              On Duty
            </Link>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
