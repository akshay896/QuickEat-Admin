import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import "./Orders.css";
import parcelImg from "../../assets/parcel_icon.png";

const Orders = ({ url }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        enqueueSnackbar("Error fetching orders", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  return (
    <div className="order">
      <div className="order-list">
        {orders.length === 0 ? (
          <h3 className="text-center text-danger">No new orders</h3>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={parcelImg} alt="orderimg" />
              <div className="order-item-content">
                <p className="order-item-food">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx === order.items.length - 1 ? "" : ","}
                    </span>
                  ))}
                </p>
                <div className="order-item-details">
                  <p className="order-item-name">
                    {order.address.firstname} {order.address.lastname}
                  </p>
                  <p className="order-item-address">
                    {order.address.street},{order.address.city},{" "}
                    {order.address.state}, {order.address.country},{" "}
                    {order.address.zipcode}
                  </p>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <div className="order-item-meta">
                  <p>Items: {order.items.length}</p>
                  <p>${order.amount}</p>
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
