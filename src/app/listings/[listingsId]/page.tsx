import getUser from "@/lib/getUser";
import getListingById from "@/lib/getListingById";

import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listing/ListingClient";
import getReservations from "@/lib/getReservation";

type Props = {
  params: {
    listingsId?: string;
  };
};

const ListingPage = async ({ params: { listingsId } }: Props) => {

  const param = { listingsId }

  const listing = await getListingById(listingsId);
  const reservations = await getReservations(param);
  const currentUser = await getUser();

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>;
};

export default ListingPage;
