export interface Building {
  id: string;
  name: string;
  shortName: string;
  campus: 'central' | 'north';
  address: string;
  type: string;
  image: string;
  description: string;
  areaCount: number;
}

export const buildings: Record<'central' | 'north', Building[]> = {
  central: [
    {
      id: 'chemistry',
      name: 'Chemistry Building',
      shortName: 'Chemistry Building',
      campus: 'central',
      address: '930 N University Ave, Ann Arbor, MI 48109',
      type: 'Academic Building',
      image: 'buildingphotos/ChemistryBuilding.jpg',
      description: 'The Chemistry Building is mainly used for teaching and research in chemistry, with bright corridors and an atrium where students can sit, plug in, and study between labs and lectures.',
      areaCount: 2
    },
    {
      id: 'fishbowl',
      name: 'Fishbowl (Angell Hall Courtyard Computing Site)',
      shortName: 'Fishbowl',
      campus: 'central',
      address: '435 S State St, Ann Arbor, MI 48109 (Angell Hall)',
      type: 'Computing Site',
      image: 'buildingphotos/MasonHall (Fishbowl).webp',
      description: 'The \'Fishbowl\' is a large, glass-front computing site packed with Macs, PCs, and printers—perfect for printing, quick assignments, and collaborative work in a busy, high-energy environment.',
      areaCount: 1
    },
    {
      id: 'north-university-building',
      name: 'North University Building',
      shortName: 'North University Building',
      campus: 'central',
      address: '1225 S University Ave, Ann Arbor, MI 48109',
      type: 'Academic Building',
      image: 'buildingphotos/NorthUniversityBuilding.jpeg',
      description: 'North University Building houses various academic departments and provides quiet study spaces with natural lighting, making it ideal for focused individual or small group work.',
      areaCount: 1
    },
    {
      id: 'hatcher',
      name: 'Hatcher Graduate Library',
      shortName: 'Hatcher Graduate Library',
      campus: 'central',
      address: '913 S University Ave, Ann Arbor, MI 48109',
      type: 'Library',
      image: 'buildingphotos/HatcherGraduateLibrary.webp',
      description: 'Hatcher is the main research library for the humanities and social sciences, offering quiet upper floors, reading rooms, and carrels that are ideal for long, focused study sessions.',
      areaCount: 2
    },
    {
      id: 'kinesiology',
      name: 'School of Kinesiology Building',
      shortName: 'School of Kinesiology ...',
      campus: 'central',
      address: '1402 Washington Heights, Ann Arbor, MI 48109',
      type: 'Academic Building',
      image: 'buildingphotos/SchoolofKinesiologyBuilding.jpg',
      description: 'The School of Kinesiology Building combines classrooms, labs, and open commons areas, giving students bright, modern spots to review notes or work on laptops between classes.',
      areaCount: 1
    },
    {
      id: 'lsa',
      name: 'LSA Building',
      shortName: 'LSA Building',
      campus: 'central',
      address: '500 S State St, Ann Arbor, MI 48109',
      type: 'Student Services Building',
      image: 'buildingphotos/LSABuilding.webp',
      description: 'The LSA Building houses advising and student services and includes lounges and seating areas where students can do short study sessions or laptop work while waiting for appointments.',
      areaCount: 2
    },
    {
      id: 'public-health',
      name: 'School of Public Health',
      shortName: 'School of Public Health',
      campus: 'central',
      address: '1415 Washington Heights, Ann Arbor, MI 48109',
      type: 'Academic Building',
      image: 'buildingphotos/SchoolofPublicHealth.jpg',
      description: 'The School of Public Health buildings on the Medical Campus include student lounges and open seating near classrooms, making it convenient for public health students to read and work on group projects close to where their courses are held.',
      areaCount: 1
    },
    {
      id: 'randall',
      name: 'Randall Laboratory',
      shortName: 'Randall Laboratory',
      campus: 'central',
      address: '450 Church St, Ann Arbor, MI 48109',
      type: 'Academic Building',
      image: 'buildingphotos/RandallLaboratory.jpeg',
      description: 'Randall Laboratory is a core physics building with lecture halls, labs, and nearby seating niches, giving students a quieter, academic environment to work on problem sets and review material.',
      areaCount: 1
    },
    {
      id: 'ross',
      name: 'Ross School of Business',
      shortName: 'Ross School of Business',
      campus: 'central',
      address: '701 Tappan St, Ann Arbor, MI 48109',
      type: 'Business School',
      image: 'buildingphotos/RossSchoolofBusiness.webp',
      description: 'The Ross building centers around the Davidson Winter Garden and surrounding commons, with many tables, soft seating, and project rooms that support both group meetings and individual laptop study.',
      areaCount: 1
    },
    {
      id: 'shapiro',
      name: 'Shapiro Undergraduate Library (UGLi)',
      shortName: 'Shapiro Undergraduate ...',
      campus: 'central',
      address: '919 S University Ave, Ann Arbor, MI 48109',
      type: 'Library',
      image: 'buildingphotos/Shapiro Undergraduate Library.jpg',
      description: 'Shapiro is one of the most popular undergraduate study spots, offering a mix of group tables, casual seating, quieter zones on the upper floors, and easy access to computers and printers.',
      areaCount: 5
    },
    {
      id: 'taubman',
      name: 'Taubman Health Sciences Library',
      shortName: 'Taubman Health Science...',
      campus: 'central',
      address: '1135 E Catherine St, Ann Arbor, MI 48109',
      type: 'Library',
      image: 'buildingphotos/Taubman Health Sciences Library.webp',
      description: 'The Taubman Health Sciences Library serves students in the health sciences with multiple floors of study space, including designated quiet areas and group rooms suited for exam prep and team-based work.',
      areaCount: 4
    },
    {
      id: 'union',
      name: 'Michigan Union',
      shortName: 'Michigan Union',
      campus: 'central',
      address: '530 S State St, Ann Arbor, MI 48109',
      type: 'Student Union',
      image: 'buildingphotos/MichiganUnion.webp',
      description: 'The Michigan Union is a central student hub that combines food options, lounges, and meeting spaces, making it a good choice if you want to study in a lively environment with coffee and meals just steps away.',
      areaCount: 2
    },
  ],
  north: [
    {
      id: 'duderstadt',
      name: 'Duderstadt Center (Dude)',
      shortName: 'Duderstadt Center',
      campus: 'north',
      address: '2281 Bonisteel Blvd, Ann Arbor, MI 48109',
      type: 'Media & Study Center',
      image: 'buildingphotos/DuderstadtCenter.webp',
      description: 'The Duderstadt Center is a major study and media hub on North Campus, with a wide variety of open tables, quiet corners, computer workstations, and reservable rooms, plus a café and quick access to nearby dining in Pierpont Commons.',
      areaCount: 4
    },
    {
      id: 'ford-robotics',
      name: 'Ford Robotics Building',
      shortName: 'Ford Robotics Building',
      campus: 'north',
      address: '2601 Draper Dr, Ann Arbor, MI 48109',
      type: 'Engineering Building',
      image: 'buildingphotos/FordRoboticsBuilding.webp',
      description: 'The Ford Robotics Building is a modern facility for robotics with open atrium seating and project areas where students can meet, code, and study right next to labs and testing spaces.',
      areaCount: 2
    },
    {
      id: 'ggbl',
      name: 'G.G. Brown Laboratory (GGBL)',
      shortName: 'G.G. Brown Laboratory',
      campus: 'north',
      address: '2350 Hayward St, Ann Arbor, MI 48109',
      type: 'Engineering Building',
      image: 'buildingphotos/G.G.BrownLaboratory.webp',
      description: 'G.G. Brown Laboratory is the main mechanical engineering building, combining classrooms, research labs, CAEN computing areas, and hallway seating where engineering students can work on assignments between classes.',
      areaCount: 1
    },
  ]
};
