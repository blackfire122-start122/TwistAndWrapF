import React, { useState } from "react";
import styles from "../../styles/components/profile.module.css";
import FoodEditForm from "./FoodEditForm";
import client from "../../lib/axios";

export default function FoodsAdminList({ foods, types, setFoods }) {
    const [editFood, setEditFood] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteFoodId, setDeleteFoodId] = useState(null);

    const handleDeleteFood = (id) => {
        setShowConfirmation(true);
        setDeleteFoodId(id);
    };

    const handleConfirmDelete = () => {
        client
            .delete(`/admin/deleteFood/${deleteFoodId}`)
            .then(() => {
                setFoods((prevFoods) => prevFoods.filter((food) => food.id !== deleteFoodId));
                setShowConfirmation(false);
                setDeleteFoodId(null);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setDeleteFoodId(null);
    };

    const handleEditFood = (food) => {
        setEditFood(food);
    };

    const handleCancelEdit = () => {
        setEditFood(null);
    };

    const handleSaveEdit = () => {
        setEditFood(null);
    };

    return (
        <div className={styles.foods}>
            {foods.map((f) => (
                <div key={f.id} className={styles.food}>
                    {editFood === f ? (
                        <FoodEditForm food={f} setFoods={setFoods} types={types} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
                    ) : (
                        <>
                            <p className={styles.foodName}>{f.name}</p>
                            <div className={styles.foodImageContainer}>
                                <img className={styles.foodImage} src={f.image} alt={f.name} />
                                <img className={styles.changeIcon} src="/static/change.png" alt="change food" onClick={() => handleEditFood(f)} />
                            </div>
                            <button className={styles.delete_btn} onClick={() => handleDeleteFood(f.id)}>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ))}
            {showConfirmation && (
                <div className={styles.deleteConfirmation}>
                    <p>Are you sure you want to delete this food?</p>
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
    );
}
