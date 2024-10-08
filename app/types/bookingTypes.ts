export type Booking = {
    id: string,
    guestId: string,
    startDate: string,
    endDate: string,
    numNights: string,
    totalPrice: string,
    numGuests: number,
    status: string,
    created_at: string,
    cabins: {name: string, image: string}
  }