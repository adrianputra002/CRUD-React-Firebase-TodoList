import "./App.css";
import { db } from "./firebase";
import { v4 as uid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";

import { onValue, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");
  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };
  // Write

  const writeDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      todo,
      uuid,
      complete: false,
    });
    setTodo("");
  };
  // Read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);
  // Update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
  };
  // Delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };
  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), { todo, uuid: tempUuid });
    setTodo("");
    setIsEdit(false);
  };
  return (
    <div className="main">
      {" "}
      <div>
        <h1 className="text-center ">{isEdit ? "Edit Todo" : "Todo List"}</h1>
        <div className="d-flex mb-3">
          <input
            placeholder="Make Dinner . . ."
            className="py-1 px-2 form-control me-2"
            type="text"
            name="todo"
            value={todo}
            onChange={handleTodoChange}
          />
          {isEdit ? (
            <>
              {" "}
              <Button
                className="me-1"
                variant="primary"
                onClick={handleSubmitChange}
              >
                Edit
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  setIsEdit(false);
                  setTodo("");
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="success" className="" onClick={writeDatabase}>
              Submit
            </Button>
          )}
        </div>
        {todos.map((todo) => (
          <Card className="my-3" key={todo.uid}>
            <Card.Body>
              {" "}
              <h3>{todo.todo}</h3>
              <div className="d-flex">
                <Button
                  className="me-2"
                  variant="danger"
                  onClick={() => handleDelete(todo)}
                >
                  Delete
                </Button>
                <Button variant="primary" onClick={() => handleUpdate(todo)}>
                  Update
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
