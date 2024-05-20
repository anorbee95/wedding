import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  Timestamp
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { FaCheck, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newTodoPeriod, setNewTodoPeriod] = useState("12+ hónappal az esküvő előtt");
  const [showCompleted, setShowCompleted] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const weddingDate = new Date("2025-05-31");

  useEffect(() => {
    const fetchTodos = async () => {
      const q = query(collection(db, "todos"), orderBy("dueDate"));
      const querySnapshot = await getDocs(q);
      setTodos(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const dueDate = calculateDueDate(newTodoPeriod);
      const docRef = await addDoc(collection(db, "todos"), {
        text: newTodo,
        dueDate: dueDate,
        completed: false,
      });
      setTodos([
        ...todos,
        { text: newTodo, dueDate: Timestamp.fromDate(dueDate), completed: false, id: docRef.id },
      ]);
      setNewTodo("");
      setNewTodoPeriod("12+ hónappal az esküvő előtt");
    }
  };

  const calculateDueDate = (period) => {
    const dueDate = new Date(weddingDate);
    if (period === "12+ hónappal az esküvő előtt") {
      dueDate.setMonth(dueDate.getMonth() - 12);
    } else if (period === "9-12 hónappal az esküvő előtt") {
      dueDate.setMonth(dueDate.getMonth() - 9);
    } else if (period === "6-9 hónappal az esküvő előtt") {
      dueDate.setMonth(dueDate.getMonth() - 6);
    } else if (period === "3-6 hónappal az esküvő előtt") {
      dueDate.setMonth(dueDate.getMonth() - 3);
    } else if (period === "1-3 hónappal az esküvő előtt") {
      dueDate.setMonth(dueDate.getMonth() - 1);
    } else if (period === "1 hónappal az esküvő előtt") {
      dueDate.setDate(dueDate.getDate() - 30);
    } else if (period === "1-2 héttel az esküvő előtt") {
      dueDate.setDate(dueDate.getDate() - 14);
    } else if (period === "Az esküvő napján") {
      dueDate.setDate(dueDate.getDate());
    }
    return dueDate;
  };

  const toggleComplete = async (id) => {
    const todoRef = doc(db, "todos", id);
    const todo = todos.find((todo) => todo.id === id);
    await updateDoc(todoRef, { completed: !todo.completed });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);

    items.forEach((item, index) => {
      const todoRef = doc(db, "todos", item.id);
      updateDoc(todoRef, { order: index });
    });
  };

  const getPeriod = (dueDate) => {
    const monthsBefore = Math.floor(
      (weddingDate - new Date(dueDate.seconds * 1000)) /
        (1000 * 60 * 60 * 24 * 30)
    );
    if (monthsBefore >= 12) return "12+ hónappal az esküvő előtt";
    if (monthsBefore >= 9) return "9-12 hónappal az esküvő előtt";
    if (monthsBefore >= 6) return "6-9 hónappal az esküvő előtt";
    if (monthsBefore >= 3) return "3-6 hónappal az esküvő előtt";
    if (monthsBefore >= 1) return "1-3 hónappal az esküvő előtt";
    if (monthsBefore >= 0.5) return "1 hónappal az esküvő előtt";
    if (monthsBefore >= 0.25) return "1-2 héttel az esküvő előtt";
    return "Az esküvő napján";
  };

  const groupedTodos = todos.reduce((acc, todo) => {
    const period = getPeriod(todo.dueDate);
    if (!acc[period]) acc[period] = [];
    acc[period].push(todo);
    return acc;
  }, {});

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setEditText(todo.text);
  };

  const handleEditSubmit = async () => {
    if (editText.trim() !== "") {
      const todoRef = doc(db, "todos", editTodo.id);
      await updateDoc(todoRef, { text: editText });
      setTodos(
        todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text: editText } : todo
        )
      );
      setEditTodo(null);
      setEditText("");
    }
  };

  return (
    <div className="mx-auto text-xs md:text-base lg:max-w-[80%] md:p-4">
      <h2 className="text-4xl font-gilda font-bold mb-4">Teendők</h2>
      <div className="flex flex-col gap-2 md:flex-row mb-4">
        <input
          type="text"
          className="flex grow p-2 border rounded bg-gray-50 outline-none"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Új teendő hozzáadása..."
        />
        <select
          value={newTodoPeriod}
          onChange={(e) => setNewTodoPeriod(e.target.value)}
          className="md:ml-2 py-2 border rounded bg-gray-50 outline-none"
        >
          <option value="12+ hónappal az esküvő előtt">12+ hónappal az esküvő előtt</option>
          <option value="9-12 hónappal az esküvő előtt">9-12 hónappal az esküvő előtt</option>
          <option value="6-9 hónappal az esküvő előtt">6-9 hónappal az esküvő előtt</option>
          <option value="3-6 hónappal az esküvő előtt">3-6 hónappal az esküvő előtt</option>
          <option value="1-3 hónappal az esküvő előtt">1-3 hónappal az esküvő előtt</option>
          <option value="1 hónappal az esküvő előtt">1 hónappal az esküvő előtt</option>
          <option value="1-2 héttel az esküvő előtt">1-2 héttel az esküvő előtt</option>
          <option value="Az esküvő napján">Az esküvő napján</option>
        </select>
        <button
          onClick={addTodo}
          className="md:ml-2 py-2 px-3 flex justify-center md:inline-block bg-custom-pink text-white rounded"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-pink"></div>
          <span className="ms-3 text-sm font-medium">
            {showCompleted ? "Teljesített feladatok" : "Teljesített feladatok elrejtve"}
          </span>
        </label>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(groupedTodos).map((period) => (
          <div key={period}>
            <h3 className="text-xl font-semibold mt-4 mb-2">{period}</h3>
            <Droppable droppableId={period}>
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {groupedTodos[period]
                    .filter((todo) => showCompleted || !todo.completed)
                    .map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex justify-between items-center mb-2 p-2 border rounded ${
                              todo.completed
                                ? "bg-green-200"
                                : "bg-gray-50 hover:bg-custom-pink-transparent"
                            }`}
                          >
                            {editTodo && editTodo.id === todo.id ? (
                              <>
                                <input
                                  type="text"
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="flex-grow p-2 border rounded"
                                />
                                <button
                                  onClick={handleEditSubmit}
                                  className="ml-2 p-2 text-green-500"
                                >
                                  <FaCheck />
                                </button>
                              </>
                            ) : (
                              <>
                                <span
                                  className={
                                    todo.completed ? "line-through" : ""
                                  }
                                >
                                  {todo.text}
                                </span>
                                <div className="flex">
                                  <button
                                    onClick={() => handleEdit(todo)}
                                    className="p-2 hover:text-orange-500"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    onClick={() => toggleComplete(todo.id)}
                                    className="p-2 hover:text-green-500"
                                  >
                                    <FaCheck />
                                  </button>
                                  <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="p-2 hover:text-red-500"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </>
                            )}
                          </li>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TodoList;
