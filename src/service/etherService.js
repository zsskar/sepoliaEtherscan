import { ethers, formatEther } from 'ethers';
import moment from 'moment';

const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/25387327acc14381911bf8f56e8f500c');

export function shortenAddress(address) {
    if (address?.length <= 10) throw new Error("Invalid address length");
    if (address) {
        const addressInString = address.toString();
        const prefix = addressInString.substring(0, 10);
        const suffix = addressInString.substring(addressInString.length - 10);

        return `${prefix}...${suffix}`;
    }
}
export function convertTimestampToFormattedDate(timestamp) {
    // Convert timestamp to milliseconds
    var date = new Date(timestamp * 1000);

    // Months array
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get date components
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    // Format the time
    var formattedTime = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Get IST offset
    // var istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5.5
    // var istTime = new Date(date.getTime() + istOffset);

    // Format the date string
    var formattedDate = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + formattedTime + ' +UTC';

    return formattedDate;
}

export function findProposedDetails(block) {
    if (block) {
        // Calculate the slot number based on the block's timestamp and slot duration
        const slotDuration = 12; // Ethereum 2.0 slot duration in seconds
        const genesisTime = 1606824000;
        const slot = Math.floor((block.timestamp - genesisTime) / slotDuration);

        // Calculate the epoch based on the slot number
        const epochLength = 32; // Slots per epoch in Ethereum 2.0
        const epoch = Math.floor(slot / epochLength);

        // Output proposal details
        return `Block proposed on slot ${slot}, epoch ${epoch}`;
    }
}

export async function getInternalTransactionCount(blockNumber) {
    // Get the block information with transactions
    const block = await provider.getBlockWithTransactions(blockNumber);
    
    // Filter transactions that are internal (i.e., have a `creates` field)
    const internalTransactions = block.transactions.filter(tx => tx.creates !== null);

    return internalTransactions.length;
}

export async function findWithdrawals(blockNumber) {
    try {
        const block = await provider.getBlock(blockNumber);
        const withdrawals = [];

        for (const txHash of block.transactions) {
            const tx = await provider.getTransaction(txHash);
            // Check if the transaction sends funds to another account (i.e., it's a withdrawal)
            if (tx.value.gt(0)) {
                withdrawals.push({
                    hash: tx.hash,
                    from: tx.from,
                    to: tx.to,
                    value: ethers.utils.formatEther(tx.value)
                });
            }
            // You may add additional checks for token transfers or interactions with specific contracts
        }

        return withdrawals;
    } catch (error) {
        throw new Error('Error finding withdrawals: ' + error.message);
    }
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

export function WeiToEther(wei) {
    // const weiAmount = ethers.BigNumber.from(wei);
    return formatEther(wei);
}

export const getBlockDetails = async (blockNumber) => {
    try {
        return await provider.getBlock(parseInt(blockNumber));
    } catch (error) {
        console.log(error);
        return undefined;
    }
};






