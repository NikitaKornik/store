import s from "./App.module.scss";
import AsideNav from "./components/AsideNav/AsideNav";
import LayOut from "./components/LayOut/LayOut";
import "./styles/__colors.scss";

function App() {
  return (
    <div className={s.root}>
      <AsideNav />
      <LayOut></LayOut>
    </div>
  );
}

export default App;
