import Select from "react-select";
import makeAnimated from "react-select/animated";
import miniLeaves from "../assets/miniLeaves.png";
import { useState } from "react";

const initialvalues = {
  rsvp: true,
  name: "",
  email: "",
  mealPreferences: [],
  support: "none",
  guests: "solo",
};

const mealPreferences = [
  { value: "gluten", label: "Gluténmentes" },
  { value: "lactose", label: "Laktózmentes" },
  { value: "no-meat", label: "Vegetáriánus" },
  { value: "vegan", label: "Vegán" },
];

export default function RSVP() {
  const [formData, setFormData] = useState(initialvalues);
  const animatedComponents = makeAnimated();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white">
      <div className="text-xs lg:text-md flex justify-center w-[40rem] max-w-[90vw] h-[70rem] md:h-[60rem] mx-auto">
        <div className="relative w-full h-full border-2 shadow-3xl rounded-t-full rounded-b-full">
          <div className="flex flex-col items-center w-[37.2rem] max-w-[80vw] h-[67rem] md:h-[57.2rem] absolute top-5 left-5 rounded-t-full rounded-b-full border border-custom-pink">
            <h1 className="relative mt-24 text-center uppercase font-gilda text-2xl lg:text-4xl m-4 text-custom-pink">
              <img
                className="absolute -top-8 left-20 lg:left-32 h-12"
                src={miniLeaves}
                alt="miniLeaves"
              />
              Jelezz vissza!
            </h1>
            <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setFormData(prev => ({...prev, rsvp: true}))}
                className={`${
                  formData.rsvp ? "text-green-500" : "text-gray-300"
                } px-4 py-2 w-48 max-w-[30vw] text-xs font-medium  bg-white border border-gray-200 rounded-s-lg hover:bg-green-50 hover:text-green-500 focus:z-10 focus:ring-2 focus:ring-green-50 focus:text-green-500`}
              >
                Naná, hogy ott leszek!
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({...prev, rsvp: false}))}
                className={`${
                  !formData.rsvp ? "text-red-500" : "text-gray-300"
                } px-4 py-2 w-48 max-w-[30vw] text-xs font-medium bg-white border border-gray-200 rounded-e-lg hover:bg-red-50 hover:text-red-500 focus:z-10 focus:ring-2 focus:ring-red-50 focus:text-red-500`}
              >
                Sajnos nem tudok menni!
              </button>
            </div>
            <div className="mt-2 w-4/5">
              {formData.rsvp ? (
                <form>
                  <div className="rounded-md p-4 md:p-6">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-custom-pink"
                      >
                        Név
                      </label>
                      <div className="relative mt-2 rounded-md">
                        <div className="relative">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Írd be a teljes nevedet..."
                            className="peer block w-full rounded-md border border-gray-300 py-2 pl-3 text-sm outline-blue-500 placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-custom-pink"
                      >
                        Email Cím
                      </label>
                      <div className="relative mt-2 rounded-md">
                        <div className="relative">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            placeholder="Írd be az email címedet..."
                            className="peer block w-full rounded-md border border-gray-300 py-2 pl-3 text-sm outline-blue-500 placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="mealPReferences"
                        className="mb-2 block text-sm font-medium text-custom-pink"
                      >
                        Van bármilyen ételintoleranciád?
                      </label>
                      <div className="relative">
                        <Select
                          isMulti
                          components={animatedComponents}
                          name="mealPreferences"
                          options={mealPreferences}
                          onChange={(options) =>
                            setFormData((prev) => ({
                              ...prev,
                              mealPreferences: options.map(
                                (option) => option.label
                              ),
                            }))
                          }
                          className="basic-multi-select"
                          placeholder="Válaszd ki amelyik igaz rád..."
                        />
                      </div>
                      <div
                        id="customer-error"
                        aria-live="polite"
                        aria-atomic="true"
                      ></div>
                    </div>

                    <fieldset className="mb-4">
                      <legend className="mb-2 block text-sm font-medium text-custom-pink">
                        Szeretnél szállást vagy transzfert az esküvőre?
                      </legend>
                      <div className="rounded-md border border-gray-300 bg-white px-[14px] py-3">
                        <div className="flex flex-wrap gap-2 md:gap-4">
                          <div className="flex items-center">
                            <input
                              id="accomodation"
                              name="accomodation"
                              type="radio"
                              value="accomodation"
                              checked={formData.support === "accomodation"}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  support: e.target.value,
                                }))
                              }
                              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                              aria-describedby="transfer-error"
                            />
                            <label
                              htmlFor="accomodation"
                              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                              Szállás
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="transfer"
                              name="transfer"
                              type="radio"
                              value="transfer"
                              checked={formData.support === "transfer"}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  support: e.target.value,
                                }))
                              }
                              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                              htmlFor="transfer"
                              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                              Transzfer
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="none"
                              name="none"
                              type="radio"
                              value="none"
                              checked={formData.support === "none"}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  support: e.target.value,
                                }))
                              }
                              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                              htmlFor="none"
                              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                              Egyik sem
                            </label>
                          </div>
                        </div>
                      </div>
                      <div
                        id="transfer-error"
                        aria-live="polite"
                        aria-atomic="true"
                      ></div>
                    </fieldset>

                    <fieldset className="mb-4">
                      <legend className="mb-2 block text-sm font-medium text-custom-pink">
                        Kikkel jössz?
                      </legend>
                      <div className="rounded-md border border-gray-300 bg-white px-[14px] py-3">
                        <div className="flex flex-wrap gap-2 md:gap-4">
                          <div className="flex items-center">
                            <input
                              id="solo"
                              name="solo"
                              type="radio"
                              value="solo"
                              checked={formData.guests === "solo"}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  guests: e.target.value,
                                }))
                              }
                              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                              aria-describedby="guests-error"
                            />
                            <label
                              htmlFor="solo"
                              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                              Egyedül
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="partner"
                              name="partner"
                              type="radio"
                              value="partner"
                              checked={formData.guests === "partner"}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  guests: e.target.value,
                                }))
                              }
                              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                              htmlFor="partner"
                              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                              Párommal
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="family"
                              name="family"
                              type="radio"
                              value="family"
                              checked={formData.guests === "family"}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  guests: e.target.value,
                                }))
                              }
                              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                              htmlFor="family"
                              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                              Családdal
                            </label>
                          </div>
                        </div>
                      </div>
                      <div
                        id="guests-error"
                        aria-live="polite"
                        aria-atomic="true"
                      ></div>
                    </fieldset>
                    {formData.guests === "family" && (
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-custom-pink"
                        >
                          Hányan jöttök?
                        </label>
                        <div className="relative rounded-md">
                          <div className="relative">
                            <input
                              id="name"
                              name="name"
                              type="number"
                              min={2}
                              max={6}
                              value={formData.name}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              placeholder="Írd be hányan jöttök..."
                              className="peer block w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm outline-blue-500 placeholder:text-gray-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      className="peer block w-full rounded-md border text-white bg-custom-pink border-custom-pink py-2 pl-3 pr-3 text-sm outline-custom-pink"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Küldés
                    </button>
                  </div>
                </form>
              ) : (
                <form>
                  <div className="rounded-md p-4 md:p-6">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-custom-pink"
                      >
                        Név
                      </label>
                      <div className="relative mt-2 rounded-md">
                        <div className="relative">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Írd be a teljes nevedet..."
                            className="peer block w-full rounded-md border border-gray-300 py-2 pl-3 text-sm outline-blue-500 placeholder:text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      className="peer block w-full rounded-md border text-white bg-custom-pink border-custom-pink py-2 pl-3 pr-3 text-sm outline-custom-pink"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {"Tényleg nem tudok menni :("}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
