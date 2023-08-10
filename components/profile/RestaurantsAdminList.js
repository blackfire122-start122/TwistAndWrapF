import React, { useState } from "react";
import styles from "../../styles/components/profile.module.css";
import client from "../../lib/axios";
import RestaurantEditForm from "./RestaurantEditForm";

export default function RestaurantsAdminList({ restaurants, setRestaurants }) {
    const [editRestaurant, setEditRestaurant] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteRestaurantId, setDeleteRestaurantId] = useState(null);
    const handleDeleteRestaurant = (id) => {
        setShowConfirmation(true);
        setDeleteRestaurantId(id);
    };

    const handleConfirmDelete = () => {
        client
            .delete(`/admin/deleteBar/${deleteRestaurantId}`)
            .then(() => {
                setRestaurants((prevBars) => prevBars.filter((bar) => bar.id !== deleteRestaurantId));
                setShowConfirmation(false);
                setDeleteRestaurantId(null);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setDeleteRestaurantId(null);
    };

    const handleEditRestaurants = (restaurant) => {
        setEditRestaurant(restaurant);
    };

    const handleCancelEdit = () => {
        setEditRestaurant(null);
    };

    const handleSaveEdit = () => {
        setEditRestaurant(null);
    };

    return (
        <div className={styles.restaurants}>
            {restaurants.map((r) => (
                <div key={r.id} className={styles.restaurant}>
                    {editRestaurant === r ? (
                        <RestaurantEditForm restaurant={r} setRestaurants={setRestaurants} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
                    ) : (
                        <>
                            <div className={styles.restaurantInfo}>
                                <img className={styles.changeIcon} src="/static/change.png" alt="change restaurant" onClick={() => handleEditRestaurants(r)} />
                                <p className={styles.restaurantAddress}>{r.address}</p>
                                <p>ID Bar: {r.idBar}</p>
                                <p>Coordinates: {r.longitude} {r.latitude}</p>
                            </div>
                            <button className={styles.delete_btn} onClick={() => handleDeleteRestaurant(r.id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
            {showConfirmation && (
                <div className={styles.deleteConfirmation}>
                    <p>Are you sure you want to delete this restaurant ?</p>
                    <div>
                        <button className={styles.confirmDeleteBtn} onClick={handleConfirmDelete}>
                            Yes
                        </button>
                        <button className={styles.cancelDeleteBtn} onClick={handleCancelDelete}>
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

