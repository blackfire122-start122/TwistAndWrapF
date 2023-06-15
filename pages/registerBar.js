import { useState, useEffect } from "react";
import styles from "../styles/components/registerBar.module.css";
import client from "../lib/axios";
import BarRegistrationFormHeader from "../components/registerBar/BarRegistrationFormHeader";
import BarRegistrationFormFields from "../components/registerBar/BarRegistrationFormFields";
import BarRegistrationFormButton from "../components/registerBar/BarRegistrationFormButton";

export default function BarRegistrationForm() {
    const [user, setUser] = useState(null);
    const [addText, setAddText] = useState("");
    const [formData, setFormData] = useState({
        address: "",
        password: "",
        confirmPassword: "",
        longitude: "",
        latitude: "",
    });

    useEffect(() => {
        client.get("user/getUser").then((response) => {
            setUser(response.data);
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const data = {
            address: formData.address,
            password: formData.password,
            longitude: formData.longitude,
            latitude: formData.latitude,
        };

        client
            .post("admin/registerBar", data)
            .then((response) => {
                setAddText("Bar registered successfully! Id=" + response.data.idBar);
                setTimeout(() => {
                    setAddText("");
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles.container}>
            <BarRegistrationFormHeader addText={addText} user={user} />
            <form className={styles.form} onSubmit={handleSubmit}>
                <BarRegistrationFormFields
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
                <BarRegistrationFormButton />
            </form>
        </div>
    );
}
