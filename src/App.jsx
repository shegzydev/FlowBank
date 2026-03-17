// import { useState } from "react";
import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";

import { SectionProvider } from "./context/SectionContext";
import { TransactionProvider } from "./context/TransactionContext";
import { UserProvider } from "./context/UserContext";

import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { LoadingProvider } from "./context/LoadingContext";

function App() {
  const [sidebarOpened, toggleSidebar] = useState(false);

  return (
    <>
      <Router>
        <LoadingProvider>
          <UserProvider>
            <TransactionProvider>
              <SectionProvider>
                <div className="sidebar-dash">
                  <Sidebar
                    opened={sidebarOpened}
                    toggle={toggleSidebar}
                  ></Sidebar>
                  <Dashboard toggleSidebar={toggleSidebar}></Dashboard>
                </div>
                <Spinner></Spinner>
              </SectionProvider>
            </TransactionProvider>
          </UserProvider>
        </LoadingProvider>
      </Router>
    </>
  );
}

export default App;
