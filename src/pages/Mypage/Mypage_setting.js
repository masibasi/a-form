import React, { useContext, useEffect, useState } from "react";
import "./Mypage.css";
import profileimg from "../../assets/images/profile_sample1.png";
import alarm from "../../assets/images/alarm.png";
import alarm_no from "../../assets/images/alarm_no.png";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Button } from "react-bootstrap";
import FadeIn from "../../animation/FadeIn";

export default function Mypage_setting() {
    const navigate = useNavigate();

    const { userData } = useContext(AuthenticationContext);

    const [name, setName] = useState(userData.name);
    const [phone, setPhone] = useState(userData.phone);
    const [email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("isLoggedIn")) navigate("/");
        console.log(userData);
    }, []);

    const [previewImg, setPreviewImg] = useState(null);

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        const previewImageUrl = URL.createObjectURL(selectedFile);
        setPreviewImg(previewImageUrl);
    };

    const [isAlarmEnabled, setIsAlarmEnabled] = useState(true);

    const toggleAlarm = () => {
        setIsAlarmEnabled(!isAlarmEnabled);
    };

    return (
        <div className="Mypage_setting">
            <FadeIn className="settingWrapper">
                <div className="setting_container1">
                    <div className="profile_img">
                        <img src={previewImg ? previewImg : profileimg} alt="" className="profile_picture" />
                    </div>

                    <button className="button change_photo_button" onClick={() => document.getElementById("profileImg").click()}>
                        Change Photo
                    </button>
                    <input onChange={handleImageChange} className="change_photo_button_input" type="file" accept="image/*" id="profileImg" />
                </div>

                <div className="setting_container2">
                    <div className="your_profile">
                        <div className="your_profile_item">
                            <div className="your_profile_title">Your name</div>
                            <input type="text" className="your_profile_name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="your_profile_item">
                            <div className="your_profile_title">Your Phone Number</div>
                            <input type="text" className="your_profile_nickname" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="your_profile_item">
                            <div className="your_profile_title">Your email</div>
                            <input type="email" className="your_profile_email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="your_profile_item">
                            <div className="your_profile_title">Change password</div>
                            <input type="password" className="your_profile_password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="alarm_setting">
                        <div className="alarm_icon" onClick={toggleAlarm}>
                            <img src={isAlarmEnabled ? alarm : alarm_no} alt="" />
                        </div>
                        <div className="alarm_option">Enable Notification</div>
                    </div>

                    <div className="setting_buttons">
                        <Button variant="outline-danger" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                        <Button variant="outline-primary">Save Changes</Button>
                        <Button variant="warning">LOGOUT</Button>{" "}
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
