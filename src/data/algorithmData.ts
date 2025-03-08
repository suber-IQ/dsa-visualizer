const BASE_URL = import.meta.env.BASE_URL || "";


// Define the interface for the algorithm data
interface Algorithm {
  id:number;
  img_title: string;
  img_url: string;
  redirect_url:string;
}


const algorithmData: Algorithm[] = [
  { id: 1, img_url: `${BASE_URL}assets/images/sorting.png`, img_title: "Sorting Algorithms", redirect_url: "/sorting" },
  { id: 2, img_url: `${BASE_URL}assets/images/searching.png`, img_title: "Searching Algorithms", redirect_url: "/searching" },
  { id: 3, img_url: `${BASE_URL}assets/images/graph.png`, img_title: "Graph Algorithms", redirect_url: "/graph" },
  { id: 4, img_url: `${BASE_URL}assets/images/dynamic.png`, img_title: "Dynamic Programming", redirect_url: "/dynamic-programming" },
  { id: 5, img_url: `${BASE_URL}assets/images/greedy.png`, img_title: "Greedy Algorithms", redirect_url: "/greedy" },
  { id: 6, img_url: `${BASE_URL}assets/images/backtracking.png`, img_title: "Backtracking", redirect_url: "/backtracking" },
  { id: 7, img_url: `${BASE_URL}assets/images/tree.png`, img_title: "Tree Algorithms", redirect_url: "/tree" },
  { id: 8, img_url: `${BASE_URL}assets/images/mathematical.png`, img_title: "Mathematical Algorithms", redirect_url: "/mathematical" },
];

export default algorithmData;
