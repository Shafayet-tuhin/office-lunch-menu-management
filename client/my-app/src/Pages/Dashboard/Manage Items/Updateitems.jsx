import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { TbArrowBack } from "react-icons/tb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const imageBB_token = import.meta.env.VITE_ImageBB_TOKEN;

const UpdateItems = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const category = e.target.category.value;
    const price = parseFloat(e.target.price.value);
    const recipe = e.target.recipe.value;
    const imageUrl = data.image;

    const item = {
      name: name,
      category: category,
      price: price,
      recipe: recipe,
      image: imageUrl,
    };

    fetch(`https://bistro-boss-roan.vercel.app/menu/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((updateData) => {
        if (updateData.modifiedCount > 0) {
          navigate('/dashboard/manageitems');
          Swal.fire("Item updated successfully", "", "success");
        } else {
          Swal.fire("Failed to update item", "", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Something went wrong", "", "error");
      });

    e.target.reset();
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8">
      <div className="flex flex-col items-center gap-4 mb-12">
        <p className="text-[#D99904] italic text-xl md:text-2xl lg:text-3xl font-normal">
          ---What's New?---
        </p>
        <hr className="w-32 md:w-48 lg:w-[22rem]" />
        <p className="text-[#151515] text-2xl md:text-3xl lg:text-[2.5rem] font-abc">
          Update Item
        </p>
        <hr className="w-32 md:w-48 lg:w-[23rem]" />
      </div>

      <Link to="/dashboard/manageitems" className="btn mb-4">
        <button className="flex gap-2 text-5xl ">
          <TbArrowBack />
        </button>
      </Link>

      <div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-[5.5rem] bg-[#F3F3F3] rounded-xl lg:mb-32"
          onSubmit={handleSubmit}
        >
          <img
            className="col-span-1 md:col-span-2 mx-auto rounded-2xl mb-4"
            src={data.image}
            alt={data.name}
          />

          <div className="col-span-1 md:col-span-2">
            <label className="label">
              <span className="label-text text-[#444444] text-xl font-semibold">
                Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={data.name}
              placeholder="Enter Product name"
              className="w-full text-xl py-[1.6rem] px-[2.25rem] border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-[#444444] text-xl font-semibold">
                Category
              </span>
            </label>
            <select
              defaultValue={data.category}
              name="category"
              className="w-full text-xl py-[1.6rem] px-[2.25rem] border rounded-lg"
              required
            >
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drink</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-[#444444] text-xl font-semibold">
                Price
              </span>
            </label>
            <input
              type="number"
              name="price"
              defaultValue={data.price}
              placeholder="Enter Your Price"
              className="w-full text-xl py-[1.6rem] px-[2.25rem] border rounded-lg"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="label">
              <span className="label-text text-[#444444] text-xl font-semibold">
                Recipe Details
              </span>
            </label>
            <textarea
              defaultValue={data.recipe}
              placeholder="Enter Recipe Details"
              name="recipe"
              className="w-full text-xl h-[15rem] py-[1.6rem] px-[2.25rem] border rounded-lg resize-none"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
            <button type="submit" value="Send">
              <div className="flex gap-3 items-center hover:bg-slate-600 px-[1.5rem] py-4 text-xl font-semibold hover:text-white rounded-xl bg-slate-800 text-white">
                Update Item <ImSpoonKnife className="text-orange-400" />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItems;
