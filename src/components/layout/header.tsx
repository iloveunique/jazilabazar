"use client";
import { useMe } from "@/hooks/api/user/useMe";
import { useIsHomePage } from "@/hooks/use-is-homepage";
import Link from "next/link";
import { useEffect } from "react";
import GradientLogo from "../common/shared/gradient-logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Icons } from "../ui/icons";
import StaticMenu from "./manu/static-menu";
import dynamic from "next/dynamic";
import { useHeaderSearch } from "@/hooks/useSearchHook";


const Search = dynamic(() => import('@/components/ui/search/search'));


const Header = ({ layout }: { layout?: string }) => {
 
  const headerSearch = useHeaderSearch((state)=>state)
  const { me } = useMe();

  const isHomePage = useIsHomePage();
 

  useEffect(() => {
    if (!isHomePage) {
      headerSearch.closeShowHeaderSearch()
    }
  }, [isHomePage, headerSearch.closeShowHeaderSearch]);
 
  return (
    <header className="flex justify-between w-full">
      <div className="flex items-center w-full ">
        <Link href={"/"}>
          <GradientLogo />
        </Link>

        {/* <div className="hidden ml-10  mr-auto  xl:block">
            <GroupsDropdownMenu />
          </div> */}
      </div>
      {isHomePage ? (
        <>
          {(headerSearch.showHeaderSearch || layout === "modern") && (
            <div className="hidden w-full px-10 mx-auto overflow-hidden lg:block ">
              <Search label="Search" variant="minimal" />
            </div>
          )}

          {headerSearch.showMobileHeaderSearch && (
            <div className="block lg:hidden w-full absolute top-0 left-0 right-0  bg-white pt-1.5 md:pt-2 px-5">
              <Search label="Search" variant="minimal" />
            </div>
          )}
        </>
      ) : null}
      <ul className="items-center shrink-0 hidden lg:flex space-x-10 rtl:space-x-reverse">
        <StaticMenu />
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Link
            href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/register`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center shrink-0 px-3 py-0 text-sm font-semibold leading-none transition duration-300 ease-in-out border border-transparent rounded outline-none h-9 bg-primary text-white hover:bg-accent-hover focus:outline-none focus:shadow focus:ring-1 focus:ring-primary-700"
          >
            Become Seller
          </Link>
          {me ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={me?.avatar} alt={me.lastName} />
                    <AvatarFallback>{me.lastName}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {me.firstName} {me.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {me.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/account">
                      <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                      Account
                      <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/account">
                      <Icons.terminal
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Dashboard
                      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild disabled>
                    <Link href="/dashboard/settings">
                      <Icons.settings
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/signout">
                    <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/signin"
              className={buttonVariants({
                size: "sm",
              })}
            >
              Sign In
              <span className="sr-only">Sign In</span>
            </Link>
          )}
        </div>
      </ul>
    </header>
  );
};

export default Header;
