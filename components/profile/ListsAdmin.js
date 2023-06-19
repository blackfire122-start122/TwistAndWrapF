import React, {useEffect, useState} from "react";
import FoodsAdminList from "./FoodsAdminList";
import RestaurantsAdminList from "./RestaurantsAdminList";
import client from "../../lib/axios";
import styles from "../../styles/components/profile.module.css";

export default function ListsAdmin({ restaurants, foods,setFoods,setRestaurants }) {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        client.get("user/getTypes").then((response) => {
            setTypes(response.data);
        });
    }, []);


    return (
        <>
            <h2 className={styles.nameList}>Foods</h2>
            <FoodsAdminList foods={foods} setFoods={setFoods} types={types}/>
            <h2 className={styles.nameList}>Restaurants</h2>
            <RestaurantsAdminList restaurants={restaurants} setRestaurants={setRestaurants}/>
        </>
    );
}
