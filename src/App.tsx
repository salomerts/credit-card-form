import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import Result from "./components/Result";

function App() {
  const [show, setShow] = useState<React.SetStateAction<boolean>>(false);
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [show]);
  return (
    <>
      {!show ? (
        <div className="main">
          <Header />
          <Card setShow={setShow} />
        </div>
      ) : (
        <Result />
      )}
    </>
  );
}

export default App;
