import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import dateFormat from 'dateformat';
import CurrencyFormat from 'react-currency-format';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import ImageIcon from '@material-ui/icons/Image';
import DoneIcon from '@material-ui/icons/Done';
import NoImage from '../../static/images/no-image.png';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../../static/css/ProductListAdmin.css';

const ProductList = () => {
    const dataAdmin = JSON.parse(localStorage.getItem('LoginAdmin'));
    const [urlImg, setUrlImg] = useState();
    const [imageObject, setImageObject] = useState(null);
    const [products, setProducts] = useState([]);
    const [viewProduct, setViewProduct] = useState({});
    const [modalProduct, setModalProduct] = useState('');
    const [loading, setLoading] = useState(false);
    const [{ ...data }, setData] = useState({ name: '', price: '', description: '', _id: '', image: '', category: '' });
    const authorization = dataAdmin.token;
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getCategories();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://fut-agency-api.herokuapp.com/product');
            const content = response.data;
            setProducts(content);
        } catch (error) {
            alert(error.message);
        }
        setLoading(false);
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
            <option key={category._id} value={category._id}>{category.name}</option>
        )
    });

    const handleChange = (event) => {
        setSelectCategory(event.target.value);
    };

    const productList = products.map(product => {
        return (
            <ListItem key={product._id} className="item-product">
                <p className="item-name">{product.name}</p>
                <p className="item-created">{dateFormat(product.createdAt, "dd-mm-yyyy, h:MM:ss TT")}</p>
                <p><CurrencyFormat className="value" value={product.price} displayType={'text'} thousandSeparator={true} prefix={'£'} /></p>
                <div className="itens-btn">
                    <p className="btn edit" title="Edit" onClick={e => showProduct(product)}><EditIcon></EditIcon></p>
                    <p className="btn delete" title="Delete" onClick={e => deleteProduct(product._id)}><DeleteIcon></DeleteIcon></p>
                </div>
            </ListItem>
        )
    });

    const showProduct = (product) => {
        setViewProduct({ name: product.name, createdAt: product.createdAt, price: product.price, description: product.description, image: product.image, category: product.category });
        setData({ ...data, name: product.name, price: product.price, description: product.description, _id: product._id, image: product.image, category: product.category });
        setModalProduct('active');
        setSelectCategory(product.category);
    }

    const deleteProduct = async (id) => {
        swal("Warning", "Want to delete the product?", {
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
        })
            .then((value) => {
                if (value == "confirm") {
                    try {
                        axios({
                            method: 'delete',
                            url: 'https://fut-agency-api.herokuapp.com/product/' + id,
                            headers: {
                                Authorization: 'Bearer ' + authorization
                            }
                        });
                        swal("Success", "Product successfully deleted", "success");
                        document.location.reload(true);

                    } catch (error) {
                        swal("Error!", "There was a problem with the process", "error");
                    }
                }
            });
    };

    async function updateProduct() {
        setLoading(true);

        if (imageObject) {

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
                    method: 'put',
                    url: 'https://fut-agency-api.herokuapp.com/product',
                    data: { ...data, image: imageResponse.data, category: selectCategory },
                    headers: {
                        Authorization: 'Bearer ' + authorization
                    }
                });
                swal("Success", "Product successfully registered", "success");
                document.location.reload(true);
            }
            catch (error) {
                swal("Error!", "There was a problem with the registration", "error");
            }
            setLoading(false);
        } else {
            try {
                const response = await axios({
                    method: 'put',
                    url: 'https://fut-agency-api.herokuapp.com/product',
                    data: { ...data, category: selectCategory },
                    headers: {
                        Authorization: 'Bearer ' + authorization
                    }
                });
                swal("Success", "Product successfully registered", "success");
                document.location.reload(true);
            }
            catch (error) {
                swal("Error!", "There was a problem with the registration", "error");
            }
            setLoading(false);
        }
    }

    return (
        <div id="product-list" className="box-content">
            <List className="itens-product">
                <div className="header-list">
                    <p className="item-header name">Name</p>
                    <p className="item-header created">Created at</p>
                    <p className="item-header price">Price</p>
                    <span className="spacing"></span>
                </div>
                {loading ? <CircularProgress></CircularProgress> : productList}
            </List>
            <div className={"modal-product " + modalProduct}>
                <div className="overlay-modal" onClick={e => setModalProduct('')}></div>
                <div className="content-modal">
                    <div className="box-close">
                        <CloseIcon className="icon-close" onClick={e => setModalProduct('')}></CloseIcon>
                    </div>
                    <div className="header-modal">
                        <div className="box-img">
                            {data.image && <img src={data.image}></img>}
                            {!data.image && <img src={NoImage}></img>}
                        </div>
                        <h2 className="title-modal">{data.name}</h2>
                    </div>

                    <div className="box-form">
                        <TextField value={data.name} onChange={e => setData({ ...data, name: e.target.value })} type="text" className="input-cadastro" required label="Name" />
                        <NumberFormat thousandSeparator={true} customInput={TextField} value={data.price} onChange={e => setData({ ...data, price: e.target.value })} className="input-cadastro" required label="Price" />
                        <label>
                            Description
                            <textarea value={data.description} placeholder="Description" className="input-cadastro input-area" onChange={e => setData({ ...data, description: e.target.value })}></textarea>
                        </label>
                        <span className="item"><span className="title">Category</span>
                            <select className="form-edit" value={selectCategory} onChange={handleChange}>
                                <option key={data.category._id} value={data.category._id}>{data.category.name}</option>
                                {categoryList}
                            </select>
                        </span>
                        <label className="input-picture">
                            <p><ImageIcon className="icon-img"></ImageIcon> Image</p>
                            <input onChange={e => setImageObject(e.target.files[0])} id="upload" className="picture-file" type="file"></input>
                            {imageObject && <DoneIcon className="done"></DoneIcon>}
                        </label>
                        <Button variant="contained" color="primary" className="btn-cadastro" onClick={updateProduct}>
                            {loading === false && <p>Save</p>}
                            {loading === true && <CircularProgress/>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;