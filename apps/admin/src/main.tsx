import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, { CatchAllNavigate, NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { AppLayout } from "./components/AppLayout";
import { authProvider } from "./lib/authProvider";
import "./style.css";

const CategoriesPage = lazy(() => import("./pages/CategoriesPage").then((module) => ({ default: module.CategoriesPage })));
const DashboardPage = lazy(() => import("./pages/DashboardPage").then((module) => ({ default: module.DashboardPage })));
const FrontendHomePage = lazy(() => import("./pages/frontend/FrontendHomePage").then((module) => ({ default: module.FrontendHomePage })));
const FrontendSectionPage = lazy(() => import("./pages/frontend/FrontendSectionPage").then((module) => ({ default: module.FrontendSectionPage })));
const InquiriesPage = lazy(() => import("./pages/InquiriesPage").then((module) => ({ default: module.InquiriesPage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then((module) => ({ default: module.LoginPage })));
const MediaPage = lazy(() => import("./pages/MediaPage").then((module) => ({ default: module.MediaPage })));
const NewsPage = lazy(() => import("./pages/NewsPage").then((module) => ({ default: module.NewsPage })));
const ProductsPage = lazy(() => import("./pages/ProductsPage").then((module) => ({ default: module.ProductsPage })));
const SettingsPage = lazy(() => import("./pages/SettingsPage").then((module) => ({ default: module.SettingsPage })));
const VideosPage = lazy(() => import("./pages/VideosPage").then((module) => ({ default: module.VideosPage })));

const loadingFallback = <div style={{ padding: 32, textAlign: "center" }}>Loading admin console...</div>;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/admin-lucien">
      <ConfigProvider theme={{ token: { colorPrimary: "#0b5cab", borderRadius: 6 } }}>
        <Refine
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
            { name: "dashboard", list: "/" },
            { name: "frontend-home", list: "/frontend/home" },
            { name: "frontend-about", list: "/frontend/about" },
            { name: "frontend-products", list: "/frontend/products" },
            { name: "frontend-parts", list: "/frontend/parts" },
            { name: "frontend-news", list: "/frontend/news" },
            { name: "frontend-service", list: "/frontend/service" },
            { name: "frontend-contact", list: "/frontend/contact" },
            { name: "products", list: "/products" },
            { name: "categories", list: "/categories" },
            { name: "news", list: "/news" },
            { name: "videos", list: "/videos" },
            { name: "media", list: "/media" },
            { name: "inquiries", list: "/inquiries" },
            { name: "settings", list: "/settings" },
          ]}
          options={{ syncWithLocation: true, warnWhenUnsavedChanges: true }}
        >
          <Suspense fallback={loadingFallback}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<Authenticated key="auth" fallback={<CatchAllNavigate to="/login" />}><Outlet /></Authenticated>}>
                <Route element={<AppLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="frontend/home" element={<FrontendHomePage />} />
                  <Route path="frontend/about" element={<FrontendSectionPage section="about" />} />
                  <Route path="frontend/products" element={<FrontendSectionPage section="products" />} />
                  <Route path="frontend/parts" element={<FrontendSectionPage section="parts" />} />
                  <Route path="frontend/news" element={<FrontendSectionPage section="news" />} />
                  <Route path="frontend/service" element={<FrontendSectionPage section="service" />} />
                  <Route path="frontend/contact" element={<FrontendSectionPage section="contact" />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="news" element={<NewsPage />} />
                  <Route path="videos" element={<VideosPage />} />
                  <Route path="media" element={<MediaPage />} />
                  <Route path="inquiries" element={<InquiriesPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>
              <Route path="*" element={<NavigateToResource resource="dashboard" />} />
            </Routes>
          </Suspense>
          <UnsavedChangesNotifier />
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);