import "./home.scss";
import {NavLink} from "react-router-dom";


const Home = () => {

    /**
     * main render
     */
    return (
        <>
            <h1>Home</h1>

            <nav>
                <ul>
                    <li>
                        <NavLink to={"/products"}>Products</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/users"}>Users</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );


}

export default Home;