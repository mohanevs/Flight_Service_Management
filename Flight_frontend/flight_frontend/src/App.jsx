import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import FlightList from "./components/FlightList";
import AddFlight from "./components/AddFlight";
import SearchFlight from "./components/SearchFlight";
import DeleteFlight from "./components/DeleteFlight";

export default function App() {
  const [active, setActive] = useState("all");

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      {active === "all"    && <FlightList />}
      {active === "add"    && <AddFlight />}
      {active === "search" && <SearchFlight />}
      {active === "delete" && <DeleteFlight />}
    </div>
  );
}