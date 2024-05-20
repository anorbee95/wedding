import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

const Budget = () => {
  const [categories, setCategories] = useState([]);
  const MAX_BUDGET = 8000000;

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "budgetCategories"));
      setCategories(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          open: true,
        }))
      );
    };
    fetchData();
  }, []);

  const handleInputChange = async (e, categoryId, itemId, field) => {
    const value = e.target.innerText;
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        if (itemId) {
          category.items = category.items.map((item) => {
            if (item.id === itemId) {
              item[field] = value;
              item.due = Number(item.total) - Number(item.paid);
            }
            return item;
          });
        } else {
          category.name = value;
        }
      }
      return category;
    });

    setCategories(updatedCategories);
    await setDoc(
      doc(db, "budgetCategories", categoryId),
      updatedCategories.find((c) => c.id === categoryId),
      { merge: true }
    );
  };

  const addCategory = async () => {
    const newCategory = { name: "New Category", items: [] };
    const docRef = await addDoc(
      collection(db, "budgetCategories"),
      newCategory
    );
    setCategories([...categories, { ...newCategory, id: docRef.id }]);
  };

  const addItem = async (categoryId) => {
    const newItem = {
      id: `${Date.now()}`,
      name: "Költség neve...",
      total: "0",
      paid: "0",
      due: "0",
    };
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        category.items.push(newItem);
      }
      return category;
    });

    setCategories(updatedCategories);
    await setDoc(
      doc(db, "budgetCategories", categoryId),
      { items: updatedCategories.find((c) => c.id === categoryId).items },
      { merge: true }
    );
  };

  const deleteItem = async (categoryId, itemId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        category.items = category.items.filter((item) => item.id !== itemId);
      }
      return category;
    });

    setCategories(updatedCategories);
    await setDoc(
      doc(db, "budgetCategories", categoryId),
      { items: updatedCategories.find((c) => c.id === categoryId).items },
      { merge: true }
    );
  };

  const deleteCategory = async (categoryId) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(updatedCategories);
    await deleteDoc(doc(db, "budgetCategories", categoryId));
  };

  const calculateStatistics = () => {
    let totalPaid = 0;
    let totalDue = 0;

    categories.forEach((category) => {
      category.items.forEach((item) => {
        totalPaid += Number(item.paid);
        totalDue += Number(item.due);
      });
    });

    const totalSpent = totalPaid + totalDue;
    const remainingBudget = MAX_BUDGET - totalSpent;

    return { totalPaid, totalDue, remainingBudget };
  };

  const { totalPaid, totalDue, remainingBudget } = calculateStatistics();

  return (
    <div className="mx-auto text-xs md:text-base lg:max-w-[80%] md:p-4">
      <h2 className="text-4xl font-gilda font-bold mb-4">Költségvetés</h2>
      <div className="mb-6 p-4 rounded-lg font-gilda bg-custom-pink text-gray-50 font-bold text-base md:text-2xl">
        <div className="flex justify-between mb-2">
          <span>Kifizetve:</span>
          <span>{totalPaid.toLocaleString()} Ft</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Fizetendő:</span>
          <span>{totalDue.toLocaleString()} Ft</span>
        </div>
        <div className="flex justify-between">
          <span>Fennmaradó költségvetés:</span>
          <span className={remainingBudget < 0 ? "text-red-700" : ""}>
            {remainingBudget.toLocaleString()} Ft
          </span>
        </div>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="mb-4">
          <div className="flex items-center text-left pt-3 pb-2 rounded-t-lg text-custom-pink font-bold bg-custom-pink-transparent md:text-xl font-gilda">
            <button
              className="w-8 flex justify-center py-2 text-custom-pink"
              onClick={() =>
                setCategories(
                  categories.map((c) =>
                    c.id === category.id ? { ...c, open: !c.open } : c
                  )
                )
              }
            >
              {category.open ? (
                <FaChevronDown className="mb-1" />
              ) : (
                <FaChevronRight className="mb-1" />
              )}
            </button>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleInputChange(e, category.id)}
              className="text-left w-full outline-none"
            >
              {category.name}
            </div>
            <MdDeleteOutline
              onClick={() => deleteCategory(category.id)}
              className="cursor-pointer mr-3 text-2xl hover:text-red-800"
            />
          </div>
          {category.open && (
            <div className="p-2 bg-white font-gilda rounded-b-lg">
              <div className="flex">
                <div className="grow grid grid-cols-4 gap-2 mr-4 mb-2 font-semibold text-custom-pink">
                  <p className="pl-2">Költség</p>
                  <p className="pl-2">Teljes ár</p>
                  <p className="pl-2">Fizetve</p>
                  <p className="pl-2">Fizetendő</p>
                </div>
                <p className="text-transparent">Törlés</p>
              </div>
              {category.items.map((item) => (
                <div key={item.id} className="flex">
                  <div className="grow grid grid-cols-4 gap-2 mr-4 mb-2 text-gray-600">
                    {["name", "total", "paid", "due"].map((field) => (
                      <div
                        key={field}
                        className="p-2 bg-white border-b-2 flex justify-between"
                      >
                        <span
                          className="grow outline-none"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleInputChange(e, category.id, item.id, field)
                          }
                        >
                          {item[field]}
                        </span>
                        {field !== "name" && <span>Ft</span>}
                      </div>
                    ))}
                  </div>
                  <div
                    onClick={() => deleteItem(category.id, item.id)}
                    className="cursor-pointer self-center text-custom-pink hover:text-red-700"
                  >
                    Törlés
                  </div>
                </div>
              ))}
              <button
                onClick={() => addItem(category.id)}
                className="mt-2 pl-2 flex items-center text-custom-pink-transparent hover:text-custom-pink"
              >
                <IoMdAddCircleOutline className="mr-1 mb-1 text-lg" />
                Új hozzáadása
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addCategory}
        className="flex items-center mt-8 px-2 text-xl font-gilda bg-none text-custom-pink-transparent hover:text-custom-pink"
      >
        <IoMdAddCircleOutline className="mr-1 mb-1" />
        Új kategória hozzáadása
      </button>
    </div>
  );
};

export default Budget;
