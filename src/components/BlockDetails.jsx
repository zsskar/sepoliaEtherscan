import '../assets/css/theme.min.css';
import '../assets/css/custom.css';
import '../assets/css/theme.min.css';
import '../assets/js/jquery.min.js';
import { convertTimestampToFormattedDate, findProposedDetails, findWithdrawals, getInternalTransactionCount, timeStampToAgoTime } from '../service/etherService.js';

function BlockDetails({ block }) {
    console.log(block);
    return (
        <main id="content" className="main-content" role="main">
            <section className="container-xxl">
                <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom gap-3 py-5">
                    <div className="d-flex flex-column gap-1">
                        <div className="d-flex flex-wrap align-items-center gap-1">
                            <h1 className="h5 me-1 mb-0">
                                Block
                            </h1>
                            <div className="text-muted text-break">
                                #{block.number}
                            </div>
                        </div>
                        <div className="d-flex flex-wrap gap-1 text-break">
                        </div>
                    </div>
                </div>
            </section>
            <span id="ContentPlaceHolder1_lblTextAd" />
            <section className="container-xxl pt-2 pb-12">
                {/* <ul className="nav nav-pills text-nowrap snap-x-mandatory overflow-x-auto flex-nowrap py-3 gap-2 nav_tabs1" id="myTab" role="tablist">
                    <li className="nav-item snap-align-start">
                        <a className="nav-link active"  id="overview-tab" data-bs-toggle="pill" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true" onClick={handleUpdateHash('')}>
                            Overview
                        </a>
                    </li>
                    <li id="ContentPlaceHolder1_li_consensusinfo" className="nav-item snap-align-start">
                        <a className="nav-link" id="consensusinfo-tab" data-bs-toggle="pill" data-bs-target="#consensusinfo" type="button" role="tab" aria-controls="consensusinfo" aria-selected="false" onClick={handleUpdateHash('consensusinfo')}>
                            Consensus Info
                        </a>
                    </li>
                    <li id="ContentPlaceHolder1_li_blobInfo" className="nav-item snap-align-start">
                        <a className="nav-link"  id="blobinfo-tab" data-bs-toggle="pill" data-bs-target="#blobinfo" type="button" role="tab" aria-controls="blobinfo" aria-selected="false" onClick={handleUpdateHash('blobinfo')}>
                            Blob Info
                        </a>
                    </li>
                </ul> */}
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab" tabIndex={0}>
                        <div id="ContentPlaceHolder1_maintable">
                            <div className="card p-5 mb-3">
                                <div className="row"><div className="col-md-12 text-danger fw-bold fw-sm-normal mb-1 mb-md-0">[ This is a Sepolia <strong>Testnet</strong> block only ]</div></div> <hr className="opacity-75 my-5" />
                                <div className="row gy-2 mb-4">
                                    <div className="col-auto col-md-3 text-dt">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block." /> Block Height:
                                    </div>
                                    <div className="col col-md-9">
                                        <div className="d-flex align-items-center gap-2">
                                            <div>
                                                {block.number}
                                            </div>
                                            {/* <div className="text-nowrap"><a className="btn btn-sm btn-secondary py-0.5" href="/block/5659242" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View previous block" data-bs-placement="top"><i className="fa fa-chevron-left small" /></a>
                                                <a className="btn btn-sm btn-secondary py-0.5" href="/block/5659244" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View next block" data-bs-placement="top"><i className="fa fa-chevron-right small" /></a></div> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-auto col-md-3 text-dt mb-1 mb-md-0">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="The finality status of the block. " />
                                        Status:</div>
                                    <div className="col col-md-9">
                                        {block.baseFeePerGas !== null || block.baseFeePerGas !== undefined ? <span className="badge bg-success bg-opacity-10 border border-success border-opacity-25 text-green-600 fw-medium py-1.5 px-2" data-bs-toggle="tooltip" data-bs-trigger="hover" title="This block is finalized and cannot be reverted without slashing at least 1/3 of all validators stake.">
                                            <i className="fa fa-check-circle" /> Finalized
                                        </span>

                                            : <span className="badge bg-secondary bg-opacity-10 border border-secondary border-opacity-25 text-dark fw-medium py-1.5 px-2" data-bs-toggle="tooltip" data-bs-trigger="hover"><i class="fa fa-hourglass-start text-secondary me-0.5"></i> Unfinalized</span>
                                        }

                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="The date and time at which a block is produced." /> Timestamp:
                                    </div>
                                    <div className="col-md-9">
                                        <i className="far fa-clock small" />
                                        {timeStampToAgoTime(block.timestamp)} (<span id="showUtcLocalDate" >{convertTimestampToFormattedDate(block.timestamp)}</span>)
                                    </div>
                                </div>
                                {/* <div id="ContentPlaceHolder1_divhSlotEpoch" className="row mb-4">
                                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="Slot and epoch this block is proposed on." /> Proposed On:
                                    </div>
                                    <div className="col-md-9">
                                       {findProposedDetails(block)}
                                    </div>
                                </div> */}
                                <div id="ContentPlaceHolder1_div_tx_fieldname">
                                    <div className="row">
                                        <div className="col-md-3 text-dt mb-2 mb-md-0">
                                            <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="The number of transactions in the block. Internal transaction is transactions as a result of contract execution that involves Ether value." /> Transactions:
                                        </div>
                                        <div id="ContentPlaceHolder1_div_tx_fieldvalue" className="col-md-9">
                                            <a href="/txs?block=5659243" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Click to view Transactions">{block.transactions.length} transactions</a>
                                            {/* and <a href="/txsInternal?block=5659243" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Click to view Internal Transactions">{getInternalTransactionCount(block)} contract internal transactions</a> in this block */}
                                        </div>
                                    </div>
                                </div>
                                {/* <div id="ContentPlaceHolder1_div_withdrawal_fieldname" className="mt-4">
                                    <div className="row">
                                        <div className="col-md-3 text-dt mb-2 mb-md-0">
                                            <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="Number of beacon withdrawals in this block" /> Withdrawals:
                                        </div>
                                        <div id="ContentPlaceHolder1_div_withdrawal_fieldvalue" className="col-md-9">
                                            <a href="/txsBeaconWithdrawal?block=5659243" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Click to view withdrawals">{findWithdrawals(block)} withdrawals</a> in this block
                                        </div>
                                    </div>
                                </div> */}
                                <hr className="opacity-75 my-5" />
                                {/* <div className="row mb-4">
                                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="Address receiving fees from transactions in this block" /> Fee Recipient:
                                    </div>
                                    <div className="col-md-9">
                                        <a href="/address/0x0000006916a87b82333f4245046623b23794c65c">0x0000006916a87b82333f4245046623b23794C65C</a> <a className="js-clipboard link-secondary  " href="javascript:;" data-clipboard-text="0x0000006916a87b82333f4245046623b23794C65C" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Copy Address" ><i id="linkIcon_1" className="far fa-copy fa-fw" /> </a>in 12 secs
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="For each block, the block producer is rewarded with a finite amount of Ether on top of the fees paid for all transactions in the block." /> Block Reward:
                                    </div>
                                    <div className="col-md-9">
                                        0<b>.</b>018271361261265358 ETH (<span rel="tooltip" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Static Block Reward">0</span> + <span rel="tooltip" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Transaction Fees">0.01827507115555546</span><span rel="tooltip" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" title="Burnt Fees"> - 0.000003709894290102</span>)
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="Total difficulty of the chain until this block." /> Total Difficulty:
                                    </div>
                                    <div className="col-md-9">
                                        17,000,018,015,853,232
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="The block size is actually determined by the block's gas limit." /> Size:
                                    </div>
                                    <div className="col-md-9">
                                        28,084 bytes
                                    </div>
                                </div>
                                <hr className="opacity-75 my-5" />
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="The total gas used in the block and its percentage of gas filled in the block." /> Gas Used:
                                    </div>
                                    <div className="col-md-9 d-flex align-items-center">
                                        7,109,883 <span className="text-muted"> (23.70%)</span>
                                        <div className="d-flex align-items-center"><span id="gasTargetChart" /><span id="gasTargetText" /></div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="Total gas limit provided by all transactions in the block." /> Gas Limit:
                                    </div>
                                    <div className="col-md-9">
                                        30,000,000
                                    </div>
                                </div>
                                <div className="row mb-4"><div className="col-md-3 text-dt mb-2 mb-md-0"><i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="Post-London Upgrade, this represents the minimum gasUsed multiplier required for a tx to be included in a block. " /> Base Fee Per Gas:</div><div className="col-md-9">0<b>.</b>000000000000521794 ETH <span className="text-muted">(0<b>.</b>000521794 Gwei)</span></div></div><div className="row mb-4"><div className="col-md-3 text-dt mb-2 mb-md-0"><i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="Post-London Upgrade, this represents the part of the tx fee that is burnt:� baseFeePerGas * gasUsed." /> Burnt Fees:</div><div className="col-md-9">🔥 0<b>.</b>000003709894290102 ETH</div></div>
                                <div id="ContentPlaceHolder1_divExtraData" className="row mb-4">
                                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                                        <i className="far fa-question-circle me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="top" data-original-title title data-bs-content="Any data that can be included by the block producer in the block." /> Extra Data:
                                    </div>
                                    <div className="col-md-9">
                                        ؃ �geth�go1.22.0�linux (Hex:0xd883010d0d846765746888676f312e32322e30856c696e7578)
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="d-flex align-items-baseline fs-sm text-muted gap-1 mb-3">
                            <i className="far fa-lightbulb-on" />
                            <span>
                                Blocks are batches of transactions linked via cryptographic hashes. Any tampering of a block would invalidate all following blocks as all subsequent hashes would change. Learn more about this page in our <a target="_blank" href="https://info.etherscan.com/exploring-block-details-page/">Knowledge Base</a>.
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default BlockDetails;
