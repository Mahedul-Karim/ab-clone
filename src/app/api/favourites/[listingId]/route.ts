import { NextResponse } from 'next/server';

import getUser from '@/lib/getUser';
import prisma from '@/lib/prismadb';

type Params={
    params:{
        listingId?:string;
    }
}

export async function POST(request:Request,{params:{listingId}}:Params){

    const currentUser = await getUser();

    if(!currentUser){
        return NextResponse.json({message:'Login or signup first'})
    }

    if(!listingId){
        return NextResponse.json({message:'Invalid ID'})
    }

    let favouriteIds=[...(currentUser.favouriteIds || [])];

    favouriteIds.push(listingId);

    const user = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favouriteIds
        }
    })
    return NextResponse.json(user)
}

export async function DELETE(request:Request,{params:{listingId}}:Params){
    const currentUser = await getUser();

  if (!currentUser) {
    return NextResponse.error();
  }


  if (!listingId) {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favouriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
        favouriteIds:favoriteIds
    }
  });

  return NextResponse.json(user);
}