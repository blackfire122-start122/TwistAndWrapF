import { useState } from "react";
import "../styles/components/foodItem.module.css"
function FoodItem({food}) {
  const [showDescription, setShowDescription] = useState(false);

  function handleClick() {
      console.log(showDescription)
    setShowDescription((prevState) => !prevState);
  }

  return (
    <div onClick={handleClick}>
      <h3>{food.Name}</h3>
      <img src={food.Image} alt={food.Name}/>
      {showDescription ? <p>{food.Description}</p> : null }
    </div>
  );
}

export default FoodItem;
