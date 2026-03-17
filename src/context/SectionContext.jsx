import { createContext, useState } from "react";

import Homepage from "../components/Pages/Homepage";
import Transactions from "../components/Pages/Transactions";
import Analytics from "../components/Pages/Analytics";
import Profile from "../components/Pages/Profile";

import { Home, ArrowRightLeft, ChartLine, User } from "lucide-react";

const SectionContext = createContext();

export function SectionProvider(props) {
  const sections = ["Home", "Transactions", "Analytics", "Profile"];
  const pages = [<Homepage />, <Transactions />, <Analytics />, <Profile />];
  const icons = [<Home />, <ArrowRightLeft />, <ChartLine />, <User />];

  const [selectedSectionIndex, selectSection] = useState(0);

  return (
    <SectionContext.Provider
      value={{ selectedSectionIndex, selectSection, sections, pages, icons }}
    >
      {props.children}
    </SectionContext.Provider>
  );
}

export default SectionContext;
