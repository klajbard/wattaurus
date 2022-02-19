import React from "react";
import Header from "./components/Header/Header";
import useLazyLoad from "./hooks/useLazyload";
import Footer from "./components/Footer/Footer";
// import Ribbon from "./components/Ribbon/Ribbon";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.less";
import NotFound from "./pages/NotFound";
import "./Prism.less";
import { getPosts } from "./data";
import ResistorCalculator from "./pages/ResistorCalculator/ResistorCalculator";

const Homepage = React.lazy(() => import("./pages/Homepage"));
const About = React.lazy(() => import("./pages/About"));
const Post = React.lazy(() => import("./pages/Post"));
const Posts = React.lazy(() => import("./components/Posts/Posts"));

function Fallback() {
  return <div className={styles.fallback}>Loading...</div>;
}

export default function App() {
  useLazyLoad();
  const posts = getPosts();
  return (
    <React.Suspense fallback={<Fallback />}>
      {/* <Ribbon>Work in progress</Ribbon> */}
      <Router>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/resistor-calc" element={<ResistorCalculator />} />
            <Route
              path="/posts"
              element={
                <Posts
                  posts={posts.sort((a, b) => b.time - a.time)}
                  withImage
                  contentLength={250}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route exact path="/" element={<Homepage />} />
            <Route element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </React.Suspense>
  );
}
