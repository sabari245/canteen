"use client";

import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function Home() {

  // routing
  const router = useRouter();

  // wallet details
  const { status, address } = useAccount();

  // chain interactors
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // Events
  useEffect(()=>{
    if(status == "disconnected") {
      router.push("/auth");
    }
  }, [status])

  return (
    <main className="min-h-screen">
      {
          status == "connecting" && (
            <div className="w-screen h-screen flex justify-center items-center">
              <Spinner />
            </div>
          )
      }
      {
        status == "connected" && (
          <div>hello world</div>
        )
      }
    </main>
  );
}
