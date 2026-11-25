CREATE TABLE users (
    user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'inspector',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT valid_user_role
        CHECK (role IN ('admin', 'inspector', 'manager'))
);

CREATE TABLE products (
    product_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    material VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inspections (
    inspection_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(user_id),

    product_id INTEGER NOT NULL
        REFERENCES products(product_id),

    batch_number VARCHAR(100) NOT NULL,

    image_path TEXT NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'pending',

    defect_count INTEGER NOT NULL DEFAULT 0,

    model_version VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT valid_inspection_status
        CHECK (status IN ('pending', 'processing', 'passed', 'failed', 'review')),

    CONSTRAINT nonnegative_defect_count
        CHECK (defect_count >= 0)
);

CREATE TABLE defects (
    defect_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    inspection_id INTEGER NOT NULL
        REFERENCES inspections(inspection_id)
        ON DELETE CASCADE,

    class_name VARCHAR(100) NOT NULL,

    confidence NUMERIC(5,4) NOT NULL,

    bounding_box JSONB NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT valid_confidence
        CHECK (confidence >= 0 AND confidence <= 1)
);

CREATE TABLE reports (
    report_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    inspection_id INTEGER NOT NULL
        REFERENCES inspections(inspection_id)
        ON DELETE CASCADE,

    report_name VARCHAR(150) NOT NULL,

    file_path TEXT NOT NULL,

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_inspections_user
ON inspections(user_id);

CREATE INDEX idx_inspections_product
ON inspections(product_id);

CREATE INDEX idx_inspections_created
ON inspections(created_at);

CREATE INDEX idx_defects_inspection
ON defects(inspection_id);

CREATE INDEX idx_reports_inspection
ON reports(inspection_id);
