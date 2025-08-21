// Dummy data for Travel Package Booking System

export const users = [
  // Customers
  {
    UserID: 1,
    Name: "John Smith",
    Email: "john.smith@email.com",
    Password: "password123",
    Role: "customer",
    ContactNumber: "+1-555-0101",
    Approval: "approved"
  },
  {
    UserID: 2,
    Name: "Sarah Johnson",
    Email: "sarah.johnson@email.com",
    Password: "password123",
    Role: "customer",
    ContactNumber: "+1-555-0102",
    Approval: "approved"
  },
  {
    UserID: 3,
    Name: "Mike Davis",
    Email: "mike.davis@email.com",
    Password: "password123",
    Role: "customer",
    ContactNumber: "+1-555-0103",
    Approval: "approved"
  },
  {
    UserID: 4,
    Name: "Emily Wilson",
    Email: "emily.wilson@email.com",
    Password: "password123",
    Role: "customer",
    ContactNumber: "+1-555-0104",
    Approval: "approved"
  },
  {
    UserID: 5,
    Name: "David Brown",
    Email: "david.brown@email.com",
    Password: "password123",
    Role: "customer",
    ContactNumber: "+1-555-0105",
    Approval: "approved"
  },
  {
    UserID: 6,
    Name: "Lisa Garcia",
    Email: "lisa.garcia@email.com",
    Password: "password123",
    Role: "customer",
    ContactNumber: "+1-555-0106",
    Approval: "approved"
  },
  // Agents
  {
    UserID: 7,
    Name: "Agent Alex",
    Email: "alex.agent@travel.com",
    Password: "agent123",
    Role: "agent",
    ContactNumber: "+1-555-0201",
    Approval: "approved"
  },
  {
    UserID: 8,
    Name: "Agent Maria",
    Email: "maria.agent@travel.com",
    Password: "agent123",
    Role: "agent",
    ContactNumber: "+1-555-0202",
    Approval: "approved"
  },
  {
    UserID: 9,
    Name: "Agent Tom",
    Email: "tom.agent@travel.com",
    Password: "agent123",
    Role: "agent",
    ContactNumber: "+1-555-0203",
    Approval: "approved"
  },
  // Admin
  {
    UserID: 10,
    Name: "Admin User",
    Email: "admin@travel.com",
    Password: "admin123",
    Role: "admin",
    ContactNumber: "+1-555-0301",
    Approval: "approved"
  }
];

export const travelPackages = [
  {
    PackageID: 1,
    Title: "Paris Adventure",
    Description: "Explore the City of Light with guided tours of Eiffel Tower, Louvre Museum, and Seine River cruise.",
    Duration: "5 days",
    Price: 1299.99,
    IncludedServices: "Hotel, Flights, Guided Tours, Breakfast, Airport Transfer",
    AgentID: 7,
    Image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&auto=format"
  },
  {
    PackageID: 2,
    Title: "Tokyo Discovery",
    Description: "Experience Japanese culture with visits to temples, sushi making class, and bullet train experience.",
    Duration: "7 days",
    Price: 1899.99,
    IncludedServices: "Hotel, Flights, Cultural Activities, Local Guide, Transportation Pass",
    AgentID: 8,
    Image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&crop=center&auto=format"
  },
  {
    PackageID: 3,
    Title: "New York City Escape",
    Description: "Discover the Big Apple with Broadway shows, Central Park tours, and Empire State Building access.",
    Duration: "4 days",
    Price: 999.99,
    IncludedServices: "Hotel, Flights, Show Tickets, City Tours, Subway Pass",
    AgentID: 9,
    Image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop&crop=center&auto=format"
  },
  {
    PackageID: 4,
    Title: "Bali Paradise",
    Description: "Experience tropical paradise with beach resorts, temple visits, and traditional Balinese culture.",
    Duration: "6 days",
    Price: 1100.00,
    IncludedServices: "Resort, Flights, Cultural Tours, Spa Sessions, Beach Activities",
    AgentID: 7,
    Image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop&crop=center&auto=format"
  },
  {
    PackageID: 5,
    Title: "Swiss Alps Adventure",
    Description: "Mountain adventures with skiing, hiking, and breathtaking alpine scenery in the heart of Europe.",
    Duration: "8 days",
    Price: 2200.00,
    IncludedServices: "Mountain Lodge, Flights, Ski Passes, Guided Hikes, Equipment Rental",
    AgentID: 8,
    Image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&auto=format"
  },
  {
    PackageID: 6,
    Title: "Dubai Luxury",
    Description: "Luxury experience in the desert city with desert safaris, shopping, and iconic landmarks.",
    Duration: "5 days",
    Price: 1800.00,
    IncludedServices: "5-Star Hotel, Flights, Desert Safari, Shopping Tours, Burj Khalifa Access",
    AgentID: 9,
    Image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&crop=center&auto=format"
  }
];

