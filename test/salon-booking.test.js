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

    it("should be able to get client by phone number", async function () {

      const client = await booking.findClient("081-2389-8914");
      assert.deepEqual({
        first_name: 'Zandile',
        id: 2,
        last_name: 'Mjoli',
        phone_number: '081-2389-8914'
      },client);
  });

  it("should be able to get treatment by code", async function () {

    const treatment = await booking.findTreatment("mkp");
    assert.deepEqual({
      code: 'mkp',
      id: 3,
      price: 185,
      type: 'Make up'
    },treatment);
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


    it("should be able to list treatments", async function () {

        const treatments = await booking.findAllTreatments();
        assert.deepEqual([{
          code: 'brl',
          id: 4,
          price: 240,
          type: 'Brows & Lashes'
        },
        {
          code: 'mkp',
          id: 3,
          price: 185,
          type: 'Make up'
        },
        {
          code: 'mnc',
          id: 2,
          price: 215,
          type: 'Manicure'
        },
        {
          code: 'pdc',
          id: 1,
          price: 175,
          type: 'Pedicure'
        }], treatments);
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
          booking_date: '2022-02-25',
          type: 'Manicure'
        },
        {
          booking_time: '19:00:00',
          first_name: 'Grace',
          booking_date: '2022-02-25',
          type: 'Manicure'
        },
        {
          booking_time: '19:00:00',
          first_name: 'Rose',
          booking_date: '2022-02-25',
          type: 'Manicure'
        }], bookings);
    });

    it("should be able to get client booking(s)", async function () {

        const client1 = await booking.findClient("081-2389-8914");
        const client2 = await booking.findClient("021-456-9636");
        
        const treatment1 = await booking.findTreatment("pdc");
        const treatment2 = await booking.findTreatment("mnc");

        const stylist1 = await booking.findStylist('078-5659-563')
        const stylist2 = await booking.findStylist('082-6369-789')

        await booking.makeBooking(treatment1.id, client1.id, stylist1.id, '2022-03-12', '14:00');
        await booking.makeBooking(treatment2.id, client1.id, stylist1.id, '2022-03-10', '12:00');
        await booking.makeBooking(treatment1.id, client2.id, stylist2.id, '2022-03-11', '13:00');

        const clientBooking = await booking.findAllBookings("2022-03-12");

        assert.deepEqual([{
          booking_date: '2022-03-12',
          booking_time: '14:00:00',
          first_name: 'Sesethu',
          type: 'Manicure'
        },
        {
          booking_date: '2022-03-12',
          booking_time: '14:00:00',
          first_name: 'Grace',
          type: 'Manicure'
        },
        {
          booking_date: '2022-03-12',
          booking_time: '14:00:00',
          first_name: 'Rose',
          type: 'Manicure'
        }], clientBooking)
    })

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

    it("should be able to find the total income for a day", async function() {

      const client1 = await booking.findClient("081-2389-8914");
      const client2 = await booking.findClient("021-456-9636");
      
      const treatment1 = await booking.findTreatment("pdc");
      const treatment2 = await booking.findTreatment("mnc");

      const stylist1 = await booking.findStylist('078-5659-563')
      const stylist2 = await booking.findStylist('082-6369-789')

      await booking.makeBooking(treatment1.id, client1.id, stylist1.id, '2022-03-12', '14:00');
      await booking.makeBooking(treatment2.id, client1.id, stylist1.id, '2022-03-10', '12:00');
      await booking.makeBooking(treatment1.id, client2.id, stylist2.id, '2022-03-11', '13:00');


      const sumIncome = await booking.totalIncomeForDay('2022-03-11')

      assert.deepEqual([{
        first_name: 'Nomzamo',
        sum: '555'
      }], sumIncome);
    })

    it("should be able to find the most valuable client", async function() {

      const client1 = await booking.findClient("081-2389-8914");
      const client2 = await booking.findClient("021-456-9636");
      
      const treatment1 = await booking.findTreatment("pdc");
      const treatment2 = await booking.findTreatment("mnc");

      const stylist1 = await booking.findStylist('078-5659-563')
      const stylist2 = await booking.findStylist('082-6369-789')

      await booking.makeBooking(treatment1.id, client1.id, stylist1.id, '2022-03-12', '14:00');
      await booking.makeBooking(treatment2.id, client1.id, stylist1.id, '2022-03-10', '12:00');
      await booking.makeBooking(treatment1.id, client2.id, stylist2.id, '2022-03-11', '13:00');


      const mostValuableClient = await booking.mostValuebleClient()

      assert.deepEqual([{
        first_name: 'Nomzamo',
        max: 215
      },
      {
        first_name: 'Zandile',
        max: 215
      }], mostValuableClient);

    })


    // it("should be able to find the total commission for a given stylist", function() {
    //     assert.equal(1, 2);
    // })

    after(function () {
        db.$pool.end()
    });

});