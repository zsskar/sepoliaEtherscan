import { useState, useEffect } from 'react';
import { calculateBlockReward, getLatestBlocks, shortenAddress, timeStampToAgoTime } from '../service/etherService';
import Loader from './Loader';
import Tooltip from './Tooltip';
import { Link } from 'react-router-dom';

function LatestBlocks() {

    const [blocks, setBlocks] = useState([]);


    useEffect(() => {
        const fetchLatestBlocks = async () => {
            try {
                const blocks = await getLatestBlocks(6);
                setBlocks(blocks);
            } catch (error) {
                console.error('Error fetching latest blocks:', error);
            }
        };
        fetchLatestBlocks();
    }, []);

    console.log(blocks);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center gap-1">
                        <h2 className="card-header-title">
                            Latest Blocks
                        </h2>
                        <button type="button" id="card1AdvancedFilterListButton" className="btn btn-sm btn-ghost-white d-none" data-bs-toggle="modal" data-bs-target="#advancedFilterListModal" data-bs-card-index={1}>
                            <i className="far fa-pen-to-square fa-fw" />
                        </button>
                    </div>
                </div>
                {
                    blocks.length !== 0 ?

                        <><div className="card-body overflow-auto scrollbar-custom" style={{ maxHeight: '30.3rem' }} id="mCSB_1_container">
                            {blocks.map((block, index) => (
                                <>  <div className="row" key={index}>
                                    <div className="col-sm-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="d-none d-sm-flex content-center bg-light text-muted rounded p-3" style={{ height: '3rem', width: '3rem' }}><img style={{ width: '45px', height: '45px', maxWidth: '45px' }} src='/cubeIcon.png' /></div>
                                            <div className="d-flex flex-row flex-sm-column align-items-center align-items-sm-start gap-1 gap-sm-0">
                                                <span className="d-inline-block d-sm-none">Block</span><a className="text-truncate" style={{ maxWidth: '6rem', color: '#0000FF' }} href={`/block/${block.number}`}>{block.number}</a>
                                                <div className="small text-muted">{timeStampToAgoTime(block.timestamp)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-8 d-flex justify-content-sm-between align-items-end align-items-sm-center position-relative">
                                        <div className="pe-0 pe-sm-2">
                                            <div className="d-flex flex-wrap gap-1">
                                                Fee Recipient
                                                <Tooltip text={block.miner}>
                                                    <Link style={{ color: '#0000FF' }} data-highlight-value to={`/address/${block.miner}`} data-bs-toggle="tooltip" aria-describedby="tooltip514037">
                                                        <span data-highlight-target={block.miner}>{shortenAddress(block?.miner)}</span>
                                                    </Link>
                                                </Tooltip>

                                            </div>
                                            <Tooltip text="Transactions in this block"><Link style={{ color: '#0000FF' }} to={`/txs?block=${block.number}`} data-bs-toggle="tooltip">{block.transactions.length} txns </Link> </Tooltip>
                                            <span className="small text-muted me-2">in 12 secs</span>
                                            <span className="d-inline-block d-sm-none badge border border-dark dark:border-white border-opacity-15 text-dark fw-medium py-1 py-sm-1.5 px-1.5 px-sm-2" data-bs-toggle="tooltip">0<b>.</b>{calculateBlockReward(block.baseFeePerGas, block.gasUsed, 2)} Eth</span>
                                        </div>
                                        <div className="d-none d-sm-block text-end ms-2 ms-sm-0">
                                            <span className="badge border border-dark dark:border-white border-opacity-15 text-dark fw-medium py-1.5 px-2" data-bs-toggle="tooltip">0<b>.</b>{calculateBlockReward(block.baseFeePerGas, block.gasUsed, 2)} Eth</span>
                                        </div>
                                    </div>
                                </div>
                                    {index !== (blocks.length - 1) && <hr className="mt-3.5 mb-3.5" />}
                                </>
                            ))}

                        </div>
                            {/* <a className="card-footer bg-light fw-medium text-cap link-muted text-center" href="/blocks"> View all blocks </a> */}
                        </>
                        :
                        <Loader />
                }
            </div>
        </div>
    );
}

export default LatestBlocks;
