const Card = (props: { img_url: string; img_title: string; onClick: () => void }) => {
    return (
      <div className="cursor-pointer flex h-56 justify-center flex-col lg:mt-10 bg-[#fff4f0] dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:transition-all rounded-md shadow-xs overflow-hidden hover:shadow-md transition-shadow duration-300"
      onClick={props.onClick}
      >
        {/* Image Section */}
        <img
          src={props.img_url}
          alt={props.img_title}
          className="w-30 self-center"
        />
        
        {/* Title Section */}
        <div className="p-4">
          <h2 className="text-xl text-center font-semibold text-[#9e5aff] dark:text-white uppercase">
            {props.img_title}
          </h2>
        </div>
      </div>
    );
  };
  
  export default Card;
  