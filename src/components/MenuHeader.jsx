// import {useState} from 'react'

import { Link } from "react-router-dom";

const MenuHeader = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white-900 py-4 px-8 flex items-center justify-between" style={{borderBottom: "1px solid #e9ecef !important",zIndex: "1019",boxShadow:"0 15px 10px rgba(130,164,180,.10)"}}>
     <Link to='/'><img style={{width:'150px'}} src='https://sepolia.etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5' /></Link>
      <div className="flex items-center" style={{ marginRight: '5%' }}>
        <Link to='/' className="mr-10 text-black text-lg font-medium">
          Home
        </Link>
        {/* <a className="mr-4 text-black">
        Transaction
        </a>
        <a className="mr-4 text-black">
        View Blocks
        </a> */}
        {/* <div 
          className="relative group"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          
        >
          <button className="text-black focus:outline-none">
            Menu ▼
          </button>
          <div className={`absolute right-0 mt-2 py-2 w-32 bg-white-800 rounded-lg shadow-lg z-10 ${isDropdownOpen ? '' : 'hidden'}`}>
            <a  className="block px-4 py-2 text-black hover:bg-white-700">Transaction</a>
            <a className="block px-4 py-2 text-black hover:bg-white-700">View Blocks</a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MenuHeader;
