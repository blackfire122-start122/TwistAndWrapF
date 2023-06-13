import { useState, useEffect } from "react"
import styles from "../styles/components/home.module.css"
import FoodLists from "../components/indexComponents/FoodList"
import client from "../lib/axios"
import Header from "../components/indexComponents/Header"

export default function Home() {
    const [user, setUser] = useState(null)
    const [foods, setFoods] = useState([])
    const [foodTypes, setFoodTypes] = useState([])

    useEffect(() => {
        client.get("user/getAllFoods")
            .then((response) => {
                setFoods(response.data)
                setFoodTypes(Array.from(new Set(response.data.map((food) => food.type))))
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    useEffect(() => {
        client.get("user/getUser")
            .then((response) => {
            setUser(response.data)
        })
            .catch((error) => {
            console.log(error)
        })

    }, [])

    return (
        <div className={styles.container}>
            <Header user={user}/>
            {foodTypes.map((type) => (
                <FoodLists key={type} type={type} foods={foods}></FoodLists>
            ))}
        </div>
    )
}
