import React, { useRef, useState } from "react";
import "./CreateAvsB.css";
import { Button } from "react-bootstrap";
import FadeIn from "../../animation/FadeIn";

export const CreateAvsB = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [ADesc, setADesc] = useState("");
  const [BDesc, setBDesc] = useState("");
  const [imgFileA, setImgFileA] = useState();
  const [imgFileB, setImgFileB] = useState();

  const setPreviewImgA = (event) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      setImgFileA(event.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const setPreviewImgB = (event) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      setImgFileB(event.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const submitHandler = () => {
    const newPost = {
      title: formTitle,
      description: formDesc,
      A: A,
      B: B,
      ADesc: ADesc,
      BDesc: BDesc,
      imgFileA: imgFileA,
      imgFileB: imgFileB,
    };
    console.log(newPost);
  };
  const imgRef = useRef();
  return (
    <div className="CreateAvsB">
      <FadeIn className="surveyWrapper" childClassName="childClassName">
        <div className="text-wrapper">
          <input
            className="surveyTitle"
            type="text"
            value={formTitle}
            placeholder="Create Form"
            onChange={(e) => {
              setFormTitle(e.target.value);
            }}
          />
          <textarea
            className="surveyDesc"
            type="text"
            value={formDesc}
            placeholder="Form Description"
            onChange={(e) => {
              setFormDesc(e.target.value);
            }}
          />
        </div>
        <div className="AvsBWrapper">
          <div className="ABContent">
            <input
              className="ABTitle"
              value={A}
              placeholder="A"
              onChange={(e) => {
                setA(e.target.value);
              }}
            />
            <input
              className="ABDesc"
              value={ADesc}
              placeholder="Description"
              onChange={(e) => {
                setADesc(e.target.value);
              }}
            />
            <img className="ABImage" src={imgFileA} alt="" />
            <form>
              <label className="ABImage-label" htmlFor="profileImg">
                이미지 추가
              </label>
              <input onChange={setPreviewImgA} className="ABImage-input" type="file" accept="image/*" id="profileImg" />
            </form>
          </div>
          <div className="ABContent">
            <input
              className="ABTitle"
              value={B}
              placeholder="B"
              onChange={(e) => {
                setB(e.target.value);
              }}
            />
            <input
              className="ABDesc"
              value={BDesc}
              placeholder="Description"
              onChange={(e) => {
                setBDesc(e.target.value);
              }}
            />

            <img className="ABImage" src={imgFileB} alt="" />

            <label className="ABImage-label" htmlFor="imgB">
              이미지 추가
            </label>
            <input onChange={setPreviewImgB} className="ABImage-input" type="file" accept="image/*" id="imgB" />
          </div>
        </div>
        <Button variant="outline-primary" onClick={submitHandler}>
          Submit
        </Button>
      </FadeIn>
    </div>
  );
};
