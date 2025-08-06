import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
 import { FaEdit, FaEye, FaTrash, FaCopy, FaShareAlt } from "react-icons/fa";

const Paste = () => {
  const pastes = useSelector((state)=>
  state.paste.pastes);
  const [searchTerm , setSearchTerm]= useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }
  
 

  return (
    <div className='Pastes flex flex-col items-center gap-5'>
        <input type="search"
        className='p-2 rounded-2xl min-w-[600px] mt-5  bg-gray-100 w-[60%]  text-black'
        placeholder=' 🔍 search here ...'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <div className='Pastes flex flex-col gap-5'>
        {
          filteredData.length >0 && filteredData.map(
            (paste)=>{
                const date = new Date(paste.createAt);
                const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                };
              return (
               <div  key={paste?._id} 
               className='Paste relative  border flex flex-col justify-center items-center rounded-2xl bg-gray-100 p-6 mx-100 min-w-[500px]'>
                 <div className='font-bold  text-black'
                >{paste.title}
                </div>
                <div className='flex wrap p-5 pb-14 text-xl  text-black'>
                  {paste.content}
                </div>
                <div className='absolute bottom-2 right-2'>
                <div className=' buttons  flex flex-row gap-2 place-content-evenly text-sm font-bold'>
                  <button>
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                     <FaEdit/>
                    </NavLink>
                  </button>
                  <button>
                    <NavLink to={`/pastes/${paste?._id}`}>
                    <FaEye/>
                    </NavLink>
                    </button>
                  <button 
                  className='text-blue-500'
                  onClick={()=>handleDelete(paste?._id)}>
                    <FaTrash/>
                    </button>
                  <button
                  className='text-blue-500'
                   onClick={()=>{
                    navigator.clipboard.writeText
                    (paste?.content)
                    toast.success("copied to clipBoard")
                  }}>
                    <FaCopy/>
                    </button>
                   <button
                    className='text-blue-500'
                    onClick={() => {
                         const shareData = {
                         title: paste?.title || "Paste",
                         text: paste?.content || "",
                          url: window.location.origin + `/pastes/${paste?._id}`,
                          };
                          if (navigator.share) {
                           navigator.share(shareData)
                            .then(() => toast.success("Shared successfully!"))
                              .catch((error) => toast.error("Share failed"));
                           } else {
                            navigator.clipboard.writeText(shareData.url);
                            toast.success("Share link copied to clipboard (fallback)");
                              }
                              }}>
                              <FaShareAlt/>
                   </button>
                </div>
                <div className='flex justify-center text-black'>{date.toLocaleString('en-US', options)}</div>
               </div> 

                </div>
               
              )
            }
             
          )
        }
        </div>

    </div>
  )
}

export default Paste
