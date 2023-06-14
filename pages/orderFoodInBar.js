import { useState, useEffect } from 'react';
import client from "../lib/axios";
import styles from '../styles/components/OrderFoodInBar.module.css';
import Header from "../components/orderFoodComponents/Header";
import FormFields from "../components/orderFoodComponents/FormFields";

const OrderFoodInBar = () => {
    const [user, setUser] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedTime, setSelectedTime] = useState(getInitialTime());
    const [restaurants, setRestaurants] = useState([]);
    const [foods, setFoods] = useState([]);
    const [searchFood, setSearchFood ] = useState([])
    const [foodTypes, setFoodTypes] = useState([]);
    const [addText, setAddText] = useState("");
    const [errorSelectedTime, setErrorSelectedTime] = useState("");
    const [error, setError] = useState("");

    function getInitialTime() {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 10);
        return currentTime.toTimeString().slice(0, 5);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedFoodIdCount = selectedFood.map(({ id, count }) => ({ id, count }));

        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 5);

        const selectedDateTime = new Date();
        const [hours, minutes] = selectedTime.split(':');
        selectedDateTime.setHours(Number(hours));
        selectedDateTime.setMinutes(Number(minutes));


        if (!selectedRestaurant || selectedFoodIdCount === []){
            setError("error not all field")
            return
        }else if (selectedDateTime <= currentTime){
            setError("error not all field")
            setErrorSelectedTime("* Invalid time. Please select a valid time need set time >= now +5 minutes")
            return
        }

        client.post('user/orderFood', {
            restaurantId: selectedRestaurant,
            foods: selectedFoodIdCount,
            time: selectedTime
        })

        .then((response) => {
            if (response.data !== ""){
                console.log(response.data)
                setError("")
                setSelectedRestaurant("")
                setSelectedFood([])
                setSelectedTime(getInitialTime())
                setAddText("Ordered. Your Id: "+response.data.msg.split(":")[1])

                setTimeout(()=>{
                    setAddText("")
                }, 5000)

            }else {
                console.warn(response)
            }
        })
        .catch((error) => {
            setError(error.text)
            console.error(error);
        });
    };

    const handleRestaurantChange = (event) => {
        setSelectedRestaurant(event.target.value);
    };

    const AddFood = (foodId) => {
        let food = foods.filter(f=> f.id === foodId)[0]
        food.count = "1"
        setSelectedFood([...selectedFood, food]);
    };

    const RemoveFood = (foodId) => {
        const updatedSelectedFood = selectedFood.filter(f => f.id !== foodId);
        setSelectedFood(updatedSelectedFood);
        document.getElementById("checkbox"+foodId).checked = false
    };

    const handleSearchTermChange = (event) => {
        setSearchFood(foods.filter(f => f.name.toLowerCase().includes(event.target.value.toLowerCase())))
    };
    const handleTimeChange = (event) => {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 5);

        const selectedTime = event.target.value;
        const selectedDateTime = new Date();
        const [hours, minutes] = selectedTime.split(':');
        selectedDateTime.setHours(hours);
        selectedDateTime.setMinutes(minutes);

        if (selectedDateTime >= currentTime) {
            setSelectedTime(selectedTime)
            setErrorSelectedTime("")
        } else {
            setErrorSelectedTime("* Invalid time. Please select a valid time need set time >= now +5 minutes")
            setSelectedTime(getInitialTime())
        }
    };

    const handleSearchTypeChange = (event) => {
        if (event.target.value !== ""){
            setSearchFood(foods.filter(f => f.type === event.target.value))
        }else {
            setSearchFood(foods)
        }
    };

    useEffect(() => {
        client.get("user/getUser").then((response) => {
            setUser(response.data)
        });
    }, []);

    useEffect(() => {
        client.get('user/getAllWorkedBars')
            .then((response) => {
                setRestaurants(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        client.get('user/getAllFoods')
            .then((response) => {
                setFoods(response.data);
                setFoodTypes(Array.from(new Set(response.data.map((food) => food.type))));
                setSearchFood(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className={styles.container}>
            <Header user={user}/>
            <form className={styles.form} onSubmit={handleSubmit}>
                <FormFields
                    selectedRestaurant={selectedRestaurant}
                    handleRestaurantChange={handleRestaurantChange}
                    restaurants={restaurants}
                    selectedTime={selectedTime}
                    handleTimeChange={handleTimeChange}
                    errorSelectedTime={errorSelectedTime}
                    handleSearchTypeChange={handleSearchTypeChange}
                    foodTypes={foodTypes}
                    handleSearchTermChange={handleSearchTermChange}
                    searchFood={searchFood}
                    AddFood={AddFood}
                    RemoveFood={RemoveFood}
                    selectedFood={selectedFood}
                    error={error}
                    setSelectedRestaurant={setSelectedRestaurant}
                    user={user}
                />
            </form>
            {addText ? <span className={styles.SpanOrdered}>{addText}</span>:null}
        </div>
    );
};

export default OrderFoodInBar;
