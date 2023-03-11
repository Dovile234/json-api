import { Link, Route, Routes } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import LandingPage from "./Pages/Landing-page/Landing-page";
import Posts from "./Pages/Posts/Posts-page";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/json-api/posts/:post" element={<Posts />} />
        <Route path="/json-api/posts" element={<Posts />} />
        <Route
          path="*"
          element={
            <div>
              <h1>404 error. Page not found</h1>
              <Link to="/json-api">Back to Home page</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
