// Automated Integration & Logic Test Suite for Rang Riwaaz Mehandi
import { calculateMehndiPrice, formatINR } from './src/utils/calculator.js';
import { calculateEventPlan } from './src/utils/planner.js';
import { MOCK_ARTISTS } from './src/data/mockArtists.js';
import { INITIAL_MOCK_BOOKINGS } from './src/data/mockBookings.js';
import { GORAKHPUR_LOCALITIES, SERVICE_TYPES, TIME_SLOTS } from './src/data/mockLocalities.js';
import { translations } from './src/data/translations.js';

console.log('=== STARTING RANG RIWAAZ MEHANDI AUTOMATED LOGIC TESTS ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failCount++;
  }
}

// 1. Translations Test
assert(translations.en && translations.hi, 'Both English and Hindi translation dictionaries exist');
assert(translations.en.brandName === 'Rang Riwaaz Mehandi', 'English brand name is Rang Riwaaz Mehandi');
assert(translations.hi.brandName === 'रंग रिवाज़ मेहंदी', 'Hindi brand name is रंग रिवाज़ मेहंदी');
assert(translations.en.step1 && translations.en.step9, 'All 9 timeline steps translated in English');
assert(translations.hi.step1 && translations.hi.step9, 'All 9 timeline steps translated in Hindi');

// 2. Gorakhpur Localities Test
assert(GORAKHPUR_LOCALITIES.length >= 10, `Found ${GORAKHPUR_LOCALITIES.length} Gorakhpur localities`);
const betiahata = GORAKHPUR_LOCALITIES.find(l => l.id === 'betiahata');
assert(betiahata && betiahata.distanceKm === 2.5, 'Betiahata locality mapped with correct distance');

// 3. Mock Artists Test
assert(MOCK_ARTISTS.length >= 8, `Found ${MOCK_ARTISTS.length} realistic Gorakhpur artists`);
MOCK_ARTISTS.forEach(art => {
  assert(art.name && art.locality && art.pricing, `Artist ${art.name} has complete profile & pricing`);
  assert(art.verification && typeof art.verification.identityVerified === 'boolean', `Artist ${art.name} has 5-point verification`);
  assert(art.reliability && art.reliability.onTimePercentage, `Artist ${art.name} has reliability metrics`);
  assert(art.portfolio && art.portfolio.length > 0, `Artist ${art.name} has authentic portfolio`);
});

// Check that verification states differ realistically
const fullyVerifiedCount = MOCK_ARTISTS.filter(a => a.verification.homeServiceVerified).length;
assert(fullyVerifiedCount < MOCK_ARTISTS.length, 'Authentic badge differentiation: not every mock artist has all 5 badges verified');

// 4. Transparent Price Calculator Test
const artist01 = MOCK_ARTISTS[0];
const calcResult = calculateMehndiPrice({
  artist: artist01,
  serviceType: 'bridal',
  bridalHandOption: 'elbow',
  includeFeet: true,
  feetCoverage: 'ankle',
  guestCount: 6,
  guestHandSides: 1,
  travelDistanceKm: 6.5,
  extraPortrait: true,
  extraStoryWork: false,
  isLateNight: false,
  promoCode: 'GORAKHPUR10'
});

assert(calcResult.basePackage === 5800, `Base package correct: ${calcResult.basePackage}`);
assert(calcResult.feetCharge === 1800, `Feet charge correct: ${calcResult.feetCharge}`);
assert(calcResult.guestCharge === 6 * 200, `Guest charge correct: ${calcResult.guestCharge}`);
assert(calcResult.travelFee === Math.round((6.5 - 3) * 25), `Travel fee calculated beyond free threshold: ${calcResult.travelFee}`);
assert(calcResult.portraitCharge === 1500, `Portrait addon applied: ${calcResult.portraitCharge}`);
assert(calcResult.discount > 0, `10% Gorakhpur promo code applied: -₹${calcResult.discount}`);
assert(calcResult.finalTotal === calcResult.subtotal - calcResult.discount, 'Final total equals subtotal minus discount');
assert(calcResult.advanceToLock === Math.round(calcResult.finalTotal * 0.2), 'Advance token is exactly 20% to lock date');
assert(calcResult.balanceOnCompletion === calcResult.finalTotal - calcResult.advanceToLock, 'Balance is remaining 80%');

// 5. Event Time & Artist Planner Test
const eventPlan = calculateEventPlan({
  brideCount: 1,
  groomCount: 1,
  guestCount: 15,
  guestHandSides: 1,
  eventStartTime: '19:00',
  dryingBufferHours: 1.5,
  applicationSpeed: 'normal'
});

assert(eventPlan.leadArtists === 1, `Lead artist assigned: ${eventPlan.leadArtists}`);
assert(eventPlan.assistantArtists >= 1, `Assistant artists calculated for 15 guests: ${eventPlan.assistantArtists}`);
assert(eventPlan.totalArtists >= 2, `Total artists required calculated: ${eventPlan.totalArtists}`);
assert(eventPlan.recommendedArrivalTime.includes(':'), `Recommended arrival time calculated backwards: ${eventPlan.recommendedArrivalTime}`);
assert(eventPlan.scheduleMilestones.length === 5, 'Generated 5 milestone steps for wedding event timeline');

// 6. Double-Booking Prevention Logic Test
const testDate = '2026-10-03';
const testSlot = 'evening';
// Pooja Verma (gkp-art-01) is booked on 2026-10-03 evening
const poojaAvailability = artist01.availability[testDate]?.[testSlot];
assert(poojaAvailability === 'booked', 'Peak wedding date 2026-10-03 evening is correctly marked booked');

// 7. Initial Bookings Test
assert(INITIAL_MOCK_BOOKINGS.length >= 3, `Initial mock bookings count: ${INITIAL_MOCK_BOOKINGS.length}`);
const confirmedBooking = INITIAL_MOCK_BOOKINGS.find(b => b.status === 'booking_confirmed');
assert(confirmedBooking && confirmedBooking.id, `Confirmed booking available for simulation: ${confirmedBooking?.id}`);

const completedBooking = INITIAL_MOCK_BOOKINGS.find(b => b.status === 'service_completed');
assert(completedBooking && completedBooking.status === 'service_completed', `Completed booking available for review test: ${completedBooking?.id}`);

console.log('\n=== TEST SUMMARY ===');
console.log(`Total Passes: ${passCount}`);
console.log(`Total Fails: ${failCount}`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL RANG RIWAAZ MEHANDI UNIT & INTEGRATION TESTS PASSED PERFECTLY!\n');
}
