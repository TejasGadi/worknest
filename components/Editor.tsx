'use client'
import { useRoom, useSelf } from '@liveblocks/react/suspense'
import React, { use, useEffect, useState } from 'react'
import * as Y from 'yjs'
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import { Button } from './ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import {BlockNoteView} from '@blocknote/shadcn'
import {BlockNoteEditor} from '@blocknote/core'
import { useCreateBlockNote } from '@blocknote/react'
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"
import stringToColor from '@/lib/stringToColor'
import TranslateDocument from './TranslateDocument'
import ChatToDocument from './ChatToDocument'

type EditorProps={
    doc:Y.Doc;
    provider:LiveblocksYjsProvider;
    darkMode:boolean
}


const BlockNote = ({doc,provider,darkMode}:EditorProps) => {
    const userInfo=useSelf((me)=>me.info)
    const editor: BlockNoteEditor= useCreateBlockNote({
        collaboration:{
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name:userInfo.name,
                color:stringToColor(userInfo.email)
            },
        }
    })

  return (
    <div className='relative max-w-4xl mx-auto'>
      <BlockNoteView
      className='min-h-screen'
      theme={
        darkMode?"dark":"light"
      }
      editor={editor}
      />
    </div>
  )
}





const Editor = () => {
    
    const room =useRoom();
    const [doc , setDoc]= useState<Y.Doc>();
    const [provider,setProvider]= useState<LiveblocksYjsProvider>();
    const [darkMode, setDarkMode]= useState(false);

    const style =` hover:text-white ${
        darkMode
        ? "text-gray-300 bg-gray-700 hover:text-gray-700 hover:bg-gray-100"
        : "text-gray-700 bg-gray-200 hover:text-gray-700 hover:bg-gray-300"
    }`

    useEffect(()=>{
        const yDoc= new Y.Doc();
        const yProvider=new LiveblocksYjsProvider(room, yDoc);
        setDoc(yDoc);
        setProvider(yProvider);

        return()=>{
            yDoc?.destroy();
            yProvider.destroy()
        }

    },[room]);

    if(!doc || !provider){
        return null;
    }

  return (
    
    <div className='max-w-4xl mx-auto'>
      <div className='flex items-center gap-2 justify-end mb-10'>
        {/* Transale doc AI  */}
        <TranslateDocument doc={doc}/>
        {/* Chat document ai  */}

        <ChatToDocument doc={doc}/>

        {/* Dark mode button  */}
        <Button className={style} onClick={()=>{setDarkMode(!darkMode)}} >
            {darkMode? <SunIcon/>:<MoonIcon/>}
        </Button>
      </div>

      {/* BlockNote  */}
      <BlockNote doc={doc} provider={provider} darkMode={darkMode}/> 
    </div>
  )
}

export default Editor