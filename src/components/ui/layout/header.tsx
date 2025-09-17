"use client";

import { layoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";

export const Logo = () => {
  return <Image src="/logo.png" alt="logo" width={30} height={45} priority />;
};

export default function Header() {
  const pathname = usePathname();
  const { isAuth, session, status, setAuthState } = useAuthStore();

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.log(error);
    }
    setAuthState("unauthenticated", null);
  };

  const getNavItems = () => {
    return siteConfig.navItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <NavbarItem key={item.href}>
          <Link
            color="foreground"
            href={item.href}
            className={`${
              isActive ? "text-blue-500" : "text-foreground"
            } px-3 py-1 hover:text-blue-300
                transition-colors 
                duration-200`}
          >
            {item.label}
          </Link>
        </NavbarItem>
      );
    });
  };

  return (
    <Navbar style={{ height: layoutConfig.headerHeihgt }}>
      <NavbarBrand>
        <Link href="/" className="flex gap-1">
          <p className="font-bold text-inherit">FR</p>
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavItems()}
      </NavbarContent>
      {}
      <NavbarContent justify="end">
        {isAuth && <p>Привет, {session?.user?.email}!</p>}
        {status === "loading" ? (
          <p>Загрузка...</p>
        ) : !isAuth ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                className="text-white"
                as={Link}
                color="secondary"
                href="#"
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                Вход
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                className="text-white"
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Регистрация
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Button
              className="text-white"
              as={Link}
              color="secondary"
              href="#"
              variant="flat"
              onPress={handleSignOut}
            >
              Выйти
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  );
}
