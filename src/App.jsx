import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import SearchDetails from './components/SearchDetails'
import AddressDetails from './components/AddressDetails';
import ShowAllTxnsOfABlock from './components/ShowAllTxnsOfABlock';
import ShowBlocks from './components/ShowBlocks';
import ShowTxns from './components/ShowTxns';
import Block from './components/Block';

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/searchDetails" element={<SearchDetails />} />
      <Route exact path="/block/:blockNumber" element={<Block />} />
      <Route exact path="/address/:address" element={<AddressDetails />} />
      <Route exact path="/txs" element={<ShowAllTxnsOfABlock />} />
      <Route exact path="/blocks" element={<ShowBlocks />} />
      <Route exact path="/txns" element={<ShowTxns />} />
      <Route path="*" element={<h1 style={{color:'red',textAlign:'center'}}>Path not resolved !</h1>} />
    </Routes>
  )
}

export default App
