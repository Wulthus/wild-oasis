import { eachDayOfInterval } from 'date-fns';
import { database } from "./database-config";

//-----------------------------------------------------GET SINLGE CABIN

export async function getCabin(id: number) {
  const { data, error } = await database
    .from('Cabins')
    .select('*')
    .eq('id', id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
  }

  return data;
}

//----------------------------------------------------------GET CABIN PRICE

export async function getCabinPrice(id: number) {
  const { data, error } = await database
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

//----------------------------------------------------------GET MULTPLE CABINS

export const getCabins = async function () {
  const { data, error } = await database
    .from('Cabins')
    .select('id, name, num_Bedrooms, base_price, discount, picture')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

//----------------------------------------------------------GET GUEST

export async function getGuest(email) {
  const { data, error } = await database
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

//----------------------------------------------------------GET SINGLE BOOKING

export async function getBooking(id) {
  const { data, error, count } = await database
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data;
}

//----------------------------------------------------------GET MULTIPLE BOOKINGS

export async function getBookings(guestId) {
  const { data, error, count } = await database
    .from('bookings')
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)'
    )
    .eq('guestId', guestId)
    .order('startDate');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

//----------------------------------------------------------GET BOOKING DATES BY CABIN ID

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await database
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

//----------------------------------------------------------GET SETTINGS

export async function getSettings() {
  const { data, error } = await database.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

//----------------------------------------------------------GET COUNTRIES

export async function getCountries() {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

//----------------------------------------------------------CREATE NEW GUEST

export async function createGuest(newGuest) {
  const { data, error } = await database.from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await database
    .from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}

//-----------------------------------------------------------------------------UPDATE GUEST

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await database
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data;
}

//----------------------------------------------------------UPDATE BOOKING

export async function updateBooking(id, updatedFields) {
  const { data, error } = await database
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

//----------------------------------------------------------DELETE BOOKING

export async function deleteBooking(id) {
  const { data, error } = await database.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
