Create Database Supporting_projects;

CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(100) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    Phone NVARCHAR(20),
    Address NVARCHAR(255),
    IsAdmin BIT DEFAULT 0,
    IsSupplier BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100) NOT NULL,
    CategoryID INT FOREIGN KEY REFERENCES Categories(CategoryID),
    Price DECIMAL(18,2) NOT NULL,
    StockQuantity INT NOT NULL,
    Description NVARCHAR(255),
    ImageURL NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    OrderDate DATETIME DEFAULT GETDATE(),
    TotalAmount DECIMAL(18,2) NOT NULL,
    PaymentMethod NVARCHAR(50) CHECK (PaymentMethod IN ('VisaCard', 'CashOnDelivery')),
    Status NVARCHAR(50) CHECK (Status IN ('Pending', 'Shipped', 'Delivered', 'Cancelled')),
    ShippingAddress NVARCHAR(255)
);
CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    Quantity INT NOT NULL,
    Price DECIMAL(18,2) NOT NULL
);
CREATE TABLE Favorites (
    FavoriteID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE Cart (
    CartID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    Quantity INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE CustomRequests (
    RequestID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    ProductDescription NVARCHAR(255) NOT NULL,
    Status NVARCHAR(50) CHECK (Status IN ('Pending', 'InProgress', 'Completed', 'Rejected')),
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY IDENTITY(1,1),
    SupplierName NVARCHAR(100) NOT NULL,
    ContactName NVARCHAR(100),
    Phone NVARCHAR(20),
    Email NVARCHAR(255),
    Address NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE SupplierProducts (
    SupplierProductID INT PRIMARY KEY IDENTITY(1,1),
    SupplierID INT FOREIGN KEY REFERENCES Suppliers(SupplierID),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    SupplyPrice DECIMAL(18,2) NOT NULL
);
CREATE TABLE SalesStatistics (
    StatID INT PRIMARY KEY IDENTITY(1,1),
    AdminID INT FOREIGN KEY REFERENCES Users(UserID),
    Date DATE,
    TotalSales DECIMAL(18,2),
    Period NVARCHAR(20) CHECK (Period IN ('Daily', 'Weekly', 'Monthly', 'Yearly'))
);
