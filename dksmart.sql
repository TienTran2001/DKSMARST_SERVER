CREATE database DKSMART
GO
USE DKSMART
GO
-- Bảng quyền
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50)
)
GO 
-- Bảng người dùng
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(11),
    email VARCHAR(100),
    fullname VARCHAR(100),
    password VARCHAR(100),
    address VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
)
ALTER TABLE users
ADD COLUMN center_id INT,
ADD FOREIGN KEY (center_id) REFERENCES centers(center_id);
GO

-- Bảng phương tiện
CREATE TABLE vehicles (
    vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
    license_plate VARCHAR(20),
    plate_color VARCHAR(50),
    vehicle_type VARCHAR(50),
    expiry_date DATE,
    brand VARCHAR(50),
    model_number VARCHAR(50),
    registration_paper VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME ,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)
GO
-- Bảng đánh giá và phản hồi
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    rating INT,
    content VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
    center_id INT,
    user_id INT COMMENT 'Mã người dùng, liên kết với bảng users',
    FOREIGN KEY (center_id) REFERENCES centers(center_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)
GO
-- Bảng tin tức
CREATE TABLE news (
    news_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    content TEXT,
    published_date DATETIME,
    views INT ,
    image_url VARCHAR(255) ,
    source VARCHAR(255) ,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)
GO
-- Bảng tỉnh thành
CREATE TABLE provinces (
    province_id INT PRIMARY KEY AUTO_INCREMENT,
    province_name VARCHAR(100) 
)
GO
-- Bảng trung tâm đăng kiểm
CREATE TABLE centers (
    center_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(11),
    operating_hours VARCHAR(255)
    created_at DATETIME,
    updated_at DATETIME,
    province_id INT,
    FOREIGN KEY (province_id) REFERENCES provinces(province_id)
)
ALTER TABLE centers
ADD COLUMN status ENUM('đang nhận lịch', 'ngưng nhận lịch') NOT NULL DEFAULT 'đang nhận lịch';
GO
-- Bảng trạng thái ca đăng kiểm
CREATE TABLE shift_statuses (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(50)
)
GO
-- Bảng ca đăng kiểm
CREATE TABLE shifts (
    shift_id INT PRIMARY KEY,
    start_time TIME,
    end_time TIME,
    inspection_date DATE,
    center_id INT,
    quantity INT,
    max_quantity,
    status_id INT,
    FOREIGN KEY (center_id) REFERENCES centers(center_id),
    FOREIGN KEY (status_id) REFERENCES shift_statuses(status_id)
)
GO
-- Bảng trạng thái lịch hẹn
CREATE TABLE appointment_statuses (
    status_id INT PRIMARY KEY,
    status_name VARCHAR(50) 
)
GO
-- Bảng lịch hẹn
CREATE TABLE appointments (
    appointment_id INT PRIMARY KEY,
    appointment_date DATE,
    created_at DATETIME,
    note TEXT,
    updated_at DATETIME,
    shift_id INT,
    vehicle_id INT,
    user_id INT,
    center_id INT,
    status_id,
    FOREIGN KEY (shift_id) REFERENCES shifts(shift_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (center_id) REFERENCES centers(center_id),
    FOREIGN KEY (status_id) REFERENCES appointment_statuses(status_id)
);



-- trigger xóa vehicle thì update vehicleId trong bảng appointment về null
DELIMITER //

CREATE TRIGGER update_appointments_vehicle_id
BEFORE DELETE ON vehicles
FOR EACH ROW
BEGIN
    UPDATE appointments SET vehicle_id = NULL WHERE vehicle_id = OLD.vehicle_id;
END;
//

DELIMITER ;

-- -- Cập nhật id của shift_detail trong bảng appointments về null khi xóa ca   
DELIMITER //

CREATE TRIGGER update_appointments_shift_detail_id
BEFORE DELETE ON shift_details
FOR EACH ROW
BEGIN
    UPDATE appointments SET shift_detail_id = NULL WHERE shift_detail_id = OLD.shift_detail_id;
END;
//

DELIMITER ;


