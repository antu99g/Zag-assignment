import { useState } from "react";
import { Sidebar, Dashboard } from "./components";

function App() {
  const [activeSection, setActiveSection] = useState("desktop");
  return (
    <div className="h-screen w-screen flex font-inter text-base bg-main-bg overflow-x-hidden">
      <Sidebar activeSection={activeSection} />
      <Dashboard />
    </div>
  );
}

export default App;
