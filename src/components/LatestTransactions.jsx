import { useEffect, useState } from "react";
import { WeiToEther, fetchLatestTransactions, shortenAddress, timeStampToAgoTime } from "../service/etherService";
import Tooltip from './Tooltip';
import Loader from "./Loader";
import { Link } from "react-router-dom";

function LatestTransactions() {

    const [latestTransactions, setLatestTransactions] = useState([]);

    useEffect(() => {
        const getLatestTransactions = async () => {
            try {
                fetchLatestTransactions(1)
                    .then(transactionDetails => {
                        setLatestTransactions(transactionDetails);
                    });
            } catch (error) {
                console.error('Error fetching latest blocks:', error);
            }
        };
        getLatestTransactions();
    }, []);



    console.log(latestTransactions);
    return (
        <div className="col-lg-6 mb-4">
            <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center gap-1">
                        <h2 className="card-header-title">
                            Latest Transactions
                        </h2>
                        <button type="button" id="card2AdvancedFilterListButton" className="btn btn-sm btn-ghost-white d-none" data-bs-toggle="modal" data-bs-target="#advancedFilterListModal" data-bs-card-index={2}>
                            <i className="far fa-pen-to-square fa-fw" />
                        </button>
                    </div>
                </div>
                {latestTransactions.length !== 0 ?
                    <><div className="card-body overflow-auto scrollbar-custom" style={{ maxHeight: '30.3rem' }} id="mCSB_2_container">
                        {latestTransactions.map((txn, index) => (
                            <><div className="row" key={index}>
                                <div className="col-sm-4 col-lg-5">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="d-none d-sm-flex content-center bg-light text-muted rounded p-3" style={{ height: '3rem', width: '3rem' }}><img style={{ width: '45px', height: '45px', maxWidth: '45px' }} src='/txnIcon.png' /></div>
                                        <div className="d-flex align-items-center align-items-sm-start flex-row flex-sm-column gap-1 gap-sm-0">
                                            <span className="d-inline-block d-sm-none">TX#</span>
                                            <a className="d-block text-truncate" style={{ maxWidth: '7rem', color: '#0000FF' }} href={`/txn/${txn.hash}`}>
                                                {txn.hash}
                                            </a>
                                            <div className="small text-muted">{timeStampToAgoTime(txn.timestamp)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-8 col-lg-7 d-flex justify-content-sm-between align-items-end align-items-sm-center">
                                    <div className="pe-0 pe-sm-2">
                                        <div className="d-flex flex-wrap gap-1">
                                            From
                                            <div className="relative inline-block">
                                                <Tooltip text={txn.from}>
                                                    <Link style={{ color: '#0000FF' }} to={`/address/${txn.from}`} className="text-blue-500">
                                                        <span data-highlight-target={txn.from} className="hover:underline">{shortenAddress(txn?.from)}</span>
                                                    </Link>
                                                </Tooltip>
                                            </div>

                                        </div>
                                        <div className="d-flex align-items-center flex-wrap gap-1">
                                            To
                                            <Tooltip text={txn.from}>
                                                <Link style={{ color: '#0000FF' }} to={`/address/${txn.to}`} className="text-blue-500">
                                                    <span data-highlight-target={txn.to} className="hover:underline">{shortenAddress(txn?.to)}</span>
                                                </Link>
                                            </Tooltip>
                                            <span className="d-inline d-sm-none badge border border-dark dark:border-white border-opacity-15 text-dark ms-1 py-1.5 px-2 fw-medium">{WeiToEther(txn.value)} Eth</span>
                                        </div>
                                    </div>
                                    <div className="d-none d-sm-block text-end ms-2 ms-sm-0" data-bs-toggle="tooltip"><span className="badge border border-dark dark:border-white border-opacity-15 text-dark py-1.5 px-2 fw-medium">0 Eth</span></div>
                                </div>
                            </div>{index !== (latestTransactions.length - 1) && <hr className="mt-3.5 mb-3.5" /> }</>
                        ))}
                    </div>
                    {/* <a className="card-footer bg-light fw-medium text-cap link-muted text-center" href="/txns"> View all transactions<i className="far fa-long-arrow-right ms-1" /> </a> */}
                    </>
                    : <Loader />}
            </div>
        </div>
    )
}

export default LatestTransactions;
