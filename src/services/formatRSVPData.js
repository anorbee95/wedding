export default function formatRSVPData(guest) {
  if (guest.guests === "solo") {
    return [{
      name: guest.name,
      email: guest.email,
      mealPreferences: guest.mealPreferences,
      guests: guest.guests,
      accomodation: guest.accomodation,
      rsvp: guest.rsvp,
    }];
  } else if (guest.guests === "partner") {
    return [
      {
        name: guest.name,
        email: guest.email,
        mealPreferences: guest.mealPreferences,
        guests: guest.guests,
        accomodation: guest.accomodation,
        rsvp: guest.rsvp,
        with: [guest.partnerName],
      },
      {
        name: guest.partnerName,
        email: guest.email,
        mealPreferences: guest.partnerMealPreferences,
        guests: guest.guests,
        accomodation: guest.accomodation,
        rsvp: guest.rsvp,
        with: [guest.name],
      },
    ];
  } else if (guest.guests === "family") {
    const familyMembers = [
      guest.member1,
      guest.member2,
      guest.member3,
      guest.member4,
      guest.member5,
      guest.member6,
      guest.member7,
    ].filter((member) => member);

    const memberDetails = familyMembers.map((member, index) => ({
      name: member,
      email: guest.email,
      mealPreferences: guest[`mealPref${index + 1}`] || [],
      guests: guest.guests,
      accomodation: guest.accomodation,
      rsvp: guest.rsvp,
      with: [...familyMembers.filter((m) => m !== member), guest.name],
    }));

    return [...memberDetails, {
      name: guest.name,
      email: guest.email,
      mealPreferences: guest.mealPreferences,
      guests: guest.guests,
      accomodation: guest.accomodation,
      rsvp: guest.rsvp,
      with: familyMembers,
    },];
  } else {
    throw new Error("Hibás kitöltés!");
  }
}
