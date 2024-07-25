import './App.css';
import List from './components/List'
import IsEditing from './components/IsEditing';

function App() {
  return (
    <div className="App">
        <div className="App-header">
          <IsEditing>
            <List></List>
          </IsEditing>
        </div>
    </div>
  );
}

export default App;
