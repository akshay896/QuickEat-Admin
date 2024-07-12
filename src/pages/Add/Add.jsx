import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useSnackbar } from "notistack";
import uploadImg from "../../assets/uploadImg.png";
import "./Add.css";

const Add = ({ url }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        enqueueSnackbar("Item added successfully", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error adding item", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-container">
      <form onSubmit={onSubmitHandler} className="form">
        <div className="upload-section">
          <label htmlFor="image" className="upload-label">
            <img style={{width:"100%"}}
              className="upload-icon"
              src={image ? URL.createObjectURL(image) : uploadImg}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
          <p className="label">Upload Image</p>
        </div>

        <div className="input-group">
          <label className="label">Product Name</label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter product name"
            className="input"
            required
          />
        </div>

        <div className="input-group">
          <label className="label">Product Category</label>
          <select
            onChange={onChangeHandler}
            name="category"
            className="select"
            value={data.category}
            required
          >
            <option value="">Select a category</option>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Dessert">Dessert</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>

        <div className="input-group">
          <label className="label">Product Price ($)</label>
          <input
            onChange={onChangeHandler}
            value={data.price}
            type="number"
            name="price"
            placeholder="Enter product price"
            className="input"
            required
          />
        </div>

        <div className="input-group">
          <label className="label">Product Description</label>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="Enter product description"
            className="textarea"
            required
          ></textarea>
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? <ClipLoader size={20} color={"#fff"} /> : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;
