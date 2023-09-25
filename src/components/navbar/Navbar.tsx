'use client';

import { SafeUser } from "../../../types";
import Container from "../Container";
import Category from "../categories/Category";
import SignupModal from "../modal/SignupModal";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

type Props={
  user?:any
}

export default function Navbar({user}:Props) {
  return (
    <>
    
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu cUser={user}/>
          </div>
        </Container>
      </div>
      <Category />
    </div>
    </>
  );
}
