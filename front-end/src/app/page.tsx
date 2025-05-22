import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <div>
        企業の方はこちら
        <Link href="/signup/company">Sign Up</Link>
        <Link href="/signin/company">Sign In</Link>
      </div>
      <div>
        学生の方はこちら
        <Link href="/signup/studeny">Sign Up</Link>
        <Link href="/signin/student">Sign In</Link>
      </div>
    </>
  );
}
