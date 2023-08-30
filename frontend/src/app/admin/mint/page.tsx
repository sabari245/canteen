"use client";

import { Separator } from "@radix-ui/react-separator";
import { MintForm } from "./mint-form";

export default function MintPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Mint an NFT</h3>
        <p className="text-sm text-muted-foreground">
          This form it to mint an NFT
        </p>
      </div>
      <Separator />

      {/* <ProfileForm /> */}
      <main>
        <MintForm />
      </main>
    </div>
  );
}
