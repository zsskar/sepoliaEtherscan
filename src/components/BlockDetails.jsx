import { useLocation } from 'react-router-dom';
import Header from './Header';
import MenuHeader from './MenuHeader';

function BlockDetails() {
  const location = useLocation();
  const { myblock } = location.state || {};
  console.log(myblock);
  return (
    <><Header isSearchRequired={true} />
    <MenuHeader />
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Block #5659243</h2>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Overview</h3>
        <div className="flex items-center mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Consensus Info</button>
          <button className="bg-white-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Blob Info</button>
          <button className="bg-white-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Button 3</button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Block Details</h3>
        <div className="overflow-x-auto">
          <table className="table-fixed w-full">
            <tbody>
              <tr>
                <td className="font-semibold pr-4 w-1/4">Block Height:</td>
                <td className="w-3/4">5659243</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Status:</td>
                <td>Finalized</td>
              </tr>
              {/* Add other block details here */}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add other sections as needed */}
    </div>
    </>
  )
}

export default BlockDetails;
