import React, {useState} from "react";
import styles from "../../styles/components/profile.module.css";
import client from "../../lib/axios";

export default function FoodEditForm({ food, setFoods, types, onCancel, onSave }) {
    const [name, setName] = useState(food.name);
    const [description, setDescription] = useState(food.description);
    const [type, setType] = useState(types.find((item) => item.type === food.type).id);
    const [image, setImage] = useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append("id", food.id);
        data.append("name", name);
        data.append("description", description);
        data.append("type", type);
        data.append("file", image);

        client
            .post("admin/changeFood", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const updatedFood = response.data;

                setFoods((prevFoods) => {
                    return prevFoods.map((foodItem) => {
                        if (foodItem.id === updatedFood.id) {
                            return updatedFood;
                        }
                        return foodItem;
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
            <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
            <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Description"
                required
            ></textarea>
            <select onChange={handleTypeChange}>
                <option value={food.type.id}>{food.type}</option>
                {types.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.type}
                    </option>
                ))}
            </select>
            <input type="file" onChange={handleImageChange} />
            <div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}