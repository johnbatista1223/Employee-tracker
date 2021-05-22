DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);
INSERT INTO department (name)
VALUES 
('Technology'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 75000, 1),
('Accountant', 60000, 2),
('Paralegal', 45000, 3),
('Manager', 65000, 4),
('Engineer', 100000, 5),
('Sales Rep', 40000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Mike', 'Adams', 1, 10),
('Richard', 'Alexander', 2, 26),
('Sam', 'Smith', 3, 45),
('Sheyla', 'Falcon', 4, 126),
('Aly', 'Halim', 5, 44),
('Max', 'mercado', 6, 57);



