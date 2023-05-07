import { useState, useEffect, useRef } from 'react';
import client from "../lib/axios";
import styles from '../styles/components/OrderFoodInBar.module.css';
import mapBoxGl from "mapbox-gl";

const OrderFoodInBar = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [foods, setFoods] = useState([]);
    const [searchFood, setSearchFood ] = useState([])
    const [foodTypes, setFoodTypes] = useState([]);
    const [addText, setAddText] = useState("");
    const [errorSelectedTime, setErrorSelectedTime] = useState("");
    const mapContainerRef = useRef(null);
    const markerImageURL = 'http://localhost/static/marker-15.png';
    // const [selectedMarker, setSelectedMarker] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedFoodIdCount = selectedFood.map(({ id, count }) => ({ id, count }));

        if (selectedFoodIdCount === [] || !selectedRestaurant || selectedTime === ""){
            console.log("error not all field")
            return
        }

        client.post('user/orderFood', {
            restaurantId: selectedRestaurant,
            foods: selectedFoodIdCount,
            time: selectedTime
        })

        .then((response) => {
            if (response.data !== ""){
                setSelectedRestaurant("")
                setSelectedFood([])
                setSelectedTime("")
                setAddText("Ordered. Your Id: "+response.data.msg.split(":")[1])

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
            setErrorSelectedTime("* Invalid time. Please select a valid time")
            setSelectedTime("")
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

    useEffect(() => {
        mapBoxGl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

        const map = new mapBoxGl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [31, 49],
            zoom: 5
        });

        map.on('load', () => {
            map.loadImage(markerImageURL, (error, image) => {
                if (error) throw error;

                map.addImage('marker-icon', image);
                map.addSource('markers', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: restaurants.map((r) => ({
                            type: 'Feature',
                            properties: r,
                            geometry: {
                                type: 'Point',
                                coordinates: [parseFloat(r.longitude), parseFloat(r.latitude)]
                            }
                        }))
                    }
                });
                map.addLayer({
                    id: 'markers',
                    type: 'symbol',
                    source: 'markers',
                    layout: {
                        'icon-image': 'marker-icon',
                        'icon-size': 0.07
                    }
                });
            });
        });

        map.on('click', (e) => {
            const features = map.queryRenderedFeatures(e.point);
            if (features.length > 0 && features[0].layer.id === 'markers') {
                // setSelectedMarker(features[0]);
                setSelectedRestaurant(features[0].properties.idBar);
            } else {
                // setSelectedMarker(null);
            }
        });

        return () => map.remove(); // Clean up the map instance on unmount
    }, [restaurants, markerImageURL]);

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.selectRestaurantAndTime}>
                    <label className={styles.label}>
                        Select a restaurant:
                        <select className={styles.select} value={selectedRestaurant} onChange={handleRestaurantChange}>
                            <option value="">--Please choose a restaurant--</option>
                            {restaurants.map((r ) => (
                                <option key={r.id} value={r.idBar}>{r.address}</option>
                            ))}
                        </select>
                    </label>
                    <br/>

                    <label className={styles.label}>
                        Select Time:
                        <input className={styles.input}
                               type="time"
                               value={selectedTime}
                               onChange={handleTimeChange}
                        />
                        <span>{errorSelectedTime}</span>
                    </label>
                </div>
                <br/>
                <div ref={mapContainerRef} className={styles.mapContainer} />
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
                            <label key={f.id} className={styles.checkboxListItem}>
                                {f.name}
                                <input id={"checkbox"+f.id} type="checkbox" className={styles.checkboxInput} onChange={(event)=>{
                                    if (event.target.checked) {
                                        AddFood(f.id)
                                    }else{
                                        RemoveFood(f.id)
                                    }
                                }} />
                                <img className={styles.imgFood} src={"http://localhost/"+f.image} alt={f.name}/>
                            </label>
                        ))}
                    </div>
                </div>
                <br/>
                <ul className={styles.selectedFood}>
                    {selectedFood.map((f) => (
                        <li key={f.id} className={styles.selectedFoodItem}>
                            <p>{f.name}</p>
                            <img src={"http://localhost/"+f.image} alt={f.name} />
                            <input min="1" max="10" placeholder="Count food - 1-10" type="number" onChange={(event)=>{
                                f.count = event.target.value
                            }} />
                            <button type="button" onClick={() => RemoveFood(f.id)}>Remove</button>
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