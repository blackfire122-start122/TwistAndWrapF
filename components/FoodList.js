import "../styles/components/foodList.module.css"
import FoodItem from "./FoodItem";
function FoodList({type, foods}) {
  return (
      <div>
        <h2>{type}</h2>
        <div>
          {foods.filter((food) => food.Type === type)
              .map((food) => (
                  <FoodItem key={food.Id} food={food}/>
              ))}
        </div>
      </div>
  );
}

export default FoodList;
