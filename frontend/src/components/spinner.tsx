import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

export function Spinner(){

    const [value, setValue] = useState<number>(0);

    useEffect(()=>{
        setTimeout(()=>setValue(50), 400);
        setTimeout(()=>setValue(75), 800);
        setTimeout(()=>setValue(90), 1200);
        setTimeout(()=>setValue(100), 2000);
    }, [])

    return (
        <div>
            <Progress value={value} className="w-60 md:max-w-md" />
        </div>
    )
}