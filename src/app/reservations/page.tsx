
import EmptyState from "@/components/EmptyState";

import getUser from "@/lib/getUser";
import getReservations from "@/lib/getReservation";

import ReservationsClient from "./ReservationClient";

const ReservationsPage = async () => {
  const currentUser = await getUser();

  if (!currentUser) {
    return (
     
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      
    );
  }

  return (
    
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
   
  );
}
 
export default ReservationsPage;