import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePublicClient, useWalletClient } from "wagmi";
import contract from "@/components/interface.json";

type AddMemberFormValues = {
  account: string;
  initialTokens: number;
  vestingPeriod: string;
};

export function AddMemberForm() {
  const form = useForm<AddMemberFormValues>();

  // chain interactors
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  async function onSubmit(formData: AddMemberFormValues) {
    // Handle form submission

    if (!walletClient) {
      console.log("wallets not connected");
      return;
    }

    const [address] = await walletClient.getAddresses();

    const vestingPeriod = calculateVestingPeriod(formData.vestingPeriod);

    const { request } = await publicClient.simulateContract({
      abi: contract.abi,
      address: `0x${contract.address.substring(2)}`,
      functionName: "addMember",
      args: [formData.account, formData.initialTokens, vestingPeriod],
      account: address,
    });

    const hash = await walletClient.writeContract(request);
  }

  function calculateVestingPeriod(vestingPeriod: string): number {
    const enteredDate = new Date(vestingPeriod).getTime();
    const currentDate = Date.now();
    const differenceInMilliseconds = enteredDate - currentDate;
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Input placeholder="Enter account" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initialTokens"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Tokens</FormLabel>
              <FormControl>
                <Input placeholder="Enter initial tokens" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vestingPeriod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vesting Period</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  placeholder="Enter vesting period"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Add Member</Button>
      </form>
    </Form>
  );
}
