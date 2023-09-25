import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listing/ListingCard";
import getListing,{
  IListingsParams
} from "@/lib/getListing";
import getUser from "@/lib/getUser";
import Image from "next/image";

interface HomeProps {
  searchParams: IListingsParams
};



export default async function Home({ searchParams }: HomeProps) {

  const currentUser = await getUser();
  const listings = await getListing(searchParams);

  
  if(listings.length === 0){
    return <EmptyState showReset/>
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
      </div>
    </Container>
  );
}
