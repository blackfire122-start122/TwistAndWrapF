import React, { useState, useEffect } from "react";
import client from "../lib/axios";
import Header from "../components/profile/Header";
import ProfilePicture from "../components/profile/ProfilePicture";
import UserDetails from "../components/profile/UserDetails";
import SuccessMessage from "../components/profile/SuccessMessage";
import ErrorMessage from "../components/profile/ErrorMessage";
import AdminLinks from "../components/profile/AdminLinks";
import styles from "../styles/components/profile.module.css";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [picture, setPicture] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        client.get("user/getUser").then((response) => {
            UpdateUser(response.data);
        });
    }, []);

    function handlePictureChange(event) {
        setPicture(event.target.files[0]);
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
            <Header />
            <div className={styles.profile}>
                <ProfilePicture image={user.Image} />
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
            {user.isAdmin && <AdminLinks />}
        </div>
    );
}
