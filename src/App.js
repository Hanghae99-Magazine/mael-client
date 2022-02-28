import { useEffect } from "react";
import "./App.css";
import AppRouter from "./routes/Router";
import { useDispatch } from "react-redux";
import { loginCheck } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();
  const mytoken = sessionStorage.getItem("mytoken");
  useEffect(() => {
    if (mytoken) {
      dispatch(loginCheck());
    }
  }, [mytoken, dispatch]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
