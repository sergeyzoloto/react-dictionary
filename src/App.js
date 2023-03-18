import './App.css';
import CustomRouter from './components/Router/Router.js';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <CustomRouter />
      </div>
    </GlobalProvider>
  );
}

export default App;
