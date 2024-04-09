
function Footer() {
    return (
        <footer id="masterFooter" className="bg-light mt-auto d-print-none">
            <div className="container-xxl">
                <div className="py-4">
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <img className="me-2" width="16" src="https://sepolia.etherscan.io/images/svg/brands/ethereum-original.svg" alt="Ethereum Logo" />
                                {/* <img className="me-2" width="16" src="https://sepolia.etherscan.io/images/svg/brands/ethereum-original.svg" alt="Ethereum Logo" /> */}
                                <span className="text-lg">Powered by Ethereum</span>
                            </div>
                            <div>
                                {/* <a className="text-dark" href="#"> <i className="far fa-arrow-up-to-line me-1"></i>Back to Top </a> */}
                                <a href="#" className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-md transition duration-300 hover:bg-gray-900 hover:text-gray-100">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                    </svg>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-top py-4">
                    <div className="flex justify-between items-center text-sm">
                        <div className="mb-2 mb-md-0">
                            <p className="mb-0">Etherscan © 2024 (Sepolia)</p>
                        </div>
                        <div className="flex gap-2">
                            <span> <a className="text-dark" target="_blank">Terms</a> &amp; <a className="text-dark" href="https://etherscan.io/privacyPolicy" target="_blank">Privacy</a> </span>
                            <span className="text-secondary hidden sm:inline">|</span>
                            <a className="text-dark" target="_blank">Network Status</a>
                            {/* <span className="text-secondary hidden sm:inline">|</span>
                            <p className="mb-0">Donations: <a className="me-1" href="/address/0x71c7656ec7ab88b098defb751b7401b5f6d8976f">0x71c765...d8976f</a> <i className="fas fa-heart text-red-500"></i></p> */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer;
