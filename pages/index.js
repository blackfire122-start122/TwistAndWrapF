import { useState, useEffect } from "react";
import styles from "../styles/components/Home.module.css";
import FoodLists from "../components/FoodList";
import client from "../lib/axios";
import Link from 'next/link'

export default function Home() {
    const [user, setUser] = useState(null);
    const [foods, setFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [foodTypes, setFoodTypes] = useState([]);

    useEffect(() => {
        client.get("/getAllFoods")
            .then((response) => {
                console.log(response.data)
                setFoods(response.data);
                setFoodTypes(Array.from(new Set(response.data.map((food) => food.Type))));
            })
            .catch((error) => {
                console.log(error);
            });
        client.get("/getUser")
            .then((response) => {
            setUser(response.data);
        })
            .catch((error) => {
            console.log(error);
        });

    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Twist&amp;Wrap</h1>
                {
                    user ? (
                        <Link href="/profile">
                            <img className={styles.picture} src={`http://localhost/${user.Image}`} alt={user.Name} />
                        </Link>
                    ) : (
                        <>
                            <Link href="/login">
                                <p>Login</p>
                            </Link>
                            <Link href="/register">
                                <p>Register</p>
                            </Link>
                        </>
                    )
                }


            </header>
            {foodTypes.map((type) => (
                <FoodLists key={type} type={type} foods={foods}></FoodLists>
            ))}
        </div>
    );
}
