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
                        <div className={foodListStyles["food-list-item"]} key={food.Id}>
                            <FoodItem food={food} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default FoodLists;
