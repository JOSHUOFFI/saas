'use client'

import Image from "next/image"
import Link from "next/link"
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"
import NavItems from "./Navitems";



const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo"
            width={47}
            height={44}
          />

        </div>
      </Link>

      <div className="flex items-center gap-7">
        <NavItems />
        <Show when="signed-out">
          <div>
            <SignInButton>
              <button className="btn-signin"> Sign-In </button>
            </SignInButton>
          </div>
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>

      </div>
    </nav>
  )
}

export default Navbar
