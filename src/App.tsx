import Fixedheader from "./components/Fixedheader";
import Main from "./components/Main";
import './style/App.css'

const App = () => {
  return (
    <div className="text-gray-400 relative">
            <img
        src="/header.jpeg"
        className="absolute z-0 header_img"
        style={{ top: 0, left: 0}}
        alt="header" />
      <Fixedheader />
      <div className="grid grid-cols-5 h-full w-full z-50">
        <div className="col-span-1"></div>
        <Main />
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}

export default App;
