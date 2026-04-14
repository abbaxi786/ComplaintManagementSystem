"use client";
import Link from "next/link";
// import { useContext} from "react";
// import { UserContext } from "./lib/context";
// import axios from "axios";
import LandingPage from "./pages/home/page";

export default function Home() {
  // const { user } = useContext(UserContext);
    // console.log(user);
  



  return (
    <div className="mx-11">
      <LandingPage/>
    </div>
  );
}