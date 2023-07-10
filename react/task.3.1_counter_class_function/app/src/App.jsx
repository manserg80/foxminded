import './App.css';
import AppFunction from './counterFunction/counter'
import AppClass from './counterClass/counter'
function App() {
  return (
    <div className="appWraper">
      <div className='function'>
        <h2 className='header'>Function Counter</h2>
        <AppFunction />,
      </div>
      <div className="class">
      <h2 className='header'>Class Counter</h2>
        <AppClass />
      </div>
    </div>
  );
}

export default App;
