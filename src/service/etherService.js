import { ethers, formatEther } from 'ethers';
import moment from 'moment';

const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/25387327acc14381911bf8f56e8f500c');

export function shortenAddress(address) {
    if (address?.length <= 10) throw new Error("Invalid address length");

    const prefix = address.substring(0, 10);
    const suffix = address.substring(address.length - 10);

    return `${prefix}...${suffix}`;
}

export function timeStampToAgoTime(timestamp) {
    const date = new Date(timestamp * 1000);

    // Get the current date and time
    const now = new Date();

    // Calculate the difference in milliseconds
    const difference = moment(now).diff(moment(date), 'milliseconds', true);

    // Convert milliseconds to seconds
    const secondsDifference = Math.floor(difference / 1000);

    if (secondsDifference < 60) {
        return `${secondsDifference} seconds ago`;
    } else {
        // Convert seconds to minutes
        const minutesDifference = Math.floor(secondsDifference / 60);
        return `${minutesDifference} minutes ago`;
    }
}

export function calculateBlockReward(baseFeePerGas, gasUsed, blockReward) {
    if (gasUsed === 0n) {
        return 0n; // Return BigInt zero if gasUsed is zero to avoid division by zero error
    } else {
        // Convert baseFeePerGas and blockReward to BigInt before calculation
        const baseFeePerGasBigInt = BigInt(baseFeePerGas);
        const blockRewardBigInt = BigInt(blockReward);
        
        // Perform the calculation using integer division
        const totalReward = baseFeePerGasBigInt * BigInt(gasUsed) + blockRewardBigInt;
        const blockRewardBigIntRounded = totalReward / BigInt(gasUsed);

        // Convert reward to Ether
        const rewardInEther = blockRewardBigIntRounded / 10n ** 18n;

        return rewardInEther;
    }
}


// export function calculateBlockReward(baseFeePerGas, gasUsed, blockReward) {

//     console.log(baseFeePerGas, gasUsed, blockReward);
//     // Convert baseFeePerGas to BigInt
//     const baseFeePerGasBigInt = BigInt(baseFeePerGas);

//     // Calculate gas price
//     const gasPrice = baseFeePerGasBigInt + (BigInt(86900736) / BigInt(gasUsed)); // Assuming excessBlobGas = 86900736

//     // Calculate gas fees
//     const gasFees = Number((gasPrice - baseFeePerGasBigInt) * BigInt(gasUsed));

//     // Convert gas fees to ETH
//     const gasFeesInEth = gasFees / 10 ** 9;

//     // Calculate total block reward
//     const totalBlockReward = blockReward + gasFeesInEth;

//     return totalBlockReward;
// }



// Function to get the latest blocks
export async function getLatestBlocks(numBlocks) {
    try {
        const latestBlockNumber = await provider.getBlockNumber();
        const blocks = [];
        for (let i = latestBlockNumber; i > latestBlockNumber - numBlocks; i--) {
            const block = await provider.getBlock(i);
            blocks.push(block);
        }
        return blocks;
    } catch (error) {
        console.error('Error fetching latest blocks:', error);
        return [];
    }
}

export const fetchLatestTransactions = async (numberOfBlocks) => {
    try {

        // Get the latest block number
        const latestBlockNumber = await provider.getBlockNumber();

        let transactions = [];

        let propertyToAdd = "timestamp";
        let propertyValue;

        // Fetch transactions in batches
        for (let i = 0; i < numberOfBlocks; i++) {
            const blockNumber = latestBlockNumber - i;
            const block = await provider.getBlock(blockNumber);
            propertyValue = block.timestamp;
            // Reverse the transactions array to get the latest transactions first
            let reversedTransactions = block.transactions.reverse();    
            // Limit transactions to the latest 6 transactions in the block
            transactions.push(...reversedTransactions.slice(0, 6));
        }

        // Fetch transaction details
        const transactionDetails = await Promise.all(transactions.map(txHash => provider.getTransaction(txHash)));
        let updatedList = transactionDetails.map(obj => ({
            ...obj,          // Spread the existing properties of the object
            [propertyToAdd]: propertyValue  // Add the new property
        }));
        // Return the latest transactions
        return updatedList;
    } catch (error) {
        console.error('Error fetching latest transactions:', error);
        return [];
    }
};

export function WeiToEther(wei){
    // const weiAmount = ethers.BigNumber.from(wei);
    return formatEther(wei);
}

export const getBlockDetails = async (blockNumber) => {
    try {
      const block = await provider.getBlock(parseInt(blockNumber));
      return block;
    } catch (error) {
        console.log(error);
      return undefined;
    }
  };






