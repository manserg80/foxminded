import './App.css';
import AppFunctionToolkit from './components/counterToolkit/Counter'
function App() {
  return (
    <div className="appWraper">
      <div className='toolkit'>
        <h2 className='header'>Function Counter with Redux Toolkit</h2>
        <AppFunctionToolkit />,
      </div>
    </div>
  );
}

export default App;
