import Post from "./Post";

async function getData() {
    const res = await fetch('http://localhost:3000/api/form', {cache: 'no-store'});
    if (!res.ok) throw new Error('failed to fetch data');

    return await res.json();
}

const GetPost = async () => {
    const data = await getData()
    console.log(data);
    
  return (
    <div>
      <Post data={data}/>
    </div>
  )
}

export default GetPost
