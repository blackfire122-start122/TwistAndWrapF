import React, { useState, useEffect } from "react";
import client from "../lib/axios";
import Header from "../components/profile/Header";
import ProfilePicture from "../components/profile/ProfilePicture";
import UserDetails from "../components/profile/UserDetails";
import SuccessMessage from "../components/profile/SuccessMessage";
import ErrorMessage from "../components/profile/ErrorMessage";
import AdminLinks from "../components/profile/AdminLinks";
import styles from "../styles/components/profile.module.css";
import { useRouter } from "next/router";
import ListsAdmin from "../components/profile/ListsAdmin";

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [picture, setPicture] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        client.get("user/getUser").then((response) => {
            UpdateUser(response.data);
        });
    }, []);

    useEffect(() => {
        client.get('user/getAllBars') // ToDo not worked. Transform foods to restorans
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
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function handlePictureChange(event) {
        setPicture(event.target.files[0]);
    }
    async function handleLogout() {
        try {
            await client.get("user/logout")
            await router.push("/login")
        } catch (error) {
            console.error(error);
        }
    }
    function UpdateUser(respData) {
        respData.Image = "http://localhost/" + respData.image;
        setUser(respData);
        setName(respData.username);
        setEmail(respData.email);
        setPhone(respData.phone);
    }

    function handleUpdate() {
        const formData = new FormData();

        formData.append("Image", picture);
        formData.append("Username", name);
        formData.append("Email", email);
        formData.append("Phone", phone);

        client
            .put("user/changeUser", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                UpdateUser(response.data);
                setUpdateStatus("success");
                setErrorMessage(null);
            })
            .catch((err) => {
                console.log(err);
                setUpdateStatus("error");
                setErrorMessage("Failed to update user.");
            });
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.profile}>
                <ProfilePicture image={user.Image} handleLogout={handleLogout}/>
                <UserDetails
                    name={name}
                    email={email}
                    phone={phone}
                    handleNameChange={(event) => setName(event.target.value)}
                    handleEmailChange={(event) => setEmail(event.target.value)}
                    handlePhoneChange={(event) => setPhone(event.target.value)}
                    handlePictureChange={handlePictureChange}
                    handleUpdate={handleUpdate}
                />
            </div>
            {updateStatus === "success" && <SuccessMessage />}
            {updateStatus === "error" && <ErrorMessage message={errorMessage} />}
            {user.isAdmin === "true" &&
                <>
                    <AdminLinks />
                    <ListsAdmin restaurants={restaurants} foods={foods} setFoods={setFoods} setRestaurants={setRestaurants} />
                </>
            }
        </div>
    );
}
