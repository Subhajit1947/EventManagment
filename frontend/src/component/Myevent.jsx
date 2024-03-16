import React,{useState,useEffect} from 'react'
import axios from 'axios'


const Myevent = () => {
    // first i hit the api for fetch the current user created event in useeffect hook
    // and store it in data through usestate hook 
    // and take a another variable changee that is use for when user delete his event
    // it make api call for fetch the current user created event
    const [data,setdata]=useState([])
    const [changee,setchangee]=useState(true)
    const [token,settoken]=useState(()=>localStorage.getItem("access_token")?JSON.parse(localStorage.getItem("access_token")):null)       
    useEffect(()=>{
        const headers={
            Authorization: 'Bearer ' + token 
        }
        axios.get('http://127.0.0.1:8000/api/event/myevent/',{headers}).then((res)=>{
            
            setdata(res.data)
        })
    },[changee])

    // delete the current user created event hit a delete api
    const deletebtn=(d_id)=>{
        const headers={
            Authorization: 'Bearer ' + token 
        }
        axios.delete(`http://127.0.0.1:8000/api/event/myevent/${d_id}`,{headers}).then((res)=>{
            
            setchangee(!changee)
        }) 
    }

  return (
    <div className='m-4 w-screen flex flex-col items-center'>
        <div className="mb-2 ">
            <h1 className="text-5xl font-bold mb-2">Your Created Event</h1>
        </div>
        {data.length==0?<h1 className="text-3xl font-bold mt-16">Please Create some event😒😒</h1>:
        <div className='mt-4 w-4/5 h-60 '>
            {data?.map((obj)=>(
            <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden m-4 w-full h-full">
                <div className="grid grid-cols-2 gap-4 h-full">
                    <div className='flex justify-center items-center'>
                        <img className='h-4/5 mt-1' src={`http://127.0.0.1:8000${obj.image}`}/>
                    </div>
                    <div className="flex justify-center items-center">
                        <div >

                            <div className="text-xl font-bold">{obj.event_name}</div>
                            <div className="text-gray-600">{obj.date}</div>
                            <div className="text-gray-600">{obj.location}</div>
                            <div className="text-gray-600 text-sm">Starts at {obj.time}</div>
                            <button onClick={()=>deletebtn(obj.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 mt-3 px-4 rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            ))}
           
        </div>}
    </div>
  )
}

export default Myevent