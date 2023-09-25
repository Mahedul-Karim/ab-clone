
import EmptyState from "@/components/EmptyState";


import getUser from "@/lib/getUser";
import getReservations from '@/lib/getReservation';

import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getUser();

  if (!currentUser) {
    return (
      
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />
      
    );
  }

  return (
    
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    
  );
}
 
export default TripsPage;