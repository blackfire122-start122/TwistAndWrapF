import styles from '../../styles/components/OrderFoodInBar.module.css';
import SelectRestaurant from "./SelectRestaurant";
import SelectTime from "./SelectTime";
import MapOrderFood from "./MapOrderFood";
import SearchFoodByType from "./SearchFoodByType";
import SearchFood from "./SearchFood";
import SelectFood from "./SelectFood";
import SelectedFood from "./SelectedFood";
import ErrorOrderFood from "./ErrorOrderFood";
import ButtonOrderFood from "./ButtonOrderFood";

const FormField = ({
   selectedRestaurant,
   handleRestaurantChange,
   restaurants,
   selectedTime,
   handleTimeChange,
   errorSelectedTime,
   handleSearchTypeChange,
   foodTypes,
   handleSearchTermChange,
   searchFood,
   AddFood,
   RemoveFood,
   selectedFood,
   error,
   setSelectedRestaurant,
   user
}) => {
    return (
        <>
            <div className={styles.selectRestaurantAndTime}>
                <SelectRestaurant selectedRestaurant={selectedRestaurant} handleRestaurantChange={handleRestaurantChange} restaurants={restaurants}/>
                <SelectTime selectedTime={selectedTime} handleTimeChange={handleTimeChange} errorSelectedTime={errorSelectedTime}/>
            </div>
            <br/>

            <MapOrderFood
                restaurants={restaurants}
                user={user}
                setSelectedRestaurant={setSelectedRestaurant}
            />
            <br />

            <div className={styles.searches}>
                <SearchFoodByType handleSearchTypeChange={handleSearchTypeChange} foodTypes={foodTypes} />
                <SearchFood handleSearchTermChange={handleSearchTermChange}/>
            </div>
            <br />

            <SelectFood searchFood={searchFood} AddFood={AddFood} RemoveFood={RemoveFood}/>
            <br/>

            <SelectedFood selectedFood={selectedFood} RemoveFood={RemoveFood}/>
            <ErrorOrderFood error={error}/>
            <br/>

            <ButtonOrderFood/>
        </>
    );
};

export default FormField;
