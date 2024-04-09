import { useState } from "react";

function SearchBar(){

  const [inputText, setInputText] = useState('');
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = () => {
    
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
<div className="flex items-center" style={{width:"50%"}}>
  <input
    type="text" onChange={handleInputChange}
    onKeyPress={handleKeyPress} 
    placeholder="Search by Address / Txn Hash / Block / Token"
    className="w-full px-4 py-2 rounded-lg bg-white-800 text-black focus:outline-none border border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 flex-grow"
    style={{border: "1px solid #e9ecef", backgroundColor: "rgba(248, 249, 250, 1)"}}
  />
  <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg" onClick={handleButtonClick}>
    Search
  </button>
</div>

  );
}

export default SearchBar;
