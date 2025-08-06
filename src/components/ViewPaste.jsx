
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes ,updateToPastes } from '../redux/pasteSlice';
const ViewPaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state)=>
    state.paste.pastes
  );
  const paste = allPastes.filter((p)=>p._id === id)[0];

  return (
    <div>
     <div className="flex flex-row gap-7 place-content-between bg-gray-100">
      <input 
       className='rounded-2xl  mt-2 p-1 w-[66%] pl-4 text-black text-xl'
       type="text" 
       placeholder='enter title here'
       value={paste.title}
       disabled
       onChange={(e)=>setTitle(e.target.value)}
      />
    </div>
    <div className='mt-8'>
        <textarea 
        className='rounded-2xl mt-4 min-w-[500px] p-4 bg-gray-100 text-black text-xl'
        value={paste.content}
        placeholder='enter content here'
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        ></textarea>
    </div>
   </div>

  )

}

export default ViewPaste
