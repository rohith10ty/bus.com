// Comprehensive India-wide Bus Transit Data Engine (Bus.com)
// Supporting State RTCs (KSRTC, APSRTC, TSRTC, MSRTC, etc.) and premier national private operators

export const CITIES = [
  // Telangana & Andhra Pradesh
  'Hyderabad',
  'Vijayawada',
  'Visakhapatnam',
  'Tirupati',
  'Warangal',
  'Guntur',
  'Nellore',
  'Kurnool',
  'Rajahmundry',
  'Kakinada',
  'Kadapa',
  'Anantapur',
  'Karimnagar',
  'Nizamabad',

  // Karnataka
  'Bengaluru',
  'Mysuru',
  'Mangaluru',
  'Hubballi',
  'Belagavi',
  'Davanagere',
  'Udupi',
  'Shivamogga',
  'Ballari',
  'Kalaburagi',

  // Tamil Nadu & Kerala
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Tiruchirappalli',
  'Salem',
  'Puducherry',
  'Kochi',
  'Thiruvananthapuram',
  'Kozhikode',

  // Maharashtra & Goa
  'Mumbai',
  'Pune',
  'Nagpur',
  'Nashik',
  'Shirdi',
  'Kolhapur',
  'Aurangabad',
  'Solapur',
  'Goa (Panaji)',

  // Gujarat
  'Ahmedabad',
  'Surat',
  'Vadodara',
  'Rajkot',

  // North & Central India
  'Delhi',
  'Jaipur',
  'Agra',
  'Chandigarh',
  'Lucknow',
  'Kanpur',
  'Dehradun',
  'Haridwar',
  'Rishikesh',
  'Shimla',
  'Manali',
  'Amritsar',
  'Varanasi',
  'Prayagraj',
  'Udaipur',
  'Indore',
  'Bhopal',
  'Kolkata',
  'Bhubaneswar',
  'Puri',
  'Patna'
];

