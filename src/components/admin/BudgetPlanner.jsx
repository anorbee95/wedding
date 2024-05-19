import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { FaPlus } from "react-icons/fa";

const BudgetPlanner = () => {
  const [budgetItems, setBudgetItems] = useState([]);
  const [newItem, setNewItem] = useState({
    description: "",
    amount: 0,
    paid: false,
  });
  const [maxBudget] = useState(10000);

  useEffect(() => {
    const fetchBudgetItems = async () => {
      const querySnapshot = await getDocs(collection(db, "budget"));
      setBudgetItems(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchBudgetItems();
  }, []);

  const addItem = async () => {
    if (newItem.description.trim() !== "" && newItem.amount > 0) {
      const docRef = await addDoc(collection(db, "budget"), newItem);
      setBudgetItems([...budgetItems, { ...newItem, id: docRef.id }]);
      setNewItem({ description: "", amount: 0, paid: false });
    }
  };

  const updateItem = async (id, updatedItem) => {
    const itemRef = doc(db, "budget", id);
    await updateDoc(itemRef, updatedItem);
    setBudgetItems(
      budgetItems.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  const totalSpent = budgetItems.reduce(
    (acc, item) => acc + (item.paid ? item.amount : 0),
    0
  );
  const totalRemaining = maxBudget - totalSpent;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Budget Planner</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
          placeholder="Description"
        />
        <input
          type="number"
          className="ml-2 p-2 border rounded"
          value={newItem.amount}
          onChange={(e) =>
            setNewItem({ ...newItem, amount: parseFloat(e.target.value) })
          }
          placeholder="Amount"
        />
        <button
          onClick={addItem}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          <FaPlus />
        </button>
      </div>
      <ul>
        {budgetItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <span>
              {item.description} - ${item.amount} -{" "}
              {item.paid ? "Paid" : "To be paid"}
            </span>
            <button
              onClick={() => updateItem(item.id, { ...item, paid: !item.paid })}
              className="ml-2 p-2 bg-green-500 text-white rounded"
            >
              {item.paid ? "Mark Unpaid" : "Mark Paid"}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p>Total Spent: ${totalSpent}</p>
        <p>Total Remaining: ${totalRemaining}</p>
        <p>Max Budget: ${maxBudget}</p>
      </div>
    </div>
  );
};

export default BudgetPlanner;
