export default function isGuestInRSVPs(guestName, rsvps) {
  for (const rsvp of rsvps) {
    if (rsvp.name.toLowerCase() === guestName.toLowerCase()) {
      return rsvp.rsvp ? true : false;
    }
  }
  return "N/A";
}
