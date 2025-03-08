import { useParams } from "react-router";
import SortingSidebar from "./visualizers/sorting/SortingSidebar";
import SearchingSidebar from "./visualizers/searching/SearchingSidebar";
import GraphSidebar from "./visualizers/graph/GraphSidebar";
import DPSidebar from "./visualizers/dynamicProgramming/DpSidebar";
import GreedySidebar from "./visualizers/greedy/GreedySidebar";
import BacktrackingSidebar from "./visualizers/backtracking/BacktrackingSidebar";
import TreeSidebar from "./visualizers/tree/TreeSidebar";
import MathSidebar from "./visualizers/mathematical/MathSidebar";


const Sidebar = () => {
  const { algorithm } = useParams<{ algorithm?: string }>();

  // Determine which sidebar to show based on the algorithm category
  const renderSidebar = () => {
    switch (algorithm) {
      case "sorting":
        return <SortingSidebar />;
      case "searching":
        return <SearchingSidebar />;
      case "graph":
        return <GraphSidebar />;
      case "dynamic-programming":
        return <DPSidebar />
      case "greedy":
        return <GreedySidebar />
      case "backtracking":
        return <BacktrackingSidebar />
      case "tree":
        return <TreeSidebar />
      case "mathematical":
        return <MathSidebar />
      default:
        return <DefaultSidebar />;
    }
  };

  return (
    <div>
      {renderSidebar()}
    </div>
  );
};

// Default Sidebar (For pages without specific algorithms)
const DefaultSidebar = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Algorithm Categories</h2>
      <p>Select an algorithm type to begin.</p>
    </div>
  );
};

export default Sidebar;
