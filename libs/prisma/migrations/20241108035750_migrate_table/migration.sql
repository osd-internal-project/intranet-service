-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "contact_id" TEXT NOT NULL,
    "contact_name" VARCHAR(100) DEFAULT '',
    "phone_number" VARCHAR(20) DEFAULT '',
    "fax_number" VARCHAR(20) DEFAULT '',
    "email" VARCHAR(100) DEFAULT '',
    "description" VARCHAR(100) DEFAULT '',
    "vender_id" TEXT
);

-- CreateTable
CREATE TABLE "data_leave_file" (
    "id" SERIAL NOT NULL,
    "file_code" VARCHAR(200),
    "path" VARCHAR(200),
    "file_name" VARCHAR(200),
    "file_type" VARCHAR(200),
    "type" VARCHAR(10),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "data_leave_id" INTEGER
);

-- CreateTable
CREATE TABLE "data_leave" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR(100),
    "first_name" VARCHAR(100) DEFAULT '',
    "last_name" VARCHAR(100) DEFAULT '',
    "position_id" INTEGER,
    "position" VARCHAR(100) DEFAULT '',
    "type_id" INTEGER,
    "type_name" VARCHAR(100) DEFAULT '',
    "start_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "start_time" VARCHAR(10),
    "end_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "end_time" VARCHAR(10),
    "leave_hour" DOUBLE PRECISION DEFAULT 0.00,
    "detail" TEXT DEFAULT '',
    "phone_number" VARCHAR(50) NOT NULL DEFAULT '',
    "status" VARCHAR(50) DEFAULT '',
    "approved_date" TIMESTAMP,
    "user_approved" VARCHAR(100),
    "attrach_file" VARCHAR(250),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "owner_id" VARCHAR(100) DEFAULT '',
    "owner_name" VARCHAR(150) DEFAULT '',
    "group_id" VARCHAR(100) DEFAULT ''
);

-- CreateTable
CREATE TABLE "file_recieve" (
    "id" SERIAL NOT NULL,
    "idfile" VARCHAR(200),
    "path" VARCHAR(200),
    "namefile" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "inventory_lot_id" TEXT
);

-- CreateTable
CREATE TABLE "images_location" (
    "id" SERIAL NOT NULL,
    "idfile" VARCHAR(200),
    "path" VARCHAR(200),
    "namefile" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "location_id" INTEGER
);

-- CreateTable
CREATE TABLE "images_ghs" (
    "id" SERIAL NOT NULL,
    "idfile" VARCHAR(200),
    "path" VARCHAR(200),
    "namefile" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "images_ghs_id" TEXT
);

-- CreateTable
CREATE TABLE "information_news" (
    "news_id" SERIAL NOT NULL,
    "news_name" TEXT DEFAULT '',
    "content" TEXT DEFAULT '',
    "new_Type" TEXT DEFAULT '',
    "author" VARCHAR(100) DEFAULT '',
    "phblished_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "status" BOOLEAN DEFAULT true
);

-- CreateTable
CREATE TABLE "news_type" (
    "idType" SERIAL NOT NULL,
    "nameType" TEXT DEFAULT '',
    "dedeil" TEXT DEFAULT '',
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN DEFAULT true
);

-- CreateTable
CREATE TABLE "news_image" (
    "image_id" SERIAL NOT NULL,
    "createdat" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "file_image_name" VARCHAR(100) DEFAULT '',
    "file_image_path" VARCHAR(100) DEFAULT '',
    "file_name" VARCHAR(100) DEFAULT '',
    "news_id" INTEGER
);

-- CreateTable
CREATE TABLE "handbook_type" (
    "id_handtype" SERIAL NOT NULL,
    "name_Type" TEXT DEFAULT '',
    "create_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "author" VARCHAR(100) DEFAULT '',
    "status" BOOLEAN DEFAULT true
);

-- CreateTable
CREATE TABLE "handbook_file" (
    "handbook_id" SERIAL NOT NULL,
    "file_id" VARCHAR(50) NOT NULL,
    "file_name" VARCHAR(200) DEFAULT '',
    "file_type" VARCHAR(200) DEFAULT '',
    "file_origina_name" VARCHAR(200) DEFAULT '',
    "file_location" VARCHAR(100) DEFAULT '',
    "author" VARCHAR(100) DEFAULT '',
    "created_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN DEFAULT true
);

-- CreateTable
CREATE TABLE "email_template" (
    "id" SERIAL NOT NULL,
    "template_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL DEFAULT '',
    "type" INTEGER NOT NULL,
    "status" VARCHAR(10) NOT NULL DEFAULT 'Inactive',
    "html_template" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "email_template_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_At" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "email_template_fields" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(250),
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_template_type" INTEGER
);

-- CreateTable
CREATE TABLE "slide_image" (
    "id" SERIAL NOT NULL,
    "file_id" VARCHAR(50) NOT NULL,
    "file_path" VARCHAR(255),
    "file_name" VARCHAR(255) DEFAULT '',
    "file_type" VARCHAR(50),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" VARCHAR(50),
    "created_by_name" VARCHAR(255),
    "updated_at" TIMESTAMPTZ,
    "updated_by_id" VARCHAR(50),
    "updated_by_name" VARCHAR(255),
    "order" INTEGER
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "inventory_id" TEXT NOT NULL,
    "inventory_number" TEXT NOT NULL DEFAULT '',
    "inventory_name" VARCHAR(100) NOT NULL DEFAULT '',
    "status" BOOLEAN DEFAULT true,
    "location_place" VARCHAR(100) DEFAULT '',
    "phone_number" VARCHAR(20) DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "location_id" INTEGER
);

-- CreateTable
CREATE TABLE "inventory_lot" (
    "id" SERIAL NOT NULL,
    "lot_no" VARCHAR NOT NULL,
    "qty" DOUBLE PRECISION,
    "remain" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "total_price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "update_id" VARCHAR(50),
    "update_name" VARCHAR(200),
    "receipt_date" TIMESTAMP(3),
    "detail" TEXT,
    "noti_expiry_status" BOOLEAN,
    "noti_expiry_date" TIMESTAMP(3),
    "expiry_date" TIMESTAMP(3),
    "production_date" TIMESTAMP(3),
    "inventory_stock_id" INTEGER,
    "owner_group" VARCHAR(50),
    "inventorylot_id" TEXT
);

-- CreateTable
CREATE TABLE "inventory_stock" (
    "id" SERIAL NOT NULL,
    "total_qty" DOUBLE PRECISION,
    "total_remain" DOUBLE PRECISION,
    "cost" INTEGER DEFAULT 0,
    "price" DOUBLE PRECISION DEFAULT 0.00,
    "update_id" VARCHAR(50),
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_name" TEXT DEFAULT '',
    "inventory_id" INTEGER,
    "master_product_id" INTEGER,
    "owner_group" VARCHAR(50)
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "location_id" TEXT NOT NULL,
    "number_of_inventory" TEXT DEFAULT '',
    "location_name" VARCHAR(200) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(100) DEFAULT '',
    "location_place" VARCHAR(100) DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "location_user_group_map" (
    "id" SERIAL NOT NULL,
    "user_group_id" VARCHAR,
    "location_id" INTEGER
);

-- CreateTable
CREATE TABLE "master_action_status" (
    "id" SERIAL NOT NULL,
    "name_th" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100) NOT NULL
);

