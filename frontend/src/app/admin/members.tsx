import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

interface MemberCardProps {
  avatarFallback: string;
  name: string;
  email: string;
  amount: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  avatarFallback,
  name,
  email,
  amount,
}) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="ml-auto font-medium">{amount}</div>
    </div>
  );
};

export function Members() {
  return (
    <div className="space-y-8">
      <MemberCard
        avatarFallback="OM"
        name="Olivia Martin"
        email="olivia.martin@email.com"
        amount="1999"
      />
      <MemberCard
        avatarFallback="JL"
        name="Jackson Lee"
        email="jackson.lee@email.com"
        amount="39"
      />
      <MemberCard
        avatarFallback="IN"
        name="Isabella Nguyen"
        email="isabella.nguyen@email.com"
        amount="299"
      />
      <MemberCard
        avatarFallback="WK"
        name="William Kim"
        email="will@email.com"
        amount="99"
      />
      <MemberCard
        avatarFallback="SD"
        name="Sofia Davis"
        email="sofia.davis@email.com"
        amount="39"
      />
    </div>
  );
}
