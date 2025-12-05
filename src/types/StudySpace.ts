import { NoiseLevel, BestFor, Amenity, BookableRoom, EnclosedLevel } from '@/data/filterOptions';

export interface StudySpaceDimensions {
  environment: string;
  spaceSound: string;
  facilities: string;
  convenience: string;
  accessibility: string;
}

export interface StudySpace {
  id: number;
  buildingId: string;
  name: string;
  location: string;
  noise: NoiseLevel;
  bestFor: BestFor[];
  amenities: Amenity[];
  bookableRooms: BookableRoom[];
  enclosed: EnclosedLevel;
  photos: string[];
  dimensions: StudySpaceDimensions;
  reviews?: any[];
  databaseInfo?: {
    capacity?: number;
    seating?: string;
    floor?: string;
    areaType?: string;
    hours?: string;
    openHours?: string;
    closedHours?: string;
    availability?: string;
    peakHours?: string;
    accessLevel?: string;
    requiresKey?: boolean;
    bookingRequired?: boolean;
    walkInAllowed?: boolean;
    computers?: number;
    printers?: number;
    wifi?: boolean;
    chargingStations?: boolean;
    waterFountains?: boolean;
    restrooms?: string;
    vendingMachines?: string;
    foodAllowed?: boolean;
    drinksAllowed?: boolean;
    quietHours?: string;
    groupSizeLimit?: string;
    timeLimit?: string;
  };
}
