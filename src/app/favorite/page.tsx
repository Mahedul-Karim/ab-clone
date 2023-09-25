
import EmptyState from "@/components/EmptyState";

import getUser from "@/lib/getUser";
import getFavoriteListings from "@/lib/getFavorite";

import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getUser();

  if (listings.length === 0) {
    return (
      
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      
    );
  }

  return (
    
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
      />
    
  );
}
 
export default ListingPage;