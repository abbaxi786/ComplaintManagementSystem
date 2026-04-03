"use client";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./lib/context";

export default function Home() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <Link href={'/pages/logIn'}>This is logIn</Link><br/>
      <Link href={'/pages/sign'}>This is signIn</Link>
    </div>
  );
}