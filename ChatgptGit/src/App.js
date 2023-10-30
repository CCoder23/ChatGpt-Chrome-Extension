import React, { useEffect, useState } from 'react';
import Generator from './components/Generator';
import Profile from './components/profile';
import {ROUTES} from './utils/routes';
import { loadData } from './utils/localstorage';

function App() {
  const [page, setPage]=useState();
  const [resume,setResume]=useState();
  const [openAIKey,setOpenAIKey]=useState();

  useEffect(()=>{
  const  fetchLocalData = async()=>{
    const fectedResume = await loadData("resume")
    const fetchedAIKey = await loadData("openAIKey")
    console.log('fectedResume',fectedResume)
    console.log('fetchedAIKey',fetchedAIKey)
    setResume(fectedResume);
    setOpenAIKey(fetchedAIKey);
  };
  fetchLocalData();
  },[]);
  
    switch (page) {
      case ROUTES.GENERATOR: 
        return <Generator 
        setPage = {setPage}
        resume={resume} 
        openAIKey={openAIKey}/>;

      case ROUTES.PROFILE:        
        return <Profile 
        setPage = {setPage} 
        resume={resume} 
        setResume={setResume}
        openAIKey={openAIKey}
        setOpenAIKey={setOpenAIKey}
         />; 

      default:
        return <Generator 
        setPage = {setPage}
        resume={resume} 
        openAIKey={openAIKey}/>;
    }  
}

export default App;
