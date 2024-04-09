import { useLocation } from 'react-router-dom';


function ShowAllTxnsOfABlock(){

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const block = queryParams.get('block');

  return (
    <div>
      <div>
      <h2>Transactions</h2>
      <p>Block: {block}</p>
      {/* Your transaction list rendering goes here */}
    </div>
    </div>
  )
}

export default ShowAllTxnsOfABlock;
