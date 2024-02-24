

async function UserData() {
    const res = await fetch(`http://localhost:3000/api/user`, {cache: 'no-store'})
    if(!res.ok) throw new Error("failed to fetch user");
    return await res.json()
}

const User = async() => {
    const data: [{email: string, id: string}] = await UserData()
    console.log('email:', data);

  return (
    <div>
      {data.map((res)=> (
        <p className="" key={res.id}>{res.email}</p>
      ))}
    </div>
  )
}

export default User
