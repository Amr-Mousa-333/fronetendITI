CREATE DATABASE IF NOT EXISTS shop_db;
USE shop_db;
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    rating DECIMAL(3, 2),
    stock INT DEFAULT 0,
    brand VARCHAR(100),
    sku VARCHAR(50) UNIQUE,
    weight DECIMAL(10, 2),
    warranty_information VARCHAR(255),
    shipping_information VARCHAR(255),
    availability_status VARCHAR(50),
    return_policy VARCHAR(255),
    minimum_order_quantity INT DEFAULT 1,
    thumbnail VARCHAR(500),
    barcode VARCHAR(100),
    qr_code TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE product_dimensions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    width DECIMAL(10, 2),
    height DECIMAL(10, 2),
    depth DECIMAL(10, 2),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE product_tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    tag VARCHAR(100) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_tag (tag),
    INDEX idx_product_id (product_id)
);

CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id)
);


CREATE TABLE product_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    reviewer_name VARCHAR(255),
    reviewer_email VARCHAR(255),
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_rating (rating)
);



-- Search with pagination parameters
SET @search_query = 'phone';
SET @limit = 23;
SET @skip = 0;

SELECT 
    p.id,
    p.title,
    p.description,
    p.category,
    p.price,
    p.discount_percentage,
    p.rating,
    p.stock,
    p.brand,
    p.sku,
    p.thumbnail,
    p.availability_status
FROM products p
WHERE 
    p.title LIKE CONCAT('%', @search_query, '%')
    OR p.description LIKE CONCAT('%', @search_query, '%')
    OR p.category LIKE CONCAT('%', @search_query, '%')
    OR p.brand LIKE CONCAT('%', @search_query, '%')
GROUP BY p.id
LIMIT @limit OFFSET @skip;
