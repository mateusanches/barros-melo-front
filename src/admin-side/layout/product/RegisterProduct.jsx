import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import ImageIcon from '@material-ui/icons/Image';
import DoneIcon from '@material-ui/icons/Done';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import CircularProgress from "@material-ui/core/CircularProgress";

const RegisterProduct = () => {
    const [urlImg, setUrlImg] = useState();
    const [imageObject, setImageObject] = useState(null);
    const [data, setData] = useState({ name: '', price: '', description: '', image: urlImg });
    const [loading, setLoading] = useState(false);
    const dataAdmin = JSON.parse(localStorage.getItem('LoginAdmin'));
    const authorization = dataAdmin.token;
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState();
    var formData = new FormData();

    useEffect(() => {
        getCategories();
    }, []);

    const handleChange = (event) => {
        setSelectCategory(event.target.value);
    };


    const getCategories = async () => {
        try {
            const response = await axios.get('https://fut-agency-api.herokuapp.com/category');
            const content = response.data;
            setCategories(content);
        } catch (error) {
            alert(error.message);
        }
    };

    const categoryList = categories.map(category => {
        return (
            <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
        )
    });

    const submit = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append('file', imageObject);

        try {
            const imageResponse = await axios({
                method: 'post',
                url: "https://fut-agency-api.herokuapp.com/upload",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            const response = await axios({
                method: 'post',
                url: 'https://fut-agency-api.herokuapp.com/product',
                data: { ...data, image: imageResponse.data, category: selectCategory },
                headers: {
                    Authorization: 'Bearer ' + authorization
                }
            });
            swal("Success", "Product successfully registered", "success");
        }
        catch (error) {
            swal("Error!", "There was a problem with the registration", "error");
        }
        setLoading(false);
    }

    return (
        <div id="cadastro-user" className="box-content">
            <h1 className="title-content">Register a new product</h1>

            <div className="box-form">
                <TextField value={data.name} onChange={e => setData({ ...data, name: e.target.value })} type="text" className="input-cadastro" required label="Name" />
                <NumberFormat thousandSeparator={true} customInput={TextField} value={data.price} onChange={e => setData({ ...data, price: e.target.value })} className="input-cadastro" required label="Price" />
                <label>
                    Description
                    <textarea value={data.description} onChange={e => setData({ ...data, description: e.target.value })} type="text" className="input-cadastro input-area" required ></textarea>
                </label>
                <FormControl className="filter-select">
                    <InputLabel className="label-filter">Category</InputLabel>
                    <Select onChange={handleChange} value={selectCategory}>
                        {categoryList}
                    </Select>
                </FormControl>
                <label className="input-picture">
                    <p><ImageIcon className="icon-img"></ImageIcon> Image</p>
                    <input onChange={e => setImageObject(e.target.files[0])} id="upload" className="picture-file" type="file"></input>
                    {imageObject && <DoneIcon className="done"></DoneIcon>}
                </label>
                <Button variant="contained" color="primary" className="btn-cadastro" onClick={submit}>
                    {loading === false && <p>Save</p>}
                    {loading === true && <CircularProgress/>}
                </Button>
            </div>
        </div>
    )
};

export default RegisterProduct;