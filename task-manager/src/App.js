import logo from './logo.svg';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from './Redux/action';

function App() {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskInput addTask={handleAddTask} />
      <TaskList tasks={tasks} deleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;
