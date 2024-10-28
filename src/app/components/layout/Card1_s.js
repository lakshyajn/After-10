import { useState, useContext, useEffect } from "react";
import { CartContext } from "./cart-context";
import Image from "next/image";

export default function Card({ id, pic, price, addOns, name }) {
  const { addToCart } = useContext(CartContext);
  const [tabOpen, setTabopen] = useState(false);
  const [count, setCount] = useState(1);
  const [checkboxes, setCheckboxes] = useState({});

  // Set initial state for checkboxes
  useEffect(() => {
    const initialState = {};
    addOns.forEach((addOn) => {
      initialState[addOn] = false;
    });
    setCheckboxes(initialState);
  }, [addOns]);

  function toggle() {
    setTabopen(!tabOpen);
  }
  function increase() {
    setCount(count + 1);
  }
  function decrease() {
    if (count > 1) setCount(count - 1);
  }

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  const getTotal = () => {
    let total = price * count;
    if (checkboxes.cheese && checkboxes.veges) {
      total += 50 * count;
    } else if (checkboxes.cheese) {
      total += 20 * count;
    } else if (checkboxes.veges) {
      total += 30 * count;
    }
    return total;
  };

  return (
    <div className="card">
      <div className="single food">
        <div className="flex mh-8">
          <div>
            <Image src={pic} className="w-28 mt-6 rounded-md" alt={name} />
          </div>
          <div className="flex-col p-2 m-1">
            <div className="text-[#101010] text-lg m-2">{name}</div>
            <div className="text-[#37DD00] m-2">₹ {price}</div>
            <button
              onClick={toggle}
              className="bg-[#37DD00] border-2-black rounded-lg shadow-sm pl-3 pr-3 pt-2 pb-2 text-white m-2"
            >
              Add +
            </button>
            {tabOpen && (
              <div
                id="tab"
                className=" w-100vw h-100h top-0 left-0 right-0 bottom-0 fixed"
              >
                <div
                  className="bg-overlay z-2 w-100vw h-100h top-0 left-0 right-0 bottom-0 fixed items-center justify-center"
                  onClick={toggle}
                ></div>
                <div className="tab-content flex-col z-10 absolute w-full bg-white mx-auto p-8 justify-center bottom-0">
                  <div className="absolute right-4 top-4">
                    <button
                      className="text-[#f1f1f1] text-xl bg-[#37DD00] pl-1 pr-1 rounded-md"
                      onClick={toggle}
                    >
                      x
                    </button>
                  </div>
                  <h2 className="mt-4 text-xl font-sans font-semibold">
                    {name}
                  </h2>

                  {addOns.length > 0 && (
                    <div className="add-ons mt-2 mb-2">
                      {addOns.includes("cheese") && (
                        <div className="m-auto flex justify-between">
                          <div className="gap-1 flex items-baseline">
                            <div>
                              <input
                                type="checkbox"
                                id="cheese"
                                checked={checkboxes.cheese}
                                onChange={() =>
                                  handleCheckboxChange("cheese")
                                }
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="cheese"
                                className="text-[#101010] text-lg"
                              />
                              Cheese
                            </div>
                          </div>
                          <div>+ ₹20</div>
                        </div>
                      )}
                      {addOns.includes("veges") && (
                        <div className="m-auto flex justify-between">
                          <div className="gap-1 flex items-baseline">
                            <div>
                              <input
                                type="checkbox"
                                id="veges"
                                checked={checkboxes.veges}
                                onChange={() =>
                                  handleCheckboxChange("veges")
                                }
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="veges"
                                className="text-[#101010] text-lg"
                              />
                              Vegetables
                            </div>
                          </div>
                          <div>+ ₹30</div>
                        </div>
                      )}
                    </div>
                  )}

                  <div>Total: ₹ {getTotal()}</div>
                  <div className="justify-between flex mt-8 mb-4">
                    <div className="quantity flex">
                      <button
                        onClick={decrease}
                        className="text-xl pl-4 pr-4 text-[#f1f1f1] bg-[#37DD00] absolute bottom-4 left-8 mb-4"
                      >
                        -
                      </button>
                      <input
                        value={count}
                        type="text"
                        className="w-6 items-center justify-center absolute bottom-4 left-20 mb-4"
                        onChange={(event) => {
                          const newCount = parseInt(event.target.value, 10);
                          if (!isNaN(newCount)) {
                            setCount(newCount);
                          }
                        }}
                      />
                      <button
                        onClick={increase}
                        className="text-xl pl-4 pr-4 text-[#f1f1f1] bg-[#37DD00] absolute bottom-4 left-24 mb-4"
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <button
                        className="add-to-cart pl-3 pr-3 pt-1 pb-1 text-[#f1f1f1] font-sans font-semibold whitespace-nowrap bg-[#37DD00] rounded-md right-8 bottom-4 absolute mb-4"
                        onClick={() =>
                          addToCart({ id, pic, price, quantity: count, checkboxes })
                        }
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}