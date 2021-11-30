import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


const _id = () => {
    /**
     * local state will hold the products details
     */
    const [prodDetails, setProdDetails] = useState([]);

    /**
     * get the params, for api
     */
    const params  = useParams();


    /**
     * get the products details, based on the parms
     */
    useEffect(() => {
        let toSearch = params.productID;

        axios.get("https://dummyjson.com/products/search?q=" + toSearch,
            )
            .then((res) => {
                if (res.data.products.length) {
                    setProdDetails(res.data.products[0]);
                    console.log(res.data.products[0]);
                } else {
                    setProdDetails([])
                }
            })
    }, []);


    /**
     * main render
     */
    return (
        <>
            {/*{*/}
            {/*    prodDetails && prodDetails.length*/}
            {/*    ?*/}
            {/*        "ok"*/}
            {/*        :*/}
            {/*        "Sorry no products found"*/}
            {/*}*/}
            <h1>{prodDetails.title}</h1>
            <p>Brand: {prodDetails.brand}</p>
            <p>About: {prodDetails.description}</p>
            <p>Price: £{prodDetails.price}</p>
        </>
    );
}

export default _id;