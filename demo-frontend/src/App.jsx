import ListEmployee from "./components/ListEmployee";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddEmployee from "./components/AddEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListEmployee />} />
          <Route path="/employees" element={<ListEmployee />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/update-employee/:id" element={<AddEmployee />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
