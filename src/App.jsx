import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const load = () =>
    api.get("/items").then((res) => setItems(res.data)).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post("/items", { name });
    setName("");
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Items</h1>
      <form onSubmit={add}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;