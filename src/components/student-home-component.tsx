"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function StudentHomeComponent() {
  return (
    <Button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
      Sign Out
    </Button>
  );
}
