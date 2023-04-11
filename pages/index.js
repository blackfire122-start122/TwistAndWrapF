import { useState, useEffect } from "react";
import styles from "../styles/components/Home.module.css";
import FoodList from "../components/FoodList";
import client from "../lib/axios";
import Link from 'next/link'

export default function Home() {
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
    }, []);

    return (
        <div className={styles.container}>
            <header>
                <h1 className={styles.title}>Twist&amp;Wrap</h1>
                <Link href="/login">
                    <p>Login</p>
                </Link>
                <Link href="/register">
                    <p>Register</p>
                </Link>

            </header>
            {foodTypes.map((type) => (
                <FoodList key={type} type={type} foods={foods}></FoodList>
            ))}

            {selectedFood && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>{selectedFood.Name}</h2>
                        <p>{selectedFood.Descriptions}</p>
                        <button onClick={() => setSelectedFood(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
