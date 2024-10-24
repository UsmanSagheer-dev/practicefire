import React from 'react'; 
import { Provider } from 'react-redux'; 
import store from './store/Store'; // Import your Redux store
import './App.css';
import Navigation from './component/navigation/Navigation';

function App() {
  return (
    <Provider store={store}> {/* Wrap your application with Provider */}
      <div className="App">
        <Navigation />
      </div>
    </Provider>
  );
}

export default App;