export const bookings = [
  {
    BookingID: 1,
    UserID: 1,
    PackageID: 1,
    StartDate: "2024-03-15",
    EndDate: "2024-03-20",
    Status: "confirmed",
    PaymentID: 1
  },
  {
    BookingID: 2,
    UserID: 2,
    PackageID: 2,
    StartDate: "2024-04-10",
    EndDate: "2024-04-17",
    Status: "pending",
    PaymentID: 2
  },
  {
    BookingID: 3,
    UserID: 3,
    PackageID: 3,
    StartDate: "2024-05-05",
    EndDate: "2024-05-09",
    Status: "confirmed",
    PaymentID: 3
  },
  {
    BookingID: 4,
    UserID: 4,
    PackageID: 1,
    StartDate: "2024-06-12",
    EndDate: "2024-06-17",
    Status: "pending",
    PaymentID: 4
  },
  {
    BookingID: 5,
    UserID: 5,
    PackageID: 2,
    StartDate: "2024-07-20",
    EndDate: "2024-07-27",
    Status: "confirmed",
    PaymentID: 5
  },
  {
    BookingID: 6,
    UserID: 6,
    PackageID: 3,
    StartDate: "2024-08-15",
    EndDate: "2024-08-19",
    Status: "pending",
    PaymentID: 6
  },
  {
    BookingID: 7,
    UserID: 1,
    PackageID: 4,
    StartDate: "2024-06-15",
    EndDate: "2024-06-21",
    Status: "pending",
    PaymentID: 7
  },
  {
    BookingID: 8,
    UserID: 2,
    PackageID: 5,
    StartDate: "2024-07-10",
    EndDate: "2024-07-18",
    Status: "confirmed",
    PaymentID: 8
  },
  {
    BookingID: 9,
    UserID: 3,
    PackageID: 6,
    StartDate: "2024-08-05",
    EndDate: "2024-08-10",
    Status: "pending",
    PaymentID: 9
  }
];

export const payments = [
  {
    PaymentID: 1,
    UserID: 1,
    BookingID: 1,
    Amount: 1299.99,
    Status: "completed",
    PaymentMethod: "credit_card"
  },
  {
    PaymentID: 2,
    UserID: 2,
    BookingID: 2,
    Amount: 1899.99,
    Status: "pending",
    PaymentMethod: "paypal"
  },
  {
    PaymentID: 3,
    UserID: 3,
    BookingID: 3,
    Amount: 999.99,
    Status: "completed",
    PaymentMethod: "credit_card"
  },
  {
    PaymentID: 4,
    UserID: 4,
    BookingID: 4,
    Amount: 1299.99,
    Status: "pending",
    PaymentMethod: "paypal"
  },
  {
    PaymentID: 5,
    UserID: 5,
    BookingID: 5,
    Amount: 1899.99,
    Status: "completed",
    PaymentMethod: "credit_card"
  },
  {
    PaymentID: 6,
    UserID: 6,
    BookingID: 6,
    Amount: 999.99,
    Status: "pending",
    PaymentMethod: "paypal"
  },
  {
    PaymentID: 7,
    UserID: 1,
    BookingID: 7,
    Amount: 1100.00,
    Status: "pending",
    PaymentMethod: "credit_card"
  },
  {
    PaymentID: 8,
    UserID: 2,
    BookingID: 8,
    Amount: 2200.00,
    Status: "completed",
    PaymentMethod: "paypal"
  },
  {
    PaymentID: 9,
    UserID: 3,
    BookingID: 9,
    Amount: 1800.00,
    Status: "pending",
    PaymentMethod: "credit_card"
  }
];

