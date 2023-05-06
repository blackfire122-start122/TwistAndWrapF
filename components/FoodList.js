import foodListStyles from "../styles/components/foodLists.module.css";
import FoodItem from "./FoodItem";

function FoodLists({ type, foods }) {
    return (
        <div>
            <h2>{type}</h2>
            <div className={foodListStyles.foodList}>
                {foods
                    .filter((food) => food.type === type)
                    .map((food) => (
                        <FoodItem food={food} key={food.id}/>
                    ))}
            </div>
        </div>
    );
}

export default FoodLists;
