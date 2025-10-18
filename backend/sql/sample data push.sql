USE `post_office_db`;

-- =========================================================
-- 1) CLEAN OUT ALL TABLES SAFELY
-- =========================================================
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE tracking_event;
TRUNCATE TABLE package;
TRUNCATE TABLE post_office_box;
TRUNCATE TABLE transaction;
TRUNCATE TABLE complaint;
TRUNCATE TABLE employee;
TRUNCATE TABLE post_office;
TRUNCATE TABLE customer;
TRUNCATE TABLE authentication;
TRUNCATE TABLE addresses;
TRUNCATE TABLE services;
TRUNCATE TABLE role;
TRUNCATE TABLE route_leg;
TRUNCATE TABLE account_type;
TRUNCATE TABLE sex;
TRUNCATE TABLE post_office_status;
TRUNCATE TABLE package_type;
TRUNCATE TABLE package_status;
TRUNCATE TABLE location_type;
TRUNCATE TABLE transport_type;
TRUNCATE TABLE event_status;
TRUNCATE TABLE shipping_option;
SET FOREIGN_KEY_CHECKS = 1;

-- =========================================================
-- 2) LOOKUP TABLES
-- =========================================================
INSERT INTO account_type (code) VALUES ('individual'), ('business'), ('prime');
INSERT INTO sex (code) VALUES ('male'), ('female'), ('other');
INSERT INTO post_office_status (code) VALUES ('active'), ('inactive');
INSERT INTO package_type (code) VALUES ('mail'), ('parcel'), ('money_order'), ('passport'), ('package');
INSERT INTO package_status (code) VALUES ('pending'), ('in_transit'), ('delivered'), ('delayed'), ('lost');
INSERT INTO location_type (code) VALUES ('warehouse'), ('post_office'), ('airport'), ('harbor');
INSERT INTO transport_type (code) VALUES ('car'), ('plane'), ('ship');
INSERT INTO event_status (code) VALUES ('delivered'), ('out_for_delivery'), ('ready_for_shipment'), ('on_time'), ('delayed');
INSERT INTO shipping_option (code) VALUES ('standard'), ('express');
INSERT INTO role (role) VALUES ('Manager'), ('Clerk'), ('Courier');

-- =========================================================
-- 3) AUTHENTICATION
-- =========================================================
INSERT INTO authentication (email, password, ssn, created_by, updated_by) VALUES
('john.doe@example.com', 'password123', '123-45-6789', 'system', 'system'),
('jane.smith@example.com', 'secret321', '987-65-4321', 'system', 'system'),
('alice.brown@example.com', 'deliverit', '555-11-2222', 'system', 'system');

-- =========================================================
-- 4) ADDRESSES
-- =========================================================
INSERT INTO addresses (street, secondary_unit, city, state, country, zip_code, created_by, updated_by) VALUES
('123 Main St', 'Apt 1', 'Austin', 'TX', 'USA', '78701', 'system', 'system'),
('456 Oak Ave', NULL, 'Houston', 'TX', 'USA', '77001', 'system', 'system'),
('789 Pine Rd', NULL, 'Dallas', 'TX', 'USA', '75201', 'system', 'system'),
('1 Postal Way', NULL, 'Austin', 'TX', 'USA', '78702', 'system', 'system');

-- =========================================================
-- 5) CUSTOMERS (lookup IDs; no hardcoding)
-- =========================================================
INSERT INTO customer (
  first_name, middle_name, last_name, phone_number, email,
  account_type_id, birth_date, created_by, updated_by, address_id, auth_id
) VALUES
(
  'John', NULL, 'Doe', '512-555-1111', 'john.doe@example.com',
  (SELECT account_type_id FROM account_type WHERE code='individual'),
  '1990-05-12', 'system', 'system',
  (SELECT address_id FROM addresses WHERE street='123 Main St' AND zip_code='78701'),
  (SELECT auth_id FROM authentication WHERE email='john.doe@example.com')
),
(
  'Jane', 'A.', 'Smith', '713-555-2222', 'jane.smith@example.com',
  (SELECT account_type_id FROM account_type WHERE code='business'),
  '1985-09-23', 'system', 'system',
  (SELECT address_id FROM addresses WHERE street='456 Oak Ave' AND zip_code='77001'),
  (SELECT auth_id FROM authentication WHERE email='jane.smith@example.com')
);

-- === Safe-updates-friendly link: addresses → customers (uses PK in WHERE)
SELECT customer_id INTO @john_id FROM customer WHERE email='john.doe@example.com';
SELECT address_id  INTO @john_addr FROM addresses WHERE street='123 Main St' AND zip_code='78701';

SELECT customer_id INTO @jane_id FROM customer WHERE email='jane.smith@example.com';
SELECT address_id  INTO @jane_addr FROM addresses WHERE street='456 Oak Ave' AND zip_code='77001';

UPDATE addresses SET customer_id = @john_id WHERE address_id = @john_addr;
UPDATE addresses SET customer_id = @jane_id WHERE address_id = @jane_addr;

-- =========================================================
-- 6) POST OFFICE + EMPLOYEE (no FK disabling, no guessing)
-- =========================================================
-- temporarily allow NULL manager to insert in proper order
ALTER TABLE post_office MODIFY manager_employee_id INT NULL;

-- look up dependencies
SELECT role_id INTO @role_manager FROM role WHERE role='Manager';
SELECT sex_id INTO @sex_female FROM sex WHERE code='female';
SELECT address_id INTO @addr_po FROM addresses  WHERE street='1 Postal Way' AND zip_code='78702';
SELECT address_id INTO @addr_alice FROM addresses WHERE street='789 Pine Rd'  AND zip_code='75201';
SELECT auth_id INTO @auth_alice FROM authentication WHERE email='alice.brown@example.com';
SELECT post_office_status_id INTO @po_active FROM post_office_status WHERE code='active';

