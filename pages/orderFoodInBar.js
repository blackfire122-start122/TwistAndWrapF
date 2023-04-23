import { useState, useEffect } from 'react';
import client from "../lib/axios";
import styles from '../styles/components/OrderFoodInBar.module.css';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

const Map = ReactMapboxGl({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
});

const OrderFoodInBar = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [foods, setFoods] = useState([]);
    const [searchFood, setSearchFood ] = useState([])
    const [foodTypes, setFoodTypes] = useState([]);
    const [addText, setAddText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedFoodIdCount = selectedFood.map(({ Id, Count }) => ({ Id, Count }));

        if (selectedFoodIdCount === [] || !selectedRestaurant || selectedTime === ""){
            console.log("error not all field")
            return
        }

        client.post('user/orderFood', {
            RestaurantId: selectedRestaurant,
            Foods: selectedFoodIdCount,
            Time: selectedTime
        })

        .then((response) => {
            if (response.data !== ""){
                setSelectedRestaurant("")
                setSelectedFood([])
                setSelectedTime("")
                setAddText("Ordered. Your Id: "+response.data.Msg.split(":")[1])

                setTimeout(()=>{
                    setAddText("")
                }, 5000)
                
            }else {
                console.warn(response)
            }
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
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value)
    };

    const handleSearchTypeChange = (event) => {
        if (event.target.value !== ""){
            setSearchFood(foods.filter(f => f.Type === event.target.value))
        }else {
            setSearchFood(foods)
        }
    };

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
                <div className={styles.selectRestaurantAndTime}>
                    <label className={styles.label}>
                        Select a restaurant:
                        <select className={styles.select} value={selectedRestaurant} onChange={handleRestaurantChange}>
                            <option value="">--Please choose a restaurant--</option>
                            {restaurants.map((r ) => (
                                <option key={r.Id} value={r.IdBar}>{r.Address}</option>
                            ))}
                        </select>
                    </label>
                    <br/>

                    <label className={styles.label}>
                        Select Time:
                        <input className={styles.input} type="time" value={selectedTime} onChange={handleTimeChange} />
                    </label>
                </div>
                <br/>

                <Map style="mapbox://styles/mapbox/streets-v11"
                     containerStyle={{
                         height: "600px",
                         width: "100%",
                     }}
                     center={[31, 49]}
                     zoom={[5]}
                >
                    <GeoJSONLayer
                        id="point"
                        data={{
                            "type": "FeatureCollection",
                            "features": restaurants.map((r)=>{
                                return {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [parseFloat(r.LngLatX), parseFloat(r.LngLatY)]
                                    },
                                "properties": {
                                    "title": "My Point",
                                    "marker-color": "#FF0000",
                                    "marker-size": "medium",
                                    "marker-symbol": ""
                                }}
                            })
                        }}
                        circleLayout={{ visibility: "visible" }}
                        circlePaint={{
                            "circle-radius": 8,
                            "circle-color": "#FF0000"
                        }}
                        onClick={(e)=>{console.log(e)}}
                    />
                </Map>

                <br />

                <div className={styles.searches}>
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
            {addText ? <span className={styles.SpanOrdered}>{addText}</span>:null}

        </div>
    );
};

export default OrderFoodInBar;