import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const AccountButton = () => {
  return (
    <span className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </span>
  );
};

export default AccountButton;