-- CreateTable
CREATE TABLE "master_ghs_type" (
    "id" SERIAL NOT NULL,
    "ghs_id" TEXT NOT NULL,
    "name_ghs" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "detail" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "master_hazard_type" (
    "id" SERIAL NOT NULL,
    "name_hazard" VARCHAR(200) NOT NULL,
    "description" VARCHAR(250) DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "master_objective" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "master_position" (
    "id" SERIAL NOT NULL,
    "pos_id" SERIAL NOT NULL,
    "name_th" VARCHAR(100) DEFAULT '',
    "name_en" VARCHAR(100) DEFAULT '',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "master_typeleave" (
    "id" SERIAL NOT NULL,
    "type_id" SERIAL,
    "type_name" VARCHAR(250),
    "forward_leave" VARCHAR(250),
    "limit_leave1" VARCHAR(250),
    "limit_leave2" VARCHAR(250),
    "limit_leave3" VARCHAR(250),
    "limit_leave4" VARCHAR(250),
    "description_leave" TEXT,
    "type_everyday" BOOLEAN DEFAULT false,
    "type_name_en" VARCHAR(250),
    "type_name_th" VARCHAR(250),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "master_holidays_year" (
    "id" SERIAL NOT NULL,
    "holidays_year" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL
);

-- CreateTable
CREATE TABLE "master_holidays" (
    "id" SERIAL NOT NULL,
    "holidays_name" VARCHAR(250) NOT NULL,
    "master_holidays_year_id" INTEGER NOT NULL,
    "holidays_date" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL
);

-- CreateTable
CREATE TABLE "master_product" (
    "id" SERIAL NOT NULL,
    "product_code" VARCHAR(50),
    "details" JSONB,
    "chemical_formula" TEXT NOT NULL,
    "cas_no" VARCHAR(20) NOT NULL,
    "vender_id" INTEGER,
    "vender_name" VARCHAR(100),
    "brand_id" INTEGER,
    "brand_name" VARCHAR(100),
    "undertaker" VARCHAR(100),
    "description" TEXT,
    "hyperlink" TEXT,
    "minumum_stock" DOUBLE PRECISION DEFAULT 0,
    "maximum_stock" DOUBLE PRECISION DEFAULT 0,
    "before_expiry" DOUBLE PRECISION DEFAULT 0,
    "noti_expiry" BOOLEAN NOT NULL DEFAULT true,
    "updated_by_name" TEXT,
    "updated_by_id" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unit_id" INTEGER,
    "master_product_group_id" INTEGER,
    "master_hazardtype_id" INTEGER
);

-- CreateTable
CREATE TABLE "master_product_categories" (
    "id" SERIAL NOT NULL,
    "category_code" VARCHAR(20) NOT NULL,
    "category_name" VARCHAR(200) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "master_product_details" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "master_product_id" INTEGER
);

-- CreateTable
CREATE TABLE "master_product_images" (
    "id" SERIAL NOT NULL,
    "idfile" VARCHAR(200),
    "path" VARCHAR(200),
    "namefile" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "product_id" INTEGER
);

-- CreateTable
CREATE TABLE "master_product_files" (
    "id" SERIAL NOT NULL,
    "idfile" VARCHAR(200),
    "path" VARCHAR(200),
    "namefile" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "product_id" INTEGER
);

-- CreateTable
CREATE TABLE "master_product_ghs_map" (
    "id" SERIAL NOT NULL,
    "ghs_id" INTEGER,
    "master_product_id" INTEGER
);

-- CreateTable
CREATE TABLE "master_product_hazard_map" (
    "id" SERIAL NOT NULL,
    "hazrd_id" INTEGER,
    "masterProductId" INTEGER
);

-- CreateTable
CREATE TABLE "master_product_group" (
    "id" SERIAL NOT NULL,
    "group_code" VARCHAR(20) NOT NULL,
    "group_name" VARCHAR(200) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "master_product_categories_id" INTEGER
);

-- CreateTable
CREATE TABLE "master_product_group_map_type" (
    "id" SERIAL NOT NULL,
    "type_code" VARCHAR(20) NOT NULL,
    "type_name" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "master_product_group_id" INTEGER
);

-- CreateTable
CREATE TABLE "master_product_location_map" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER,
    "master_product_id" INTEGER
);

-- CreateTable
CREATE TABLE "master_product_type" (
    "id" SERIAL NOT NULL,
    "type_code" VARCHAR(20) NOT NULL,
    "type_name" VARCHAR(200) NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "type_desc" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "master_role" (
    "id" SERIAL NOT NULL,
    "role_code" VARCHAR(20) NOT NULL,
    "role_name" VARCHAR(50) NOT NULL
);

-- CreateTable
CREATE TABLE "master_unit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "type" CHAR(2) NOT NULL
);

-- CreateTable
CREATE TABLE "request" (
    "id" SERIAL NOT NULL,
    "request_id" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "request_price" DOUBLE PRECISION NOT NULL,
    "request_qty" INTEGER DEFAULT 0,
    "objective" TEXT,
    "remark" TEXT,
    "master_actionstatus_id" INTEGER
);

-- CreateTable
CREATE TABLE "request_list" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER,
    "total_cancel" INTEGER,
    "amount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "master_rule" (
    "id" SERIAL NOT NULL,
    "rule_code" VARCHAR(50) NOT NULL,
    "rule_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "order_id" VARCHAR(50),
    "status" VARCHAR(10),
    "created_by_id" VARCHAR(50) NOT NULL,
    "created_by_name" VARCHAR(200) NOT NULL,
    "objective_id" INTEGER NOT NULL,
    "objective_name" TEXT NOT NULL,
    "request_date" DATE,
    "requester_id" VARCHAR(50),
    "requester_name" TEXT,
    "requester_group_id" VARCHAR(50),
    "requester_group_name" VARCHAR(200),
    "remark" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inventory_id" INTEGER,
    "inventory_name" TEXT,
    "location_id" INTEGER,
    "location_name" TEXT,
    "total_qty" DOUBLE PRECISION DEFAULT 0.00,
    "total_price" DOUBLE PRECISION DEFAULT 0.00,
    "owner_group" VARCHAR(50)
);

-- CreateTable
CREATE TABLE "order_lot" (
    "id" SERIAL NOT NULL,
    "lot_no" VARCHAR(20),
    "status" VARCHAR(10),
    "product_code" VARCHAR(50),
    "product_name" VARCHAR(200) NOT NULL,
    "cas_no" VARCHAR(50),
    "group_name" VARCHAR(50),
    "qty" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "total_price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" INTEGER,
    "unit" VARCHAR(20),
    "expired_status" BOOLEAN DEFAULT true,
    "master_product_id" INTEGER,
    "owner_group" VARCHAR(50),
    "inventory_lot_id" INTEGER,
    "detail_lot" VARCHAR(250)
);

-- CreateTable
CREATE TABLE "organized" (
    "id" SERIAL NOT NULL,
    "organized_id" VARCHAR(50) NOT NULL,
    "organized_name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "profile_rule" (
    "id" SERIAL NOT NULL,
    "profile_id" VARCHAR(50) NOT NULL,
    "profile_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL DEFAULT '',
    "organized_group_id" TEXT
);

-- CreateTable
CREATE TABLE "profile_rule_map" (
    "id" SERIAL NOT NULL,
    "master_rule_id" TEXT,
    "profile_rule_id" TEXT
);

-- CreateTable
CREATE TABLE "publicize_slide_images" (
    "id" SERIAL NOT NULL,
    "file_code" VARCHAR(200),
    "path" VARCHAR(200),
    "file_name" VARCHAR(200),
    "file_type" VARCHAR(200),
    "name" VARCHAR(200),
    "active_status" BOOLEAN NOT NULL DEFAULT false,
    "type" VARCHAR(10),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- CreateTable
CREATE TABLE "role_profile_map" (
    "id" SERIAL NOT NULL,
    "user_role_id" TEXT,
    "profile_rule_id" TEXT,
    "user_id" INTEGER
);

-- CreateTable
CREATE TABLE "type_leave_disabled_map" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "master_type_leave_id" INTEGER
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "product_name" VARCHAR(200) NOT NULL,
    "product_code" VARCHAR(20),
    "cas_no" VARCHAR(20),
    "location" VARCHAR(200) NOT NULL,
    "location_id" INTEGER,
    "inventory" VARCHAR(200) NOT NULL,
    "inventory_id" INTEGER,
    "chemical_formula" VARCHAR(20) NOT NULL,
    "group_id" VARCHAR(30) NOT NULL,
    "group_name" VARCHAR(30) NOT NULL,
    "vender" VARCHAR(200) NOT NULL,
    "brand" VARCHAR(200) NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "qty" DOUBLE PRECISION,
    "order_status" VARCHAR(10),
    "objective" VARCHAR(200),
    "order_id" INTEGER,
    "price" DOUBLE PRECISION,
    "unit" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "expired_date" TIMESTAMPTZ,
    "updated_by_id" VARCHAR(50) NOT NULL,
    "updated_by_name" VARCHAR(100) NOT NULL,
    "owner_group" VARCHAR(50),
    "requester_id" VARCHAR(50),
    "requester_name" TEXT,
    "requester_group_id" VARCHAR(50),
    "requester_group_name" VARCHAR(200),
    "detail_lot" VARCHAR(250)
);

-- CreateTable
CREATE TABLE "vender" (
    "id" SERIAL NOT NULL,
    "vender_name" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(100) DEFAULT '',
    "vender_id" TEXT NOT NULL,
    "house_number" VARCHAR(10) DEFAULT '',
    "group" VARCHAR(10) DEFAULT '',
    "village" VARCHAR(100) DEFAULT '',
    "alley" VARCHAR(50) DEFAULT '',
    "road" VARCHAR(50) DEFAULT '',
    "sub_district" VARCHAR(50) DEFAULT '',
    "district" VARCHAR(50) DEFAULT '',
    "province" VARCHAR(50) DEFAULT '',
    "post_code" VARCHAR(20) DEFAULT '',
    "phone_number" VARCHAR(20) DEFAULT '',
    "fax_number" VARCHAR(20) DEFAULT '',
    "email" VARCHAR(100) DEFAULT '',
    "id_card" VARCHAR(100) DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "unit" (
    "id" SERIAL NOT NULL,
    "unit_id" TEXT NOT NULL,
    "unit_name" VARCHAR(100) NOT NULL DEFAULT '',
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR(50) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "first_name_th" VARCHAR(100),
    "last_name_th" VARCHAR(100),
    "first_name_en" VARCHAR(100),
    "last_name_en" VARCHAR(100),
    "email" VARCHAR(100),
    "phone_number" VARCHAR(50),
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "client_id" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organized_group_id" VARCHAR(50),
    "refresh_token" TEXT,
    "department_id" INTEGER,
    "owner_group_id" VARCHAR(50),
    "image_id" VARCHAR(255),
    "user_type" VARCHAR(20),
    "start_work" TIMESTAMP(3),
    "positionId" INTEGER
);

-- CreateTable
CREATE TABLE "user_map_organize" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "organized_id" TEXT,
    "groupId" TEXT
);

-- CreateTable
CREATE TABLE "organize_map_groupowner" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "organized_id" TEXT,
    "owner_group_id" TEXT
);

-- CreateTable
CREATE TABLE "organize_map_group" (
    "id" SERIAL NOT NULL,
    "organize_id" TEXT,
    "group_id" TEXT
);

-- CreateTable
CREATE TABLE "user_group" (
    "id" SERIAL NOT NULL,
    "group_id" VARCHAR(50) NOT NULL,
    "group_name" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parent_group_id" VARCHAR(50),
    "organized_group_id" TEXT,
    "description" TEXT NOT NULL DEFAULT '',
    "sale_user_group_id" TEXT[],
    "sale_users_id" TEXT[],
    "engineer_user_group_id" TEXT[],
    "engineer_users_id" TEXT[],
    "exceptional_satatus" BOOLEAN DEFAULT false,
    "head_id" VARCHAR(50)
);

-- CreateTable
CREATE TABLE "user_group_map" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "user_group_id" TEXT,
    "organized_group_id" TEXT
);

