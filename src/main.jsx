import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home, { getContentDetails } from './components/Home/Home.jsx';
import Movies, { discoverMovies } from './components/Movies/Movies.jsx';
import Series, { discoverSeries } from './components/Series/Series.jsx';
import 'plyr/dist/plyr.css';
import ContentDetailsPage, { loadImage } from './components/ContentInfo/ContentDetailsPage.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import ErrorBoundary from './Utils/ErrorBoundary.jsx';
import NotFound from './Utils/NotFound.jsx';
import SearchResult from './components/Header/SearchResult.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect root to /home */}
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} loader={getContentDetails} />
        <Route path="/movies" element={<Movies />} loader={discoverMovies} />
        <Route path="/series" element={<Series />} loader={discoverSeries} />
        <Route path="/:type/:Id" element={<ContentDetailsPage />} loader={loadImage} />
        <Route path="/search" element={<SearchResult />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
        <ToastProvider>
          <RouterProvider router={router}></RouterProvider>
        </ToastProvider>
    </ErrorBoundary>
  </StrictMode>
);
