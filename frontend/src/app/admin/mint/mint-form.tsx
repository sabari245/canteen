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

type MintFormValues = {
  address: string;
  amountToMint: number;
};

export function MintForm() {
  const form = useForm<MintFormValues>();

  // chain interactors
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  async function onSubmit(formData: MintFormValues) {
    // Handle form submission

    if (!walletClient) {
      console.log("wallets not connected");
      return;
    }

    const [address] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      abi: contract.abi,
      address: `0x${contract.address.substring(2)}`,
      functionName: "mintTokens",
      args: [formData.address, formData.amountToMint],
      account: address,
    });

    const hash = await walletClient.writeContract(request);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="address"
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
          name="amountToMint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount to Mint</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter amount to mint"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Mint Token</Button>
      </form>
    </Form>
  );
}