-- CreateTable
CREATE TABLE "user_group_map_header" (
    "id" SERIAL NOT NULL,
    "user_group_id" TEXT NOT NULL,
    "leave_group_Id" TEXT[],
    "leave_user_Id" TEXT[],
    "expense_group_Id" TEXT[],
    "expense_user_Id" TEXT[]
);

-- CreateTable
CREATE TABLE "user_group_user_role_map" (
    "id" SERIAL NOT NULL,
    "user_group_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "role_id" VARCHAR(50) NOT NULL,
    "role_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL DEFAULT '',
    "organized_group_id" TEXT
);

-- CreateTable
CREATE TABLE "user_role_map" (
    "id" SERIAL NOT NULL,
    "user_role_id" TEXT,
    "user_id" TEXT
);

-- CreateTable
CREATE TABLE "floor" (
    "id" SERIAL NOT NULL,
    "floor_id" INTEGER NOT NULL,
    "floor_name" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL
);

-- CreateTable
CREATE TABLE "house_keeper" (
    "id" SERIAL NOT NULL,
    "housekeeper_id" SERIAL NOT NULL,
    "housekeeper_name" VARCHAR(20) NOT NULL,
    "quit_your_job" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL
);

-- CreateTable
CREATE TABLE "result_cleanliness" (
    "id" SERIAL NOT NULL,
    "floor_id" INTEGER NOT NULL,
    "housekeeper_id" INTEGER NOT NULL,
    "duration" VARCHAR(20) NOT NULL,
    "result" INTEGER NOT NULL,
    "remark" TEXT,
    "wrapup_date" TIMESTAMPTZ NOT NULL
);

