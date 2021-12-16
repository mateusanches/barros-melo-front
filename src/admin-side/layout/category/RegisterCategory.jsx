import axios from "axios";
import React from "react";
import { useState } from "react";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ImageIcon from "@material-ui/icons/Image";
import DoneIcon from "@material-ui/icons/Done";

import CircularProgress from "@material-ui/core/CircularProgress";

const RegisterCategory = () => {
  const [data, setData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const dataAdmin = JSON.parse(localStorage.getItem("LoginAdmin"));
  const authorization = dataAdmin.token;

  const [imageObject, setImageObject] = useState(null);

  const submit = async () => {
    setLoading(true);

    if (imageObject) {
      const formData = new FormData();
      formData.append("file", imageObject);

      try {
        const imageResponse = await axios({
          method: "post",
          url: "https://fut-agency-api.herokuapp.com/upload",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const response = await axios({
          method: "post",
          url: "https://fut-agency-api.herokuapp.com/category",
          data: {
            ...data,
            image: imageResponse.data,
          },
          headers: {
            Authorization: "Bearer " + authorization,
          },
        });
        swal("Success", "Category successfully saved", "success");
        document.location.reload(true);
      } catch (error) {
        swal("Error!", "There was a problem with the registration", "error");
      }
      setLoading(false);
    } else {
      try {
        const response = await axios({
          method: "post",
          url: "https://fut-agency-api.herokuapp.com/category",
          data: { ...data },
          headers: {
            Authorization: "Bearer " + authorization,
          },
        });
        swal("Success", "Category successfully saved", "success");
        document.location.reload(true);
      } catch (error) {
        swal("Error!", "There was a problem with the registration", "error");
      }
      setLoading(false);
    }
  };

  return (
    <div id="cadastro-user" className="box-content">
      <h1 className="title-content">Register a new category</h1>

      <div className="box-form">
        <TextField
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          type="text"
          className="input-cadastro"
          required
          label="Name"
        />
        <label className="input-picture">
          <p>
            <ImageIcon className="icon-img"></ImageIcon> Image
          </p>
          <input
            onChange={(e) => setImageObject(e.target.files[0])}
            id="upload"
            className="picture-file"
            type="file"
          ></input>
          {imageObject && <DoneIcon className="done"></DoneIcon>}
        </label>
        <Button
          variant="contained"
          color="primary"
          className="btn-cadastro"
          onClick={submit}
        >
          {loading === false && <p>Save</p>}
          {loading === true && <CircularProgress/>}
        </Button>
      </div>
    </div>
  );
};

export default RegisterCategory;