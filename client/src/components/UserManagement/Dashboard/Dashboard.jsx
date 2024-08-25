import { UserContext } from "../../../../context/userContext";
import { useContext } from "react";

const Dashboard = () => {
    const { user } = useContext(UserContext);

    return(
        <div>
            <h1>Dashboard</h1>
            {user && (<h2>Hi</h2>)}
        </div>
    );
}

export default Dashboard;