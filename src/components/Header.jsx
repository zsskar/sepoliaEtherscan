import PropTypes from 'prop-types'
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';

const Header = ({isSearchRequired}) => {
  return (
    <div style={{borderBottom: "1px solid #e9ecef !important",zIndex: "1019",boxShadow:"0 20px 50px rgba(180,164,195,.13)"}} className="bg-white-900 py-4 px-8 flex items-center justify-between">
      <Link to='/'><h5 className="text-black text-sm">Sepolia Testnet</h5></Link>
        {isSearchRequired && <SearchBar />}
    </div>
  );
};

Header.propTypes = {
    isSearchRequired: PropTypes.bool.isRequired
  };

export default Header;
