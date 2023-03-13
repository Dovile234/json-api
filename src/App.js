import { Route, Routes } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Album from "./Pages/Album-page/Album";
import Albums from "./Pages/Albums-page/Albums";
import LandingPage from "./Pages/Landing-page/Landing-page";
import PageNotFound from "./Pages/Page-not-found/Page-not-found";
import Posts from "./Pages/Posts/Posts-page";
import SearchPage from "./Pages/Search-page/Search-page";
import User from "./Pages/User-page/User";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/json-api/search/:phrase" element={<SearchPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/json-api/posts/:post" element={<Posts />} />
        <Route path="/json-api/posts" element={<Posts />} />
        <Route path="/json-api/albums" element={<Albums />} />
        <Route path="/json-api/album/:id" element={<Album />} />
        <Route path="/json-api/user/:id" element={<User />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
