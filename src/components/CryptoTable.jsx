import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCrypto } from '../redux/cryptoSlice';
import './CryptoTable.css';

const CryptoTable = () => {
  const dispatch = useDispatch();
  const { assets, status } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCrypto());
    const interval = setInterval(() => {
      dispatch(fetchCrypto());
    }, 2000); 

    return () => clearInterval(interval);
  }, [dispatch]);

  const getColor = (value) => (value > 0 ? 'green' : value < 0 ? 'red' : 'gray');

  return (
    <div className="table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume(24h)</th>
            <th>Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {status === 'loading' ? (
            <tr><td colSpan="10">Loading...</td></tr>
          ) : (
            assets.map((coin, i) => (
              <tr key={coin.id}>
                <td>{i + 1}</td>
                <td className="name-cell">
                  <img src={coin.image} alt={coin.name} />
                  {coin.name} <span className="symbol">{coin.symbol.toUpperCase()}</span>
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td style={{ color: getColor(coin.price_change_percentage_1h_in_currency) }}>
                  {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                </td>
                <td style={{ color: getColor(coin.price_change_percentage_24h_in_currency) }}>
                  {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                </td>
                <td style={{ color: getColor(coin.price_change_percentage_7d_in_currency) }}>
                  {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </td>
                <td>${coin.market_cap.toLocaleString()}</td>
                <td>
                  ${coin.total_volume.toLocaleString()}<br />
                  {coin.total_volume / coin.current_price > 1 ? (coin.total_volume / coin.current_price).toFixed(2) + ' ' + coin.symbol.toUpperCase() : ''}
                </td>
                <td>
                  {coin.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}
                </td>
                <td>
                  <img src={`https://quickchart.io/chart?c={type:'sparkline',data:{datasets:[{data:[${coin.sparkline_in_7d.price.map(p => p.toFixed(2))}] }]}}`} alt="sparkline" width="100" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
