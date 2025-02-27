import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getUserDetails } from "../services/auth";
import Layout from "../components/Layout";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.email) { 
      setLoading(true); 
      getUserDetails(dispatch)
        .catch(() => console.error("Failed to fetch user details"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch,user.email]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 center">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to the Dashboard</h1>
        {user ? (
          <div className="mt-4 p-4 bg-white shadow rounded center">
            <p className="text-lg font-semibold justify-center"><b>User Details:</b> </p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
          </div>
        ) : (
          <p className="text-red-500">User not found</p>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
