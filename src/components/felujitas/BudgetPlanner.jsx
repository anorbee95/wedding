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
import {
  FaChevronRight,
  FaChevronDown,
  FaListUl,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

const HomeBudget = () => {
  const [categories, setCategories] = useState([]);
  const MAX_BUDGET = 10000000;

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        collection(db, "homeBudgetCategories")
      );
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
      doc(db, "homeBudgetCategories", categoryId),
      updatedCategories.find((c) => c.id === categoryId),
      { merge: true }
    );
  };

  // Kártyás fizetés váltása – logikát meghagytam, de a UI ki van kommentelve
  const handlePaymentTypeChange = async (categoryId, itemId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        category.items = category.items.map((item) => {
          if (item.id === itemId) {
            item.paymentType = item.paymentType === "card" ? "cash" : "card";
          }
          return item;
        });
      }
      return category;
    });
    setCategories(updatedCategories);
    await setDoc(
      doc(db, "homeBudgetCategories", categoryId),
      { items: updatedCategories.find((c) => c.id === categoryId).items },
      { merge: true }
    );
  };

  const addCategory = async () => {
    const newCategory = { name: "Új kategória", items: [] };
    const docRef = await addDoc(
      collection(db, "homeBudgetCategories"),
      newCategory
    );
    setCategories([
      ...categories,
      { ...newCategory, id: docRef.id, open: true },
    ]);
  };

  const addItem = async (categoryId) => {
    const newItem = {
      id: `${Date.now()}`,
      name: "Költség neve...",
      total: "0",
      paid: "0",
      due: "0",
      paymentType: "cash",
    };
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        category.items.push(newItem);
      }
      return category;
    });

    setCategories(updatedCategories);
    await setDoc(
      doc(db, "homeBudgetCategories", categoryId),
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
      doc(db, "homeBudgetCategories", categoryId),
      { items: updatedCategories.find((c) => c.id === categoryId).items },
      { merge: true }
    );
  };

  const deleteCategory = async (categoryId) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(updatedCategories);
    await deleteDoc(doc(db, "homeBudgetCategories", categoryId));
  };

  const calculateStatistics = () => {
    let totalPaid = 0;
    let totalDue = 0;
    let totalItems = 0;
    // let totalPaidByCard = 0;

    categories.forEach((category) => {
      totalItems += category.items.length;
      category.items.forEach((item) => {
        totalPaid += Number(item.paid);
        totalDue += Number(item.due);
        // if (item.paymentType === "card") {
        //   totalPaidByCard += Number(item.paid);
        // }
      });
    });

    const totalSpent = totalPaid + totalDue;
    const remainingBudget = MAX_BUDGET - totalSpent;
    const avgSpentPerItem = totalItems ? Math.round(totalPaid / totalItems) : 0;

    return {
      totalPaid,
      totalDue,
      remainingBudget,
      totalItems,
      avgSpentPerItem,
      // totalPaidByCard,
    };
  };

  const {
    totalPaid,
    totalDue,
    remainingBudget,
    totalItems,
    avgSpentPerItem,
    // totalPaidByCard,
  } = calculateStatistics();

  // Calculate budget usage for progress bar
  const budgetUsedPercent = Math.min(
    100,
    Math.round(((totalPaid + totalDue) / MAX_BUDGET) * 100)
  );

  // Helper for category summary
  const getCategorySummary = (items) => {
    let total = 0;
    let paid = 0;
    // let paidByCard = 0;
    items.forEach((item) => {
      total += Number(item.total);
      paid += Number(item.paid);
      // if (item.paymentType === "card") {
      //   paidByCard += Number(item.paid);
      // }
    });
    return { total, paid /*, paidByCard */ };
  };

  return (
    <div className="mx-auto my-8 text-xs md:text-base 2xl:max-w-[80%] md:p-4">
      <h2 className="text-4xl font-gilda font-bold mb-4 text-teal-700">
        Költségvetés (Felújítás)
      </h2>
      {/* Dashboard */}
      <div className="sticky top-0 z-10 mb-6 p-4 rounded-xl shadow-lg font-gilda bg-teal-600 text-gray-50 font-bold text-base md:text-2xl flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 mb-2 ">
          <div className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg bg-white text-teal-700">
            <FaListUl className="text-lg" />
            <span>Kategóriák:</span>
            <span className="ml-auto">{categories.length}</span>
          </div>
          <div className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg bg-white text-teal-700">
            <FaMoneyBillWave className="text-lg" />
            <span>Összes tétel:</span>
            <span className="ml-auto">{totalItems}</span>
          </div>
          <div className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg bg-white text-teal-700">
            <FaWallet className="text-lg" />
            <span>Ár/tétel:</span>
            <span className="ml-auto">
              {avgSpentPerItem.toLocaleString()} Ft
            </span>
          </div>
          <div className="flex items-center gap-2 border border-gray-200 p-2 rounded-lg bg-white text-teal-700">
            <span>Budget:</span>
            <span className="ml-auto">{MAX_BUDGET.toLocaleString()} Ft</span>
          </div>
        </div>
        <div className="flex justify-between mb-1">
          <span>Kifizetve:</span>
          <span>{totalPaid.toLocaleString()} Ft</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Fizetendő:</span>
          <span>{totalDue.toLocaleString()} Ft</span>
        </div>
        {/* <div className="flex justify-between mb-1">
          <span>Kártyával fizetve:</span>
          <span>{totalPaidByCard.toLocaleString()} Ft</span>
        </div> */}
        <div className="flex justify-between mb-2">
          <span>Fennmaradó költségvetés:</span>
          <span className={remainingBudget < 0 ? "text-red-700" : ""}>
            {remainingBudget.toLocaleString()} Ft
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              budgetUsedPercent > 90 ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${budgetUsedPercent}%` }}
          ></div>
        </div>
        <div className="text-right text-xs mt-1">
          {budgetUsedPercent}% felhasználva
        </div>
      </div>
      {/* Categories */}
      <div className="flex flex-col gap-4">
        {categories.map((category) => {
          const summary = getCategorySummary(category.items);
          return (
            <div key={category.id} className="rounded-xl shadow-md bg-white">
              <div className="flex items-center text-left pt-3 pb-2 rounded-t-xl text-teal-700 font-bold bg-teal-100 md:text-xl font-gilda">
                <button
                  className="w-8 flex justify-center py-2 text-teal-700 hover:text-teal-900"
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
                  className="text-left w-full outline-none px-2"
                >
                  {category.name}
                </div>
                <MdDeleteOutline
                  onClick={() => deleteCategory(category.id)}
                  className="cursor-pointer mr-3 text-2xl hover:text-red-800"
                />
              </div>
              {/* Category summary */}
              <div className="flex flex-wrap gap-4 px-4 py-2 bg-teal-50 text-teal-800 text-xs md:text-base rounded-b-lg font-semibold">
                <span>Összesen: {summary.total.toLocaleString()} Ft</span>
                <span>Kifizetve: {summary.paid.toLocaleString()} Ft</span>
                {/* <span>Kártyával: {summary.paidByCard.toLocaleString()} Ft</span> */}
              </div>
              {category.open && (
                <div className="p-2 bg-white font-gilda rounded-b-xl">
                  <div className="flex">
                    <div className="grow grid grid-cols-4 gap-2 mr-4 mb-2 font-semibold text-teal-700 hover:text-teal-900">
                      <p className="pl-2">Költség</p>
                      <p className="pl-2">Teljes ár</p>
                      <p className="pl-2">Fizetve</p>
                      <p className="pl-2">Fizetendő</p>
                      {/* <p className="pl-2">Fizetés</p> */}
                    </div>
                    <p className="text-transparent">Törlés</p>
                  </div>
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex hover:bg-gray-50 rounded-lg transition"
                    >
                      <div className="grow grid grid-cols-4 gap-2 mr-4 mb-2 text-gray-600">
                        {["name", "total", "paid", "due"].map((field) => (
                          <div
                            key={field}
                            className="p-2 bg-white border-b-2 flex justify-between rounded"
                          >
                            <span
                              className="grow outline-none"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleInputChange(
                                  e,
                                  category.id,
                                  item.id,
                                  field
                                )
                              }
                            >
                              {item[field]}
                            </span>
                            {field !== "name" && <span>Ft</span>}
                          </div>
                        ))}
                        {/* Payment type toggle UI kikommentelve */}
                        {/*
                        <div className="p-2 bg-white border-b-2 flex items-center justify-center rounded">
                          <button
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              item.paymentType === "card"
                                ? "bg-teal-600 text-white"
                                : "bg-gray-200 text-teal-700"
                            }`}
                            onClick={() =>
                              handlePaymentTypeChange(category.id, item.id)
                            }
                            title="Váltás készpénz/kártya"
                          >
                            <span className="inline md:hidden">
                              {item.paymentType === "card" ? "💳" : "💵"}
                            </span>
                            <span className="hidden md:inline">
                              {item.paymentType === "card"
                                ? "Kártya"
                                : "Készpénz"}
                            </span>
                          </button>
                        </div>
                        */}
                      </div>
                      <div
                        onClick={() => deleteItem(category.id, item.id)}
                        className="cursor-pointer self-center text-teal-700 hover:text-red-700 px-2"
                      >
                        Törlés
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addItem(category.id)}
                    className="mt-2 pl-2 flex items-center text-teal-400 hover:text-teal-700 text-base"
                  >
                    <IoMdAddCircleOutline className="mr-1 mb-1 text-lg" />
                    Új tétel hozzáadása
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={addCategory}
        className="flex items-center mt-8 px-2 text-xl font-gilda bg-none text-teal-400 hover:text-teal-700"
      >
        <IoMdAddCircleOutline className="mr-1 mb-1" />
        Új kategória hozzáadása
      </button>
    </div>
  );
};

export default HomeBudget;
