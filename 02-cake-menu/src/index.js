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
      <ul className="pizzas">
        {Data.map((cake) => (
          <Cakes dataObj={cake} key={cake.name} />
        ))}
      </ul>
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
function Cakes(props) {
  return (
    <li className="pizza">
      <img src={props.dataObj.photo} alt="Chocolate Truffle" />
      <h3>{props.dataObj.name}</h3>
      <p>{props.dataObj.ingredients}</p>
      <span>{props.dataObj.price}</span>
    </li>
  );
}
function Footer() {
  // const hours = new Date().getHours();
  // const IsOpen = hours > 9 && hours < 22;
  // console.log(IsOpen);
  return (
    <footer className="footer">
      <h1>{new Date().toLocaleTimeString()}. We are open!..</h1>
    </footer>
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
