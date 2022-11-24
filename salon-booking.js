 module.exports = function salonBooking(db) {

        // Find all data for stylist by their phone number
        async function findStylist(phoneNumber){

            const getStylist = await db.oneOrNone('Select * from stylist where phone_number = $1', [phoneNumber])
            return getStylist
        }

        //Find all data for client by their phone number
        async function findClient(phoneNumber){
            const getClient = await db.oneOrNone('Select * from client where phone_number = $1', [phoneNumber])
            return getClient
        }

        //Find a treatment by it's short code
        async function findTreatment(code){
            const getTreatment = await db.oneOrNone('Select * from treatment where code = $1',[code])
            return getTreatment
        }

        //Return all the treatments offered
        async function findAllTreatments(){
           const getAllTreatment = await db.manyOrNone('Select * from treatment order by type asc')
           return getAllTreatment
        }

        async function makeBooking(clientId, treatmentId, stylistId, date, time){
            // getClient = await db.oneOrNone('Select id from client where ')
            await db.none('Insert into booking(client_id, treatment_id, stylist_id, booking_date, booking_time) values($1, $2, $3, $4, $5)', 
            [clientId, treatmentId, stylistId, date, time])
        }
        //Find all the bookings that were made for a given date
        async function findAllBookings(date){
            const getBookings = await db.manyOrNone(`Select client.first_name, TO_CHAR(booking.booking_date, 'YYYY-MM-DD') as booking_date, booking.booking_time, treatment.type, 
            stylist.first_name from booking join client on client.id = booking.client_id join treatment on treatment.id = booking.treatment_id join stylist on 
            treatment.id = booking.treatment_id where booking_date = $1`, [date])

       

            return getBookings
        }

        //Find all the bookings for a client - use clientId as lookup
        async function findClientBookings(clientId)	{

            const getClientBookings = await db.manyOrNone(`Select client.first_name, TO_CHAR(booking.booking_date, 'YYYY-MM-DD') As booking_date, booking.booking_time, treatment.type, 
            stylist.first_name from booking join client on client.id = booking.client_id join treatment on treatment.id = booking.treatment_id join stylist on 
            treatment.id = booking.treatment_id where client.id = $1`, [clientId])

            return getClientBookings
        }

        //Find all the stylists that ever given this treatment, the booking table is central to this method.
        async function findStylistsForTreatment(treatmentId){
            const getStylistTreatm = await db.manyOrNone('Select * from booking where treatment_id = $1',[treatmentId])
            return getStylistTreatm

        }

        // async function findAllBookings({date, time}){
        //     // const getAllBookings = await db.manyOrNone('Select')

        // }

        //find the total income for the day specified.
        async function totalIncomeForDay(date){
            const getTotalIncome = await db.manyOrNone(`Select client.first_name, SUM(treatment.price) 
             from booking join client on client.id = booking.client_id join treatment on treatment.id = booking.treatment_id join stylist on 
             treatment.id = booking.treatment_id where booking_date = $1 group by client.first_name`, [date])

            return getTotalIncome
        }

        //find the client that spend the most money at the salon so far
        async function mostValuebleClient()	{
             const getValuableClient = await db.manyOrNone(`Select client.first_name, MAX(treatment.price) 
             from booking join client on client.id = booking.client_id join treatment on treatment.id = booking.treatment_id join stylist on 
             treatment.id = booking.treatment_id group by client.first_name`)

             return getValuableClient
        }

        //calculate the total commission for a given date & stylist
        async function totalCommission(date, stylistId)	{

        }

    return {
        findStylist,
        findClient,
        findTreatment,
        findAllTreatments,
        makeBooking,
        findAllBookings,
        findClientBookings,
        findStylistsForTreatment,
        totalIncomeForDay,
        mostValuebleClient,
        totalCommission

    }
}  