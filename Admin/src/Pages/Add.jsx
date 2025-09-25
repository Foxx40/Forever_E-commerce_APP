import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  
  console.log(image1 , image2 , image3 , image4,name,description,category,subCategory,price,size,bestseller)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(size));
      formData.append("bestseller", bestseller.toString());
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      const response = await axios.post(
        backendUrl + "/api/products/add",
        formData,
        { headers: { token } }
      );
      if(response.data.success){
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setPrice("")
        setSize([])
        setBestseller(false)
        setImage1("")
        setImage2("")
        setImage3("")
        setImage4("")
      }
      else{
        toast.error(response.data.message)
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex flex-col w-full items-start"
    >
      <div>
        <p className="">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20"
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
        <div className="w-full ">
          <p className="mb-2">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Enter Product Name"
          />
        </div>
        <div className="w-full ">
          <p className="mb-2">Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Enter Product Description"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-3 py-2"
              name=""
              id=""
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product Sub Category</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="w-full px-3 py-2"
              name=""
              id=""
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-2 ">Product Price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full sm:w-[120px] px-3 py-2"
              type="number"
              placeholder=" Price"
            />
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2">Product Size</p>
        <div className="flex gap-3 ">
          <div
            onClick={() =>
              setSize((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={` px-3 py-1 cursor-pointer ${
                size.includes("S") ? "bg-pink-200 " : "bg-slate-200"
              }`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSize((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                size.includes("M") ? "bg-pink-200 " : "bg-slate-200"
              }`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSize((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={` px-3 py-1 cursor-pointer ${
                size.includes("L") ? "bg-pink-200 " : "bg-slate-200"
              }`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSize((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                size.includes("XL") ? "bg-pink-200 " : "bg-slate-200"
              }`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSize((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                size.includes("XXL") ? "bg-pink-200 " : "bg-slate-200"
              }`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>
      <button type="submit" className="bg-black text-white px-3 py-2 mt-6">
        Add Product
      </button>
    </form>
  );
};

export default Add;
