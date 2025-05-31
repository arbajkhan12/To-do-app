import { useEffect, useState } from 'react';
import '../App.css'
import { CiDark } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";



export const ToDoList = ()=>{
  const rowtask = 'todotask'
    const [inputvalue , setinputvalue] = useState("")
    const [task , settask] = useState(()=>{
     const rowtodo=  localStorage.getItem(rowtask)
     if(!rowtodo) return [] ;
       return JSON.parse(rowtodo)
    })
    const [edit , setedit] = useState(null)

    const [isdark , setisdark] = useState( ()=>{
      const mode = localStorage.getItem("modes")
      if(!mode) return []
      return JSON.parse(mode)
    })

   

    const toggledarkmode = ()=>{
      setisdark(prev => !prev)
    }

    useEffect(() => {
      if(isdark){
        document.body.style.background = "#121212"
      }else{
        document.body.style.background = "#dedede68"
      }
    },[isdark])


    const handleinputchange = (value)=>{
        setinputvalue(value)
    }

    const handlesubmitform = (event)=>{
        event.preventDefault()
        if(!inputvalue) return;            
        if(task.includes(inputvalue)) return;    
        settask((prevtask) =>[  ...prevtask , {text: inputvalue  , isChecked: false}
        ])
        setinputvalue('')

        if(edit !== null){
          const updatetedtask =[...task]
          updatetedtask[edit].text = inputvalue
          settask(updatetedtask)
          setedit(null)
        }
    }

    localStorage.setItem(rowtask , JSON.stringify(task))
    localStorage.setItem('modes' , JSON.stringify(isdark))

    const handleDelete = (value)=>{
      const upDatedTask = task.filter((datatask) => datatask !== value)
      settask(upDatedTask)
    }

     const handlecheck = (index)=>{
       const updated = task.map((datatask , i)=>{
        if(i === index){
          return{...datatask , isChecked: !datatask.isChecked}
        }
        return datatask
       })
       settask(updated)
     }

     const handleedit = (index)=>{
       setinputvalue(task[index].text);
       setedit(index)
     }

  

   return (
    <>
    {/* input and forms fileds---------- */}
    <h2>TODO LIST APP</h2>
       <section className="todo-seacrh">  
          <form onSubmit={handlesubmitform}>

            <input className="input" type="text"
             autoComplete='off' 
             placeholder='Add Your Task.....'
             value={inputvalue}
             onChange={(e) => handleinputchange(e.target.value)}
             />

            <button className='task-btn'>ADD TASK</button>
        </form>

          <div className="mode" onClick={toggledarkmode}>
            <CiDark />
          </div>
       </section>
       <section className="task-list">

        {/* Taks lists----------- */}
         <ul>
            {
                task.map((datatask , index)=>{
                return (
                  <>
                  <li key={index} className='task' >
                    <div onClick={()=> handlecheck(datatask)} className="checkbox">
                        <input type="checkbox" checked={datatask.isChecked} onChange={()=>handlecheck(index)} />
                    </div>                   
                   <p className={`data ${datatask.isChecked ? 'line' : "" }` } >{datatask.text}</p>
                   <div className="icon">
                   <span onClick={() => handleDelete(datatask)} style={{cursor:"pointer"}}><MdDelete /></span>
                     <span onClick={()=>handleedit(index)}><FaRegEdit /></span>
                   </div>
                  </li>
                  </>
                )
              })
            }
         </ul>
       </section>
     
    </>
   )
}