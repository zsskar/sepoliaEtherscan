import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getBlockDetails } from "../service/etherService";

function SearchBar() {
  const [inputText, setInputText] = useState('');
  const [block, setBlock] = useState(null);
  const navigate = useNavigate();


  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const checkForBlock = async (blockNumber) => {
    const blk =  await getBlockDetails(blockNumber);
    setBlock(blk);
  };

  // checkForTxn(address){

  // }

  const handleButtonClick = () => {
    switch (inputText.length) {
      case 7: console.log("Block")
        checkForBlock(inputText);
        block !== null ? navigate(`/block/${inputText}`, { state: { myblock: block } }) : alert("Not found !");

        break;
      case 42: console.log("Address");
        return navigate(`/address/${inputText}`)
      default: console.log("No Match !");
    }
    console.log(inputText);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    //     <input
    //     type="text"
    //     placeholder="Search by Address / Txn Hash / Block / Token"
    //     className="px-4 py-2 rounded-lg bg-white-800 text-black focus:outline-none"
    //     style={{ width: '50%',border: '1px solid #e9ecef',backgroundColor:'rgba(248,249,250,1)'}}
    //   />
    <div className="flex items-center" style={{ width: "50%" }}>
      <input
        type="text" onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search by Address / Txn Hash / Block"
        className="w-full px-4 py-2 rounded-lg bg-white-800 text-black focus:outline-none border border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 flex-grow"
        style={{ border: "1px solid #e9ecef", backgroundColor: "rgba(248, 249, 250, 1)" }}
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg" onClick={handleButtonClick}>
        Search
      </button>
    </div>

  );
}

export default SearchBar;
