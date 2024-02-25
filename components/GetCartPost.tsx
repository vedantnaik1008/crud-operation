

async function getData() {
    const res = await fetch('http://localhost:3000/api/cart', {
        cache: 'no-store'
    });
    if (!res.ok) throw new Error('failed to fetch cart data');

    return await res.json();
}

const GetCartPost = async () => {
    const data: [{title: string, id: string}] = await getData();
    console.log(data);

    return (
        <div>
            {data.map((res)=> (
                <p key={res.id}>{res.title}</p>
            ))}
        </div>
    );
};

export default GetCartPost;
