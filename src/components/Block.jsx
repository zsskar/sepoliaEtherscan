import { useLocation, useParams } from 'react-router-dom';
import Header from './Header';
import MenuHeader from './MenuHeader';
import BlockDetails from './BlockDetails';
import NotFound from './NotFound';
import { useEffect, useState } from 'react';
import { getBlockDetails } from '../service/etherService';
import Loader from './Loader';

function Block() {
  const { blockNumber } = useParams();
  const [block, setBlock] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getBlockData = async () => {
        try {
            setBlock(await getBlockDetails(blockNumber));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching latest blocks:', error);
        }
    };
    getBlockData();
}, [blockNumber]);


  return (
    <>
      <Header isSearchRequired={true} />
      <MenuHeader />
      {loading ? <Loader/> :(block !== null && block?.number === parseInt(blockNumber) && blockNumber.trim().length === 7 ? <BlockDetails block={block} /> : <NotFound />)}
    </>
  )
}

export default Block;
