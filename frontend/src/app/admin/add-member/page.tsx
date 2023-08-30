"use client";

import { Separator } from "@radix-ui/react-separator";
import { AddMemberForm } from "./add-member-form";

export default function AddMemberPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Add a Member</h3>
        <p className="text-sm text-muted-foreground">
          This form it to add a member to the organization and assign them an
          NFT
        </p>
      </div>
      <Separator />

      {/* <ProfileForm /> */}
      <main>
        <AddMemberForm />
      </main>
    </div>
  );
}
