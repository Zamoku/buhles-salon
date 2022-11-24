# Buhles salon

Buhle has started a salon in her local shopping centre and needs a system to keep track of her business. The salon currently offers 4 different treatments `Pedicures`, `Manicures`, `Make up` & `Brows & Lashes`.

All stylists can do all treatments.

The treatment prices are as follows.

Treatment type   | Price  
-------------  | ------
`Pedicure`      |  R175 
`Manicure` 	    |  R215
`Make up ` 	     |  R185.00 
`Brows & Lashes` | 	 R240.00

Create a Factory Function and a PostgreSQL database that will help her keep track of treatment bookings.

> **Please:** read all the instructions thoroughly before you start to do any work.

## Factory Function

Create a Factory Function called `SalonBooking` with the following methods:

Method name            | Description   
------------------------ | ---------------
`findStylist(phoneNumber)` 		 | Find all data for stylist by their phone number  
`findClient(phoneNumber)` | Find all data for client by their phone number
`findTreatment(phoneNumber)` | Find a treatment by it's short code
`findAllTreatments()` 		     |  Return all the treatments offered
`makeBooking(clientId, treatmentId, stylistId, date, time)` |  Allow a client to make a booking - a booking require a clientId, treatmentId, date & a time. Only 2 bookings max for a treatmentId in a given timeslot & date combination is allowed. Ensure a stylist is not double booked for the the same date & time combination. Booking logic can get very complicated. Lets not go there for now. Focus on the supplied booking rules. 
`findAllBookings(date)` |  Find all the bookings that were made for a given date
`findClientBookings(clientId)`  |  Find all the bookings for a client - use clientId as lookup
`findStylistsForTreatment(treatmentId)` | Find all the stylists that ever given this treatment, the booking table is central to this method. 
`findAllBookings({date, time})` |   Find all the booking made for a specific date & time combination - if only date or time is specified query for only date or time which ever one is specified. If both is specified query for both if no variables are specified return all bookings
`totalIncomeForDay(date)` | find the total income for the day specified.
`mostValuebleClient()` | find the client that spend the most money at the salon so far
`totalCommission(date, stylistId)`| calculate the total commission for a given date & stylist

**Note:** you can add extra Factory Function methods to support the above factory functions if needed.

## Tables to create

Create these 4 tables: 

* client, 
* treatment, 
* booking 
* stylist 

## Table structure

All tables have an `id` as primary key

* client 
   - `first_name`
   - `last_name`
   - `phone_number`

* treatment 
    - `type` - treatment name
    - `code` - short three letter code for each treatment
    - `price`

* booking  
    - `booking_date`  -> use `date` type
    - `booking_time`  -> use `time` type
    - `client_id`  -> this is a fk (foreign key)
    - `treatment_id` -> this is a fk   
    - `stylist_id` -> this is a fk

* stylist 
    - `first_name`
    - `last_name`
    - `phone_number`
    - `commission_percentage` -> use numeric (3,2)

The stylist commission is stored as a decimal amount like `0.15` for `15%` and `0.17` for `17%`.

The `booking` table brings `client`, `treatment` and `stylist` tables together.

Create sql scripts to pre-populate the `client`, `treatment` & `stylist` tables. 

* Add the 4 treatments - use the price chart above.
* Add at least 7 clients.
* Add 3 or more stylists - the stylist commission is between `7%` and `20%`.

## Using day & date columns

PostgreSQL has special `date` and `time` field types. Use them for the `booking_date` and `booking_time` columns in the `booking` table.

To create a table that has a `date` and `time` slot do something like this:

```sql
create table date_test ( the_date date,  slot time  );
```

To insert data into these columns:

```sql
insert into date_test (the_date, slot) values ('2022-02-27', '07:00');
```

Note that date columns use a format of `yyyy-mm-dd` and time columns use a format of `2 number colon 2 numbers` like this `08:00` or `9:15`.

The query on date & time fields use queries like this:

```sql
select * from date_test where the slot > '06:00';
select * from date_test where the slot = '07:00';
```

```sql
select * from test where the the_date > '2022-02-26' and slot = '07:00';
```

You can use `>`, `<` and `=` signs for date and time queries.

You can learn more about date & time at the links below, but this is more than what you would need to complete this assessment:

* https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-time/
* https://www.prisma.io/dataguide/postgresql/date-types
* https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-date/

## Factory function setup

We made a start for you by creating the `salon-booking.js` factory function file with some tests in `salon-booking.test.js`.

Implement tests for all the above functions and setup a PostgeSQL in `salon-booking.test.js` use the appropriate parameters and return data. 

The tests are: 

* not setup using specific data. 
* purely illustrative - you should change the test code to ensure the factory function is tested appropriately

You need to make sure each test tests the appropriate function. More tests might be needed.

Ensure the tests are running in **GitHub actions**.

Add all your sql scripts to a `sql` folder.

## Workflow

Fork & clone this repository.

To get goinf do an `npm install`.

To run the tests use `npm test`.

Do some proper planning to make sure you understand what is required. Clarify your understanding with the mentors please. 
Ask for clarification if something is not clear to you.

A Feedback system link will be provided for you to share your work.

Add a link to your kanban board in the `readme.md` file below.

## Planning links

**Todo** Add links to you planning here.
https://kanbanflow.com/board/bkmz3hx