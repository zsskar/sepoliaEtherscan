import LatestBlocks from "./LatestBlocks";
import LatestTransactions from "./LatestTransactions";

import '../css/blockandtxn.css';

function BlocksAndTxns() {
    return (
        <>
            <section className="container-xxl pb-20 mt-n16">
                <div className="row gx-4" id="cardsWrapper">
                    <LatestBlocks />
                    <LatestTransactions />
                </div>
            </section>
        </>
    )
}

export default BlocksAndTxns;
