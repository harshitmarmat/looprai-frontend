import searchIcon from "../assets/search.svg";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Profile from "../components/Profile";
import axios from "axios";
const Transaction = () => {
  // State for current page
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [showCalendar, setShowCalendar] = useState(false);

  const [tranxs, setTranxs] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const fetchData = async () => {
    try {
      const query = new URLSearchParams();
      if (page) query.append("page", page);
      if (search.length > 0) query.append("search", search);
      if (state[0]?.startDate && state[0]?.endDate) {
        query.append("startDate", state[0]?.startDate);
        query.append("endDate", state[0]?.endDate);
      }
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/transactions/by-date?${query.toString()}`
      );

      setTranxs(res.data); // Update state with fetched data
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, state]);
  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      // Logic to fetch new data based on `newPage` (if needed, integrate an API call here)
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "eee, dd MMM yyyy");
  };

  if (!tranxs) return <h1>No Data Found.</h1>;

  const { transactions, totalPages, currentPage } = tranxs;

  console.log(state);
  const formatDateCal = (dateString) => {
    return format(new Date(dateString), "dd MMM");
  };

  return (
    <Card>
      <div className="flex items-center gap-[8em]">
        <p className="text-text-bwf2 text-white_la">Transactions</p>

        <div className="relative">
          <input
            className="text-text-nwf2 h-[35px] text-purple_la bg-secondary_la py-2 w-[300px] rounded-md pl-4 pr-8"
            placeholder="Search for anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="search-icon"
            className="absolute top-2 right-2"
          />
        </div>
        <div className="relative text-purple_la">
          <div className="dropdown dropdown-bottom  dropdown-end">
            <div tabIndex={0} role="button" className="text-purple_la btn m-1">
              <p onClick={() => setShowCalendar(true)}>
                {formatDateCal(state[0]?.startDate)} -{" "}
                {formatDateCal(state[0]?.endDate)}
              </p>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  console.log(item);
                  setState([item.selection]);
                }}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white py-6 text-purple_la rounded-lg ">
        <table className="w-full text-center border-collapse overflow-hidden">
          <thead>
            <tr className="text-text-nwf3 mb-8 bg-secondary_la">
              <th className="py-4 text-left px-4 rounded-l-lg">Name</th>
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Amount</th>
              <th className="py-4 px-4 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className=" text-white_la">
            {transactions?.length>0 ? transactions.map((txn, index) => {
              const { amount, category, user_id, status, user_profile, date } =
                txn;
              const isExpenses = category.toLowerCase() === "expense";
              return (
                <tr key={index} className="text-text-nwf4">
                  <td className="py-4 text-left px-4">
                    <div className="flex gap-4 items-center">
                      <Profile img_src={user_profile} />
                      <div>{user_id}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{formatDate(date)}</td>
                  <td
                    className={`py-4 text-text-bwf3 ${
                      isExpenses ? "text-yellow_la" : "text-green_la"
                    } px-4`}
                  >
                    {isExpenses ? "-" : "+"}${amount}
                  </td>
                  <td className="py-4 text-text-bwf3 px-4">
                    <div
                      className={`${
                        status === "Paid"
                          ? "bg-green_shadow_la text-green_la"
                          : "text-yellow_la bg-yellow_shadow_la"
                      } mx-auto  text-text-swf4 w-fit rounded-full px-4 py`}
                    >
                      {status}
                    </div>
                  </td>
                </tr>
              );
            }):<div className="text-center mt-6">No Data Found.</div>}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="join flex justify-end mt-4">
        <button
          className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`join-item btn ${
              page === index + 1 ? "btn-primary" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        )).slice(page - 1, page + 4)}{" "}
        {/* Show limited buttons */}
        <button
          className={`join-item btn ${
            page === totalPages ? "btn-disabled" : ""
          }`}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </Card>
  );
};

export default Transaction;
