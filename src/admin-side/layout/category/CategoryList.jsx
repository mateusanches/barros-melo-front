import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import ImageIcon from "@material-ui/icons/Image";
import DoneIcon from "@material-ui/icons/Done";
import NoImage from '../../static/images/no-image.png';
import swal from "sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";

import '../../static/css/ProductListAdmin.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const dataAdmin = JSON.parse(localStorage.getItem("LoginAdmin"));
  const [loading, setLoading] = useState(false);
  const authorization = dataAdmin.token;

  const [editOpen, setEditOpen] = useState(null);
  const [imageObject, setImageObject] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://fut-agency-api.herokuapp.com/category");
      const content = response.data;
      setCategories(content);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  async function updateCategory() {
    setLoadingUpdate(true);

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
          method: "put",
          url: "https://fut-agency-api.herokuapp.com/category",
          data: {
            ...editOpen,
            image: imageResponse.data,
          },
          headers: {
            Authorization: "Bearer " + authorization,
          },
        });
        swal("Success", "Category successfully registered", "success");
        document.location.reload(true);
      } catch (error) {
        swal("Error!", "There was a problem with the registration", "error");
      }
      setLoadingUpdate(false);
    } else {
      try {
        const response = await axios({
          method: "put",
          url: "https://fut-agency-api.herokuapp.com/category",
          data: { ...editOpen },
          headers: {
            Authorization: "Bearer " + authorization,
          },
        });
        swal("Success", "Category successfully updated", "success");
        document.location.reload(true);
      } catch (error) {
        swal("Error!", "There was a problem with the registration", "error");
      }
      setLoadingUpdate(false);
    }
  }

  const categoryList = categories.map((category) => {
    return (
      <ListItem key={category._id} className="item-product">
        <p className="item-name">{category.name}</p>
        <div className="itens-btn">
          <p
            className="btn edit"
            title="Edit"
            onClick={(e) => setEditOpen(category)}
          >
            <EditIcon></EditIcon>
          </p>
          <p
            className="btn delete"
            title="Delete"
            onClick={(e) => deleteCategory(category._id)}
          >
            <DeleteIcon></DeleteIcon>
          </p>
        </div>
      </ListItem>
    );
  });

  const deleteCategory = async (id) => {
    swal("Warning", "Want to delete the category?", {
      closeOnClickOutside: true,
      dangerMode: true,
      closeOnEsc: true,
      buttons: {
        cancel: {
          text: "Cancel",
          value: "cancel",
        },
        confirm: {
          text: "Confirm",
          value: "confirm",
        },
      },
      icon: "info",
    }).then((value) => {
      if (value == "confirm") {
        try {
          axios({
            method: "delete",
            url: "https://fut-agency-api.herokuapp.com/category/" + id,
            headers: {
              Authorization: "Bearer " + authorization,
            },
          });
          swal("Success", "Category successfully deleted", "success");
          document.location.reload(true);
        } catch (error) {
          swal("Error!", "There was a problem with the process", "error");
        }
      }
    });
  };

  return (
    <div id="product-list" className="box-content">
      <List className="itens-product">
        <div className="header-list">
          <p className="item-header name">Name</p>
          <span className="spacing"></span>
        </div>
        {loading ? <CircularProgress></CircularProgress> : categoryList}
      </List>
      {editOpen && (
        <div className="modal-product active">
          <div
            className="overlay-modal"
            onClick={(e) => setEditOpen(null)}
          ></div>
          <div className="content-modal">
            <div className="box-close">
              <CloseIcon
                className="icon-close"
                onClick={(e) => setEditOpen(null)}
              ></CloseIcon>
            </div>
            <div className="header-modal">
              <div className="box-img">
                {editOpen.image && <img src={editOpen.image}></img>}
                {!editOpen.image && <img src={NoImage}></img>}
              </div>
              <h2 className="title-modal">{editOpen.name}</h2>
            </div>

            <div className="box-form">
              <TextField
                value={editOpen.name}
                onChange={(e) =>
                  setEditOpen({ ...editOpen, name: e.target.value })
                }
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
                onClick={updateCategory}
              >
                {loadingUpdate ? (
                  <CircularProgress/>
                ) : (
                  <p>Save</p>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;