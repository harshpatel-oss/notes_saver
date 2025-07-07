import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
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
    <div className='flex flex-col gap-3'>
        <input type="search"
        className='p-2 rounded-2xl min-w-[600px] mt-5  bg-gray-100'
        placeholder='search here'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <div className='flex flex-col gap-5'>
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
               className='border flex flex-col justify-center items-center rounded-2xl bg-gray-100'>
                 <div className='font-bold'
                >{paste.title}
                </div>
                <div>
                  {paste.content}
                </div>
                <div className='flex flex-row gap-4 place-content-evenly'>
                  <button>
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                      Edit
                    </NavLink>
                  </button>
                  <button>
                    <NavLink to={`/pastes/${paste?._id}`}>
                    View
                    </NavLink>
                    </button>
                  <button 
                  className='text-blue-500'
                  onClick={()=>handleDelete(paste?._id)}>
                    Delete
                    </button>
                  <button
                  className='text-blue-500'
                   onClick={()=>{
                    navigator.clipboard.writeText
                    (paste?.content)
                    toast.success("copied to clipBoard")
                  }}>
                    Copy
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
                              Share
                   </button>
                </div>
                <div>{date.toLocaleString('en-US', options)}</div>
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