-- CreateTable
CREATE TABLE "ma_car" (
    "id" SERIAL NOT NULL,
    "car_id" VARCHAR(50) NOT NULL,
    "car_name" VARCHAR(150) NOT NULL,
    "car_petrol" VARCHAR(150) NOT NULL,
    "car_mile" INTEGER,
    "detail" VARCHAR(150) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" VARCHAR(50),
    "created_by_name" VARCHAR(255),
    "updated_at" TIMESTAMPTZ,
    "updated_by_id" VARCHAR(50),
    "updated_by_name" VARCHAR(255)
);

-- CreateTable
CREATE TABLE "ma_car_type" (
    "id" SERIAL NOT NULL,
    "type_name" VARCHAR(150) NOT NULL,
    "detail" VARCHAR(150) NOT NULL,
    "stauts" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" VARCHAR(50),
    "created_by_name" VARCHAR(255)
);

-- CreateTable
CREATE TABLE "ma_car_book" (
    "id" SERIAL NOT NULL,
    "car_id" VARCHAR(50) NOT NULL,
    "car_name" VARCHAR(150),
    "car_book_title" VARCHAR(50),
    "car_book_province" VARCHAR(250),
    "car_book_place" VARCHAR(250),
    "car_book_users" INTEGER,
    "car_book_start_date" TIMESTAMPTZ,
    "car_book_end_date" TIMESTAMPTZ,
    "car_book_approved_date" TIMESTAMPTZ,
    "car_book_approved_by_id" VARCHAR(50),
    "car_book_approved__by_name" VARCHAR(255),
    "car_book_approved_status" VARCHAR(20),
    "detail" VARCHAR(225),
    "remark" VARCHAR(225),
    "stauts" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" VARCHAR(50),
    "created_by_name" VARCHAR(255),
    "updated_at" TIMESTAMPTZ,
    "updated_by_id" VARCHAR(50),
    "updated_by_name" VARCHAR(255),
    "recipient_id" VARCHAR(50),
    "recipient_name" VARCHAR(255),
    "return_notif_at" TIMESTAMPTZ,
    "return_at" TIMESTAMPTZ,
    "remark_approved" VARCHAR(225),
    "remark_cancel" VARCHAR(225)
);

-- CreateTable
CREATE TABLE "ma_car_wrapup" (
    "id" SERIAL NOT NULL,
    "car_wrapup_id" VARCHAR(50) NOT NULL,
    "car_id" VARCHAR(50),
    "car_name" VARCHAR(100),
    "type_id" INTEGER,
    "type_name" VARCHAR(150),
    "vender" VARCHAR(100) NOT NULL,
    "cost" MONEY,
    "detail" TEXT,
    "wrapup_miles" VARCHAR(150),
    "date_start" TIMESTAMPTZ,
    "date_end" TIMESTAMPTZ,
    "remark" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "stauts" BOOLEAN DEFAULT true,
    "create_name" VARCHAR(70)
);

-- CreateTable
CREATE TABLE "ma_car_wrapup_image" (
    "idwarpup_image" SERIAL NOT NULL,
    "mafile_name" VARCHAR(150) NOT NULL,
    "mafile_name_image" VARCHAR(150) NOT NULL,
    "mafile_part" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "car_wrapup_id" TEXT
);

-- CreateTable
CREATE TABLE "ma_task" (
    "id" SERIAL NOT NULL,
    "ma_name" VARCHAR(255) NOT NULL,
    "ma_type_id" INTEGER NOT NULL,
    "ma_type_name" VARCHAR(255) NOT NULL,
    "ma_date" TIMESTAMPTZ NOT NULL,
    "ma_status" VARCHAR(10) NOT NULL,
    "detail" TEXT,
    "contact" TEXT,
    "action_date" TIMESTAMPTZ,
    "solution" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" VARCHAR(50),
    "created_by_name" VARCHAR(255),
    "updated_at" TIMESTAMPTZ,
    "updated_by_id" VARCHAR(50),
    "updated_by_name" VARCHAR(255),
    "owner_group" VARCHAR(50),
    "refTaskId" INTEGER
);

-- CreateTable
CREATE TABLE "ma_task_files" (
    "id" SERIAL NOT NULL,
    "file_code" VARCHAR(200),
    "path" VARCHAR(200),
    "file_name" VARCHAR(200),
    "file_type" VARCHAR(200),
    "type" VARCHAR(10),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    "ma_task_id" INTEGER
);

-- CreateTable
CREATE TABLE "ma_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active_status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "master_room" (
    "id" SERIAL NOT NULL,
    "room_id" VARCHAR(50) NOT NULL,
    "room_name" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "room_description" VARCHAR(255) NOT NULL,
    "masterRoomTypeId" INTEGER,

    CONSTRAINT "master_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_room_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "booking_room" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR(100),
    "room_id" VARCHAR(255),
    "room_name" VARCHAR(255) NOT NULL,
    "room_type" VARCHAR(255) NOT NULL,
    "booker_name" VARCHAR(255) NOT NULL,
    "booker_phone" VARCHAR(255) NOT NULL,
    "booker_department" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "booking_status" VARCHAR(255) NOT NULL,
    "approver_id" VARCHAR(255),
    "approver" VARCHAR(255),
    "approve_date" TIMESTAMPTZ,
    "member" VARCHAR(255) NOT NULL,
    "out_sider" VARCHAR(255) NOT NULL,
    "note" VARCHAR(255) DEFAULT '',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "depart_id" INTEGER NOT NULL,
    "depart_name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "organize_chart" (
    "id" SERIAL NOT NULL,
    "position_id" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "position_name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(20),
    "parent_position_id" VARCHAR(50),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL
);

-- CreateTable
CREATE TABLE "user_map_organize_chart" (
    "id" SERIAL NOT NULL,
    "positionId" TEXT,
    "userId" TEXT
);

-- CreateTable
CREATE TABLE "contract_company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL
);

-- CreateTable
CREATE TABLE "customer_address" (
    "id" SERIAL NOT NULL,
    "address_type_id" VARCHAR(10),
    "address_type_name" VARCHAR(100),
    "noti_house_number" VARCHAR(10),
    "noti_room_number" VARCHAR(10),
    "noti_building" VARCHAR(150),
    "noti_floor" VARCHAR(5),
    "noti_alley" VARCHAR(150),
    "noti_village" VARCHAR(5),
    "noti_road" VARCHAR(150),
    "noti_sub_district" VARCHAR(150),
    "noti_district" VARCHAR(150),
    "noti_province" VARCHAR(150),
    "noti_zip_code" VARCHAR(10),
    "customer_branch_id" INTEGER,
    "maplink" TEXT
);

-- CreateTable
CREATE TABLE "customer_branch" (
    "id" SERIAL NOT NULL,
    "main_branch_status" BOOLEAN,
    "branch_name" VARCHAR(255),
    "branch_code" VARCHAR(100),
    "updated_by" VARCHAR(100),
    "updated_by_id" VARCHAR(100),
    "created_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ,
    "customer_detail_sub_id" INTEGER,
    "customer_detail_id" INTEGER,
    "remark" TEXT,
    "active_status" BOOLEAN DEFAULT true
);

