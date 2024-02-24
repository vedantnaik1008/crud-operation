'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const Post = ({ data }: { data: any }) => {
    const router = useRouter();
    const [formData, setData] = useState({ title: '', email: '' });
    const [isUpdating, setIsUpdating] = useState(false);
    const Delete = (id: string) => {
        axios
            .delete(`http://localhost:3000/api/form/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
            .finally(() => router.refresh());
    };
    const DeleteAll = () => {
        axios
            .delete(`http://localhost:3000/api/form`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
            .finally(() => router.refresh());
    };
    const Update = async (id: string) => {
       setIsUpdating(true);
       try {
           const res = await axios.patch(
               `http://localhost:3000/api/form/${id}`,
               formData
           );
           console.log(res);
           setIsUpdating(false);
           
       } catch (err) {
           console.log(err);
           setIsUpdating(false);
       } finally {
           router.refresh();
       }
    };
    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            {data.map((res: { title: string; id: string }) => (
                <>
                    <p className='flex gap-4' key={res.id}>
                        {res.title}
                        <button onClick={() => setIsUpdating(true)}>
                            update
                        </button>
                        <button onClick={() => Delete(res.id)}>delete</button>
                    </p>
                    {isUpdating && (<div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                Update(res.id);
                            }}>
                            <input
                                className='border-black border-2'
                                type='text'
                                onChange={onChangeHandle}
                                name='title'
                                value={formData.title}
                            />
                            <input
                                className='border-black border-2'
                                type='email'
                                onChange={onChangeHandle}
                                name='email'
                                value={formData.email}
                            />
                            <button type='submit'>Submit</button>
                        </form>
                    </div>)}
                </>
            ))}
            <button onClick={() => DeleteAll()}>Delete All</button>
        </div>
    );
};

export default Post;
