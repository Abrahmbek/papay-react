import React from 'react';
import { createRoot } from 'react-dom/client';




import './index.css';
import Home from './home.tsx';
import App from './App.tsx';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
 <App/>
      < Dishes/>
   <Home/>
  </React.StrictMode>
);



function Dishes() {
  return (
    <h2>
      <div>Dishes</div>
    </h2>
  );
}
export default Dishes;