export const reviews = [
  {
    ReviewID: 1,
    UserID: 1,
    PackageID: 1,
    Rating: 5,
    Comment: "Amazing experience! The Paris tour was everything I hoped for. Great guides and perfect timing.",
    Timestamp: "2024-03-25T10:30:00Z"
  },
  {
    ReviewID: 2,
    UserID: 3,
    PackageID: 3,
    Rating: 4,
    Comment: "NYC was fantastic! The Broadway show was incredible. Only wish we had more time in Central Park.",
    Timestamp: "2024-05-15T14:20:00Z"
  },
  {
    ReviewID: 3,
    UserID: 5,
    PackageID: 2,
    Rating: 5,
    Comment: "Tokyo exceeded all expectations! The cultural activities were authentic and the food was amazing.",
    Timestamp: "2024-08-05T09:15:00Z"
  },
  {
    ReviewID: 4,
    UserID: 4,
    PackageID: 4,
    Rating: 5,
    Comment: "Bali was absolutely magical! The beaches were pristine and the cultural experiences were unforgettable.",
    Timestamp: "2024-06-20T16:45:00Z"
  },
  {
    ReviewID: 5,
    UserID: 2,
    PackageID: 5,
    Rating: 4,
    Comment: "Swiss Alps were breathtaking! The hiking trails were well-maintained and the mountain views were spectacular.",
    Timestamp: "2024-07-25T11:30:00Z"
  },
  {
    ReviewID: 6,
    UserID: 6,
    PackageID: 6,
    Rating: 5,
    Comment: "Dubai luxury experience was beyond expectations! The desert safari and Burj Khalifa views were incredible.",
    Timestamp: "2024-08-12T13:20:00Z"
  }
];

export const insurance = [
  {
    InsuranceID: 1,
    UserID: 1,
    BookingID: 1,
    CoverageDetails: "Comprehensive travel insurance covering medical, trip cancellation, and baggage loss",
    Provider: "TravelSafe Insurance",
    Status: "active"
  },
  {
    InsuranceID: 2,
    UserID: 3,
    BookingID: 3,
    CoverageDetails: "Basic travel insurance covering medical emergencies and trip interruption",
    Provider: "GlobalCover Insurance",
    Status: "active"
  },
  {
    InsuranceID: 3,
    UserID: 5,
    BookingID: 5,
    CoverageDetails: "Premium travel insurance with 24/7 assistance and comprehensive coverage",
    Provider: "WorldWide Insurance",
    Status: "active"
  },
  {
    InsuranceID: 4,
    UserID: 1,
    BookingID: 7,
    CoverageDetails: "Tropical destination insurance covering medical, weather delays, and adventure activities",
    Provider: "TropicalCover Insurance",
    Status: "active"
  },
  {
    InsuranceID: 5,
    UserID: 2,
    BookingID: 8,
    CoverageDetails: "Mountain sports insurance covering skiing, hiking accidents, and altitude sickness",
    Provider: "Alpine Insurance",
    Status: "active"
  },
  {
    InsuranceID: 6,
    UserID: 3,
    BookingID: 9,
    CoverageDetails: "Luxury travel insurance with concierge services and premium coverage",
    Provider: "Elite Insurance",
    Status: "active"
  }
];

export const assistanceRequests = [
  {
    RequestID: 1,
    UserID: 2,
    IssueDescription: "Need help with visa application for Japan trip",
    Priority: "high",
    Status: "pending",
    ResolutionTime: null,
    Timestamp: "2024-03-10T10:30:00Z"
  },
  {
    RequestID: 2,
    UserID: 4,
    IssueDescription: "Flight change request due to personal emergency",
    Priority: "high",
    Status: "completed",
    ResolutionTime: "2 hours",
    Timestamp: "2024-03-08T14:20:00Z"
  },
  {
    RequestID: 3,
    UserID: 6,
    IssueDescription: "Hotel upgrade request for anniversary celebration",
    Priority: "medium",
    Status: "pending",
    ResolutionTime: null,
    Timestamp: "2024-03-12T09:15:00Z"
  }
];

// Insurance types for selection
export const insuranceTypes = [
  {
    id: 1,
    name: "Basic Coverage",
    description: "Medical emergencies and trip interruption",
    price: 49.99,
    provider: "GlobalCover Insurance"
  },
  {
    id: 2,
    name: "Standard Coverage",
    description: "Medical, trip cancellation, and baggage protection",
    price: 79.99,
    provider: "TravelSafe Insurance"
  },
  {
    id: 3,
    name: "Premium Coverage",
    description: "Comprehensive coverage with 24/7 assistance",
    price: 129.99,
    provider: "WorldWide Insurance"
  }
]; 