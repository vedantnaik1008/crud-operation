'use client'

import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

const Form = () => {
    const router = useRouter()
    const [data, setData] = useState({title: '', email: ''})
    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setData((prev)=> ({...prev, [name]:value}))
        
    }
    const onSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const post = await fetch('http://localhost:3000/api/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
if (!post.ok) {
    throw new Error('Network response was not ok');
}
            const res = await post.json();
            console.log(res);
           setData({title: '', email: ''})
        } catch (error: any) {
            console.log(error);
        }finally{
            router.refresh()
        }
    }
  return (
      <div>
          <form onSubmit={onSubmitHandle}>
              <input 
                  className="border-black border-2"
                  type='text'
                  onChange={onChangeHandle}
                  name='title'
                  value={data.title}
              />
              <input 
                  className="border-black border-2"
                  type='email'
                  onChange={onChangeHandle}
                  name='email'
                  value={data.email}
              />
              <button type='submit'>Submit</button>
          </form>
      </div>
  );
}

export default Form
