import React, {useEffect, useState} from "react";
import FoodsAdminList from "./FoodsAdminList";
import RestaurantsAdminList from "./RestaurantsAdminList";
import client from "../../lib/axios";

export default function ListsAdmin({ restaurants, foods,setFoods }) {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        client.get("user/getTypes").then((response) => {
            setTypes(response.data);
        });
    }, []);


    return (
        <>
            <FoodsAdminList foods={foods} setFoods={setFoods} types={types}/>
            <RestaurantsAdminList restaurants={restaurants}/>
        </>
    );
}
