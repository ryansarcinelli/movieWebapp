import React, { useState } from "react";
import Search from "./components/Search";
import { useEffect } from "react";
import "./App.css";

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
   const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <main>
      <div className="patter" />

      <div className="wrapper">
        <header>
          <img
          src="./hero.png"
          alt="Hero Banner"
          className={`w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md transform transition-all duration-7000 ease-out
            ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-90"}
          `}
        />
          <h1>
            Ache <span className="text-gradient">Filmes</span> sem dor de cabeça!
          </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
    </main>
  );
};

export default App;
