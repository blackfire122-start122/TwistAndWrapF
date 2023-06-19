import React, {useState} from "react";
import styles from "../../styles/components/profile.module.css";
import client from "../../lib/axios";

export default function RestaurantEditForm({ restaurant, setRestaurants, onCancel, onSave }) {
    const [idBar, setIdBar] = useState(restaurant.idBar);
    const [address, setAddress] = useState(restaurant.address);
    const [longitude, setLongitude] = useState(restaurant.longitude);
    const [latitude, setLatitude] = useState(restaurant.latitude);


    const handleIdBarChange = (event) => {
        setIdBar(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleLongitudeChange = (event) => {
        setLongitude(event.target.value);
    };

    const handleLatitudeChange = (event) => {
        setLatitude(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append("id", restaurant.id);
        data.append("idBar", idBar);
        data.append("address", address);
        data.append("longitude", longitude);
        data.append("latitude", latitude);

        client
            .post("admin/changeBar", data)
            .then((response) => {
                const updatedRestaurant = response.data;
                console.log(response.data)
                setRestaurants((prevRestaurant) => {
                    return prevRestaurant.map((restaurantItem) => {
                        if (restaurantItem.id === updatedRestaurant.id) {
                            return updatedRestaurant;
                        }
                        return restaurantItem;
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });

        onSave();
    };

    return (
        <form className={styles.foodEditForm} onSubmit={handleFormSubmit}>
            <input type="text" value={idBar} onChange={handleIdBarChange} placeholder="Id Bar" />
            <input type="text" value={address} onChange={handleAddressChange} placeholder="Id Bar" />
            <input type="number" value={longitude} onChange={handleLongitudeChange} placeholder="Longitude" />
            <input type="number" value={latitude} onChange={handleLatitudeChange} placeholder="Latitude" />

            <div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}