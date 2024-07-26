export default function isGuestInRSVPs(guestName, rsvps) {
  for (const rsvp of rsvps) {
    const {
      name,
      partnerName,
      member1,
      member2,
      member3,
      member4,
      member5,
      member6,
      member7,
      rsvp: rsvpStatus,
    } = rsvp;

    const guestNames = [
      name,
      partnerName,
      member1,
      member2,
      member3,
      member4,
      member5,
      member6,
      member7,
    ].filter((memberName) => memberName);

    if (
      guestNames.some(
        (memberName) => memberName.toLowerCase() === guestName.toLowerCase()
      )
    ) {
      return rsvpStatus ? true : false;
    }
  }

  return "N/A";
}
