import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Data from "./data";
// import App from './App';
// import reportWebVitals from './reportWebVitals';

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>Bakingo</h1>
    </header>
  );
}
function Menu() {
  // const style = { color: "red", fontSize: "48px", textTransform: "ppercase" };
  const style = {};
  return (
    <main style={style} className="menu">
      <h2>Our Menu</h2>
      {/* {Data.length > 0 && (
        <ul className="pizzas">
          {Data.map((cake) => (
            <Cakes dataObj={cake} key={cake.name} />
          ))}
        </ul>
      )} */}
      {Data.length > 0 ? (
        <>
          <p>Freshly baked and ready to be delivered with Love💝</p>
          <ul className="pizzas">
            {Data.map((cake) => (
              <Cakes dataObj={cake} key={cake.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We are working on our menu. Please come back later </p>
      )}
      {/* <Cakes
        name="Chocolate Truffle Cake"
        photo="cakes/chocolate-truffle.webp"
        ingedients="flour, cocoa powder, sugar, butte, cream"
        price={650}
      />
      <Cakes
        name="Red Velvet Cake"
        photo="cakes/red-velvet.webp"
        ingedients="flour,
      cocoa powder,
      buttermilk,
      cream cheese,
      sugar"
        price={750}
      />
      <Cakes
        name="Black Forest Cake"
        photo="cakes/black-forest.webp"
        ingedients="flour,
      cocoa powder,
      cherries,
      whipped cream,
      chocolate shavings"
        price={700}
      />
      <Cakes
        name="Pineapple Cake"
        photo="cakes/pineapple-cake.webp"
        ingedients="flour, pineapple, sugar, whipped cream"
        price={550}
      />
      <Cakes
        name="Strwaberry Cake"
        photo="cakes/strawberry-cake.webp"
        ingedients="flour, strawberries, sugar, butter, cream"
        price={600}
      />
      <Cakes
        name="Blueberry Cheesecake"
        photo="cakes/blueberry-cheesecake.webp"
        ingedients="blueberries,
      cream cheese,
      sugar,
      eggs,
      butter,
      biscuits"
        price={800}
      /> */}
    </main>
  );
}
function Cakes({ dataObj }) {
  // if (dataObj.soldOut) return null;
  return (
    <li className={`pizza ${dataObj.soldOut ? "sold-out" : ""}`}>
      <img src={dataObj.photo} alt="Chocolate Truffle" />
      <h3>{dataObj.name}</h3>
      <p>{dataObj.ingredients}</p>
      {/* {dataObj.soldOut ? <span>SOLD OUT!</span> : <span>{dataObj.price}</span>} */}
      <span>{dataObj.soldOut ? "SOLD OUT!" : dataObj.price}</span>
    </li>
  );
}
function Footer() {
  const hours = new Date().getHours();
  const open = 9;
  const close = 22;
  const isOpen = hours > open && hours < close;
  console.log(isOpen);

  if (!isOpen) return <p>CLOSED</p>;
  return (
    <footer className="footer">
      {/* <h1>{new Date().toLocaleTimeString()}. We are open!..</h1> */}
      {<IsOpen closeTime={close} />}
    </footer>
  );
}
function IsOpen({ closeTime }) {
  return (
    <div className="order">
      <p>We'ar Open until {closeTime}:00. Come visit us or order online</p>
      <button className="btn">Order</button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// react before 18
// ReactDOM.render(<App />);
