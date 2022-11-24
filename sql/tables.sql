-- Table create scripts here

CREATE TABLE IF NOT EXISTS client (

    id serial not null primary key,
	first_name text not null,
    last_name text not null,
    phone_number varchar(255) not null

);

CREATE TABLE IF NOT EXISTS treatment(

    id serial not null primary key,
    type text not null,
    code text not null,
    price varchar(255) not null

);

CREATE TABLE IF NOT EXISTS stylist(

    id serial not null primary key,
    first_name text not null,
    last_name text not null,
    phone_number varchar(255) not null,
    commission_percentage float not null

);
CREATE TABLE IF NOT EXISTS booking(

    id serial not null primary key,
    booking_date date,
    booking_time time,
    client_id int not null,
    treatment_id int not null,
    stylist_id int not null,
    foreign key (client_id) references client(id),
    foreign key (treatment_id) references treatment(id),
    foreign key (stylist_id) references stylist(id)

);


