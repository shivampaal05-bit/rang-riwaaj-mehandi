// Event Time & Artist Capacity Planner for MehndiConnect Gorakhpur

export function calculateEventPlan({
  brideCount = 1,
  groomCount = 1,
  guestCount = 10,
  guestHandSides = 1,
  eventStartTime = '18:00', // 24hr format 'HH:MM', e.g. 6:00 PM
  dryingBufferHours = 1.5, // buffer for drying, lemon-sugar mixture, clove fume
  applicationSpeed = 'normal' // 'intricate' | 'normal' | 'fast'
}) {
  const speedMultipliers = {
    intricate: 1.25,
    normal: 1.0,
    fast: 0.8
  };
  const mult = speedMultipliers[applicationSpeed] || 1.0;

  // Duration in hours
  const bridalDurationHours = brideCount > 0 ? (4.5 * mult) : 0;
  const groomDurationHours = groomCount > 0 ? (0.75 * mult) : 0;
  
  // Total guest sides (e.g., 10 guests * 1 side = 10 sides)
  const totalGuestSides = guestCount * guestHandSides;
  // 1 artist can comfortably do 4 sides per hour with clean finish
  const guestWorkloadHoursTotal = (totalGuestSides / 4) * mult;

  // Calculating Artists Required
  // If bride is present, 1 lead artist is dedicated to the bride
  let leadArtists = brideCount > 0 ? 1 : 0;
  let assistantArtists = 0;

  if (totalGuestSides > 0) {
    if (leadArtists === 1) {
      // Lead artist does bride. Assistant artists handle guests and groom.
      // Target guest completion window: 3 to 4 hours max before party peak
      assistantArtists = Math.max(1, Math.ceil(guestWorkloadHoursTotal / 3.5));
    } else {
      // Only guests and groom
      const totalHours = guestWorkloadHoursTotal + groomDurationHours;
      const totalArtistsNeeded = Math.max(1, Math.ceil(totalHours / 3.5));
      leadArtists = 1;
      assistantArtists = totalArtistsNeeded - 1;
    }
  } else if (leadArtists === 0 && groomCount > 0) {
    leadArtists = 1;
  }

  const totalArtists = leadArtists + assistantArtists;

  // Actual event session duration when artists work simultaneously
  // Lead artist does Bride (4.5h), Groom can be done simultaneously by assistant or lead
  const guestHoursWithTeam = assistantArtists > 0 
    ? (guestWorkloadHoursTotal / assistantArtists) 
    : (guestWorkloadHoursTotal);

  const effectiveDurationHours = Math.max(bridalDurationHours, guestHoursWithTeam, groomDurationHours);
  // Round to nearest 0.5 hour
  const roundedDurationHours = Math.ceil(effectiveDurationHours * 2) / 2;

  // Recommended Arrival Time calculation
  // [Event Start] - [Duration] - [Drying Buffer] = [Arrival Time]
  const [startH, startM] = eventStartTime.split(':').map(Number);
  const totalPrepMinutes = Math.round((roundedDurationHours + dryingBufferHours) * 60);
  
  const startTotalMinutes = (startH * 60) + startM;
  let arrivalTotalMinutes = startTotalMinutes - totalPrepMinutes;
  
  // Handle morning/previous midnight boundary
  if (arrivalTotalMinutes < 0) {
    arrivalTotalMinutes += 24 * 60;
  }

  const arrivalH = Math.floor(arrivalTotalMinutes / 60) % 24;
  const arrivalM = arrivalTotalMinutes % 60;

  const formatTime = (h, m) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m.toString().padStart(2, '0');
    return `${displayH}:${displayM} ${period}`;
  };

  const recommendedArrivalTime = formatTime(arrivalH, arrivalM);
  const formattedEventStartTime = formatTime(startH, startM);

  // Drying and Stage Ready Time
  const readyTotalMinutes = (arrivalTotalMinutes + Math.round(roundedDurationHours * 60)) % (24 * 60);
  const readyH = Math.floor(readyTotalMinutes / 60);
  const readyM = readyTotalMinutes % 60;
  const completionTime = formatTime(readyH, readyM);

  // Timeline Milestones
  const scheduleMilestones = [
    {
      time: recommendedArrivalTime,
      title: 'Artist Arrival & Setup',
      hindiTitle: 'कलाकार आगमन व किट तैयारी',
      description: 'Artists unpack sanitized kits, organic cones, and seat bride comfortably with lighting.'
    },
    {
      time: formatTime((arrivalH + 0.5) % 24, (arrivalM) % 60),
      title: 'Bridal Henna Begins & Guest Station Starts',
      hindiTitle: 'दुल्हन मेहंदी व परिवार मेहंदी स्टेशन प्रारंभ',
      description: `Lead artist begins bride's intricate palms; ${assistantArtists} assistant(s) open guest counter.`
    },
    {
      time: formatTime((arrivalH + Math.floor(roundedDurationHours * 0.6)) % 24, (arrivalM) % 60),
      title: 'Bridal Feet Application & Family Midway',
      hindiTitle: 'दुल्हन पद मेहंदी व मेहमान मेहंदी मध्य चरण',
      description: 'Bride hands drying; feet application proceeds while guests enjoy sangeet snacks.'
    },
    {
      time: completionTime,
      title: 'Mehndi Application Complete & Natural Sealer',
      hindiTitle: 'मेहंदी पूर्ण व नींबू-लौंग प्राकृतिक सीलर',
      description: 'Application finishes. Lemon-sugar solution applied with clove steam for deep dark stain.'
    },
    {
      time: formattedEventStartTime,
      title: 'Event Starts & Stage Entry (Flawless & Dry)',
      hindiTitle: 'समारोह प्रारंभ व स्टेज एंट्री (सूखी व सुरक्षित मेहंदी)',
      description: 'Henna completely dried without smudging! Bride and family ready for dance & stage photos.'
    }
  ];

  return {
    brideCount,
    groomCount,
    guestCount,
    guestHandSides,
    totalGuestSides,
    leadArtists,
    assistantArtists,
    totalArtists,
    estimatedDurationHours: roundedDurationHours,
    dryingBufferHours,
    recommendedArrivalTime,
    completionTime,
    formattedEventStartTime,
    scheduleMilestones
  };
}
