
import { useState, useEffect } from 'react';
import {users} from "./pseudo_database";
import { calculateRewardsMonthly } from './rewards_calculator';
import './App.css';

function App() {
 
 const [userData, setUserData] = useState([])
  useEffect(() => {
    const dummyFetchUserData = new Promise((resolve, reject) => {
      if (!users) {
        reject(new Error('Users not found'));
      }

      setTimeout(() => {
          resolve(Object.values(users));
      }, 1000);
  });
    dummyFetchUserData.then((res) => {
        setUserData(res)
      })
    }, [])

  return (
    <div className="App">
      <h1>Rewards Tracker</h1>
      <table className="rewardTable">
        <tr>
          <th>User</th>
          <th>Transactions</th>
          <th>Oct rewards</th>
          <th>Nov rewards</th>
          <th>Dec rewards</th>
          <th>Total Rewards</th>
        </tr>
        {userData.map((user) => {
          return (
            <tr>
              <td>
                {user.firstName}
              </td>
              <td>
                <ol>
                {user.transactions.map((item) => [
                  <li>
                    Amount : ${item.purchase_amount}, Date : {item.purchase_date}
                  </li>
                ])}
                </ol>
              </td>
              <td>
                {calculateRewardsMonthly('10',user)}
              </td>
              <td>
                {calculateRewardsMonthly('11',user)}
              </td>
              <td>
                {calculateRewardsMonthly('12',user)}
              </td>
              <td>
                {calculateRewardsMonthly('10',user)+ calculateRewardsMonthly('11',user) + calculateRewardsMonthly('12',user)}
              </td>
            </tr>
          )
        })}
      </table>

    </div>
  );
}

export default App;
