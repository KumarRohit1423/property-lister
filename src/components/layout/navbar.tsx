"use client";

import { SignoutButton } from "@/components/auth/signout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const links = [{ href: "/", label: "Home" }];

  const NavLinks = () => (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-lg font-medium text-secondary transition-colors hover:underline"
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  const ThemeSwitcher = () => (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full text-secondary"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  const ProfileSection = () =>
    status === "authenticated" ? (
      <Button
        variant="ghost"
        className="relative h-8 w-8 items-center justify-center rounded-full"
      >
        <Link href="/profile">
          <Avatar className="h-8 w-8">
            {session.user.image ? (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name || "User avatar"}
              />
            ) : (
              <AvatarFallback>
                {session.user.name ? (
                  session.user.name.charAt(0).toUpperCase()
                ) : (
                  <User className="h-4 w-4" />
                )}
              </AvatarFallback>
            )}
          </Avatar>
        </Link>
      </Button>
    ) : (
      <Button
        variant="default"
        className="bg-secondary text-primary hover:text-secondary"
      >
        <Link href="/auth">Sign In</Link>
      </Button>
    );

  return (
    <nav className="border-b bg-muted-foreground px-4">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-secondary">
              Property Listers
            </Link>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            <NavLinks />
            <ThemeSwitcher />
            <ProfileSection />
            {status === "authenticated" && (
              <SignoutButton className="bg-muted text-secondary-foreground hover:bg-primary hover:text-secondary" />
            )}
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <ThemeSwitcher />
            {status === "authenticated" && <ProfileSection />}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-secondary"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] bg-muted-foreground sm:w-[400px]"
              >
                <nav className="mt-4 flex flex-col justify-center space-y-4">
                  <NavLinks />
                  {/* <ThemeSwitcher /> */}
                  {/* <ProfileSection /> */}
                  {status === "authenticated" ? (
                    <SignoutButton className="bg-muted text-secondary-foreground hover:bg-primary hover:text-secondary" />
                  ) : (
                    <Button
                      variant="default"
                      className="bg-secondary text-primary hover:text-secondary"
                    >
                      <Link href="/auth">Sign In</Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
