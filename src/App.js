import {Route, Routes} from "react-router-dom";
import "./assets/style/imports.scss";
import Home from "./pages/home/home";
import _id from "./pages/products/_id";
import Products from "./pages/products/products";
import Users from "./pages/users/users";


function App() {
    return (
        <main className='sw'>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />
                <Route
                    path="/products/:productID"
                    element={<_id />}
                />

                <Route
                    path="/users"
                    element={<Users />}
                />
            </Routes>
        </main>
    );
}

export default App;
