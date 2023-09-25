
import EmptyState from '@/components/EmptyState';


import getUser from '@/lib/getUser';
import getListings from '@/lib/getListing';

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      
    );
  }

  return (
    
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    
  );
}
 
export default PropertiesPage;