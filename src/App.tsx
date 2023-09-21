import { Gallery, Header } from "./components";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";

function App() {
  return (
      <AuthContextProvider>
        <section className="main">
          <Header />
          <Gallery />
        </section>
      </AuthContextProvider>
  );
}

export default App;
