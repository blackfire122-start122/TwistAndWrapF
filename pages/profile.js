import { useState, useEffect, } from "react";
import client from "../lib/axios";
import styles from "../styles/components/profile.module.css";
import Link from "next/link";

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
            UpdateUser(response.data)
        });
    }, []);

    function handlePictureChange(event) {
        setPicture(event.target.files[0]);
    }

    function UpdateUser(respData){
        respData.Image = "http://localhost/"+respData.image
        setUser(respData);
        setName(respData.username)
        setEmail(respData.email)
        setPhone(respData.phone)
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
            <h1>Profile</h1>
            <div className={styles.profile}>
                <img id="userImg" src={user.Image} alt="Profile Picture" className={styles.picture} />
                <div className={styles.details}>
                    <div>
                        <p>Username:</p>
                        <input className={styles.input} type="text" value={name} onChange={(event) =>{
                            setName(event.target.value)
                        }}/>
                    </div>

                    <div>
                        <p>Email:</p>
                        <input className={styles.input} type="email" value={email} onChange={(event) =>{
                            setEmail(event.target.value)
                        }}/>
                    </div>

                    <div>
                        <p>Phone:</p>
                        <input className={styles.input} type="text" value={phone} onChange={(event) =>{
                            setPhone(event.target.value)
                        }}/>
                    </div>

                    <div>
                        <input className={styles.input} type="file" accept="image/*" onChange={handlePictureChange} />
                    </div>

                    <button className={styles.button} onClick={handleUpdate}>Update</button>
                </div>
            </div>
            {updateStatus === "success" && <p className={`${styles.successMessage} ${styles.success}`}>User updated successfully.</p>}
            {updateStatus === "error" && <p className={`${styles.errorMessage} ${styles.error}`}>{errorMessage}</p>}

            {
                user.isAdmin ? (
                    <div className={styles.links}>
                        <Link className={styles.link} href="/createProduct">
                            <h4>Create product</h4>
                        </Link>
                        <Link className={styles.link} href="/registerBar">
                            <h4>Create bar</h4>
                        </Link>
                    </div>
                ) : null
            }
        </div>
    );
}
