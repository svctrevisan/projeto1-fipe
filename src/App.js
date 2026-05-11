import { FipeProvider } from "./contexts/FipeContext";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Header from "./components/Header";

function App() {
  return (
    <FipeProvider>
      <Header />
      <Body />
      <Footer />
    </FipeProvider>
  );
}

export default App;