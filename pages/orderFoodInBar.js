import { useState, useEffect } from 'react';
import client from "../lib/axios";
import styles from '../styles/components/OrderFoodInBar.module.css';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
const OrderFoodInBar = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [selectedFood, setSelectedFood] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [foods, setFoods] = useState([]);
    const [searchFood, setSearchFood ] = useState([])
    const [foodTypes, setFoodTypes] = useState([]);
    const { push } = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedFoodIdCount = selectedFood.map(({ Id, Count }) => ({ Id, Count }));

        if (selectedFoodIdCount === [] || !selectedRestaurant){
            console.log("error not all field")
            return
        }

        client.post('/orderFood', {
            RestaurantId: selectedRestaurant,
            Foods: selectedFoodIdCount,
        })
        .then((response) => {
            console.log(response);
            push('/profile');
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const handleRestaurantChange = (event) => {
        setSelectedRestaurant(event.target.value);
    };

    const AddFood = (foodId) => {
        let food = foods.filter(f=> f.Id === foodId)[0]
        food.Count = "1"
        setSelectedFood([...selectedFood, food]);
    };

    const RemoveFood = (foodId) => {
        const updatedSelectedFood = selectedFood.filter(f => f.Id !== foodId);
        setSelectedFood(updatedSelectedFood);
        document.getElementById("checkbox"+foodId).checked = false
    };

    const handleSearchTermChange = (event) => {
        setSearchFood(foods.filter(f => f.Name.toLowerCase().includes(event.target.value.toLowerCase())))
    };

    const handleSearchTypeChange = (event) => {
        if (event.target.value !== ""){
            setSearchFood(foods.filter(f => f.Type === event.target.value))
        }else {
            setSearchFood(foods)
        }
    };

    useEffect(() => {
        client.get('/getAllBars')
            .then((response) => {
                setRestaurants(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        client.get('/getAllFoods')
            .then((response) => {
                setFoods(response.data);
                setFoodTypes(Array.from(new Set(response.data.map((food) => food.Type))));
                setSearchFood(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Select a restaurant:
                    <select className={styles.select} value={selectedRestaurant} onChange={handleRestaurantChange}>
                        <option value="">--Please choose a restaurant--</option>
                        {restaurants.map((r) => (
                            <option key={r.Id} value={r.IdBar}>{r.Address}</option>
                        ))}
                    </select>
                </label>
                <br />
                <div className={styles.searchs}>
                   <label className={styles.label}>
                        Search by food type:
                        <select className={styles.select} onChange={handleSearchTypeChange}>
                            <option value="">All Types</option>
                            {foodTypes.map(type=>(
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>
                    <br/>
                    <label className={styles.label}>
                        Search food:
                        <input className={styles.input} type="text" onChange={handleSearchTermChange} />
                    </label>
                </div>
                <br />
                <div>
                    Select food:
                    <div className={styles.checkboxList}>
                        {searchFood.map((f) => (
                            <label key={f.Id} className={styles.checkboxListItem}>
                                {f.Name}
                                <input id={"checkbox"+f.Id} type="checkbox" className={styles.checkboxInput} onChange={(event)=>{
                                    if (event.target.checked) {
                                        AddFood(f.Id)
                                    }else{
                                        RemoveFood(f.Id)
                                    }
                                }} />
                                <img className={styles.imgFood} src={"http://localhost/"+f.Image} alt={f.Name}/>
                            </label>
                        ))}
                    </div>
                </div>
                <br/>
                <ul className={styles.selectedFood}>
                    {selectedFood.map((f) => (
                        <li key={f.Id} className={styles.selectedFoodItem}>
                            <p>{f.Name}</p>
                            <img src={"http://localhost/"+f.Image} alt={f.Name} />
                            <input min="1" max="10" placeholder="Count food - 1-10" type="number" onChange={(event)=>{
                                f.Count = event.target.value
                            }} />
                            <button type="button" onClick={() => RemoveFood(f.Id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <button className={styles.button} type="submit">Order Food</button>
            </form>
        </div>
    );
};

export default OrderFoodInBar;