-- CreateTable
CREATE TABLE "customer_contact" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "nick_name" VARCHAR(100),
    "customer_detail_id" VARCHAR(150),
    "phone" VARCHAR(20),
    "office_phone" VARCHAR(20),
    "fax" VARCHAR(20),
    "email" VARCHAR(50),
    "birthday" TIMESTAMPTZ,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "customer_branch_id" INTEGER
);

-- CreateTable
CREATE TABLE "customer_group" (
    "id" SERIAL NOT NULL,
    "customer_group_code" VARCHAR(50) NOT NULL,
    "customer_group_name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

-- CreateTable
CREATE TABLE "customer_detail" (
    "id" SERIAL NOT NULL,
    "customer_code" VARCHAR(50) NOT NULL,
    "reference_code" VARCHAR(50),
    "department_code" VARCHAR(50),
    "customer_name_th" VARCHAR(255),
    "customer_name_en" VARCHAR(255),
    "prefix_th" VARCHAR(10) DEFAULT '',
    "first_name_th" VARCHAR(200) DEFAULT '',
    "last_name_th" VARCHAR(200) DEFAULT '',
    "prefix_en" VARCHAR(10) DEFAULT '',
    "first_name_en" VARCHAR(200) DEFAULT '',
    "last_name_en" VARCHAR(200) DEFAULT '',
    "company_regis_number" VARCHAR(50),
    "regis_date" TIMESTAMPTZ,
    "registration" DOUBLE PRECISION,
    "customer_type_group_id" INTEGER,
    "customer_type_group_name" VARCHAR(255),
    "customer_type_id" VARCHAR(255),
    "customer_type_name" VARCHAR(255),
    "grade" VARCHAR(5),
    "responsible" JSONB,
    "responsible_group" TEXT[],
    "responsible_id" TEXT[],
    "third_party_id" VARCHAR(50),
    "third_party_name" VARCHAR(200),
    "active_status" BOOLEAN NOT NULL,
    "details" JSONB,
    "noti_phone" VARCHAR(20),
    "noti_fax" VARCHAR(20),
    "noti_email" VARCHAR(30),
    "noti_map" VARCHAR(20),
    "business_category" TEXT,
    "objective" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" VARCHAR(50),
    "owner_group_id" VARCHAR(50),
    "created_by_name" VARCHAR(255),
    "updated_at" TIMESTAMPTZ,
    "updated_by_id" VARCHAR(50),
    "updated_by_name" VARCHAR(255),
    "owner_group" VARCHAR(50),
    "delete_status" BOOLEAN NOT NULL DEFAULT false,
    "customer_group_id" INTEGER
);

-- CreateTable
CREATE TABLE "customer_detail_sub" (
    "id" SERIAL NOT NULL,
    "main_branch_status" BOOLEAN,
    "branch_name" VARCHAR(255),
    "branch_code" VARCHAR(100),
    "updated_by" VARCHAR(100),
    "updated_by_id" VARCHAR(100),
    "created_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ,
    "customer_detail_id" INTEGER,
    "active_status" BOOLEAN DEFAULT true
);

-- CreateTable
CREATE TABLE "customer_type_group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "customer_responsible" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "customer_product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "details" JSONB,
    "fields" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

-- CreateTable
CREATE TABLE "customer_type" (
    "id" SERIAL NOT NULL,
    "customer_type_id" VARCHAR(20),
    "name" VARCHAR(255) NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "customers_files" (
    "id" SERIAL NOT NULL,
    "file_code" VARCHAR(200),
    "path" VARCHAR(200),
    "file_name" VARCHAR(200),
    "file_type" VARCHAR(200),
    "type" VARCHAR(20),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    "customer_project_ticket_id" INTEGER
);

-- CreateTable
CREATE TABLE "customer_project" (
    "id" SERIAL NOT NULL,
    "project_code" VARCHAR(20),
    "project_name" VARCHAR(255),
    "product_name" VARCHAR(255),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "duration" INTEGER NOT NULL,
    "company_id" INTEGER,
    "company_name" INTEGER,
    "tax_address_id" INTEGER,
    "tax_address_text" TEXT,
    "delivery_address_id" INTEGER,
    "delivery_address_text" TEXT,
    "noti_address_id" INTEGER,
    "noti_address_text" TEXT,
    "contact_id" INTEGER,
    "project_manager_id" VARCHAR(50),
    "project_manager_name" VARCHAR(150),
    "sale_manager_id" VARCHAR(50),
    "sale_manager_name" VARCHAR(150),
    "sale_id" VARCHAR(50),
    "sale_name" VARCHAR(150),
    "customerBranchId" INTEGER,
    "related_group_id" TEXT[],
    "related_users_id" TEXT[],
    "description" TEXT,
    "contract_company_id" INTEGER
);

-- CreateTable
CREATE TABLE "customer_project_product_map" (
    "id" SERIAL NOT NULL,
    "customer_project_id" INTEGER,
    "customer_product_id" INTEGER,
    "details" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "customer_project_task" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    "weight" INTEGER DEFAULT 0,
    "ticket_title" VARCHAR(100) NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "customer_project_id" INTEGER
);

-- CreateTable
CREATE TABLE "customer_project_ticket" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(15) NOT NULL,
    "ticket_no" VARCHAR(10),
    "ticket_title" VARCHAR(100) NOT NULL,
    "ticket_detail" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    "approved_by_id" VARCHAR(50),
    "approved_by_name" VARCHAR(255),
    "customerProjectTaskId" INTEGER,
    "customer_project_id" INTEGER,
    "problem" TEXT,
    "solution" TEXT,
    "manhour" INTEGER,
    "result" TEXT,
    "summary" TEXT,
    "created_by_id" VARCHAR(50),
    "created_by_name" VARCHAR(255),
    "created_group_id" VARCHAR(50),
    "assign_id" VARCHAR(50),
    "assign_group_id" VARCHAR(50),
    "assign_name" VARCHAR(150),
    "channel_type_id" INTEGER,
    "channel_type_name" VARCHAR(100),
    "job_type_id" INTEGER,
    "job_type_name" VARCHAR(100),
    "priority_id" INTEGER,
    "priority_name" VARCHAR(100),
    "request_type_id" INTEGER,
    "request_type_name" VARCHAR(100),
    "work_type_id" INTEGER,
    "work_type_name" VARCHAR(100),
    "request_date" TIMESTAMP,
    "due_date" TIMESTAMP,
    "appointment_date" TIMESTAMP,
    "receive_date" TIMESTAMP,
    "finish_date" TIMESTAMP,
    "complete_date" TIMESTAMP
);

-- CreateTable
CREATE TABLE "ticket_expense" (
    "id" SERIAL NOT NULL,
    "expense_amount" DOUBLE PRECISION NOT NULL,
    "expense_price" DOUBLE PRECISION NOT NULL,
    "expense_code" VARCHAR(20),
    "form_type" VARCHAR(10),
    "process_status" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" VARCHAR(50),
    "updated_by_name" VARCHAR(255),
    "customer_project_ticketId" INTEGER
);

-- CreateTable
CREATE TABLE "expense_type" (
    "id" SERIAL NOT NULL,
    "expense_code" VARCHAR(20) NOT NULL,
    "expense_name" VARCHAR(200) NOT NULL
);

-- CreateTable
CREATE TABLE "customer_channel_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "customer_job_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "priority" VARCHAR(20),
    "priority_hour" INTEGER,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_request_type_id" INTEGER
);

