import { StudySpace } from '@/types/StudySpace';

export const studyAreas: StudySpace[] = [
  {
    id: 1,
    buildingId: 'chemistry',
    name: 'Chemistry Building - 3rd Floor Lounge',
    location: '3rd Floor Lounge',
    noise: 'moderate',
    bestFor: ['solo', 'group'],
    amenities: ['outlets', 'microwave', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'semi',
    photos: [
      'photos/Central Campus/Chemistry/Common Area - Floor 3 2 Small.png'
    ],
    dimensions: {
      environment: 'There are some booths available with cushioned seats, and some tables with chairs. They are pretty comfortable.',
      spaceSound: 'It is an open space that is collaborative. Yet, the noise level is never high.',
      facilities: 'There is a good number of power outlets.',
      convenience: 'Since it is a lounge area, a microwave is available.',
      accessibility: 'It is very easy to find a seat. But since the tables here cannot be reserved, you just have to find one.'
    }
  },
  {
    id: 2,
    buildingId: 'chemistry',
    name: 'Chemistry Building - Room 3744',
    location: 'Room 3744',
    noise: 'quiet',
    bestFor: ['group'],
    amenities: ['whiteboard', 'outlets'],
    bookableRooms: ['studyRoom'],
    enclosed: 'enclosed',
    photos: [
      'photos/Central Campus/Chemistry/Room 3744 2 Small.png'
    ],
    dimensions: {
      environment: "It's a typical presentation room. A window lines one of the walls, allowing for natural lighting.",
      spaceSound: 'It is a quiet, reservable study room.',
      facilities: 'There are a few outlets in this room, as well as a whiteboard and a screen you can connect your laptop to.',
      convenience: "There isn't anything in the room that would be convenient. But it is not far from the lounge area.",
      accessibility: 'The room is reservable, and the crowd levels are low because the room can be reserved.'
    }
  },
  {
    id: 3,
    buildingId: 'fishbowl',
    name: 'Mason Hall - Fishbowl',
    location: 'Fishbowl',
    noise: 'lively',
    bestFor: ['solo', 'group'],
    amenities: ['computers', 'printer', 'outlets'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Fishbowl/Fishbowl 2 Small.png',
      'photos/Central Campus/Fishbowl/Fishbowl 2 Small.png',
      'photos/Central Campus/Fishbowl/Fishbowl 3 Small.png'
    ],
    dimensions: {
      environment: 'Bright, functional computer lab with standard rolling chairs and strong overhead lighting. More practical than cozy, with large windows but no plants or lounge furniture.',
      spaceSound: 'Very open layout with long rows of computers and little privacy. Steady background noise from typing and conversations—an open "fishbowl" feel with shared tables and moderate chatter. Better for group or parallel work than silent study.',
      facilities: 'Every seat has a desktop computer (Mac/PC stations), with campus printers along the walls and some nearby outlets. Strongly geared toward computer-based work and quick tasks.',
      convenience: 'Located in a central academic building with easy access to nearby cafés and campus services. Short walk to coffee or food, restrooms on the same floor, possibly vending machines nearby. Few in-room extras beyond basics.',
      accessibility: 'Open to all students during posted hours with no reservation needed. First-come, first-served seating—usually easy to find a spot off-peak, but crowded at midterms/finals.'
    }
  },
  {
    id: 4,
    buildingId: 'north-university-building',
    name: 'North University Building - Room 2540',
    location: 'Room 2540',
    noise: 'quiet',
    bestFor: ['solo', 'group'],
    amenities: ['outlets', 'microwave'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/North University Building/Room 2540_ Small.png'
    ],
    dimensions: {
      environment: 'There is nice, natural lighting and the atmosphere is very studious.',
      spaceSound: "It's a quiet area that is open. There aren't any separate spaces; there is only one table.",
      facilities: "There are a good amount of outlets, and the restrooms aren't too far away.",
      convenience: 'There is a microwave nearby, and there are vending machines just one floor down.',
      accessibility: 'There are a lot of seats, but there is only one table. Never really crowded. Very easy to access.'
    }
  },
  {
    id: 5,
    buildingId: 'hatcher',
    name: 'Hatcher Library - 5th Floor (Print Area)',
    location: '5th Floor (Print Area)',
    noise: 'silent',
    bestFor: ['solo'],
    amenities: ['printer', 'outlets'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Hatcher/Hatcher - Fifth Floor Small.png',
      'photos/Central Campus/Hatcher/Hatcher - Fifth Floor(1) Small.png',
      'photos/Central Campus/Hatcher/Hatcher - Fifth Floor(2) Small.png',
      'photos/Central Campus/Hatcher/Hatcher - Fifth Floor(3) Small.png',
      'photos/Central Campus/Hatcher/Hatcher - Fifth Floor(4) Small.png',
      'photos/Central Campus/Hatcher/Hatcher - Fifth Floor(5) Small.png'
    ],
    dimensions: {
      environment: 'Functional, task-oriented printing area with bright overhead lighting and mostly standing space. Standing-height counter, bright lights, hard flooring, no soft seating or lounge furniture. Designed for quick use rather than comfort.',
      spaceSound: 'A compact, tucked-away zone that is usually dead quiet, with almost no talking, making it feel more like a silent study area. Compact zone along a wall or corridor with steady foot traffic; mostly open, with occasional noise from printers and brief conversations.',
      facilities: 'Multiple shared printers/copiers and related tools focused on document prep and coursework support. Networked printers, copier/scanner functions, release station, possible staplers or paper trays.',
      convenience: 'Centrally located on the floor for quick in-and-out printing between classes or study sessions. Easy to stop by while studying, close to study spaces and stacks. Limited or no dedicated seating; few extra amenities beyond the machines themselves.',
      accessibility: 'Open to all students during building hours with no reservation. First-come, first-served printer use, card-swipe or login station. Clear signage, but brief lines/short queues may form at busy times or class changes.'
    }
  },
  {
    id: 6,
    buildingId: 'hatcher',
    name: 'Hatcher Library - Reference Room',
    location: 'Reference Room',
    noise: 'silent',
    bestFor: ['solo'],
    amenities: ['outlets'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Hatcher/Hatcher - Second Floor (Reference Room) Small.png',
      'photos/Central Campus/Hatcher/Hatcher - Second Floor (Reference Room)(1) Small.png'
    ],
    dimensions: {
      environment: 'Classic, scholarly reading room with large wooden tables and straight-backed chairs. Long shared tables, wooden chairs, table lamps/overhead lights, tall shelves framing the space. Bright but warm lighting, more formal than cozy.',
      spaceSound: 'Spacious, open room that is kept very quiet. Silent/whisper-only atmosphere, dispersed seating, minimal background noise. People speak in whispers if at all, making it ideal for focused, individual study.',
      facilities: 'Designed for laptop and reading work with large work surfaces. Big tables for spreading out books, personal laptops, nearby stacks with reference materials. Some access to outlets.',
      convenience: 'Few in-room amenities beyond study space itself, but located close to restrooms and other library services elsewhere on the floor. Short walk to restrooms and elevators, nearby help desk or stacks. Limited or no food in the room.',
      accessibility: 'Open seating with no reservations. First-come, first-served desks, easy to navigate rows. Wide aisles and clearly arranged tables make it easy to find a seat, though it can fill at peak times. More availability during off-peak hours.'
    }
  },
  {
    id: 7,
    buildingId: 'kinesiology',
    name: 'Kinesiology Building - 1st Floor',
    location: '1st Floor',
    noise: 'lively',
    bestFor: ['group'],
    amenities: ['outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Kinesiology/Kinesiology - First Floor Small.png',
      'photos/Central Campus/Kinesiology/Kinesiology - First Floor(1) Small.png',
      'photos/Central Campus/Kinesiology/Kinesiology - First Floor(2) Small.png',
      'photos/Central Campus/Kinesiology/Kinesiology - First Floor(3) Small.png',
      'photos/Central Campus/Kinesiology/Kinesiology - First Floor(4) Small.png'
    ],
    dimensions: {
      environment: 'Bright, modern first-floor lounge with plenty of natural light and casual seating. Armchairs or soft chairs, low tables, large windows, a few high-top tables or benches. Feels open and welcoming rather than formal.',
      spaceSound: 'Open space connected to main walkways. Hallway traffic nearby, conversational noise, music or TV screens audible in the background. Moderate background noise from students passing through and chatting—better for light work than deep focus.',
      facilities: 'Designed for laptop and group work with tables and some outlets. Tables for group projects, laptop-friendly seating, wall outlets scattered around. Fewer "traditional" study tools like desktops or printers.',
      convenience: 'Close to classrooms and sits right in the middle of campus, making it easy to swing by between classes or take quick study breaks. Just a minute or two from nearby lecture halls, so students regularly pop in between back-to-back classes for a quick study session or short break.',
      accessibility: 'Located right off the main entrance or central hallway with fully open access. No reservation needed, easy to navigate, popular between classes. Seating is first-come, first-served and can fill at peak times, with more open seats off-peak.'
    }
  },
  {
    id: 8,
    buildingId: 'lsa',
    name: 'LSA Building - 1st Floor',
    location: '1st Floor',
    noise: 'lively',
    bestFor: ['group'],
    amenities: ['microwave', 'outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/LSA/LSA - First Floor Small.png',
      'photos/Central Campus/LSA/LSA - First Floor(1) Small.png',
      'photos/Central Campus/LSA/LSA - First Floor(2) Small.png',
      'photos/Central Campus/LSA/LSA - First Floor(3) Small.png',
      'photos/Central Campus/LSA/LSA - First Floor(4) Small.png',
      'photos/Central Campus/LSA/LSA - First Floor(5) Small.png',
      'photos/Central Campus/LSA/LSA - First Floor(6) Small.png',
      'photos/Central Campus/LSA/LSA - First Floor(7) Small.png'
    ],
    dimensions: {
      environment: 'Bright, welcoming first-floor lounge with lots of comfortable seating. Couches and cushioned chairs, small tables, open lobby-style layout. Feels relaxed and social rather than formal or silent.',
      spaceSound: 'Open common area with steady foot traffic and conversation. Students chatting, people walking through, background noise from talking and movement. Better for hanging out or light studying than deep, silent focus.',
      facilities: 'Set up for casual laptop work and group projects more than intense study. Small tables you can gather around, spots to open a laptop, a few wall or floor outlets.',
      convenience: 'Very high on convenience, with microwaves, vending machines, and a small market for snacks and drinks, making it easy to eat and study in the same place. Microwaves to heat food, vending machines, a grab-and-go snack market just steps from seating.',
      accessibility: 'Located on the first floor and easy to find. Right off main hallways, first-come-first-served seating. Open seating with no reservations, though popular and can get busy between classes. Busiest around lunchtime and class changes.'
    }
  },
  {
    id: 9,
    buildingId: 'lsa',
    name: 'LSA Building - 2nd Floor',
    location: '2nd Floor',
    noise: 'quiet',
    bestFor: ['solo'],
    amenities: ['outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'semi',
    photos: [
      'photos/Central Campus/LSA/LSA - Second Floor Small.png',
      'photos/Central Campus/LSA/LSA - Second Floor(1) Small.png',
      'photos/Central Campus/LSA/LSA - Second Floor(2) Small.png',
      'photos/Central Campus/LSA/LSA - Second Floor(3) Small.png',
      'photos/Central Campus/LSA/LSA - Second Floor(4) Small.png',
      'photos/Central Campus/LSA/LSA - Second Floor(5) Small.png',
      'photos/Central Campus/LSA/LSA - Second Floor(6) Small.png'
    ],
    dimensions: {
      environment: 'Quiet, comfy study floor with lots of cushioned single seats. Soft individual chairs, warm lighting, calm atmosphere. Feels much more relaxed and focused than the first floor lounge.',
      spaceSound: 'Designed for privacy and focus, with seating nooks and cubbies that give you your own little zone. Semi-enclosed seats, low background noise, people working silently or whispering. Generally very quiet with low talking.',
      facilities: 'Great for solo laptop work and reading, with personal tables/ledges and access to outlets built into or near many seats. Side tables by chairs, built-in surfaces in cubbies, outlets close to most seats.',
      convenience: "No food options on this floor itself, but an easy walk downstairs to microwaves, vending, and the snack market when you need a break. Study upstairs, then head down to the first floor for snacks or to heat up food.",
      accessibility: 'Open seating with no reservations. First-come, first-served single seats, plenty of options spread across the floor. More total seating than the first floor and easier to find a quiet, private spot to work. Good for longer study sessions.'
    }
  },
  {
    id: 10,
    buildingId: 'public-health',
    name: 'School of Public Health I - 1st Floor',
    location: '1st Floor',
    noise: 'mixed',
    bestFor: ['solo', 'group'],
    amenities: ['cafe', 'microwave', 'outlets'],
    bookableRooms: ['studyRoom'],
    enclosed: 'mixed',
    photos: [
      'photos/Central Campus/Public Health/Public Health Small.png',
      'photos/Central Campus/Public Health/Public Health(1) Small.png',
      'photos/Central Campus/Public Health/Public Health(2) Small.png',
      'photos/Central Campus/Public Health/Public Health(3) Small.png',
      'photos/Central Campus/Public Health/Public Health(4) Small.png',
      'photos/Central Campus/Public Health/Public Health(5) Small.png',
      'photos/Central Campus/Public Health/Public Health(6) Small.png',
      'photos/Central Campus/Public Health/Public Health(7) Small.png'
    ],
    dimensions: {
      environment: 'The seating in the study rooms is comfortable. Each study room has a nice view of the outside as well. There are multiple areas to study on the first floor. There is an open area that has a lot of natural light, and multiple separate study rooms. Along with a second open area that is behind the study rooms.',
      spaceSound: 'Pretty nice open lounge area for those that are open. The study rooms, though, are very silent and quaint. Both of the open spaces are collaborative workspaces; the study rooms are not. The study rooms have a lot of privacy and little to no background noise. The open areas do not have a lot of privacy, but they aren\'t very noisy either.',
      facilities: 'There are ample power outlets.',
      convenience: 'There is a café within the building that is also very close to the vending machines. There is a microwave there. It is very close to the study rooms and one of the open spaces. It resides within the bigger open space near the back of the building.',
      accessibility: 'Of the open spaces, there are lots of seats, but you cannot reserve them. The study rooms are very easy to access, though, since they can be reserved. Since it\'s a relatively quiet building, though, there is hardly ever a large crowd.'
    }
  },
  {
    id: 11,
    buildingId: 'randall',
    name: 'Randall Laboratory - 2nd Floor',
    location: '2nd Floor',
    noise: 'quiet',
    bestFor: ['solo', 'group'],
    amenities: ['whiteboard', 'outlets', 'lounge', 'microwave'],
    bookableRooms: ['conferenceRoom'],
    enclosed: 'mixed',
    photos: [
      'photos/Central Campus/Randall/Randall - Second Floor Small.png',
      'photos/Central Campus/Randall/Randall - Second Floor(1) Small.png',
      'photos/Central Campus/Randall/Randall - Second Floor(2) Small.png'
    ],
    dimensions: {
      environment: 'Open area with an option for outdoor seating, and a room that is available for reservation. There are sofas and tables for inside. Benches and park tables for the outdoor area. And the study room has a nice window.',
      spaceSound: 'Very quiet outside of class times. Quiet space.',
      facilities: 'Sufficient plugs in the study space; there is a whiteboard and a screen to connect a laptop to.',
      convenience: 'Access to lounges and outdoor seating. Great for breaks in between class or getting a good view of part of the Diag.',
      accessibility: 'Very easy to access, never too much foot traffic. The room can be reserved, and the two lounge areas are open. So is the outdoor seating.'
    }
  },
  {
    id: 12,
    buildingId: 'ross',
    name: 'Ross School of Business - Winter Garden (1F)',
    location: 'Winter Garden (1F)',
    noise: 'lively',
    bestFor: ['group'],
    amenities: ['cafe', 'outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Ross/Ross - First Floor Small.png',
      'photos/Central Campus/Ross/Ross - First Floor(1) Small.png',
      'photos/Central Campus/Ross/Ross - First Floor(2) Small.png',
      'photos/Central Campus/Ross/Ross - First Floor(3) Small.png',
      'photos/Central Campus/Ross/Ross - First Floor(4) Small.png',
      'photos/Central Campus/Ross/Ross - First Floor(5) Small.png',
      'photos/Central Campus/Ross/Ross - First Floor(6) Small.png',
      'photos/Central Campus/Ross/Ross - First Floor(7) Small.png',
      'photos/Central Campus/Ross/Ross - First Floor(8) Small.png'
    ],
    dimensions: {
      environment: 'Huge, bright atrium-style space with tons of natural light and modern furniture. Tall glass windows, high ceilings, mix of tables and cushioned chairs, some lounge-style seating. Feels energetic and stylish more than cozy or quiet.',
      spaceSound: 'Very open, central hangout area with constant movement and talking. Students chatting at tables, echo from high ceilings, people walking through between classes and events. Usually loud enough that it\'s better for socializing or group work.',
      facilities: 'Great for laptop work and group projects, with plenty of tables and some access to outlets. Big communal tables, small group tables, scattered outlets in floors or along walls for charging devices. Not a traditional "computer lab" setup.',
      convenience: 'Extremely convenient, with easy access to coffee, snacks, and nearby cafés, making it a go-to spot to study, meet, and eat all in one spot. Grab-and-go café/counter nearby, quick access to food and drinks, restrooms and other Ross resources close by.',
      accessibility: 'On the main floor and right off major entrances, open to students all day. No reservation needed, central campus location, first-come-first-served seating. Very popular and can be packed during peak hours and recruiting events.'
    }
  },
  {
    id: 13,
    buildingId: 'shapiro',
    name: 'Shapiro Library - 1st Floor',
    location: '1st Floor',
    noise: 'lively',
    bestFor: ['group'],
    amenities: ['computers', 'printer', 'cafe', 'lounge', 'outlets', 'whiteboard'],
    bookableRooms: ['booth'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Shapiro Library/Shapiro - First Floor Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - First Floor(1) Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - First Floor(2) Small.png'
    ],
    dimensions: {
      environment: 'Large, basement-style computer lab with rows of desktops and standard office chairs. Spinning task chairs, long shared tables with monitors, no soft couches, mostly artificial lighting. Bright overhead lighting and a very functional, work-focused feel.',
      spaceSound: 'Very open and busy collaborative setting. Groups huddled around screens, constant background conversation, chairs rolling, occasional noise from printers and vending machines. People talk, move around, and work in groups, so it\'s lively and loud rather than quiet-study friendly.',
      facilities: 'Packed with learning tools: desktops at nearly every seat, several printers lined up, large whiteboards, and spaces for project work and coding. Dell/Mac desktops, whiteboards covered in notes, banks of printers, students pair-programming or working through problem sets.',
      convenience: 'High on convenience, with vending machines, microwaves, a toaster, a small market/café area, a fridge with grab-and-go sandwiches and salads, and a soundproof booth. Heat up food in microwaves, grab a snack or coffee from the market, use the fridge for pre-made meals, reserve the soundproof interview/phone booth.',
      accessibility: 'Open lab space that\'s easy to walk into and find a spot, especially for computer access. First-come, first-served desks, central location in the building, online or front-desk sign-up for interview booth. Special areas like the soundproof booth may require simple booking. Busiest during evenings and exams.'
    }
  },
  {
    id: 14,
    buildingId: 'shapiro',
    name: 'Shapiro Library - 2nd Floor',
    location: '2nd Floor',
    noise: 'moderate',
    bestFor: ['solo', 'group'],
    amenities: ['computers', 'printer', 'outlets'],
    bookableRooms: ['studyRoom'],
    enclosed: 'semi',
    photos: [
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00019 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00020 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00021 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00022 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00023 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00024 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00025 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00026 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00027 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00028 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00029 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00030 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00031 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00032 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00033 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Second Floor.jpg/DSC00034 Small.png'
    ],
    dimensions: {
      environment: 'Simple, functional library floor with bright overhead lighting, wooden chairs, and large tables. Long wooden tables, straight-backed chairs, neutral walls, consistent artificial lighting. More practical than cozy but generally comfortable.',
      spaceSound: 'Open study area that stays fairly quiet. Low background noise, quiet conversations only, students spread out across tables. Most people work individually or with headphones, so it\'s good for focused work rather than group chatter.',
      facilities: 'Mix of a smaller glass-walled Mac lab and big open tables for laptop work. iMac desktop stations, spaces for notebooks and laptops, table outlets or floor ports for charging devices. Outlets available at or near many seats.',
      convenience: 'Geared toward studying more than hanging out. Step out to nearby printers or help desk, short walk to restrooms or water fountains. Few amenities in the room itself, but close to typical library resources like printers and restrooms.',
      accessibility: 'Large floor with plenty of open seating and easy-to-navigate rows of tables. No reservations required, wide walkways between tables. Computer lab and table area are first-come, first-served. Usually possible to find a spot except at peak times.'
    }
  },
  {
    id: 15,
    buildingId: 'shapiro',
    name: 'Shapiro Library - 3rd Floor',
    location: '3rd Floor',
    noise: 'mixed',
    bestFor: ['solo', 'group'],
    amenities: ['whiteboard', 'outlets', 'lounge'],
    bookableRooms: ['studyRoom', 'booth'],
    enclosed: 'semi',
    photos: [
      'photos/Central Campus/Shapiro Library/Shapiro - Third Floor Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Third Floor(1) Small.png'
    ],
    dimensions: {
      environment: 'Modern, cozy floor with lots of greenery, comfy booths, soft cubicle-style nooks, and both spinny desk chairs and cushioned lounge chairs. Planters with tall plants, padded booth seating, soft chairs with backs, large windows along the side of the space. Big windows add natural light.',
      spaceSound: 'Mostly collaborative and moderately loud in the open area, but the floor also includes a clearly marked silent zone and soundproof booths for quiet focus. Groups talking at tables, people on laptops with headphones, separate silent section, glass soundproof rooms for calls or interviews.',
      facilities: 'Great for laptop work and group projects, with whiteboards scattered around, personal work surfaces in booths, and plenty of outlets built into walls and seating. Rolling whiteboards, wall-mounted boards with notes, power plugs below counters, students brainstorming and studying together.',
      convenience: 'Designed for long study sessions with comfortable seating options and nearby building amenities like restrooms and possibly food/coffee on another floor. Settle into a booth for hours, quick walk to restrooms, easy to run downstairs or nearby for a snack or drink.',
      accessibility: 'Open seating throughout the floor with a variety of spots (booths, cubbies, open tables). First-come, first-served desks and booths, reserved slots for phone/Zoom rooms. Soundproof booths may require simple booking, but most seats are walk-in. Wide walkways between sections for easy navigation.'
    }
  },
  {
    id: 16,
    buildingId: 'shapiro',
    name: 'Shapiro Library - 4th Floor',
    location: '4th Floor',
    noise: 'silent',
    bestFor: ['solo'],
    amenities: ['outlets'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00075 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00076 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00077 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00078 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00079 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00080 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00081 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00082 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00083 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00084 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00085 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro - Fourth Floor.jpg/DSC00086 Small.png'
    ],
    dimensions: {
      environment: 'Simple hallway-style study area with long tables, wooden chairs, and bright overhead lights. Neutral walls, straight-backed chairs, evenly spaced tables along the corridor. Functional and tidy, more practical than cozy.',
      spaceSound: 'The quietest floor of them all—students work in near silence, with only the faint sound of typing or page-turning. Silent/whisper-only vibe, most people wearing headphones or working alone, almost no conversation. Ideal for deep focus.',
      facilities: 'Best suited for laptop and reading work, with shared tables and built-in power outlets at many seats. Outlets in the tabletop or wall, space for notebooks and laptops, students spread out with minimal clutter.',
      convenience: 'Very few amenities in the corridor itself, but located close to other library resources like printers, restrooms, and elevators. Quick walk to restrooms or printers around the corner, easy to step out for water or a short stretch break.',
      accessibility: 'Long row of first-come, first-served seats that are easy to find and navigate. Tables lined up along the wall, clear walking path down the middle, open access with no reservations needed. Can fill during peak exam times.'
    }
  },
  {
    id: 17,
    buildingId: 'shapiro',
    name: 'Shapiro Library - Basement',
    location: 'Basement',
    noise: 'quiet',
    bestFor: ['solo', 'group'],
    amenities: ['computers', 'whiteboard', 'outlets'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Shapiro Library/Shapiro- Basement/DSC00087 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro- Basement/DSC00088 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro- Basement/DSC00089 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro- Basement/DSC00090 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro- Basement/DSC00091 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro- Basement/DSC00092 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro- Basement/DSC00093 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro- Basement/DSC00094 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro- Basement/DSC00095 Small.png',
      'photos/Central Campus/Shapiro Library/Shapiro- Basement/DSC00096 Small.png'
    ],
    dimensions: {
      environment: 'Modern library floor with a mix of desktop lab rows and open tables by the stacks. Spinning task chairs, clean white tables, shelves of books along one side, consistent overhead lights. Neutral walls, bright lighting, and ergonomic rolling chairs.',
      spaceSound: 'Mostly quiet, study-focused space—some low conversation in the computer area, but the stacks side stays calm and is good for sustained focus. Soft murmur from people typing or whispering, students with headphones on, no loud group work.',
      facilities: 'Strong on study tools: rows of desktops, large tables for laptops and notes, nearby shelves of physical and engineering books, and a whiteboard for review. Desktop monitors at each station, big tables to spread out flashcards or notebooks, whiteboard with problems.',
      convenience: 'Oriented toward studying more than hanging out; amenities are mostly standard library ones like printers, restrooms, and help desks nearby. Short walk to printers or reference desk, restrooms on the same/adjacent floor.',
      accessibility: 'Open seating in both the computer cluster and table area with no reservations. First-come, first-served desktops, plenty of walkways between tables and stacks. Easy to navigate aisles, though computers can fill at peak times. More open spots off-peak.'
    }
  },
  {
    id: 18,
    buildingId: 'taubman',
    name: 'Taubman Health Sciences Library - 1st Floor (Snack Area)',
    location: '1st Floor (Snack Area)',
    noise: 'moderate',
    bestFor: ['solo'],
    amenities: ['cafe', 'outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Taubman/Snack Area - First Floor Small.png',
      'photos/Central Campus/Taubman/Snack Area - First Floor_ Small.png'
    ],
    dimensions: {
      environment: 'Ergonomic chairs, calm and cozy environment.',
      spaceSound: 'Quiet area vs. collaborative space.',
      facilities: 'Sufficient plugs, working printers.',
      convenience: 'Easy to grab food or take short breaks.',
      accessibility: 'Easy to find a seat, open access or simple booking.'
    }
  },
  {
    id: 19,
    buildingId: 'taubman',
    name: 'Taubman Health Sciences Library - 4th-5th Floor (Break Room)',
    location: '4th-5th Floor (Break Room)',
    noise: 'quiet',
    bestFor: ['solo'],
    amenities: ['microwave', 'outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Taubman/“Break Room” - Fourth Floor Small.png',
      'photos/Central Campus/Taubman/“Break Room” - Fifth Floor Small.png'
    ],
    dimensions: {
      environment: 'Ergonomic chairs, calm and cozy environment.',
      spaceSound: 'Quiet area vs. collaborative space.',
      facilities: 'Sufficient plugs, working printers.',
      convenience: 'Easy to grab food or take short breaks.',
      accessibility: 'Easy to find a seat, open access or simple booking.'
    }
  },
  {
    id: 20,
    buildingId: 'taubman',
    name: 'Taubman Health Sciences Library - Conference Room A',
    location: 'Conference Room A',
    noise: 'quiet',
    bestFor: ['group'],
    amenities: ['whiteboard', 'outlets'],
    bookableRooms: ['conferenceRoom'],
    enclosed: 'enclosed',
    photos: [
      'photos/Central Campus/Taubman/Conference Room A - Floor 4 Small.png',
      'photos/Central Campus/Taubman/Conference Room A - Floor 5 Small.png'
    ],
    dimensions: {
      environment: 'Ergonomic chairs, calm and cozy environment.',
      spaceSound: 'Quiet area vs. collaborative space.',
      facilities: 'Sufficient plugs, working printers.',
      convenience: 'Easy to grab food or take short breaks.',
      accessibility: 'Easy to find a seat, open access or simple booking.'
    }
  },
  {
    id: 21,
    buildingId: 'taubman',
    name: 'Taubman Health Sciences Library - Conference Room B',
    location: 'Conference Room B',
    noise: 'quiet',
    bestFor: ['group'],
    amenities: ['whiteboard', 'outlets'],
    bookableRooms: ['conferenceRoom'],
    enclosed: 'enclosed',
    photos: [
      'photos/Central Campus/Taubman/Conference Room B - Floor 4 Small.png',
      'photos/Central Campus/Taubman/Conference Room B - Floor 5 Small.png'
    ],
    dimensions: {
      environment: 'Ergonomic chairs, calm and cozy environment.',
      spaceSound: 'Quiet area vs. collaborative space.',
      facilities: 'Sufficient plugs, working printers.',
      convenience: 'Easy to grab food or take short breaks.',
      accessibility: 'Easy to find a seat, open access or simple booking.'
    }
  },
  {
    id: 22,
    buildingId: 'union',
    name: 'Michigan Union - 1st Floor (Study Lounge)',
    location: '1st Floor (Study Lounge)',
    noise: 'quiet',
    bestFor: ['solo'],
    amenities: ['outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/Central Campus/Union/Union - First Floor (Study Lounge) Small.png'
    ],
    dimensions: {
      environment: 'Classic, cozy reading room with long wooden tables, cushioned chairs, and warm table lamps. Wood furniture, soft upholstered chairs, warm lamp lighting, big windows with natural light. Feels traditional, studious, and inviting.',
      spaceSound: 'Large, open room that is kept very quiet despite many people. Quiet atmosphere, low murmur at most, shared tables but generally respectful noise levels. Most students work silently or whisper, making it good for focused study.',
      facilities: 'Ideal for laptop and reading work with big work surfaces and some access to outlets. Spreading out books and notes, personal laptops at every seat, occasional floor or wall outlets. Plus nearby shelves or resources.',
      convenience: 'Geared more toward serious studying than hanging out. Study for long stretches, then step out to nearby hallways for water, restrooms, or a snack elsewhere. Limited food or casual amenities in the room itself, but restrooms and other library services are nearby.',
      accessibility: 'Open seating with no reservations. First-come, first-served desks, may need to walk around to find an open seat during exam periods. Can be busy and fill up at peak times, but easy to navigate with clearly arranged rows of tables.'
    }
  },
  {
    id: 23,
    buildingId: 'union',
    name: 'Michigan Union - 2nd Floor (Idea Hub)',
    location: '2nd Floor (Idea Hub)',
    noise: 'moderate',
    bestFor: ['group'],
    amenities: ['printer', 'whiteboard', 'outlets', 'lounge'],
    bookableRooms: ['studyRoom', 'conferenceRoom', 'movementStudio', 'creationStudio'],
    enclosed: 'mixed',
    photos: [
      'photos/Central Campus/Union/Union - Second Floor (Idea Hub) Small.png',
      'photos/Central Campus/Union/Union - Second Floor (Idea Hub)(1) Small.png',
      'photos/Central Campus/Union/Union - Second Floor (Idea Hub)(2) Small.png'
    ],
    dimensions: {
      environment: 'Bright, modern space with big windows and a mix of tables and soft seating. Colorful chairs, couches and armchairs, movable tables, lots of natural light. Feels creative and energetic rather than quiet and formal.',
      spaceSound: 'Open, collaborative area where people talk and work together. Group discussions at tables, light background noise, people walking through between meetings or classes. There\'s a steady buzz of conversation and movement, not a silent study zone.',
      facilities: 'Designed for project work with many tables, whiteboards, and printers spread throughout the area, plus plenty of outlets for laptops. Printers on multiple walls, power outlets near most seats, portable whiteboards, students printing and collaborating.',
      convenience: 'Located in the Union with super easy access to food, coffee, restrooms, and lounges—easy to grab a snack or take a short break while working. A few steps from cafés and dining options, restrooms on the same floor, nearby lounge areas.',
      accessibility: 'Central campus location in the Union, open to all students with no reservations. First-come, first-served tables and soft chairs, elevators and wide walkways. Popular but usually possible to find some kind of seat. Busiest at midday and early evening.'
    }
  },
  {
    id: 24,
    buildingId: 'duderstadt',
    name: 'Duderstadt Center - 1st Floor',
    location: '1st Floor',
    noise: 'moderate',
    bestFor: ['group'],
    amenities: ['cafe', 'computers', 'printer', 'outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - floor 1/DSC00003 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - floor 1/DSC00101 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - floor 1/DSC00115 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - floor 1/DSC00116 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - floor 1/DSC00117 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - floor 1/DSC00119 Small.png'
    ],
    dimensions: {
      environment: 'The chairs are all cushioned and quite comfortable.',
      spaceSound: 'There are quiet rooms as well as more open areas where talking is allowed.',
      facilities: 'There are power outlets everywhere, and there are printers in the 1st-floor atrium.',
      convenience: 'The building connects to Pierpont Commons, which offers several dining options (Panda Express, Great Greek, Hibachi-San) and the Blue Market convenience store, plus nearby vending machines. On the 1st floor of Duderstadt, Mujo Café provides coffee, snacks, a microwave, and seating, and Bursley Dining Hall is about a 10-minute walk away. There is also a room with beanbag sofas where you can lie down and rest.',
      accessibility: 'Most areas do not require reservations, but some specialized rooms (such as the VR lab and studios) require special access. For details, please see the Duderstadt Center website. You can also borrow electronic equipment (such as cameras and laptops).'
    }
  },
  {
    id: 25,
    buildingId: 'duderstadt',
    name: 'Duderstadt Center - 2nd Floor (Study Rooms)',
    location: '2nd Floor (Study Rooms)',
    noise: 'quiet',
    bestFor: ['solo', 'group'],
    amenities: ['outlets'],
    bookableRooms: ['studyRoom'],
    enclosed: 'enclosed',
    photos: [
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2 study room/DSC00016 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2 study room/DSC00019 Small.png'
    ],
    dimensions: {
      environment: 'Fairly comfortable.',
      spaceSound: 'Very private; suitable for individual study, interviews, and small-group discussions.',
      facilities: 'Has power outlets.',
      convenience: 'The building connects to Pierpont Commons, which offers several dining options (Panda Express, Great Greek, Hibachi-San) and the Blue Market convenience store, plus nearby vending machines. On the 1st floor of Duderstadt, Mujo Café provides coffee, snacks, a microwave, and seating, and Bursley Dining Hall is about a 10-minute walk away.',
      accessibility: 'Easy to find a seat; open access or simple to reserve.'
    }
  },
  {
    id: 26,
    buildingId: 'duderstadt',
    name: 'Duderstadt Center - 2nd Floor (Open Area)',
    location: '2nd Floor (Open Area)',
    noise: 'moderate',
    bestFor: ['solo', 'group'],
    amenities: ['computers', 'printer', 'whiteboard', 'outlets'],
    bookableRooms: ['none'],
    enclosed: 'mixed',
    photos: [
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00004 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00005 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00006 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00007 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00008 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00009 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00010 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00011 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00015 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00017 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00018 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00020 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00021 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00022 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00023 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00024 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00026 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/DSC00027 Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 2/unnamed (4) Small.png'
    ],
    dimensions: {
      environment: 'The chairs are fairly comfortable. Some areas have floor-to-ceiling windows with views outside.',
      spaceSound: 'There are open discussion areas (with large computers and whiteboards) as well as more enclosed, quiet areas suitable for self-study.',
      facilities: 'There are printers, whiteboards, and large-screen computers.',
      convenience: 'The building connects to Pierpont Commons, which offers several dining options (Panda Express, Great Greek, Hibachi-San) and the Blue Market convenience store, plus nearby vending machines. On the 1st floor of Duderstadt, Mujo Café provides coffee, snacks, a microwave, and seating, and Bursley Dining Hall is about a 10-minute walk away.',
      accessibility: 'No reservation needed, but it is usually quite busy.'
    }
  },
  {
    id: 27,
    buildingId: 'duderstadt',
    name: 'Duderstadt Center - 3rd Floor',
    location: '3rd Floor',
    noise: 'moderate',
    bestFor: ['solo', 'group'],
    amenities: ['computers', 'printer', 'whiteboard', 'outlets', 'lounge'],
    bookableRooms: ['conferenceRoom'],
    enclosed: 'mixed',
    photos: [
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 3/dc3wa-collab.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 3/unnamed (1) Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 3/unnamed (1) Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 3/unnamed (2) Small.png',
      'photos/North Campus/Duderstat/Location_ DUDERSTAT - Floor 3/unnamed (3) Small.png'
    ],
    dimensions: {
      environment: 'The chairs are fairly comfortable. Some areas have floor-to-ceiling windows with views outside. There are also individual, more private one-person seats that are very comfortable.',
      spaceSound: 'Noise level is moderate.',
      facilities: 'There are height-adjustable desks and ultra-large-screen computers.',
      convenience: 'The building connects to Pierpont Commons, which offers several dining options (Panda Express, Great Greek, Hibachi-San) and the Blue Market convenience store, plus nearby vending machines. On the 1st floor of Duderstadt, Mujo Café provides coffee, snacks, a microwave, and seating, and Bursley Dining Hall is about a 10-minute walk away.',
      accessibility: 'Generally no reservation needed, but it\'s usually more crowded in the afternoon. There are also meeting rooms (reservation required) that can be used for group discussions.'
    }
  },
  {
    id: 28,
    buildingId: 'ford-robotics',
    name: 'Ford Robotics Building - 2nd Floor',
    location: '2nd Floor',
    noise: 'quiet',
    bestFor: ['solo', 'group'],
    amenities: ['outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/North Campus/FRB/2nd Floor/IMG_7906 Small.png',
      'photos/North Campus/FRB/2nd Floor/IMG_7907 Small.png',
      'photos/North Campus/FRB/2nd Floor/IMG_7908 Small.png',
      'photos/North Campus/FRB/2nd Floor/IMG_7918 Small.png'
    ],
    dimensions: {
      environment: 'Privacy sofa rooms and comfortable chairs near the windows. Great lighting.',
      spaceSound: 'Open space, quiet at night. Quiet most of the time, unless there are activities downstairs.',
      facilities: 'No printers, have outlets, no individual display. Facilities not quite complete.',
      convenience: 'Only have café downstairs, but have microwave in 2229 kitchen, easy to the bathroom. You need to go to 1st floor to get food.',
      accessibility: 'Easy access open space, and NO need of reservation. You can come whenever you want as there is free space, but would be super crowded in midterm and final.'
    }
  },
  {
    id: 29,
    buildingId: 'ford-robotics',
    name: 'Ford Robotics Building - 3rd Floor',
    location: '3rd Floor',
    noise: 'quiet',
    bestFor: ['solo', 'group'],
    amenities: ['printer', 'outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/North Campus/FRB/3rd Floor/IMG_7903 Small.png',
      'photos/North Campus/FRB/3rd Floor/IMG_7904 Small.png',
      'photos/North Campus/FRB/3rd Floor/IMG_7905 Small.png'
    ],
    dimensions: {
      environment: 'Open space sofa zone. Great lighting.',
      spaceSound: 'Open space, quiet at night. Quiet most of the time, unless there are activities downstairs.',
      facilities: 'The only printer in FRB, have outlets, have individual display. Facilities complete.',
      convenience: 'Only have café downstairs, but have microwave in 3229 kitchen, easy to the bathroom. You need to go to 1st floor to get food.',
      accessibility: 'Easy access open space, and NO need of reservation, you need access to GGBL first. You can come whenever you want as there is free space, but would be super crowded in midterm and final.'
    }
  },
  {
    id: 30,
    buildingId: 'ggbl',
    name: 'G.G. Brown Laboratory - 1st Floor',
    location: '1st Floor',
    noise: 'moderate',
    bestFor: ['solo', 'group'],
    amenities: ['outlets', 'lounge'],
    bookableRooms: ['none'],
    enclosed: 'open',
    photos: [
      'photos/North Campus/GGBL/Study Area - Floor 1 Small.png',
      'photos/North Campus/GGBL/Study Area - Floor 2 Small.png',
      'photos/North Campus/GGBL/Study Room - Floor 1 Small.png',
      'photos/North Campus/GGBL/Room 1280 Small.png'
    ],
    dimensions: {
      environment: 'Limited sofa and most chairs are hard chairs. Great lighting.',
      spaceSound: 'It is a hall space. Quite open and noisy.',
      facilities: 'Only tables near the wall have outlets, no printer. Limited facilities.',
      convenience: 'Just near the restroom, but the nearest vending machine is in EECS building. Easy to access restrooms, hard to access the food.',
      accessibility: 'NO need for reservation, open to access, you need access to GGBL building first. Easy to find a seat, open to people who can access GGBL.'
    }
  }
];

export const getAreasByBuilding = (buildingId: string) => {
  return studyAreas.filter(area => area.buildingId === buildingId);
};

export const getAreasByCampus = (campus: 'central' | 'north') => {
  const centralBuildings = ['chemistry', 'fishbowl', 'north-university-building', 'hatcher', 'kinesiology', 'lsa', 'public-health', 'randall', 'ross', 'shapiro', 'taubman', 'union'];
  const northBuildings = ['duderstadt', 'ford-robotics', 'ggbl'];
  
  const buildingIds = campus === 'central' ? centralBuildings : northBuildings;
  return studyAreas.filter(area => buildingIds.includes(area.buildingId));
};
