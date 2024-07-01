export default function generateMessage(formData) {
  if (!formData.rsvp) {
    return "Sajnáljuk, hogy nem tudsz jönni, de köszönjük a visszajelzést.";
  }

  let message = "Nagyon örülünk, hogy ott ";
  if (formData.guests === "solo") {
    message +=
      "leszel velünk az esküvőnkön 2025 május 31-én, már alig várjuk, hogy együtt ünnepelhessünk.\n\n";
  } else if (formData.guests === "partner") {
    message +=
      "lesztek velünk az esküvőnkön 2025 május 31-én, már alig várjuk, hogy együtt ünnepelhessünk.\n\n";
  } else if (formData.guests === "family") {
    message +=
      "lesztek családostul velünk az esküvőnkön 2025 május 31-én, már alig várjuk, hogy együtt ünnepelhessünk.\n\n";
  }

  message += "Az alábbiakat már tudjuk is:\n\n";

  if (formData.guests === "solo" || formData.guests === "partner") {
    if (formData.mealPreferences.length > 0) {
      message +=
        "Ételpreferenciád a következők: " +
        formData.mealPreferences.join(", ") +
        ".\n";
    } else {
      message += "Ételpreferenciád: mindenevő :D\n\n";
    }
    message += formData.accomodation
      ? formData.guests === "solo"
        ? "Szállást szeretnél.\n"
        : "Szállást szeretnétek.\n"
      : "Szállást nem szeretnél.\n";

    if (formData.guests === "partner" && formData.partnerName) {
      message += "Partnered neve: " + formData.partnerName + ".\n";
      if (formData.partnerMealPreferences.length > 0) {
        message +=
          "Partnered ételpreferenciái: " +
          formData.partnerMealPreferences.join(", ") +
          ".\n";
      } else {
        message += "Partnered ételpreferenciája: mindenevő :D\n\n";
      }
    }
  }

  if (formData.guests === "family" && formData.numberOfFamilyMembers) {
    for (let i = 1; i <= formData.numberOfFamilyMembers; i++) {
      if (formData[`member${i}`]) {
        message += `${i}. családtag  neve: ${formData[`member${i}`]}.\n`;
        if (formData[`mealPref${i}`].length > 0) {
          message += `${i}. családtag  ételpreferenciái: ${formData[
            `mealPref${i}`
          ].join(", ")}.\n\n`;
        } else {
          message += `Családtag ${i} ételpreferenciája: mindenevő :D\n\n`;
        }
      }
    }
  }

  return message;
}
