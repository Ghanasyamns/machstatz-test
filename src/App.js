import './App.css';
import AddUser from './AddUser';

import DisplayUser from './DisplayUser';
function App() {
  let submit=false;
  
  return (
    <div className="App">
   <DisplayUser submit={submit}/>
   <AddUser submit={submit}/>
  
   </div>
  );
}

export default App;