-- CreateTable
CREATE TABLE "customer_priority" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "customer_request_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "customer_work_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "active_status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ticket_history_logs" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "updated_by_id" VARCHAR(50),
    "updated_by_name" VARCHAR(255),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detail" TEXT,
    "customer_project_ticket_id" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "brand_id_key" ON "brand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_id_key" ON "contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_contact_id_key" ON "contact"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "data_leave_file_id_key" ON "data_leave_file"("id");

-- CreateIndex
CREATE UNIQUE INDEX "data_leave_id_key" ON "data_leave"("id");

-- CreateIndex
CREATE UNIQUE INDEX "file_recieve_id_key" ON "file_recieve"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_location_id_key" ON "images_location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_ghs_id_key" ON "images_ghs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "information_news_news_id_key" ON "information_news"("news_id");

-- CreateIndex
CREATE UNIQUE INDEX "news_type_idType_key" ON "news_type"("idType");

-- CreateIndex
CREATE UNIQUE INDEX "news_image_image_id_key" ON "news_image"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "handbook_type_id_handtype_key" ON "handbook_type"("id_handtype");

-- CreateIndex
CREATE UNIQUE INDEX "handbook_file_handbook_id_key" ON "handbook_file"("handbook_id");

-- CreateIndex
CREATE UNIQUE INDEX "email_template_id_key" ON "email_template"("id");

-- CreateIndex
CREATE UNIQUE INDEX "email_template_template_id_key" ON "email_template"("template_id");

-- CreateIndex
CREATE UNIQUE INDEX "email_template_type_id_key" ON "email_template_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "email_template_fields_id_key" ON "email_template_fields"("id");

-- CreateIndex
CREATE UNIQUE INDEX "slide_image_id_key" ON "slide_image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "slide_image_file_id_key" ON "slide_image"("file_id");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_id_key" ON "inventory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_inventory_id_key" ON "inventory"("inventory_id");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_lot_id_key" ON "inventory_lot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_lot_inventorylot_id_key" ON "inventory_lot"("inventorylot_id");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_stock_id_key" ON "inventory_stock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "location_id_key" ON "location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "location_location_id_key" ON "location"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "location_user_group_map_id_key" ON "location_user_group_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_action_status_id_key" ON "master_action_status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_ghs_type_id_key" ON "master_ghs_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_ghs_type_ghs_id_key" ON "master_ghs_type"("ghs_id");

-- CreateIndex
CREATE UNIQUE INDEX "master_hazard_type_id_key" ON "master_hazard_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_objective_id_key" ON "master_objective"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_position_id_key" ON "master_position"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_position_pos_id_key" ON "master_position"("pos_id");

-- CreateIndex
CREATE UNIQUE INDEX "master_typeleave_id_key" ON "master_typeleave"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_holidays_year_id_key" ON "master_holidays_year"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_holidays_id_key" ON "master_holidays"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_id_key" ON "master_product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_categories_id_key" ON "master_product_categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_categories_category_code_key" ON "master_product_categories"("category_code");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_details_id_key" ON "master_product_details"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_images_id_key" ON "master_product_images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_files_id_key" ON "master_product_files"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_ghs_map_id_key" ON "master_product_ghs_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_hazard_map_id_key" ON "master_product_hazard_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_group_id_key" ON "master_product_group"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_group_group_code_key" ON "master_product_group"("group_code");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_group_map_type_id_key" ON "master_product_group_map_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_location_map_id_key" ON "master_product_location_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_type_id_key" ON "master_product_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_product_type_type_code_key" ON "master_product_type"("type_code");

-- CreateIndex
CREATE UNIQUE INDEX "master_role_id_key" ON "master_role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_unit_id_key" ON "master_unit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "request_id_key" ON "request"("id");

-- CreateIndex
CREATE UNIQUE INDEX "request_list_id_key" ON "request_list"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_rule_id_key" ON "master_rule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_rule_rule_code_key" ON "master_rule"("rule_code");

-- CreateIndex
CREATE UNIQUE INDEX "order_id_key" ON "order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_lot_id_key" ON "order_lot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organized_id_key" ON "organized"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organized_organized_id_key" ON "organized"("organized_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_rule_id_key" ON "profile_rule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_rule_profile_id_key" ON "profile_rule"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_rule_map_id_key" ON "profile_rule_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "publicize_slide_images_id_key" ON "publicize_slide_images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "role_profile_map_id_key" ON "role_profile_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "type_leave_disabled_map_id_key" ON "type_leave_disabled_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_id_key" ON "transaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vender_id_key" ON "vender"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vender_vender_id_key" ON "vender"("vender_id");

