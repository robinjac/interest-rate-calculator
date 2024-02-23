import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <span>Hello {count}</span>
      <button onClick={() => setCount(count + 1)}>press me</button>
    </>
  );
}

export default App;
