import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { getVendorPendingOrders } from "../api/query";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getVendorPendingOrders();
      setOrders(res.data?.data || []); 
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(); 
  }, [fetchOrders]);

  return (
    <OrdersContext.Provider value={{ orders, loading, refetchOrders: fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};


export const useOrders = () => useContext(OrdersContext);