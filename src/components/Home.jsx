import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes ,updateToPastes } from '../redux/pasteSlice';
const Home = () => {
    const [title , setTitle] = useState("");
    const [value , setValue]=useState("");
    const [searchParams, setSearchParams]=useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state)=>
        state.paste.pastes);
        useEffect(
            ()=>{
                console.log("inside useEffect")
                if(pasteId){
                    const paste = allPastes.find((p)=>p._id === pasteId);
                    if(paste){
                        setTitle(paste.title);
                        setValue(paste.content);
                    }
                }
            },[pasteId] )

    function createPaste(){
        const paste = {
            title:title,
            content:value,
            _id : pasteId || 
            Date.now().toString(36),
            createAt:new Date().toISOString(),
        }
      
        if(pasteId){
            //update paste
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }
        // after creation and updation 
        setTitle('');
        setValue('');
        setSearchParams({});
    }


  return (
   <div>
     <div className="flex flex-row gap-7 place-content-between">
      <input 
       className='rounded-2xl  mt-2 p-1 w-[66%] pl-4  bg-gray-100 text-xl  text-black'
       type="text" 
       placeholder='enter title here...'
       value={title}
       onChange={(e)=>setTitle(e.target.value)}
      />
      <button
       className='rounded-2xl p-2 mt-2 text-xl  text-black bg-gray-100'
       onClick={createPaste}
      >
        {
        pasteId ? "Update Paste" : "Create my paste"
         }
      </button>
    </div>
    <div className='mt-8'>
        <textarea 
        className='rounded-2xl mt-4 min-w-[500px] p-4 bg-gray-100 text-xl text-black'
        value={value}
        placeholder='enter content here...'
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        ></textarea>
    </div>
   </div>

  )
}

export default Home
