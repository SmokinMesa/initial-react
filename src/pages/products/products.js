import "./products.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";


const Products = () => {
    /**
     * set local state for the products (returned from api)
     */
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [queryParams, setQueryOptions] = useState(
        {
            "limit": 3,
            "skip": 1
        }
    )


    /**
     * when the params change, update the request and local state
     */
    useEffect(() => {
        setIsLoading(true);

        axios.get("https://dummyjson.com/products", {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: queryParams
            }).then((res) => {
                setProducts(res.data);
            }).finally(
                setIsLoading(false);
        )
    }, [queryParams]);


    /**
     * map over the products, build out basic overview info
     */
    const Products = () => {
        return (
            products.products.map((prod, index) => {
                return (
                    <article
                        className="prod-card"
                        map={prod.id}
                    >
                        <h1>
                            <NavLink to={"/products/" + prod.title}>
                                {prod.title}
                            </NavLink>
                        </h1>
                    </article>
                );
            })
        )
    }

    /**
     * pagination
     */
    const Pagination = () => {
        return (
            <aside className="pagination">
                <span
                    onClick={() => {
                        prev();
                    }}
                >
                    Prev
                </span>
                <span
                    onClick={() => {
                        next();
                    }}
                >
                    Next
                </span>
            </aside>
        )
    }


    /**
     * main render
     */
    return (
        <div className="page-products">
            <h1>Products</h1>

            <div>
                Per Page:

                <select
                    onChange={(e) => {
                        updatePerPage(e.target.value);
                    }}
                >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>

            {
                isLoading
                ?
                    <p>Loading, please wait...</p>
                :
                    <>
                        {
                            products.products
                                ?
                                <>
                                    <p>showing {products.products.length} of {products.total}</p>

                                    <section className="products-container">
                                        <Products />
                                    </section>
                                </>
                                : ''
                        }
                    </>
            }

            <Pagination />
        </div>
    );


    //  METHODS
    function updatePerPage(val) {
        let valAsNumber = parseInt(val, 10);

        setQueryOptions(prevState => {
            return {
                ...prevState,
                "limit": valAsNumber,
                "skip": 1
            }
        });
    }

    //  could combine next and prev and pass "direction"
    function next() {
        setQueryOptions(prevState => {
           return {
               ...prevState,
               "skip": prevState.skip + prevState.limit
           }
        });
    }
    function prev() {
        setQueryOptions(prevState => {
           return {
               ...prevState,
               "skip": prevState.skip - prevState.limit
           }
        });
    }

}

export default Products;