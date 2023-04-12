import { useState } from "react";
import foodItemStyles from "../styles/components/foodItem.module.css";

function FoodItem({ food }) {
    const [showDescription, setShowDescription] = useState(false);

    function handleClick() {
        setShowDescription((prevState) => !prevState);
    }

    return (
        <div className={foodItemStyles["food-item"]} onClick={handleClick}>
            <h3>{food.Name}</h3>
            <img src={"http://localhost/" + food.Image} alt={food.Name} />
            {showDescription ? <p>{food.Description}</p> : null}
        </div>
    );
}

export default FoodItem;
