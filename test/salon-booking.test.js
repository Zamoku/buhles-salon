// import assert from 'assert';
const assert = require('assert')
// import SalonBooking from '../salon-booking.js';
const SalonBooking = require('../salon-booking')
// import pgPromise from 'pg-promise';
const pgPromise = require('pg-promise')

// TODO configure this to work.
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://zamoe:zamo123@localhost:5432/salon_test";

const config = { 
	connectionString : DATABASE_URL
}

const pgp = pgPromise();
const db = pgp(config);

let booking = SalonBooking(db);

describe("The Booking Salon", function () {

    beforeEach(async function () {

        await db.none(`delete from booking`);

    });

    it("should be able to list treatments", async function () {

        const treatments = await booking.findAllTreatments();
        assert.deepEqual([
            {
              code: 'brl',
              id: 4,
              price: 'R240',
              type: 'Brows & Lashes'
            },
            {
              code: 'mkp',
              id: 3,
              price: 'R185',
              type: 'Make up'
            },
            {
              code: 'mnc',
              id: 2,
              price: 'R215',
              type: 'Manicure'
            },
            {
              code: 'pdc',
              id: 1,
              price: 'R175',
              type: 'Pedicure'
            }
          ], treatments);
    });

    it("should be able to find a stylist", async function () {

        const stylist = await booking.findStylist('078-5659-563');
        assert.deepEqual({
          commission_percentage: 0.3,
          first_name: 'Sesethu',
          id: 1,
          last_name: 'Malgas',
          phone_number: '078-5659-563'
        }, stylist);
    });

    it("should be able to allow a client to make a booking", async function () {
        const client = await booking.findClient("084-6327-636");
        const treatment = await booking.findTreatment('mnc');
        const stylist = await booking.findStylist('078-5659-563')

        const mBookings = await booking.makeBooking(client.id ,treatment.id, stylist.id,'2022-02-25', '19:00');

        const bookings = await booking.findClientBookings(client.id);
        assert.deepEqual([{
          booking_time: '19:00:00',
          first_name: 'Sesethu',
          to_char: '2022-02-25',
          type: 'Manicure'
        },
        {
          booking_time: '19:00:00',
          first_name: 'Grace',
          to_char: '2022-02-25',
          type: 'Manicure'
        },
        {
          booking_time: '19:00:00',
          first_name: 'Rose',
          to_char: '2022-02-25',
          type: 'Manicure'
        }], bookings);
    });

    // it("should be able to get client booking(s)", async function () {

    //     const client1 = await booking.findClient("081-2389-8914");
    //     const client2 = await booking.findClient("021-456-9636");
        
    //     const treatment1 = await booking.findTreatment("pdc");
    //     const treatment2 = await booking.findTreatment("mnc");

    //     await booking.booking(treatment1.id, client1.id, date, time);
    //     await booking.booking(treatment2.id, client1.id, date, time);
    //     await booking.booking(treatment1.id, client2.id, date, time);

    //     const bookings = await booking.findAllBookings(client);

    //     assert.equal([], clientBooking)
    // })

    // it("should be able to get bookings for a date", async function () {
    //     const client1 = await booking.findClient("081-2389-8914");
    //     const client2 = await booking.findClient("021-456-9636");

    //     const treatment1 = await booking.findTreatment("pdc");
    //     const treatment2 = await booking.findTreatment("mnc");

    //     await booking.booking(treatment1.id, client1.id, date, time);
    //     await booking.booking(treatment2.id, client1.id, date, time);
    //     await booking.booking(treatment3.id, client2.id, date, time);

    //     const bookings = await booking.findAllBookings({date, time});

    //     assert.equal([], bookings);

    // });

    // it("should be able to find the total income for a day", function() {
    //     assert.equal(1, 2);
    // })

    // it("should be able to find the most valuable client", function() {
    //     assert.equal(1, 2);
    // })
    // it("should be able to find the total commission for a given stylist", function() {
    //     assert.equal(1, 2);
    // })

    after(function () {
        db.$pool.end()
    });

});