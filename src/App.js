import MainContent from "./components/MainContent";
import "./App.css";
import "./components/styles/chartStyles.css";
import { AuthContextProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <MainContent />
      </div>
    </AuthContextProvider>
  );
}

export default App;