-- CreateIndex
CREATE UNIQUE INDEX "unit_id_key" ON "unit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "unit_unit_id_key" ON "unit"("unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_map_organize_id_key" ON "user_map_organize"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organize_map_groupowner_id_key" ON "organize_map_groupowner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organize_map_group_id_key" ON "organize_map_group"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_group_id_key" ON "user_group"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_group_group_id_key" ON "user_group"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_group_map_id_key" ON "user_group_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_group_map_header_id_key" ON "user_group_map_header"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_group_map_header_user_group_id_key" ON "user_group_map_header"("user_group_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_group_user_role_map_id_key" ON "user_group_user_role_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_id_key" ON "user_role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_role_id_key" ON "user_role"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_map_id_key" ON "user_role_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "floor_id_key" ON "floor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "floor_floor_id_key" ON "floor"("floor_id");

-- CreateIndex
CREATE UNIQUE INDEX "house_keeper_id_key" ON "house_keeper"("id");

-- CreateIndex
CREATE UNIQUE INDEX "house_keeper_housekeeper_id_key" ON "house_keeper"("housekeeper_id");

-- CreateIndex
CREATE UNIQUE INDEX "result_cleanliness_id_key" ON "result_cleanliness"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ma_car_car_id_key" ON "ma_car"("car_id");

-- CreateIndex
CREATE UNIQUE INDEX "ma_car_type_id_key" ON "ma_car_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ma_car_book_id_key" ON "ma_car_book"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ma_car_wrapup_id_key" ON "ma_car_wrapup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ma_car_wrapup_car_wrapup_id_key" ON "ma_car_wrapup"("car_wrapup_id");

-- CreateIndex
CREATE UNIQUE INDEX "ma_car_wrapup_image_idwarpup_image_key" ON "ma_car_wrapup_image"("idwarpup_image");

-- CreateIndex
CREATE UNIQUE INDEX "ma_task_id_key" ON "ma_task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ma_task_refTaskId_key" ON "ma_task"("refTaskId");

-- CreateIndex
CREATE UNIQUE INDEX "ma_task_files_id_key" ON "ma_task_files"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ma_type_id_key" ON "ma_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_room_room_id_key" ON "master_room"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "master_room_type_id_key" ON "master_room_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "booking_room_id_key" ON "booking_room"("id");

-- CreateIndex
CREATE UNIQUE INDEX "department_id_key" ON "department"("id");

-- CreateIndex
CREATE UNIQUE INDEX "department_depart_id_key" ON "department"("depart_id");

-- CreateIndex
CREATE UNIQUE INDEX "department_depart_name_key" ON "department"("depart_name");

-- CreateIndex
CREATE UNIQUE INDEX "organize_chart_id_key" ON "organize_chart"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organize_chart_position_id_key" ON "organize_chart"("position_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_map_organize_chart_id_key" ON "user_map_organize_chart"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contract_company_id_key" ON "contract_company"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_address_id_key" ON "customer_address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_branch_id_key" ON "customer_branch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_contact_id_key" ON "customer_contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_group_id_key" ON "customer_group"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_detail_id_key" ON "customer_detail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_detail_sub_id_key" ON "customer_detail_sub"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_type_group_id_key" ON "customer_type_group"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_responsible_id_key" ON "customer_responsible"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_product_id_key" ON "customer_product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_type_id_key" ON "customer_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_files_id_key" ON "customers_files"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_project_id_key" ON "customer_project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_project_product_map_id_key" ON "customer_project_product_map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_project_task_id_key" ON "customer_project_task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_project_ticket_id_key" ON "customer_project_ticket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_expense_id_key" ON "ticket_expense"("id");

-- CreateIndex
CREATE UNIQUE INDEX "expense_type_id_key" ON "expense_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "expense_type_expense_code_key" ON "expense_type"("expense_code");

-- CreateIndex
CREATE UNIQUE INDEX "customer_channel_type_id_key" ON "customer_channel_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_job_type_id_key" ON "customer_job_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_priority_id_key" ON "customer_priority"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_request_type_id_key" ON "customer_request_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_work_type_id_key" ON "customer_work_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_history_logs_id_key" ON "ticket_history_logs"("id");

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_vender_id_fkey" FOREIGN KEY ("vender_id") REFERENCES "vender"("vender_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_leave_file" ADD CONSTRAINT "data_leave_file_data_leave_id_fkey" FOREIGN KEY ("data_leave_id") REFERENCES "data_leave"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_recieve" ADD CONSTRAINT "file_recieve_inventory_lot_id_fkey" FOREIGN KEY ("inventory_lot_id") REFERENCES "inventory_lot"("inventorylot_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_location" ADD CONSTRAINT "images_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_ghs" ADD CONSTRAINT "images_ghs_images_ghs_id_fkey" FOREIGN KEY ("images_ghs_id") REFERENCES "master_ghs_type"("ghs_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_image" ADD CONSTRAINT "news_image_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "information_news"("news_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_template" ADD CONSTRAINT "email_template_type_fkey" FOREIGN KEY ("type") REFERENCES "email_template_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_template_fields" ADD CONSTRAINT "email_template_fields_id_template_type_fkey" FOREIGN KEY ("id_template_type") REFERENCES "email_template_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_lot" ADD CONSTRAINT "inventory_lot_inventory_stock_id_fkey" FOREIGN KEY ("inventory_stock_id") REFERENCES "inventory_stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_stock" ADD CONSTRAINT "inventory_stock_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_stock" ADD CONSTRAINT "inventory_stock_master_product_id_fkey" FOREIGN KEY ("master_product_id") REFERENCES "master_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_user_group_map" ADD CONSTRAINT "location_user_group_map_user_group_id_fkey" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_user_group_map" ADD CONSTRAINT "location_user_group_map_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_holidays" ADD CONSTRAINT "master_holidays_master_holidays_year_id_fkey" FOREIGN KEY ("master_holidays_year_id") REFERENCES "master_holidays_year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product" ADD CONSTRAINT "master_product_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product" ADD CONSTRAINT "master_product_master_product_group_id_fkey" FOREIGN KEY ("master_product_group_id") REFERENCES "master_product_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product" ADD CONSTRAINT "master_product_master_hazardtype_id_fkey" FOREIGN KEY ("master_hazardtype_id") REFERENCES "master_hazard_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_details" ADD CONSTRAINT "master_product_details_master_product_id_fkey" FOREIGN KEY ("master_product_id") REFERENCES "master_product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_images" ADD CONSTRAINT "master_product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "master_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_files" ADD CONSTRAINT "master_product_files_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "master_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_ghs_map" ADD CONSTRAINT "master_product_ghs_map_ghs_id_fkey" FOREIGN KEY ("ghs_id") REFERENCES "master_ghs_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_ghs_map" ADD CONSTRAINT "master_product_ghs_map_master_product_id_fkey" FOREIGN KEY ("master_product_id") REFERENCES "master_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_hazard_map" ADD CONSTRAINT "master_product_hazard_map_hazrd_id_fkey" FOREIGN KEY ("hazrd_id") REFERENCES "master_hazard_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_hazard_map" ADD CONSTRAINT "master_product_hazard_map_masterProductId_fkey" FOREIGN KEY ("masterProductId") REFERENCES "master_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_group" ADD CONSTRAINT "master_product_group_master_product_categories_id_fkey" FOREIGN KEY ("master_product_categories_id") REFERENCES "master_product_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_group_map_type" ADD CONSTRAINT "master_product_group_map_type_master_product_group_id_fkey" FOREIGN KEY ("master_product_group_id") REFERENCES "master_product_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_location_map" ADD CONSTRAINT "master_product_location_map_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_product_location_map" ADD CONSTRAINT "master_product_location_map_master_product_id_fkey" FOREIGN KEY ("master_product_id") REFERENCES "master_product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_master_actionstatus_id_fkey" FOREIGN KEY ("master_actionstatus_id") REFERENCES "master_action_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_list" ADD CONSTRAINT "request_list_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_lot" ADD CONSTRAINT "order_lot_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_lot" ADD CONSTRAINT "order_lot_master_product_id_fkey" FOREIGN KEY ("master_product_id") REFERENCES "master_product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_lot" ADD CONSTRAINT "order_lot_inventory_lot_id_fkey" FOREIGN KEY ("inventory_lot_id") REFERENCES "inventory_lot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_rule_map" ADD CONSTRAINT "profile_rule_map_master_rule_id_fkey" FOREIGN KEY ("master_rule_id") REFERENCES "master_rule"("rule_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_rule_map" ADD CONSTRAINT "profile_rule_map_profile_rule_id_fkey" FOREIGN KEY ("profile_rule_id") REFERENCES "profile_rule"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_profile_map" ADD CONSTRAINT "role_profile_map_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "user_role"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_profile_map" ADD CONSTRAINT "role_profile_map_profile_rule_id_fkey" FOREIGN KEY ("profile_rule_id") REFERENCES "profile_rule"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_profile_map" ADD CONSTRAINT "role_profile_map_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type_leave_disabled_map" ADD CONSTRAINT "type_leave_disabled_map_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type_leave_disabled_map" ADD CONSTRAINT "type_leave_disabled_map_master_type_leave_id_fkey" FOREIGN KEY ("master_type_leave_id") REFERENCES "master_typeleave"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_owner_group_id_fkey" FOREIGN KEY ("owner_group_id") REFERENCES "user_group"("group_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "master_position"("pos_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_map_organize" ADD CONSTRAINT "user_map_organize_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_map_organize" ADD CONSTRAINT "user_map_organize_organized_id_fkey" FOREIGN KEY ("organized_id") REFERENCES "organized"("organized_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_map_organize" ADD CONSTRAINT "user_map_organize_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "user_group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organize_map_groupowner" ADD CONSTRAINT "organize_map_groupowner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organize_map_groupowner" ADD CONSTRAINT "organize_map_groupowner_organized_id_fkey" FOREIGN KEY ("organized_id") REFERENCES "organized"("organized_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organize_map_groupowner" ADD CONSTRAINT "organize_map_groupowner_owner_group_id_fkey" FOREIGN KEY ("owner_group_id") REFERENCES "user_group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organize_map_group" ADD CONSTRAINT "organize_map_group_organize_id_fkey" FOREIGN KEY ("organize_id") REFERENCES "organized"("organized_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organize_map_group" ADD CONSTRAINT "organize_map_group_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "user_group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_parent_group_id_fkey" FOREIGN KEY ("parent_group_id") REFERENCES "user_group"("group_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_organized_group_id_fkey" FOREIGN KEY ("organized_group_id") REFERENCES "organized"("organized_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group_map" ADD CONSTRAINT "user_group_map_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group_map" ADD CONSTRAINT "user_group_map_user_group_id_fkey" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group_map_header" ADD CONSTRAINT "user_group_map_header_user_group_id_fkey" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group_user_role_map" ADD CONSTRAINT "user_group_user_role_map_user_group_id_fkey" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group_user_role_map" ADD CONSTRAINT "user_group_user_role_map_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_role"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_organized_group_id_fkey" FOREIGN KEY ("organized_group_id") REFERENCES "organized"("organized_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role_map" ADD CONSTRAINT "user_role_map_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "user_role"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role_map" ADD CONSTRAINT "user_role_map_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_cleanliness" ADD CONSTRAINT "result_cleanliness_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floor"("floor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_cleanliness" ADD CONSTRAINT "result_cleanliness_housekeeper_id_fkey" FOREIGN KEY ("housekeeper_id") REFERENCES "house_keeper"("housekeeper_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ma_car_book" ADD CONSTRAINT "ma_car_book_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "ma_car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ma_car_wrapup" ADD CONSTRAINT "ma_car_wrapup_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "ma_car"("car_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ma_car_wrapup_image" ADD CONSTRAINT "ma_car_wrapup_image_car_wrapup_id_fkey" FOREIGN KEY ("car_wrapup_id") REFERENCES "ma_car_wrapup"("car_wrapup_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ma_task" ADD CONSTRAINT "ma_task_refTaskId_fkey" FOREIGN KEY ("refTaskId") REFERENCES "ma_task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ma_task_files" ADD CONSTRAINT "ma_task_files_ma_task_id_fkey" FOREIGN KEY ("ma_task_id") REFERENCES "ma_task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_room" ADD CONSTRAINT "master_room_masterRoomTypeId_fkey" FOREIGN KEY ("masterRoomTypeId") REFERENCES "master_room_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_room" ADD CONSTRAINT "booking_room_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "master_room"("room_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organize_chart" ADD CONSTRAINT "organize_chart_parent_position_id_fkey" FOREIGN KEY ("parent_position_id") REFERENCES "organize_chart"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_map_organize_chart" ADD CONSTRAINT "user_map_organize_chart_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "organize_chart"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_map_organize_chart" ADD CONSTRAINT "user_map_organize_chart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_address" ADD CONSTRAINT "customer_address_customer_branch_id_fkey" FOREIGN KEY ("customer_branch_id") REFERENCES "customer_branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_branch" ADD CONSTRAINT "customer_branch_customer_detail_sub_id_fkey" FOREIGN KEY ("customer_detail_sub_id") REFERENCES "customer_detail_sub"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_branch" ADD CONSTRAINT "customer_branch_customer_detail_id_fkey" FOREIGN KEY ("customer_detail_id") REFERENCES "customer_detail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_contact" ADD CONSTRAINT "customer_contact_customer_branch_id_fkey" FOREIGN KEY ("customer_branch_id") REFERENCES "customer_branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_detail" ADD CONSTRAINT "customer_detail_customer_group_id_fkey" FOREIGN KEY ("customer_group_id") REFERENCES "customer_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_detail_sub" ADD CONSTRAINT "customer_detail_sub_customer_detail_id_fkey" FOREIGN KEY ("customer_detail_id") REFERENCES "customer_detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers_files" ADD CONSTRAINT "customers_files_customer_project_ticket_id_fkey" FOREIGN KEY ("customer_project_ticket_id") REFERENCES "customer_project_ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_project" ADD CONSTRAINT "customer_project_customerBranchId_fkey" FOREIGN KEY ("customerBranchId") REFERENCES "customer_branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_project" ADD CONSTRAINT "customer_project_contract_company_id_fkey" FOREIGN KEY ("contract_company_id") REFERENCES "contract_company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_project_product_map" ADD CONSTRAINT "customer_project_product_map_customer_project_id_fkey" FOREIGN KEY ("customer_project_id") REFERENCES "customer_project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_project_product_map" ADD CONSTRAINT "customer_project_product_map_customer_product_id_fkey" FOREIGN KEY ("customer_product_id") REFERENCES "customer_product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_project_task" ADD CONSTRAINT "customer_project_task_customer_project_id_fkey" FOREIGN KEY ("customer_project_id") REFERENCES "customer_project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_project_ticket" ADD CONSTRAINT "customer_project_ticket_customerProjectTaskId_fkey" FOREIGN KEY ("customerProjectTaskId") REFERENCES "customer_project_task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_project_ticket" ADD CONSTRAINT "customer_project_ticket_customer_project_id_fkey" FOREIGN KEY ("customer_project_id") REFERENCES "customer_project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_expense" ADD CONSTRAINT "ticket_expense_expense_code_fkey" FOREIGN KEY ("expense_code") REFERENCES "expense_type"("expense_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_expense" ADD CONSTRAINT "ticket_expense_customer_project_ticketId_fkey" FOREIGN KEY ("customer_project_ticketId") REFERENCES "customer_project_ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_job_type" ADD CONSTRAINT "customer_job_type_customer_request_type_id_fkey" FOREIGN KEY ("customer_request_type_id") REFERENCES "customer_request_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_history_logs" ADD CONSTRAINT "ticket_history_logs_customer_project_ticket_id_fkey" FOREIGN KEY ("customer_project_ticket_id") REFERENCES "customer_project_ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
