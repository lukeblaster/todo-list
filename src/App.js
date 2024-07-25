import './App.css';
import List from './components/List'
import IsEditing from './components/IsEditing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <IsEditing>
          <List></List>
        </IsEditing>
      </header>
    </div>
  );
}

export default App;
