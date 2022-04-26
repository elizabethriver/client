import React, { useCallback, useEffect  ,useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosDashboard } from "./dashboardSlice";
import  {Items}  from "../../components/item/items";

export const Dashboard = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const {dashboardData, loading} = useSelector((state) => state.dashboard);
  console.log(dashboardData, loading)
  const [info, setinfo] = useState({})
  const initFetch = useCallback(() => {
    dispatch(axiosDashboard(token));

  }, [dispatch, token]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  // useEffect(() => {
  //   setinfo(dashboard)
  // }, [dashboard])
  
  
  console.log(info)
  // const { incomeAll, expensesAll } = info.dashboardData
  // console.log(incomeAll, expensesAll)
  // const Items = (props) => {
  //   return (
  //     <>
  //       {props.array.map((item) => (
  //         <li id={`${item._id}`} key={item._id}>
  //           <span>{item.product}</span>
  //           <strong>{item.income ? item.income : item.expense}</strong>
  //           <button>Delete</button>
  //           <button>Details</button>
  //         </li>
  //       ))}
  //     </>
  //   );
  // };
  return (
    <div>
      dashboard
      <main>
        <div>
          <button>
            <Link to="/income">Income</Link>
          </button>
          <button>
            <Link to="/expense">Expense</Link>
          </button>
        </div>
        <div>
          {/* <ul>
            Income
            <Items array={info.dashboardData.incomeAll} />
          </ul>
          <ul>
            Expense
            <Items array={info.dashboardData.expensesAll} />
          </ul> */}
        </div>
      </main>
    </div>
  );
};
