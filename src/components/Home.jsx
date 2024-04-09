import BlocksAndTxns from "./BlocksAndTxns";
import Footer from "./Footer";
import Header from "./Header";
import MenuHeader from "./MenuHeader";
import SearchBar from "./SearchBar";

function Home() {
    return (
        <>
            <Header isSearchRequired={false} />
            <MenuHeader />
            <div style={{ backgroundImage: "url('https://sepolia.etherscan.io/assets/svg/patterns/waves.svg')" }}>
                <h1 style={{ textAlign: 'center' }} className="text-black text-3xl mt-10">Sepolia Testnet Explorer</h1>
                <span className="flex justify-center items-center mt-10">
                    <SearchBar />
                </span>
                <div className="mt-20">
                <BlocksAndTxns />
                <Footer />
                </div>
            </div>
        </>
    )
}

export default Home;
