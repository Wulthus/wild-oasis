"use client";

import { useState } from "react";

interface CounterProps {
    users: [],
}

export default function Counter({ users }: CounterProps){
    
    const [count, setCount] = useState(0)

    console.log(users);

    return (
        <button onClick={()=>setCount(count+1)}>{count}</button>
    )
}