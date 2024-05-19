import Select from "react-select";
import makeAnimated from "react-select/animated";
import miniLeaves from "../assets/miniLeaves.png";
import { useState } from "react";
import { createGuest } from "../services/guest/createGuest";
import seeYou from "../assets/seeYou.jpg";

const initialvalues = {
  rsvp: true,
  name: "",
  email: "",
  mealPreferences: [],
  accomodation: false,
  guests: "solo",
  partnerName: "",
  partnerMealPreferences: [],
  numberOfFamilyMembers: "",
  member1: "",
  mealPref1: [],
  member2: "",
  mealPref2: [],
  member3: "",
  mealPref3: [],
  member4: "",
  mealPref4: [],
  member5: "",
  mealPref5: [],
  member6: "",
  mealPref6: [],
  member7: "",
  mealPref7: [],
};

const mealPreferences = [
  { value: "gluten", label: "Gluténmentes" },
  { value: "lactose", label: "Laktózmentes" },
  { value: "no-meat", label: "Vegetáriánus" },
  { value: "vegan", label: "Vegán" },
];

export default function RSVP() {
  const [formData, setFormData] = useState(initialvalues);
  const [formPhase, setFormPhase] = useState(1);
  const [error, setError] = useState("");
  const animatedComponents = makeAnimated();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formPhase === 2 || !formData.rsvp) {
      const id = await createGuest({ ...formData, submitted: Date.now() });
      if (id) return setFormPhase(3);
    }
    if (!formData.name) return setError("A név mező kitöltése kötelező.");
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return setError("Helytelen email cím.");
    if (formData.guests === "solo") {
      const id = await createGuest({ ...formData, submitted: Date.now() });
      if (id) return setFormPhase(3);
    } else if (formData.guests === "partner") {
      if (!formData.partnerName) return setError("Add meg a párod nevét is!");
      const id = await createGuest({ ...formData, submitted: Date.now() });
      if (id) return setFormPhase(3);
    } else if (formData.guests === "family") {
      if (!formData.numberOfFamilyMembers)
        return setError("Add meg hányan jöttök!");
      if (formData.numberOfFamilyMembers < 2)
        return setError("Minimum 2-en gyertek.");
      if (formData.numberOfFamilyMembers > 8)
        return setError("Maximum 8-an jöhettek sajnos.");
      setFormPhase(2);
    }
  };

  return (
    <section id="rsvp" className="bg-white">
      <div className="text-xs lg:text-md flex justify-center w-[40rem] max-w-[90vw] h-[60rem] mx-auto">
        <div className="relative w-full h-full border-2 shadow-3xl rounded-t-full rounded-b-full">
          <div className="flex flex-col items-center w-[37.2rem] max-w-[80vw] h-[57.2rem] absolute top-5 left-5 rounded-t-full rounded-b-full border border-custom-pink">
            <h1 className="relative mt-24 text-center uppercase font-gilda text-2xl lg:text-4xl text-custom-pink">
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
                onClick={() => setFormData((prev) => ({ ...prev, rsvp: true }))}
                className={`${
                  formData.rsvp ? "text-green-500" : "text-gray-300"
                } px-1 md:px-4 py-2 w-32 md:w-48 max-w-[30vw] text-[9px] md:text-xs font-medium  bg-white border border-gray-200 rounded-s-lg hover:bg-green-50 hover:text-green-500 focus:z-10 focus:ring-2 focus:ring-green-50 focus:text-green-500`}
              >
                Naná, hogy ott leszek!
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, rsvp: false }))
                }
                className={`${
                  !formData.rsvp ? "text-red-500" : "text-gray-300"
                } px-1 md:px-4 py-2 w-32 md:w-48 max-w-[30vw] text-[9px] md:text-xs font-medium bg-white border border-gray-200 rounded-e-lg hover:bg-red-50 hover:text-red-500 focus:z-10 focus:ring-2 focus:ring-red-50 focus:text-red-500`}
              >
                Sajnos nem tudok menni!
              </button>
            </div>
            <div className="mt-2 w-4/5">
              {formData.rsvp && formPhase === 1 && (
                <form>
                  <div className="rounded-md py-4 px-1 md:p-6">
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
                            type="name"
                            autoComplete="name"
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
                            autoComplete="email"
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
                      <label className="block">
                        <span className="text-sm font-medium text-custom-pink">
                          Van bármilyen ételintoleranciád?
                        </span>
                        <div className="relative xl:text-[0.9rem] text-gray-900">
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
                            className="basic-multi-select mt-2"
                            placeholder="Válaszd ki amelyik igaz rád..."
                          />
                        </div>
                      </label>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="accomodation"
                        className="mb-2 block text-sm font-medium text-custom-pink"
                      >
                        Szeretnél szállást az esküvőre?
                      </label>
                      <label className="inline-flex items-center me-5 cursor-pointer">
                        <input
                          id="accomodation"
                          type="checkbox"
                          checked={formData.accomodation}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              accomodation: !formData.accomodation,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-custom-pink-transparent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-pink"></div>
                        <span className="ms-3 text-sm text-gray-500">
                          {formData.accomodation
                            ? "Igen, szeretnék szállást."
                            : "Nem szeretnék szállást."}
                        </span>
                      </label>
                    </div>

                    <fieldset className="mb-4">
                      <legend className="mb-2 block text-sm font-medium text-custom-pink">
                        Kikkel jössz?
                      </legend>
                      <div className="rounded-md border border-gray-300 bg-white px-[14px] py-3">
                        <div className="flex flex-wrap gap-1 lg:gap-2">
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
                              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 hidden"
                              aria-describedby="guests-error"
                            />
                            <label
                              htmlFor="solo"
                              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] md:text-xs font-medium ${
                                formData.guests === "solo"
                                  ? "bg-custom-pink text-gray-50"
                                  : "bg-gray-100 text-gray-600"
                              }`}
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
                              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 hidden"
                            />
                            <label
                              htmlFor="partner"
                              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] md:text-xs font-medium  ${
                                formData.guests === "partner"
                                  ? "bg-custom-pink text-gray-50"
                                  : "bg-gray-100 text-gray-600"
                              }`}
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
                              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 hidden"
                            />
                            <label
                              htmlFor="family"
                              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] md:text-xs font-medium ${
                                formData.guests === "family"
                                  ? "bg-custom-pink text-gray-50"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              Családdal
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    {formData.guests === "family" && (
                      <div className="mb-4">
                        <label
                          htmlFor="numberOfFamilyMembers"
                          className="mb-2 block text-sm font-medium text-custom-pink"
                        >
                          Hányan jöttök?
                        </label>
                        <div className="relative rounded-md">
                          <div className="relative">
                            <input
                              id="numberOfFamilyMembers"
                              name="numberOfFamilyMembers"
                              type="number"
                              min={2}
                              max={8}
                              value={formData.numberOfFamilyMembers}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  numberOfFamilyMembers: e.target.value,
                                }))
                              }
                              placeholder="Írd be hányan jöttök..."
                              className="peer block w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm outline-blue-500 placeholder:text-gray-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {formData.guests === "partner" && (
                      <div>
                        <div className="mb-4">
                          <div className="relative rounded-md">
                            <div className="relative">
                              <input
                                id="partnerName"
                                name="partnerName"
                                type="name"
                                value={formData.partnerName}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    partnerName: e.target.value,
                                  }))
                                }
                                placeholder="Írd be a párod nevét..."
                                className="peer block w-full rounded-md border border-gray-300 py-2 pl-3 pr-3 text-sm outline-blue-500 placeholder:text-gray-500"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="relative xl:text-[0.9rem] text-gray-900">
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
                              placeholder="Válaszd ki a párod ételintoleranciáit..."
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
                      {formData.guests === "family" ? (
                        <span className="text-xs md:text-md">
                          Tovább a családtagok megadásához
                        </span>
                      ) : (
                        <span>Beküldés</span>
                      )}
                    </button>
                    {error && (
                      <p className="mt-2 text-xs text-center text-red-800">
                        <span className="font-medium">Hoppá!</span> {error}
                      </p>
                    )}
                  </div>
                </form>
              )}
              {formData.rsvp && formPhase === 2 && (
                <form className="mt-2 px-4">
                  <div className="max-h-[34rem] overflow-scroll">
                    {Array.from({
                      length: formData.numberOfFamilyMembers - 1,
                    }).map((_, index) => (
                      <div key={index} className="rounded-md">
                        <div className="mb-4">
                          <label
                            htmlFor={`member${index + 1}`}
                            className="mb-2 block text-sm font-medium text-custom-pink"
                          >
                            {`${index + 1}. családtag`}
                          </label>
                          <div className="relative mt-2 rounded-md">
                            <div className="relative">
                              <input
                                id={`member${index + 1}`}
                                name={`member${index + 1}`}
                                type="name"
                                value={formData[`member${index + 1}`]}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    [`member${index + 1}`]: e.target.value,
                                  }))
                                }
                                placeholder={`${index + 1}. családtag neve...`}
                                className="peer block w-full rounded-md border border-gray-300 py-2 pl-3 text-sm outline-blue-500 placeholder:text-gray-500"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="relative xl:text-[0.9rem] text-gray-900">
                            <Select
                              isMulti
                              components={animatedComponents}
                              name="mealPreferences"
                              options={mealPreferences}
                              onChange={(options) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  [`mealPref${index}`]: options.map(
                                    (option) => option.label
                                  ),
                                }))
                              }
                              className="basic-multi-select mt-2"
                              placeholder={`${
                                index + 1
                              }. családtag ételintoleranciái...`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="mt-2 peer block w-full rounded-md border text-white bg-custom-pink border-custom-pink py-2 pl-3 pr-3 text-sm outline-custom-pink"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Beküldés
                  </button>
                </form>
              )}
              {formPhase === 3 && (
                <div className="mt-12 flex flex-col items-center justify-center">
                  <h1 className="relative uppercase font-gilda text-center text-3xl m-4 text-custom-pink">
                    Köszi a kitöltést!
                  </h1>
                  <div className="w-64 h-96 rounded-md overflow-hidden cursor-pointer bg-custom-light flex justify-center items-center">
                    <img
                      className="h-full w-full object-cover hover:grayscale hover:scale-125 transition-all duration-500 ease-in-out"
                      src={seeYou}
                      alt="seeYou"
                    />
                  </div>
                  <p className="relative font-gilda text-center text-xl m-4 text-custom-pink">
                    {formData.rsvp
                      ? "Hamarosan találkozunk!"
                      : "Sajnáljuk, hogy nem tudsz jönni!"}
                  </p>
                </div>
              )}
              {!formData.rsvp && formPhase !== 3 && (
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
    </section>
  );
}
