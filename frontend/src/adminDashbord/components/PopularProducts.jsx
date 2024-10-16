import { PopularProductData } from "../../constant/data";
import { MdOutlineInventory2 } from "react-icons/md";

const Products = () => {
  return (
    <div className="row-span-3 xl:row-span-6  shadow-md ">
      <div>
        <h2 className=" border p-2 font-bold bg-blue-100">Popular Products</h2>
        <div className="products px-2">
          {PopularProductData.map(({ id, image, name, price, sold }) => (
            <div
              key={id}
              className="w-full flex items-center justify-between p-1 border-y-2"
            >
              <div className="itemleft flex items-center">
                <img src={image} alt="ProductImg" className="w-[50px]" />
                <div>
                  <p>{name}</p>
                  <p>{price}$</p>
                </div>
              </div>
              <div className="right flex items-center gap-2">
                <MdOutlineInventory2 />
                <p>{sold}k sold</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  
    </div>
  );
};

export default Products;
