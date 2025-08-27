import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";

function App() {

  const [Task, setTask] = useState('');
  const [List, setList] = useState([]);
  const [show, setshow] = useState(true);
  const [inactive, setinactive] = useState(true);

  useEffect(() => {
    const ogarr = JSON.parse(localStorage.getItem('task_array'));
    if (ogarr) {
      setList(ogarr);
    }
  }, [])

  const savetoLS = () => {
    localStorage.setItem('task_array', JSON.stringify(List))
  }


  const handleChange = (e) => {
    setTask(e.target.value);
    if (Task.length < 3) {
      setinactive(true);
    }
    else {
      setinactive(false);
    }
  }

  const updateList = () => {
    const updateItem = { title: Task, isCompleted: false };
    const updatedList = [...List, updateItem];
    setList(updatedList);
    setTask('');
    localStorage.setItem('task_array', JSON.stringify(updatedList));
  }


  const handleCheckMark = (e, item) => {
    let newarr = [...List];
    let index = newarr.findIndex(x => {
      if (x == item) {
        return x;
      }
    })
    newarr[index].isCompleted = !newarr[index].isCompleted;
    setList(newarr);
    savetoLS();
  }

  const handleDelete = (item) => {
    let updatedarr = List.filter(x => {
      if (x != item) {
        return x;
      }
    })
    setList(updatedarr);
    localStorage.setItem('task_array', JSON.stringify(updatedarr));
  }

  const handleUpdate = (item) => {
    handleDelete(item);
    setTask(item.title);
  }

  const handleShow = (e) => {
    setshow(!show)
  }


  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Navbar />
      <div className="container flex w-full">
        <div className="main bg-rose-100 w-2xl mx-auto my-10 min-h-[80vh] h-fit border-0 rounded-2xl p-3">
          <h2 className='font-bold text-2xl text-rose-900 mx-4'>TasK-MasteR</h2>
          <div className="inputter flex gap-3 justify-center my-6">
            <input type="text" value={Task} onChange={handleChange} className='bg-white w-3/4 rounded-full px-3 py-1' placeholder='Enter your Task Here...' />
            <button className='bg-rose-900 px-3 py-1 hover:bg-rose-950 text-white font-bold cursor-pointer rounded-3xl disabled:bg-rose-950' disabled={inactive} onClick={updateList}>Add</button>
          </div>

          <div className='h-[2px] bg-rose-900 w-[90%] mx-auto my-3'></div>

          <div className="show flex justify-between m-4">
            <h2 className='font-bold w-fit text-xl'>your Tasks</h2>
            <div className='flex items-center g gap-2 text-rose-950'>
              <input type="checkbox" name="show" checked={show} onChange={handleShow} />
              <label htmlFor="show">show completed tasks</label>
            </div>
          </div>

          <div className="list">
            {List.map(item => {
              if (show) {
                return <div key={uuidv4()} className="task flex gap-2 justify-between my-3">
                  <div className='flex gap-2 w-full'>
                    <input type="checkbox" id="" checked={item.isCompleted} onChange={(e) => { handleCheckMark(e, item) }} />
                    <p className='bg-white rounded-2xl p-3 break-words break-all w-full'>
                      {(item.isCompleted ? <span className='line-through'>{item.title}</span> : <span>{item.title}</span>)}</p>
                  </div>
                  <div className='flex gap-2 w-fit'>
                    <button className='bg-rose-900 p-1 h-fit hover:bg-rose-950 text-white font-bold cursor-pointer rounded-lg' onClick={() => { handleUpdate(item) }}><FaEdit /></button>
                    <button className='bg-rose-900 p-1 h-fit hover:bg-rose-950 text-white font-bold cursor-pointer rounded-lg' onClick={() => { handleDelete(item) }}><MdDelete /></button>
                  </div>
                </div>
              }
              return (!item.isCompleted && <div key={uuidv4()} className="task flex gap-2 justify-between my-3">
                <div className='flex gap-2 w-full'>
                  <input type="checkbox" id="" checked={item.isCompleted} onChange={(e) => { handleCheckMark(e, item) }} />
                  <p className='bg-white rounded-2xl p-3 break-words break-all w-full'>
                    {(item.isCompleted ? <span className='line-through'>{item.title}</span> : <span>{item.title}</span>)}</p>
                </div>
                <div className='flex gap-2 w-fit'>
                  <button className='bg-rose-900 p-1 h-fit hover:bg-rose-950 text-white font-bold cursor-pointer rounded-lg' onClick={() => { handleUpdate(item) }}><FaEdit /></button>
                  <button className='bg-rose-900 p-1 h-fit hover:bg-rose-950 text-white font-bold cursor-pointer rounded-lg' onClick={() => { handleDelete(item) }}><MdDelete /></button>
                </div>
              </div>)
            })}
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
