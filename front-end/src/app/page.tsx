import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <Link href="/signup">Sign Up</Link>
      <Link href="/signin">Sign In</Link>
    </>
  );
}
