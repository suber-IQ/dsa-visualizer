import { useNavigate } from "react-router";
import Card from "../components/Card";
import algorithmData from "../data/algorithmData";

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick  = (redirect: string) => {
       if(redirect){
        navigate(`/visualizer${redirect}`)
       }else{
        alert("This algorithm does not have a visualizer yet...");
       }
  }

  return (
    <div className="container mx-auto mt-32 px-4 xl:px-0 grid md:grid-cols-3 lg:grid-cols-4 gap-3.5 lg:gap-6">
      {algorithmData.map((val) => (
        <Card 
        key={val.id} img_url={val.img_url || ""}
         img_title={val.img_title || ""}
         onClick={() => handleCardClick(val.redirect_url)}
          />
      ))}
    </div>
  
  );
};

export default Home;
