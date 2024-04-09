import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import SearchDetails from './components/SearchDetails'
import BlockDetails from './components/BlockDetails';
import AddressDetails from './components/AddressDetails';
import ShowAllTxnsOfABlock from './components/ShowAllTxnsOfABlock';
import ShowBlocks from './components/ShowBlocks';
import ShowTxns from './components/ShowTxns';

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/searchDetails" element={<SearchDetails />} />
      <Route exact path="/block/:blockNumber" element={<BlockDetails />} />
      <Route exact path="/address/:address" element={<AddressDetails />} />
      <Route exact path="/txs" element={<ShowAllTxnsOfABlock />} />
      <Route exact path="/blocks" element={<ShowBlocks />} />
      <Route exact path="/txns" element={<ShowTxns />} />
      <Route path="*" element={<h1 style={{color:'red',textAlign:'center'}}>Path not resolved !</h1>} />
    </Routes>
  )
}

export default App