export const CITY_COORDINATES = {
  Hyderabad: { lat: 17.385, lng: 78.4867, state: 'Telangana', code: 'HYD' },
  Bengaluru: { lat: 12.9716, lng: 77.5946, state: 'Karnataka', code: 'BLR' },
  Chennai: { lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu', code: 'MAA' },
  Vijayawada: { lat: 16.5062, lng: 80.648, state: 'Andhra Pradesh', code: 'BZA' },
  Visakhapatnam: { lat: 17.6868, lng: 83.2185, state: 'Andhra Pradesh', code: 'VTZ' },
  Tirupati: { lat: 13.6288, lng: 79.4192, state: 'Andhra Pradesh', code: 'TPTY' },
  Warangal: { lat: 17.9689, lng: 79.5941, state: 'Telangana', code: 'WL' },
  Guntur: { lat: 16.3067, lng: 80.4365, state: 'Andhra Pradesh', code: 'GNT' },
  Nellore: { lat: 14.4426, lng: 79.9865, state: 'Andhra Pradesh', code: 'NLR' },
  Kurnool: { lat: 15.8281, lng: 78.0373, state: 'Andhra Pradesh', code: 'KNL' },
  Rajahmundry: { lat: 17.0005, lng: 81.804, state: 'Andhra Pradesh', code: 'RJY' },
  Kakinada: { lat: 16.9891, lng: 82.2475, state: 'Andhra Pradesh', code: 'COA' },
  Kadapa: { lat: 14.4673, lng: 78.8242, state: 'Andhra Pradesh', code: 'CDP' },
  Anantapur: { lat: 14.6819, lng: 77.6006, state: 'Andhra Pradesh', code: 'ATP' },
  Karimnagar: { lat: 18.4386, lng: 79.1288, state: 'Telangana', code: 'KRMR' },
  Nizamabad: { lat: 18.6725, lng: 78.0941, state: 'Telangana', code: 'NZB' },

  Mysuru: { lat: 12.2958, lng: 76.6394, state: 'Karnataka', code: 'MYS' },
  Mangaluru: { lat: 12.9141, lng: 74.856, state: 'Karnataka', code: 'IXE' },
  Hubballi: { lat: 15.3647, lng: 75.124, state: 'Karnataka', code: 'HBX' },
  Belagavi: { lat: 15.8497, lng: 74.4977, state: 'Karnataka', code: 'IXG' },
  Davanagere: { lat: 14.4644, lng: 75.9218, state: 'Karnataka', code: 'DVG' },
  Udupi: { lat: 13.3409, lng: 74.7421, state: 'Karnataka', code: 'UD' },
  Shivamogga: { lat: 13.9299, lng: 75.5681, state: 'Karnataka', code: 'SME' },
  Ballari: { lat: 15.1394, lng: 76.9214, state: 'Karnataka', code: 'BAY' },
  Kalaburagi: { lat: 17.3297, lng: 76.8343, state: 'Karnataka', code: 'GBG' },

  Coimbatore: { lat: 11.0168, lng: 76.9558, state: 'Tamil Nadu', code: 'CJB' },
  Madurai: { lat: 9.9252, lng: 78.1198, state: 'Tamil Nadu', code: 'IXM' },
  Tiruchirappalli: { lat: 10.7905, lng: 78.7047, state: 'Tamil Nadu', code: 'TRZ' },
  Salem: { lat: 11.6643, lng: 78.146, state: 'Tamil Nadu', code: 'SXV' },
  Puducherry: { lat: 11.9416, lng: 79.8083, state: 'Puducherry', code: 'PDY' },
  Kochi: { lat: 9.9312, lng: 76.2673, state: 'Kerala', code: 'COK' },
  Thiruvananthapuram: { lat: 8.5241, lng: 76.9366, state: 'Kerala', code: 'TRV' },
  Kozhikode: { lat: 11.2588, lng: 75.7804, state: 'Kerala', code: 'CCJ' },

  Mumbai: { lat: 19.076, lng: 72.8777, state: 'Maharashtra', code: 'BOM' },
  Pune: { lat: 18.5204, lng: 73.8567, state: 'Maharashtra', code: 'PNQ' },
  Nagpur: { lat: 21.1458, lng: 79.0882, state: 'Maharashtra', code: 'NAG' },
  Nashik: { lat: 19.9975, lng: 73.7898, state: 'Maharashtra', code: 'ISK' },
  Shirdi: { lat: 19.7667, lng: 74.4764, state: 'Maharashtra', code: 'SAG' },
  Kolhapur: { lat: 16.705, lng: 74.2433, state: 'Maharashtra', code: 'KLH' },
  Aurangabad: { lat: 19.8762, lng: 75.3433, state: 'Maharashtra', code: 'IXU' },
  Solapur: { lat: 17.6599, lng: 75.9064, state: 'Maharashtra', code: 'SLP' },
  'Goa (Panaji)': { lat: 15.4909, lng: 73.8278, state: 'Goa', code: 'GOI' },

  Ahmedabad: { lat: 23.0225, lng: 72.5714, state: 'Gujarat', code: 'AMD' },
  Surat: { lat: 21.1702, lng: 72.8311, state: 'Gujarat', code: 'ST' },
  Vadodara: { lat: 22.3072, lng: 73.1812, state: 'Gujarat', code: 'BDQ' },
  Rajkot: { lat: 22.3039, lng: 70.8022, state: 'Gujarat', code: 'RAJ' },

  Delhi: { lat: 28.6139, lng: 77.209, state: 'Delhi', code: 'DEL' },
  Jaipur: { lat: 26.9124, lng: 75.7873, state: 'Rajasthan', code: 'JAI' },
  Agra: { lat: 27.1767, lng: 78.0081, state: 'Uttar Pradesh', code: 'AGR' },
  Chandigarh: { lat: 30.7333, lng: 76.7794, state: 'Punjab/Haryana', code: 'IXC' },
  Lucknow: { lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh', code: 'LKO' },
  Kanpur: { lat: 26.4499, lng: 80.3319, state: 'Uttar Pradesh', code: 'KNP' },
  Dehradun: { lat: 30.3165, lng: 78.0322, state: 'Uttarakhand', code: 'DED' },
  Haridwar: { lat: 29.9457, lng: 78.1642, state: 'Uttarakhand', code: 'HW' },
  Rishikesh: { lat: 30.0869, lng: 78.2676, state: 'Uttarakhand', code: 'RKSH' },
  Shimla: { lat: 31.1048, lng: 77.1734, state: 'Himachal Pradesh', code: 'SLV' },
  Manali: { lat: 32.2432, lng: 77.1892, state: 'Himachal Pradesh', code: 'KUU' },
  Amritsar: { lat: 31.634, lng: 74.8723, state: 'Punjab', code: 'ATQ' },
  Varanasi: { lat: 25.3176, lng: 82.9739, state: 'Uttar Pradesh', code: 'VNS' },
  Prayagraj: { lat: 25.4358, lng: 81.8463, state: 'Uttar Pradesh', code: 'PRYJ' },
  Udaipur: { lat: 24.5854, lng: 73.7125, state: 'Rajasthan', code: 'UDR' },
  Indore: { lat: 22.7196, lng: 75.8577, state: 'Madhya Pradesh', code: 'IDR' },
  Bhopal: { lat: 23.2599, lng: 77.4126, state: 'Madhya Pradesh', code: 'BHO' },
  Kolkata: { lat: 22.5726, lng: 88.3639, state: 'West Bengal', code: 'CCU' },
  Bhubaneswar: { lat: 20.2961, lng: 85.8245, state: 'Odisha', code: 'BBI' },
  Puri: { lat: 19.8135, lng: 85.8312, state: 'Odisha', code: 'PURI' },
  Patna: { lat: 25.5941, lng: 85.1376, state: 'Bihar', code: 'PAT' }
};

export const CITY_STOPS = {
  Hyderabad: {
    boarding: [
      { id: 'hyd-b1', name: 'MGBS Central Bus Station', landmark: 'Imlibun Complex Platform 12' },
      { id: 'hyd-b2', name: 'Miyapur Metro Station', landmark: 'Opposite Metro Pillar 612' },
      { id: 'hyd-b3', name: 'Gachibowli ORR Junction', landmark: 'Outer Ring Road Bus Bay' },
      { id: 'hyd-b4', name: 'Secunderabad Paradise', landmark: 'Near Fire Station & Metro' },
      { id: 'hyd-b5', name: 'LB Nagar Ring Road', landmark: 'Near Orange Hospital' }
    ],
    dropping: [
      { id: 'hyd-d1', name: 'Ameerpet Metro Station', landmark: 'Near Big Bazaar' },
      { id: 'hyd-d2', name: 'Gachibowli ORR Exit', landmark: 'Near Bio-Diversity Park' },
      { id: 'hyd-d3', name: 'MGBS Central Terminal', landmark: 'Platform 4 Arrival Gate' },
      { id: 'hyd-d4', name: 'KPHB Colony', landmark: 'Opposite Forum Sujana Mall' }
    ]
  },
  Bengaluru: {
    boarding: [
      { id: 'blr-b1', name: 'Majestic Kempegowda Bus Station', landmark: 'Terminal 1 Intercity Bay' },
      { id: 'blr-b2', name: 'Silk Board Junction', landmark: 'Central Silk Board Flyover Entry' },
      { id: 'blr-b3', name: 'Madiwala St. Johns', landmark: 'Opposite Total Mall' },
      { id: 'blr-b4', name: 'Electronic City Tollgate', landmark: 'Phase 1 Toll Plaza' },
      { id: 'blr-b5', name: 'Hebbal Flyover', landmark: 'Esteem Mall Skywalk' }
    ],
    dropping: [
      { id: 'blr-d1', name: 'Hebbal Esteem Mall', landmark: 'Skywalk Service Road' },
      { id: 'blr-d2', name: 'Majestic Station Terminal', landmark: 'Gate 4 Arrival' },
      { id: 'blr-d3', name: 'Silk Board Flyover', landmark: 'Hosur Road Junction' },
      { id: 'blr-d4', name: 'Electronic City Phase 1', landmark: 'Infosys Gate Exit' }
    ]
  },
  Chennai: {
    boarding: [
      { id: 'maa-b1', name: 'CMBT Koyambedu', landmark: 'Platform 6 Intercity Terminal' },
      { id: 'maa-b2', name: 'Guindy Kathipara', landmark: 'Near Metro Station' },
      { id: 'maa-b3', name: 'Tambaram Sanatorium', landmark: 'MEPZ Bus Stop' }
    ],
    dropping: [
      { id: 'maa-d1', name: 'Koyambedu CMBT', landmark: 'Omni Bus Stand' },
      { id: 'maa-d2', name: 'Guindy Race Course', landmark: 'Main Road' },
      { id: 'maa-d3', name: 'Perungalathur', landmark: 'High Road Exit' }
    ]
  },
  Vijayawada: {
    boarding: [
      { id: 'bza-b1', name: 'PNBS Pandit Nehru Bus Station', landmark: 'RTC Central Complex' },
      { id: 'bza-b2', name: 'Benz Circle', landmark: 'Near Jyothi Mahal' },
      { id: 'bza-b3', name: 'Ramavarappadu Ring', landmark: 'NH-16 Flyover Junction' }
    ],
    dropping: [
      { id: 'bza-d1', name: 'PNBS Central Terminal', landmark: 'Main Bus Bay' },
      { id: 'bza-d2', name: 'Benz Circle', landmark: 'Subway Center' },
      { id: 'bza-d3', name: 'Varadhi Krishna Bridge', landmark: 'Krishna River Bridge Exit' }
    ]
  },
  Visakhapatnam: {
    boarding: [
      { id: 'vtz-b1', name: 'Dwaraka Bus Station (RTC Complex)', landmark: 'Platform 1' },
      { id: 'vtz-b2', name: 'Gajuwaka Junction', landmark: 'Near Old Bus Stop' },
      { id: 'vtz-b3', name: 'Maddilapalem', landmark: 'Near AU Campus' }
    ],
    dropping: [
      { id: 'vtz-d1', name: 'Dwaraka RTC Complex', landmark: 'Arrival Gate' },
      { id: 'vtz-d2', name: 'NAD Kotha Road', landmark: 'Flyover Junction' },
      { id: 'vtz-d3', name: 'Gurudwara Junction', landmark: 'Highway Cross' }
    ]
  },
  Tirupati: {
    boarding: [
      { id: 'tpy-b1', name: 'Central Bus Station', landmark: 'Opposite Railway Station' },
      { id: 'tpy-b2', name: 'Alipiri Tollgate', landmark: 'Balaji Link Road' },
      { id: 'tpy-b3', name: 'RTC Central Complex', landmark: 'Balaji Colony' }
    ],
    dropping: [
      { id: 'tpy-d1', name: 'Central Bus Stand', landmark: 'APSRTC Terminal' },
      { id: 'tpy-d2', name: 'Alipiri Entrance', landmark: 'Pilgrim Center' }
    ]
  },
  Warangal: {
    boarding: [
      { id: 'wl-b1', name: 'Hanamkonda TSRTC Bus Station', landmark: 'Main Depo Platform 2' },
      { id: 'wl-b2', name: 'Kazipet Railway Station Cross', landmark: 'Overbridge Road' },
      { id: 'wl-b3', name: 'Subedari Circle', landmark: 'Near Collectorate' }
    ],
    dropping: [
      { id: 'wl-d1', name: 'Hanamkonda Central Terminal', landmark: 'Arrival Gate' },
      { id: 'wl-d2', name: 'Kazipet Junction', landmark: 'Station Road' }
    ]
  },
  Guntur: {
    boarding: [
      { id: 'gnt-b1', name: 'NTR Central Bus Station', landmark: 'Main RTC Complex' },
      { id: 'gnt-b2', name: 'Auto Nagar Junction', landmark: 'Highway NH-16' },
      { id: 'gnt-b3', name: 'Gujjanagundla', landmark: 'Ring Road Circle' }
    ],
    dropping: [
      { id: 'gnt-d1', name: 'NTR Central Bus Terminal', landmark: 'Gate 2' },
      { id: 'gnt-d2', name: 'Amaravati Road Bypass', landmark: 'Service Lane' }
    ]
  },
  Kurnool: {
    boarding: [
      { id: 'knl-b1', name: 'Kurnool Central RTC Bus Station', landmark: 'Bellary Chowrasta' },
      { id: 'knl-b2', name: 'Nandyal Checkpost', landmark: 'NH-44 Flyover' },
      { id: 'knl-b3', name: 'C-Camp Centre', landmark: 'Near Rajvihar' }
    ],
    dropping: [
      { id: 'knl-d1', name: 'Central RTC Terminal', landmark: 'Platform 3' },
      { id: 'knl-d2', name: 'Bellary Chowrasta', landmark: 'City Entrance' }
    ]
  },
  Nellore: {
    boarding: [
      { id: 'nlr-b1', name: 'Nellore RTC Bus Stand', landmark: 'Main Highway Gate' },
      { id: 'nlr-b2', name: 'Mini Bypass Junction', landmark: 'Near VR College' },
      { id: 'nlr-b3', name: 'Ramalingapuram', landmark: 'Trunk Road' }
    ],
    dropping: [
      { id: 'nlr-d1', name: 'Nellore Central Station', landmark: 'Main Arrival Bay' },
      { id: 'nlr-d2', name: 'Atmakur Bus Stand', landmark: 'City Bypass' }
    ]
  },
  Mumbai: {
    boarding: [
      { id: 'bom-b1', name: 'Borivali West Gokul Hotel', landmark: 'Near Shimpoli Signal' },
      { id: 'bom-b2', name: 'Dadar TT Circle', landmark: 'Asiad Bus Stand' },
      { id: 'bom-b3', name: 'Vashi Plaza', landmark: 'Near Highway Underpass' },
      { id: 'bom-b4', name: 'Andheri East Bisleri', landmark: 'Western Express Highway' }
    ],
    dropping: [
      { id: 'bom-d1', name: 'Vashi Highway Toll', landmark: 'Navi Mumbai Entry' },
      { id: 'bom-d2', name: 'Dadar Asiad Stand', landmark: 'Pritam Hotel Cross' },
      { id: 'bom-d3', name: 'Borivali National Park', landmark: 'Western Express Highway' }
    ]
  },
  Pune: {
    boarding: [
      { id: 'pnq-b1', name: 'Swargate ST Stand', landmark: 'Near Jedhe Chowk' },
      { id: 'pnq-b2', name: 'Wakad Ginger Hotel', landmark: 'Hinjewadi Flyover' },
      { id: 'pnq-b3', name: 'Shivajinagar Bus Stand', landmark: 'Near Railway Station' },
      { id: 'pnq-b4', name: 'Viman Nagar', landmark: 'Near Airport Road Corner' }
    ],
    dropping: [
      { id: 'pnq-d1', name: 'Wakad Hinjewadi Bridge', landmark: 'Bypass Road' },
      { id: 'pnq-d2', name: 'Shivajinagar Pune', landmark: 'Court Chowk' },
      { id: 'pnq-d3', name: 'Swargate Bus Terminal', landmark: 'Main Gate' }
    ]
  },
  'Goa (Panaji)': {
    boarding: [
      { id: 'goa-b1', name: 'Panaji KTC Bus Stand', landmark: 'Main Interstate Terminal' },
      { id: 'goa-b2', name: 'Mapusa Bus Stand', landmark: 'KTC Depot' },
      { id: 'goa-b3', name: 'Margao KTC Bus Station', landmark: 'Near Railway Cross' }
    ],
    dropping: [
      { id: 'goa-d1', name: 'Panaji KTC Terminal', landmark: 'Mandovi Bridge Side' },
      { id: 'goa-d2', name: 'Margao KTC Station', landmark: 'South Goa Cross' },
      { id: 'goa-d3', name: 'Mapusa Court Circle', landmark: 'Highway Exit' }
    ]
  },
  Delhi: {
    boarding: [
      { id: 'del-b1', name: 'Kashmere Gate ISBT', landmark: 'Maharana Pratap Terminal' },
      { id: 'del-b2', name: 'Anand Vihar ISBT', landmark: 'Near Metro Station Gate 1' },
      { id: 'del-b3', name: 'Dhaula Kuan', landmark: 'Ring Road Flyover' },
      { id: 'del-b4', name: 'Majnu Ka Tilla', landmark: 'Tibetan Market Flyover' }
    ],
    dropping: [
      { id: 'del-d1', name: 'Kashmere Gate ISBT', landmark: 'Main Arrival Bay' },
      { id: 'del-d2', name: 'Anand Vihar', landmark: 'EDMC Office Road' },
      { id: 'del-d3', name: 'Dhaula Kuan Metro', landmark: 'Airport Express Exit' }
    ]
  },
  Jaipur: {
    boarding: [
      { id: 'jai-b1', name: 'Sindhi Camp Central Bus Stand', landmark: 'Station Road' },
      { id: 'jai-b2', name: 'Narayan Singh Circle', landmark: 'City Center' },
      { id: 'jai-b3', name: '200 Feet Bypass', landmark: 'Ajmer Road' }
    ],
    dropping: [
      { id: 'jai-d1', name: 'Sindhi Camp Terminal', landmark: 'RSRTC Bay' },
      { id: 'jai-d2', name: 'Transport Nagar', landmark: 'Delhi Road Bypass' }
    ]
  },
  Mysuru: {
    boarding: [
      { id: 'mys-b1', name: 'Mysuru KSRTC Suburb Stand', landmark: 'Bangalore-Nilgiri Road' },
      { id: 'mys-b2', name: 'Infosys Gate Hebbal', landmark: 'Industrial Area' }
    ],
    dropping: [
      { id: 'mys-d1', name: 'Suburb Bus Terminal', landmark: 'Main Platform' },
      { id: 'mys-d2', name: 'Columbia Asia Junction', landmark: 'Ring Road' }
    ]
  },
  Coimbatore: {
    boarding: [
      { id: 'cjb-b1', name: 'Gandhipuram Central Bus Stand', landmark: 'Cross Cut Road' },
      { id: 'cjb-b2', name: 'Omni Bus Stand', landmark: 'Sathy Road' },
      { id: 'cjb-b3', name: 'KMCH Avinashi Road', landmark: 'Airport Junction' }
    ],
    dropping: [
      { id: 'cjb-d1', name: 'Gandhipuram Terminal', landmark: 'Interstate Bay' },
      { id: 'cjb-d2', name: 'Peelamedu Airport Road', landmark: 'Main Cross' }
    ]
  },
  Madurai: {
    boarding: [
      { id: 'ixm-b1', name: 'Mattuthavani Integrated Terminal (MIBT)', landmark: 'Platform 3' },
      { id: 'ixm-b2', name: 'Periyar Bus Stand', landmark: 'Station Road' }
    ],
    dropping: [
      { id: 'ixm-d1', name: 'Mattuthavani MIBT', landmark: 'Main Arrival Gate' },
      { id: 'ixm-d2', name: 'Arapalayam Stand', landmark: 'Dindigul Road' }
    ]
  },
  Ahmedabad: {
    boarding: [
      { id: 'amd-b1', name: 'Geeta Mandir Central Bus Stand', landmark: 'ST Depot' },
      { id: 'amd-b2', name: 'Paldi Bus Stand', landmark: 'Near Crosswords' },
      { id: 'amd-b3', name: 'Iscon Cross Roads', landmark: 'SG Highway' }
    ],
    dropping: [
      { id: 'amd-d1', name: 'Geeta Mandir ST Stand', landmark: 'Arrival Platform' },
      { id: 'amd-d2', name: 'CTM Char Rasta', landmark: 'Expressway Exit' }
    ]
  },
  Kolkata: {
    boarding: [
      { id: 'ccu-b1', name: 'Esplanade Bus Terminus', landmark: 'Dharmatala Central' },
      { id: 'ccu-b2', name: 'Karunamoyee Bus Station', landmark: 'Salt Lake Sector 2' },
      { id: 'ccu-b3', name: 'Babughat Stand', landmark: 'Strand Road' }
    ],
    dropping: [
      { id: 'ccu-d1', name: 'Esplanade Central', landmark: 'Curzon Park' },
      { id: 'ccu-d2', name: 'Howrah Station Forecourt', landmark: 'Station Road' }
    ]
  }
};

export const POPULAR_ROUTES = [
  { from: 'Hyderabad', to: 'Bengaluru', price: 999, duration: '08h 15m', tag: 'High Frequency • 68 Buses' },
  { from: 'Bengaluru', to: 'Chennai', price: 549, duration: '05h 45m', tag: 'Top Expressway • 54 Buses' },
  { from: 'Hyderabad', to: 'Vijayawada', price: 499, duration: '04h 30m', tag: 'Fast Corridor • 80 Buses' },
  { from: 'Mumbai', to: 'Pune', price: 349, duration: '03h 10m', tag: 'Expressway • 110 Buses' },
  { from: 'Bengaluru', to: 'Goa (Panaji)', price: 1199, duration: '11h 00m', tag: 'Scenic Sleeper • 24 Buses' },
  { from: 'Delhi', to: 'Jaipur', price: 449, duration: '04h 50m', tag: 'EV & Deluxe • 60 Buses' },
  { from: 'Hyderabad', to: 'Tirupati', price: 849, duration: '08h 30m', tag: 'Pilgrim Express • 42 Buses' },
  { from: 'Chennai', to: 'Madurai', price: 699, duration: '07h 15m', tag: 'Overnight Superfast' }
];

export const DECK_LAYOUT = {
  lower: [
    { id: 'L1', deck: 'Lower', row: 1, col: 'single', label: 'L1', priceOffset: 50 },
    { id: 'L2', deck: 'Lower', row: 1, col: 'double-A', label: 'L2', priceOffset: 50 },
    { id: 'L3', deck: 'Lower', row: 1, col: 'double-B', label: 'L3', priceOffset: 50 },
    { id: 'L4', deck: 'Lower', row: 2, col: 'single', label: 'L4', priceOffset: 50 },
    { id: 'L5', deck: 'Lower', row: 2, col: 'double-A', label: 'L5', priceOffset: 50 },
    { id: 'L6', deck: 'Lower', row: 2, col: 'double-B', label: 'L6', priceOffset: 50 },
    { id: 'L7', deck: 'Lower', row: 3, col: 'single', label: 'L7', priceOffset: 0 },
    { id: 'L8', deck: 'Lower', row: 3, col: 'double-A', label: 'L8', priceOffset: 0 },
    { id: 'L9', deck: 'Lower', row: 3, col: 'double-B', label: 'L9', priceOffset: 0 },
    { id: 'L10', deck: 'Lower', row: 4, col: 'single', label: 'L10', priceOffset: 0 },
    { id: 'L11', deck: 'Lower', row: 4, col: 'double-A', label: 'L11', priceOffset: 0 },
    { id: 'L12', deck: 'Lower', row: 4, col: 'double-B', label: 'L12', priceOffset: 0 },
    { id: 'L13', deck: 'Lower', row: 5, col: 'single', label: 'L13', priceOffset: -50 },
    { id: 'L14', deck: 'Lower', row: 5, col: 'double-A', label: 'L14', priceOffset: -50 },
    { id: 'L15', deck: 'Lower', row: 5, col: 'double-B', label: 'L15', priceOffset: -50 }
  ],
  upper: [
    { id: 'U1', deck: 'Upper', row: 1, col: 'single', label: 'U1', priceOffset: 50 },
    { id: 'U2', deck: 'Upper', row: 1, col: 'double-A', label: 'U2', priceOffset: 50 },
    { id: 'U3', deck: 'Upper', row: 1, col: 'double-B', label: 'U3', priceOffset: 50 },
    { id: 'U4', deck: 'Upper', row: 2, col: 'single', label: 'U4', priceOffset: 50 },
    { id: 'U5', deck: 'Upper', row: 2, col: 'double-A', label: 'U5', priceOffset: 50 },
    { id: 'U6', deck: 'Upper', row: 2, col: 'double-B', label: 'U6', priceOffset: 50 },
    { id: 'U7', deck: 'Upper', row: 3, col: 'single', label: 'U7', priceOffset: 0 },
    { id: 'U8', deck: 'Upper', row: 3, col: 'double-A', label: 'U8', priceOffset: 0 },
    { id: 'U9', deck: 'Upper', row: 3, col: 'double-B', label: 'U9', priceOffset: 0 },
    { id: 'U10', deck: 'Upper', row: 4, col: 'single', label: 'U10', priceOffset: 0 },
    { id: 'U11', deck: 'Upper', row: 4, col: 'double-A', label: 'U11', priceOffset: 0 },
    { id: 'U12', deck: 'Upper', row: 4, col: 'double-B', label: 'U12', priceOffset: 0 },
    { id: 'U13', deck: 'Upper', row: 5, col: 'single', label: 'U13', priceOffset: -50 },
    { id: 'U14', deck: 'Upper', row: 5, col: 'double-A', label: 'U14', priceOffset: -50 },
    { id: 'U15', deck: 'Upper', row: 5, col: 'double-B', label: 'U15', priceOffset: -50 }
  ]
};

// Helper: Calculate great-circle distance between two cities in km
function calculateDistance(cityA, cityB) {
  const coordA = CITY_COORDINATES[cityA] || { lat: 17.385, lng: 78.4867 };
  const coordB = CITY_COORDINATES[cityB] || { lat: 12.9716, lng: 77.5946 };

  const R = 6371; // km
  const dLat = ((coordB.lat - coordA.lat) * Math.PI) / 180;
  const dLng = ((coordB.lng - coordA.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coordA.lat * Math.PI) / 180) *
      Math.cos((coordB.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightKm = Math.round(R * c);
  // Real road multiplier ~1.28
  return Math.max(120, Math.round(straightKm * 1.28));
}

// Format duration from road distance
function getDurationString(km) {
  const avgSpeedKmH = 55;
  const totalMinutes = Math.round((km / avgSpeedKmH) * 60);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m`;
}

// Add minutes to time string HH:MM
function addMinutesToTime(timeStr, km) {
  const [h, m] = timeStr.split(':').map(Number);
  const totalTravelMin = Math.round((km / 55) * 60);
  const totalM = h * 60 + m + totalTravelMin;
  const newH = Math.floor(totalM / 60) % 24;
  const newM = totalM % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

// Generate realistic Indian Boarding/Dropping points for ANY city in India
export function getCityStops(cityName, type) {
  if (!cityName) return [];
  const clean = cityName.trim();

  // Search case-insensitively
  const matchedKey = Object.keys(CITY_STOPS).find(
    (k) =>
      k.toLowerCase() === clean.toLowerCase() ||
      k.toLowerCase().includes(clean.toLowerCase()) ||
      clean.toLowerCase().includes(k.toLowerCase())
  );

  if (matchedKey && CITY_STOPS[matchedKey] && CITY_STOPS[matchedKey][type]) {
    return CITY_STOPS[matchedKey][type];
  }

  // Realistic fallback generated dynamically for any unlisted destination
  if (type === 'boarding') {
    return [
      { id: `${clean}-b1`, name: `${clean} Central RTC Bus Terminal`, landmark: 'Platform 1 Intercity Complex' },
      { id: `${clean}-b2`, name: `${clean} Highway Bypass Toll Plaza`, landmark: 'National Highway Service Road' },
      { id: `${clean}-b3`, name: `${clean} Railway Station Circle`, landmark: 'Opposite Main Clock Tower' }
    ];
  }
  return [
    { id: `${clean}-d1`, name: `${clean} Central Bus Terminal`, landmark: 'Main Arrival Gate' },
    { id: `${clean}-d2`, name: `${clean} Express Bypass Exit`, landmark: 'Highway Service Road' },
    { id: `${clean}-d3`, name: `${clean} City Station Circle`, landmark: 'Main Entrance' }
  ];
}

// Real Operator Templates
const MASTER_OPERATOR_TEMPLATES = [
  // --- KSRTC Buses ---
  {
    operator: 'KSRTC',
    name: 'KSRTC Airavat Club Class',
    operatorTag: 'Govt. of Karnataka RTC',
    type: 'Volvo 9600 Multi-Axle AC Sleeper (2+1)',
    serviceType: 'RTC',
    categories: ['RTC', 'AC', 'Sleeper', 'KSRTC'],
    amenities: ['Starlink Wi-Fi', 'Fresh Blanket & Pillow', '65W USB-C', 'GPS Tracking', 'Emergency SOS'],
    rating: 4.8,
    reviewsCount: 3410,
    pricePerKm: 2.2,
    baseAdd: 200,
    regState: 'KA'
  },
  {
    operator: 'KSRTC',
    name: 'KSRTC Airavat Diamond Class',
    operatorTag: 'Govt. of Karnataka RTC',
    type: 'Scania Multi-Axle AC Semi-Sleeper (2+2)',
    serviceType: 'RTC',
    categories: ['RTC', 'AC', 'Seater', 'KSRTC'],
    amenities: ['AC Climate Control', 'USB Fast Charging', 'Live GPS Tracking', 'Luggage Compartment'],
    rating: 4.7,
    reviewsCount: 2890,
    pricePerKm: 1.7,
    baseAdd: 120,
    regState: 'KA'
  },
  {
    operator: 'KSRTC',
    name: 'KSRTC Rajahamsa Executive',
    operatorTag: 'Govt. of Karnataka RTC',
    type: 'Deluxe Pushback 2+2 Non-AC',
    serviceType: 'RTC',
    categories: ['RTC', 'Non-AC', 'Seater', 'KSRTC'],
    amenities: ['Ergonomic Pushback', 'Reading Lamp', 'Water Bottle Holder'],
    rating: 4.5,
    reviewsCount: 1950,
    pricePerKm: 1.25,
    baseAdd: 80,
    regState: 'KA'
  },
  {
    operator: 'KSRTC',
    name: 'KSRTC Non-AC Sleeper',
    operatorTag: 'Govt. of Karnataka RTC',
    type: 'Executive Berth Sleeper (2+1)',
    serviceType: 'RTC',
    categories: ['RTC', 'Non-AC', 'Sleeper', 'KSRTC'],
    amenities: ['Full Flat Berth', 'Pillow & Linen', 'Window Curtains'],
    rating: 4.6,
    reviewsCount: 1420,
    pricePerKm: 1.5,
    baseAdd: 100,
    regState: 'KA'
  },

  // --- APSRTC Buses ---
  {
    operator: 'APSRTC',
    name: 'APSRTC Amaravati',
    operatorTag: 'Govt. of Andhra Pradesh RTC',
    type: 'Scania Multi-Axle AC Sleeper (2+1)',
    serviceType: 'RTC',
    categories: ['RTC', 'AC', 'Sleeper', 'APSRTC'],
    amenities: ['High Speed Wi-Fi', 'Air Purifier', 'USB-C Charging', 'Live Bus Tracking', 'Fresh Blankets'],
    rating: 4.8,
    reviewsCount: 4210,
    pricePerKm: 2.15,
    baseAdd: 180,
    regState: 'AP'
  },
  {
    operator: 'APSRTC',
    name: 'APSRTC Garuda Plus',
    operatorTag: 'Govt. of Andhra Pradesh RTC',
    type: 'Volvo 9600 Multi-Axle AC Sleeper',
    serviceType: 'RTC',
    categories: ['RTC', 'AC', 'Sleeper', 'APSRTC'],
    amenities: ['Snack Kit', 'Pillow & Sheet', 'USB Ports', 'Live GPS Tracking'],
    rating: 4.7,
    reviewsCount: 3120,
    pricePerKm: 2.1,
    baseAdd: 170,
    regState: 'AP'
  },
  {
    operator: 'APSRTC',
    name: 'APSRTC Night Rider',
    operatorTag: 'Govt. of Andhra Pradesh RTC',
    type: 'Seater-cum-Sleeper AC (2+1)',
    serviceType: 'RTC',
    categories: ['RTC', 'AC', 'Sleeper', 'APSRTC'],
    amenities: ['AC Berth', 'CCTV Security', 'Emergency Alarm', 'Mobile Charger'],
    rating: 4.6,
    reviewsCount: 2240,
    pricePerKm: 1.8,
    baseAdd: 130,
    regState: 'AP'
  },
  {
    operator: 'APSRTC',
    name: 'APSRTC Super Luxury',
    operatorTag: 'Govt. of Andhra Pradesh RTC',
    type: '2+2 Non-AC Pushback Deluxe',
    serviceType: 'RTC',
    categories: ['RTC', 'Non-AC', 'Seater', 'APSRTC'],
    amenities: ['Air Suspension', 'Comfortable Pushback', 'Audio System'],
    rating: 4.5,
    reviewsCount: 3870,
    pricePerKm: 1.25,
    baseAdd: 70,
    regState: 'AP'
  },

  // --- TSRTC Buses ---
  {
    operator: 'TSRTC',
    name: 'TSRTC Garuda Plus',
    operatorTag: 'Govt. of Telangana RTC',
    type: 'Volvo B11R Multi-Axle AC Sleeper (2+1)',
    serviceType: 'RTC',
    categories: ['RTC', 'AC', 'Sleeper', 'TSRTC'],
    amenities: ['Starlink Wi-Fi', 'Complimentary Water', 'USB Charging', 'Live GPS Tracking'],
    rating: 4.8,
    reviewsCount: 3650,
    pricePerKm: 2.15,
    baseAdd: 190,
    regState: 'TS'
  },
  {
    operator: 'TSRTC',
    name: 'TSRTC Lahari Sleeper',
    operatorTag: 'Govt. of Telangana RTC',
    type: 'BharatBenz AC Sleeper (2+1 Berth)',
    serviceType: 'RTC',
    categories: ['RTC', 'AC', 'Sleeper', 'TSRTC'],
    amenities: ['Fresh Bedroll', 'Private Curtain', '65W USB PD', 'Emergency SOS'],
    rating: 4.7,
    reviewsCount: 2480,
    pricePerKm: 2.05,
    baseAdd: 160,
    regState: 'TS'
  },
  {
    operator: 'TSRTC',
    name: 'TSRTC Rajdhani',
    operatorTag: 'Govt. of Telangana RTC',
    type: 'AC Semi-Sleeper (2+2 Pushback)',
    serviceType: 'RTC',
    categories: ['RTC', 'AC', 'Seater', 'TSRTC'],
    amenities: ['Individual AC Vents', 'Charging Sockets', 'Luggage Assistance'],
    rating: 4.6,
    reviewsCount: 2900,
    pricePerKm: 1.65,
    baseAdd: 110,
    regState: 'TS'
  },
  {
    operator: 'TSRTC',
    name: 'TSRTC Super Luxury Express',
    operatorTag: 'Govt. of Telangana RTC',
    type: '2+2 Non-AC Pushback Express',
    serviceType: 'RTC',
    categories: ['RTC', 'Non-AC', 'Seater', 'TSRTC'],
    amenities: ['Pushback Seats', 'Spacious Legroom', 'Digital Clock'],
    rating: 4.5,
    reviewsCount: 4100,
    pricePerKm: 1.25,
    baseAdd: 65,
    regState: 'TS'
  },

  // --- Premier Private Fleets ---
  {
    operator: 'VRL Travels',
    name: 'VRL Travels I-Shift Express',
    operatorTag: 'VRL Logistic Fleet',
    type: 'Volvo 9600 Multi-Axle AC Sleeper (2+1)',
    serviceType: 'Private',
    categories: ['Private', 'AC', 'Sleeper'],
    amenities: ['Free Wi-Fi', '65W Fast Charger', 'Personal LED TV', 'GPS Live Tracking', 'Lounge Boarding'],
    rating: 4.9,
    reviewsCount: 5210,
    pricePerKm: 2.3,
    baseAdd: 220,
    regState: 'KA'
  },
  {
    operator: 'Orange Travels',
    name: 'Orange Tours and Travels',
    operatorTag: 'Platinum Partner',
    type: 'BharatBenz AC Sleeper (2+1 Wide Berth)',
    serviceType: 'Private',
    categories: ['Private', 'AC', 'Sleeper'],
    amenities: ['Starlink Wi-Fi', 'Blanket & Pillow', 'Live GPS Tracking', 'CCTV Monitored'],
    rating: 4.8,
    reviewsCount: 4620,
    pricePerKm: 2.25,
    baseAdd: 200,
    regState: 'TS'
  },
  {
    operator: 'IntrCity SmartBus',
    name: 'IntrCity SmartBus Lounge',
    operatorTag: 'In-Bus Bio Washroom',
    type: 'Volvo Multi-Axle AC Sleeper + Washroom',
    serviceType: 'Private',
    categories: ['Private', 'AC', 'Sleeper'],
    amenities: ['In-Bus Washroom', 'Private AC Lounge Access', 'Captain on Board', 'GPS Track'],
    rating: 4.8,
    reviewsCount: 3890,
    pricePerKm: 2.35,
    baseAdd: 240,
    regState: 'DL'
  },
  {
    operator: 'Zingbus',
    name: 'Zingbus Electric Plus',
    operatorTag: 'Zero Emission EV',
    type: '100% Electric Luxury AC Sleeper',
    serviceType: 'Private',
    categories: ['Private', 'AC', 'Sleeper'],
    amenities: ['Silent EV Drive', 'Free Wi-Fi', 'Guaranteed On-Time', 'Free Cancellation'],
    rating: 4.9,
    reviewsCount: 3100,
    pricePerKm: 2.15,
    baseAdd: 170,
    regState: 'HR'
  },
  {
    operator: 'SRS Travels',
    name: 'SRS Travels Scania Premier',
    operatorTag: 'Reliable Intercity',
    type: 'Scania Multi-Axle AC Sleeper (2+1)',
    serviceType: 'Private',
    categories: ['Private', 'AC', 'Sleeper'],
    amenities: ['Clean Bedding', 'Charging Points', 'Reading Lights', 'Emergency Exit'],
    rating: 4.7,
    reviewsCount: 3400,
    pricePerKm: 2.05,
    baseAdd: 160,
    regState: 'KA'
  },
  {
    operator: 'NueGo',
    name: 'NueGo Electric Green Mobility',
    operatorTag: '100% Electric Fleet',
    type: 'Electric Luxury AC Seater (2+2)',
    serviceType: 'Private',
    categories: ['Private', 'AC', 'Seater'],
    amenities: ['Zero Emissions', 'Quiet Cabin', '65W USB-C', 'Live Camera Safety'],
    rating: 4.8,
    reviewsCount: 2840,
    pricePerKm: 1.85,
    baseAdd: 120,
    regState: 'MH'
  }
];

// Timetable departure schedule templates
const SCHEDULE_SLOTS = [
  '06:30',
  '08:15',
  '11:00',
  '14:30',
  '17:45',
  '19:30',
  '20:15',
  '21:00',
  '21:45',
  '22:15',
  '22:45',
  '23:15',
  '23:45'
];

// Real Bus Number Generator
function generateBusNumber(stateCode, idx) {
  const codes = {
    KA: ['01', '57', '04', '09'],
    AP: ['39', '16', '07', '26'],
    TS: ['09', '08', '07', '11'],
    MH: ['12', '04', '01', '47'],
    DL: ['01', '03', '05', '08'],
    HR: ['26', '55', '38']
  };
  const series = codes[stateCode] || ['01', '02'];
  const rto = series[idx % series.length];
  const alpha = ['UB', 'Z', 'F', 'TH', 'AE', 'ZN'][idx % 6];
  const num = 1000 + ((idx * 383 + 2411) % 8999);
  return `${stateCode} ${rto} ${alpha} ${num}`;
}

// Generate Live Buses for ANY origin and destination in India!
// Generate Live Buses for ANY origin and destination in India (supports empty destination searches)!
export function getBusesForRoute(fromCity, toCity, journeyDate) {
  const isFromEmpty = !fromCity || !fromCity.trim();
  const isToEmpty = !toCity || !toCity.trim();

  const popularConnectingHubs = [
    'Bengaluru', 'Vijayawada', 'Tirupati', 'Visakhapatnam', 'Mumbai',
    'Chennai', 'Pune', 'Goa (Panaji)', 'Delhi', 'Jaipur', 'Hyderabad'
  ];

  const fromState = fromCity ? (CITY_COORDINATES[fromCity]?.state || '') : '';
  const toState = toCity ? (CITY_COORDINATES[toCity]?.state || '') : '';

  // Filter or prioritize operators matching the states
  let prioritizedTemplates = MASTER_OPERATOR_TEMPLATES.filter((tpl) => {
    if (isFromEmpty && isToEmpty) return true;

    if (tpl.operator === 'KSRTC') {
      return (
        fromState === 'Karnataka' ||
        toState === 'Karnataka' ||
        fromCity === 'Bengaluru' ||
        toCity === 'Bengaluru' ||
        fromCity === 'Hyderabad' ||
        isFromEmpty ||
        isToEmpty
      );
    }
    if (tpl.operator === 'APSRTC') {
      return (
        fromState === 'Andhra Pradesh' ||
        toState === 'Andhra Pradesh' ||
        fromCity === 'Vijayawada' ||
        fromCity === 'Tirupati' ||
        toCity === 'Vijayawada' ||
        isFromEmpty ||
        isToEmpty
      );
    }
    if (tpl.operator === 'TSRTC') {
      return (
        fromState === 'Telangana' ||
        toState === 'Telangana' ||
        fromCity === 'Hyderabad' ||
        toCity === 'Hyderabad' ||
        isFromEmpty ||
        isToEmpty
      );
    }
    return true;
  });

  if (prioritizedTemplates.length < 8) {
    prioritizedTemplates = MASTER_OPERATOR_TEMPLATES;
  }

  return prioritizedTemplates.map((tpl, idx) => {
    // Resolve dynamic connected city if destination or origin is left empty
    let actualFrom = fromCity;
    let actualTo = toCity;

    if (isFromEmpty && isToEmpty) {
      const pair = POPULAR_ROUTES[idx % POPULAR_ROUTES.length];
      actualFrom = pair.from;
      actualTo = pair.to;
    } else if (!isFromEmpty && isToEmpty) {
      const pool = popularConnectingHubs.filter((d) => d.toLowerCase() !== fromCity.toLowerCase());
      actualTo = pool[idx % pool.length];
    } else if (isFromEmpty && !isToEmpty) {
      const pool = popularConnectingHubs.filter((d) => d.toLowerCase() !== toCity.toLowerCase());
      actualFrom = pool[idx % pool.length];
    }

    const distanceKm = calculateDistance(actualFrom, actualTo);
    const duration = getDurationString(distanceKm);
    const depTime = SCHEDULE_SLOTS[idx % SCHEDULE_SLOTS.length];
    const arrTime = addMinutesToTime(depTime, distanceKm);

    // Calculate dynamic realistic fare based on km & operator type
    const calculatedFare = Math.round(distanceKm * tpl.pricePerKm + tpl.baseAdd);
    const baseTicketPrice = Math.round(calculatedFare / 50) * 50 - 1;
    const price = Math.max(299, baseTicketPrice);
    const originalPrice = Math.round(price * 1.18);

    const availableSeats = 8 + ((idx * 7 + 3) % 18);
    const bookedSeats = ['L2', 'L5', 'U1', 'U4', 'U8', 'L11'].slice(0, 3 + (idx % 4));
    const ladiesSeats = ['L3', 'U2', 'L7'].slice(0, 1 + (idx % 3));

    // Strictly get boarding points of actualFrom and dropping points of actualTo!
    const boardingPoints = getCityStops(actualFrom, 'boarding');
    const droppingPoints = getCityStops(actualTo, 'dropping');

    // Dynamic Boarding and Dropping points with realistic timing
    const timedBoarding = boardingPoints.map((bp, bIdx) => {
      const [h, m] = depTime.split(':').map(Number);
      const totalM = h * 60 + m - (boardingPoints.length - 1 - bIdx) * 25;
      const bH = (Math.floor(totalM / 60) + 24) % 24;
      const bM = (totalM + 1440) % 60;
      return {
        ...bp,
        time: `${String(bH).padStart(2, '0')}:${String(bM).padStart(2, '0')}`
      };
    });

    const timedDropping = droppingPoints.map((dp, dIdx) => {
      const [h, m] = arrTime.split(':').map(Number);
      const totalM = h * 60 + m + dIdx * 25;
      const dH = Math.floor(totalM / 60) % 24;
      const dM = totalM % 60;
      return {
        ...dp,
        time: `${String(dH).padStart(2, '0')}:${String(dM).padStart(2, '0')}`
      };
    });

    return {
      id: `BUS-${tpl.operator.slice(0, 3).toUpperCase()}-${100 + idx}`,
      name: tpl.name,
      operator: tpl.operator,
      operatorTag: tpl.operatorTag,
      type: tpl.type,
      serviceType: tpl.serviceType,
      categories: tpl.categories,
      from: actualFrom,
      to: actualTo,
      date: journeyDate,
      distanceKm,
      departureTime: depTime,
      arrivalTime: arrTime,
      duration,
      price,
      originalPrice,
      rating: tpl.rating,
      reviewsCount: tpl.reviewsCount,
      totalSeats: 30,
      availableSeats,
      busNumber: generateBusNumber(tpl.regState, idx),
      amenities: tpl.amenities,
      boardingPoints: timedBoarding,
      droppingPoints: timedDropping,
      bookedSeats,
      ladiesSeats,
      policies: [
        '100% Instant Refund up to 6 hours before departure.',
        '2 pieces of luggage (up to 20kg each) complimentary.',
        'Zero rescheduling charges up to 4 hours before journey.',
        'Emergency SOS and 24x7 RTC Central Command Support.'
      ]
    };
  });
}

// Initial default buses dataset
export const BUSES_DATA = getBusesForRoute('Hyderabad', 'Bengaluru', new Date().toISOString().split('T')[0]);
