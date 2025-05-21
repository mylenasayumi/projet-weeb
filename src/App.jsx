// Il s’agit du composant principal de l’application. C’est à partir de ce fichier que vous allez 
// construire et organiser vos composants. Par défaut, il affiche un message de bienvenue ainsi que 
// les logos de Vite et React.

import { useState } from 'react'

import './App.css'
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }


function App() {
  return (
    // <div className="font-roboto bg-dark-blue text-white">
    //   <Home />
    //   <Contact />
    //   <Login />
    // </div>
  );
}

export default App;
