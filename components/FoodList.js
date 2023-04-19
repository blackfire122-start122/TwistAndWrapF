import foodListStyles from "../styles/components/foodLists.module.css";
import FoodItem from "./FoodItem";

function FoodLists({ type, foods }) {
    return (
        <div>
            <h2>{type}</h2>
            <div className={foodListStyles.foodList}>
                {foods
                    .filter((food) => food.Type === type)
                    .map((food) => (
                        <FoodItem food={food} key={food.Id}/>
                    ))}
            </div>
        </div>
    );
}

export default FoodLists;
