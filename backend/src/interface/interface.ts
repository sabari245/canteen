import { Web3, ContractAbi } from "web3";
import { data } from "./contract";

const web3 = new Web3("http://127.0.0.1:8545/");

const contract = new web3.eth.Contract(data.abi as ContractAbi, data.address);

const account = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY!);

export function createOrder(orderId: number, price: number) {
  contract.methods.createOrder(orderId, price).send({ from: account.address })
    .on("receipt", (receipt: any) => {
      console.log("Order created:", receipt);
    })
    .on("error", (error: any) => {
      console.error("Error creating order:", error);
    });
}

export function orderPurchased(orderId: number, payer: string) {
  contract.methods.orderPurchased(orderId, payer).send({ from: account.address })
    .on("receipt", (receipt: any) => {
      console.log("Order purchased:", receipt);
    })
    .on("error", (error: any) => {
      console.error("Error purchasing order:", error);
    });
}