import { DndProvider } from 'react-dnd';
import './App.css';
import { TaskList } from './modules/task/taskList.tsx';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App" style={{padding: "10px 100px"}}>
        <TaskList/>
      </div>
    </DndProvider>
  );
}

export default App;
