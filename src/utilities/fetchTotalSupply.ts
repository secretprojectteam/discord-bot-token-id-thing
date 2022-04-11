import { ethers } from "ethers";
import { abi } from "./abi";
import { contractAddress } from "./dotenv";

export let totalSupply = 0;

export async function fetchTotalSupply() {
    const provider = ethers.getDefaultProvider();
    const contract = new ethers.Contract(contractAddress, abi, provider);
    totalSupply = await contract.totalSupply();
}