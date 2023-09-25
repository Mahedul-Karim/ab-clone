'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { categorieData } from "./data";
import Container from "../Container";
import CategoryBox from "./CategoryBox";


function Category(){

    const params = useSearchParams();

    const category = params?.get('category');

    const pathname=usePathname();

    if(pathname !== "/"){
        return null;
    }

    return <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categorieData.map(item=>(
                <CategoryBox key={item.label} label={item.label} icon={item.icon} selected={category === item.label}/>
            ))}
        </div>
    </Container>
}

export default Category;