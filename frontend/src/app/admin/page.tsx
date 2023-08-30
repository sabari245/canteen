"use client";

import { Separator } from "@/components/ui/separator";
import { Members } from "./members";
import { InfoCard } from "./card";
import { useEffect, useState } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import data from "@/components/interface.json";

export default function AdminPage() {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [tokens, setTokens] = useState<number>();

  useEffect(() => {
    async function main() {
      if (walletClient) {
        const [address] = await walletClient.getAddresses();

        const result = await publicClient.readContract({
          abi: data.abi,
          address: `0x${data.address.substring(2)}`,
          functionName: "getOrganizationDetailsOfSender",
          account: address,
        });

        let temp = result as [string, string, number];

        console.log(result);
        setTokens(parseInt(temp[2].toString()));
      }
    }

    main();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Dashboard</h3>
        {/* <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p> */}
      </div>
      <Separator />

      {/* <ProfileForm /> */}
      <main>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard
            title="Token"
            value={tokens ?? 0}
            info="total supply of the token"
          />
          {/* <InfoCard
            title="Reserved"
            value={100}
            info="total number of tokens reserved for members"
          /> */}
        </div>
        <h3 className="text-lg font-medium">Members</h3>
        <div className="mt-8">
          <Members />
        </div>
      </main>
    </div>
  );
}
