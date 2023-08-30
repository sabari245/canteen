"use client";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import data from "@/components/interface.json";

export default function Claim() {
  type memberType = {
    isMember: boolean;
    vestingPeriod: number;
    tokens: number;
  };
  const [member, setMember] = useState<memberType>({
    isMember: false,
    vestingPeriod: 0,
    tokens: 0,
  });
  const [isChecked, setIsChecked] = useState<Boolean>(false);
  const [orgAddress, setOrgAddress] = useState<string>("");

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  async function handleAddressCheck(addr: string) {
    if (walletClient) {
      setOrgAddress(addr);

      const [address] = await walletClient.getAddresses();

      console.log(addr, address);

      const result = await publicClient.readContract({
        abi: data.abi,
        address: `0x${data.address.substring(2)}`,
        functionName: "getVestingInfo",
        args: [addr, address],
      });

      let temp = result as [number, number, number];

      console.log(result);

      setIsChecked(true);
      setMember({
        isMember: temp[0] > 0,
        vestingPeriod: temp[2],
        tokens: temp[0],
      });
    } else {
      console.log("wallet not connected");
    }
  }

  return (
    <div className="flex items-center justify-center w-screen min-h-screen">
      {isChecked ? (
        member.isMember ? (
          <ClaimToken
            tokens={member.tokens}
            vestingTime={member.vestingPeriod}
            orgAddress={orgAddress}
          />
        ) : (
          <NoTokens />
        )
      ) : (
        <CheckTokens onSubmit={handleAddressCheck} />
      )}
    </div>
  );
}

export function NoTokens() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sorry!</CardTitle>
        <CardDescription>
          Sorry, but you don't have tokens allocated
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

interface CheckTokensProps {
  onSubmit: (addr: string) => any;
}
export function CheckTokens(props: CheckTokensProps) {
  const [address, setAddress] = useState<string>("");
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">What's your Organization?</CardTitle>
        <CardDescription>
          Please, enter the organization you belong to
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter organization address"
        />
      </CardContent>
      <CardFooter className="flex-col">
        <Button onClick={() => props.onSubmit(address)} className="w-full">
          Check
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}

interface ClaimTokenProps {
  tokens: number;
  vestingTime: number;
  orgAddress: string;
}
export function ClaimToken(props: ClaimTokenProps) {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentTime = Date.now();
      const remainingTime =
        parseInt(props.vestingTime.toString()) - currentTime / 1000;
      if (remainingTime < 0) {
        setRemainingTime(0);
      } else {
        setRemainingTime(remainingTime);
      }
    };

    calculateRemainingTime();

    const interval = setInterval(calculateRemainingTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  async function handleClaimTokens() {
    if (!walletClient) {
      console.log("wallets not connected");
      return;
    }

    const [address] = await walletClient.getAddresses();
    console.log(address, props.orgAddress);

    const { request } = await publicClient.simulateContract({
      abi: data.abi,
      address: `0x${data.address.substring(2)}`,
      functionName: "claimVestedTokens",
      args: [props.orgAddress],
      account: address,
    });

    const hash = await walletClient.writeContract(request);
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Hello &amp; Welcome</CardTitle>
        <CardDescription>
          Please, claim your tokens once there is no <br />
          remaining time
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {remainingTime} <span className="text-base">s</span>
        </h1>
        <div>
          <p className="px-8 mt-2 text-sm text-center text-muted-foreground">
            remaining to claim
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        <Button
          variant={remainingTime > 0 ? "secondary" : "default"}
          className="w-full"
          onClick={remainingTime > 0 ? () => {} : handleClaimTokens}
        >
          {remainingTime > 0
            ? "Thanks for you patience"
            : `Claim ${props.tokens} tokens`}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