-- insert post office with NULL manager
INSERT INTO post_office (
  manager_employee_id, post_office_name, post_office_status_id,
  open_time, close_time, created_by, updated_by, address_id
) VALUES (
  NULL, 'Austin Central Post Office', @po_active,
  '08:00', '17:00', 'system', 'system', @addr_po
);
SET @po_id := LAST_INSERT_ID();

-- insert the manager employee
INSERT INTO employee (
  first_name, middle_name, last_name, role_id, phone_number, email,
  assigned_post_office_id, sex_id, salary, ethnicity,
  created_by, updated_by, address_id, birth_date, auth_id
) VALUES (
  'Alice', NULL, 'Brown', @role_manager, '512-555-3333', 'alice.brown@example.com',
  @po_id, @sex_female, '65000', 'Caucasian',
  'system', 'system', @addr_alice, '1980-02-15', @auth_alice
);
SET @emp_id := LAST_INSERT_ID();

-- wire the manager now that employee exists
UPDATE post_office SET manager_employee_id=@emp_id WHERE post_office_id=@po_id;

-- lock back to NOT NULL
ALTER TABLE post_office MODIFY manager_employee_id INT NOT NULL;

-- =========================================================
-- 7) POST OFFICE BOXES
-- =========================================================
INSERT INTO post_office_box (customer_id, po_post_office_id, po_rental_start_date, po_rental_end_date,
                             created_by, updated_by)
VALUES
(@john_id, @po_id, '2025-01-01', '2025-12-31', 'system', 'system'),
(@jane_id, @po_id, '2025-02-01', '2026-01-31', 'system', 'system');

-- =========================================================
-- 8) ROUTE LEGS
-- =========================================================
INSERT INTO route_leg (transport_type_id, distance, created_by, updated_by) VALUES
((SELECT transport_type_id FROM transport_type WHERE code='car'),   15.5, 'system', 'system'),
((SELECT transport_type_id FROM transport_type WHERE code='plane'), 320.0, 'system', 'system');

-- =========================================================
-- 9) PACKAGES
-- =========================================================
INSERT INTO package (
  customer_id, sender_address_id, recipient_address_id, package_type_id,
  weight, length, width, height, package_status_id, courier_id,
  created_by, updated_by
) VALUES
(
  @john_id,
  @john_addr,
  @jane_addr,
  (SELECT package_type_id FROM package_type WHERE code='parcel'),
  2.5, 10.0, 5.0, 4.0,
  (SELECT package_status_id FROM package_status WHERE code='in_transit'),
  @emp_id, 'system', 'system'
),
(
  @jane_id,
  @jane_addr,
  @addr_alice,
  (SELECT package_type_id FROM package_type WHERE code='package'),
  5.2, 15.0, 10.0, 6.0,
  (SELECT package_status_id FROM package_status WHERE code='pending'),
  @emp_id, 'system', 'system'
);

-- =========================================================
-- 10) TRACKING EVENTS
-- =========================================================
INSERT INTO tracking_event (
  package_id, courier_id, route_leg_id, location_type_id, location_id,
  transport_type_id, event_status_id, created_by, updated_by
) VALUES
(
  (SELECT MIN(package_id) FROM package),
  @emp_id,
  (SELECT leg_id FROM route_leg WHERE distance=15.5),
  (SELECT location_type_id FROM location_type WHERE code='post_office'),
  @addr_po,
  (SELECT transport_type_id FROM transport_type WHERE code='car'),
  (SELECT event_status_id FROM event_status WHERE code='on_time'),
  'system','system'
),
(
  (SELECT MAX(package_id) FROM package),
  @emp_id,
  (SELECT leg_id FROM route_leg WHERE distance=320.0),
  (SELECT location_type_id FROM location_type WHERE code='airport'),
  @addr_alice,
  (SELECT transport_type_id FROM transport_type WHERE code='plane'),
  (SELECT event_status_id FROM event_status WHERE code='out_for_delivery'),
  'system','system'
);

-- =========================================================
-- 11) SERVICES
-- =========================================================
INSERT INTO services (created_by, updated_by, service_type) VALUES
('system','system','Mail Delivery'),
('system','system','Package Shipping'),
('system','system','Passport Processing');

-- =========================================================
-- 12) TRANSACTIONS
-- =========================================================
INSERT INTO `transaction` (
  recipient_first_name, recipient_middle_name, recipient_last_name,
  service_id, cost, shipping_option_id, additional_instructions,
  created_by, updated_by, sender_id
) VALUES
(
  'John', NULL, 'Doe',
  (SELECT service_id FROM services WHERE service_type='Package Shipping'),
  9.99, (SELECT shipping_option_id FROM shipping_option WHERE code='standard'),
  'Leave at door','system','system', @john_id
),
(
  'Jane', NULL, 'Smith',
  (SELECT service_id FROM services WHERE service_type='Mail Delivery'),
  15.49, (SELECT shipping_option_id FROM shipping_option WHERE code='express'),
  'Require signature','system','system', @jane_id
);

-- =========================================================
-- 13) COMPLAINTS
-- =========================================================
INSERT INTO complaint (
  customer_id, first_name, middle_name, last_name, email,
  phone_number, complaint_description, created_by, updated_by
) VALUES
(
  @john_id,
  'John', NULL, 'Doe', 'john.doe@example.com', '512-555-1111',
  'Package delayed beyond expected date', 'system', 'system'
),
(
  @jane_id,
  'Jane', 'A.', 'Smith', 'jane.smith@example.com', '713-555-2222',
  'Received damaged parcel', 'system', 'system'
);
