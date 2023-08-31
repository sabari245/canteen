import { createPublicClient, createWalletClient, http, PublicClient, WalletClient, WriteContractParameters } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { Chain, localhost } from 'viem/chains'
import { data } from "./contract";

type GetWalletClientResult = WalletClient | null

const localnet: Chain = {
  ...localhost,
  id: 31337,
};

const account = privateKeyToAccount(process.env.PRIVATE_KEY! as `0x${string}`);

const publicClient = createPublicClient({
  chain: localnet,
  transport: http()
})

const walletClient = createWalletClient({ 
  account,
  chain: localnet,
  transport: http()
})

async function createOrder(
  publicClient: PublicClient,
  walletClient: GetWalletClientResult | undefined,
  orderId: number,
  price: number
): Promise<void> {
  if (!walletClient) {
    console.log('cannot import account');
    return;
  }

  const [address] = await walletClient.getAddresses();

  const { request } = await publicClient.simulateContract({
    abi: data.abi,
    address: data.address as `0x${string}`,
    functionName: 'createOrder',
    args: [orderId, price],
    account: address,
  });

  const hash = await walletClient.writeContract(request);
}

async function orderPurchased(
  publicClient: PublicClient,
  walletClient: GetWalletClientResult | undefined,
  orderId: number,
  payer: string
): Promise<void> {
  if (!walletClient) {
    console.log('cannot import account');
    return;
  }

  const [address] = await walletClient.getAddresses();

  const { request } = await publicClient.simulateContract({
    abi: data.abi,
    address: data.address as `0x${string}`,
    functionName: 'orderPurchased',
    args: [orderId, payer],
    account: address,
  });

  const hash = await walletClient.writeContract(request);
}