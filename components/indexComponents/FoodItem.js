import { useState } from "react";
import foodItemStyles from "../../styles/components/indexStyles/foodItem.module.css";

function FoodItem({ food }) {
    const [showDescription, setShowDescription] = useState(false);

    function handleClick() {
        setShowDescription((prevState) => !prevState);
    }

    return (
        <div className={foodItemStyles["food-item"]} onClick={handleClick}>
            <h3>{food.Name}</h3>
            <img src={"http://localhost/" + food.image} alt={food.name} />
            {showDescription ? <p>{food.description}</p> : null}
        </div>
    );
}

export default FoodItem;
