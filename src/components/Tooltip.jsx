export const Tooltip = ({ text, children }) => {
  return (
    <div className="relative inline-block group">
      <div className="relative">
        {children}
        <div className="hidden absolute z-10 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md top-8 left-1/2 transform -translate-x-1/2 group-hover:block">
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-gray-800 transform rotate-45"></div>
          </div>
          {text}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
