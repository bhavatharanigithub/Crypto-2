import React from 'react';
import CryptoTable from './components/CryptoTable';

function App() {
  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Real-Time Crypto Price Tracker</h2>
      <CryptoTable />
    </div>
  );
}

export default App;
