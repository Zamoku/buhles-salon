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

-- Add insert scripts here

INSERT INTO client (first_name, last_name, phone_number) values
('Nomzamo', 'Muleka', '084-6327-636'), 
('Zandile', 'Mjoli', '081-2389-8914'), 
('Zamo', 'Booi', '021-456-9636'), 
('Vuyokazi', 'Humata', '087-636-7895'),
('Yamkela', 'Dayimani', '082-616-2195'),
('Sinazo', 'Mdlalo', '083-325-6315'),
('Kairo', 'Yepe', '086-123-6345');
INSERT INTO treatment(type, code, price) values ('Pedicure', 'pdc', 'R175'), ('Manicure', 'mnc', 'R215'), ('Make up', 'mkp', 'R185'),('Brows & Lashes', 'brl', 'R240');
INSERT INTO stylist (first_name, last_name,phone_number, commission_percentage) values ('Sesethu', 'Malgas', '078-5659-563', '0.30'), ('Grace', 'Plaatjies', '082-6369-789', '0.20'), ('Rose', 'Freemode', '073-6455-3389','0.15');

Update treatment set price = '175' where id = 1;
Update treatment set price = '215' where id = 2;
Update treatment set price = '185' where id = 3;
Update treatment set price = '240' where id = 4;

ALTER TABLE treatment ALTER COLUMN price TYPE integer USING (price::integer);


/**Grant scripts**/
-- grant all privileges on table client to zamoe;
-- grant all privileges on table treatment to zamoe;
-- grant all privileges on table stylist to zamoe;
-- grant all privileges on table booking to zamoe;

-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public to zamoe;
-- GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public to zamoe;

-- Table create scripts here


