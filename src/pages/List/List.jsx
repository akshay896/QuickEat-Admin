import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Table from "react-bootstrap/Table";
import "./List.css";
import { ClipLoader } from "react-spinners";

const List = ({ url }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState({});

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        enqueueSnackbar("Error fetching data", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error: " + error.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    setRemoving(prevState => ({ ...prevState, [foodId]: true }));
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        enqueueSnackbar(response.data.message, { variant: "success" });
        await fetchList();
      } else {
        enqueueSnackbar("Error", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error: " + error.message, { variant: "error" });
    } finally {
      setRemoving(prevState => ({ ...prevState, [foodId]: false }));
    }
  };

  return (
    <div className="list">
      {/* <p>All Foods List</p> */}
      <div>
        {loading ? (
          <div className="loading-text">Loading...</div>
        ) : (
          <Table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      disabled={removing[item._id]}
                      onClick={() => removeFood(item._id)}
                      className="action-btn"
                    >
                      {removing[item._id] ? (
                        <ClipLoader size={20} color={"#fff"} />
                      ) : (
                        "X"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default List;
