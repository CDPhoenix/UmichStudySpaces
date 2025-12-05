export const filterOptions = {
  noise: [
    { value: 'silent', label: '🔇 Silent', description: 'Strictly quiet, no talking allowed' },
    { value: 'quiet', label: '🔈 Quiet', description: 'Quiet environment, low whispers only' },
    { value: 'moderate', label: '🔉 Moderate', description: 'Some background noise and conversations' },
    { value: 'lively', label: '🔊 Lively', description: 'Active and energetic atmosphere' },
    { value: 'mixed', label: '🎚️ Mixed', description: 'Different noise zones available' }
  ],
  bestFor: [
    { value: 'solo', label: '👤 Solo Study', description: 'Individual focused work' },
    { value: 'group', label: '👥 Group Work', description: 'Collaborative projects and discussions' }
  ],
  amenities: [
    { value: 'computers', label: '💻 Computers' },
    { value: 'printer', label: '🖨️ Printer' },
    { value: 'whiteboard', label: '📋 Whiteboard' },
    { value: 'microwave', label: '🍽️ Microwave' },
    { value: 'cafe', label: '☕ Café' },
    { value: 'lounge', label: '🛋️ Lounge Seating' },
    { value: 'outlets', label: '🔌 Power Outlets' }
  ],
  bookableRooms: [
    { value: 'studyRoom', label: '📖 Study Room', description: '2-9 people, group study' },
    { value: 'conferenceRoom', label: '🏢 Conference Room', description: '6-20 people, formal meetings' },
    { value: 'booth', label: '🎧 Phone Booth', description: '1-2 people, video calls/interviews' },
    { value: 'movementStudio', label: '💃 Movement Studio', description: 'Dance rehearsals etc.' },
    { value: 'creationStudio', label: '🛠️ Creation Studio', description: 'Maker space' },
    { value: 'none', label: '🚶 Walk-in Only', description: 'No reservation needed' }
  ],
  enclosed: [
    { value: 'open', label: '🌐 Open', description: 'No walls or barriers' },
    { value: 'semi', label: '🔳 Semi-Private', description: 'Partitions or cubicles' },
    { value: 'enclosed', label: '🚪 Private Room', description: 'Enclosed room with door' },
    { value: 'mixed', label: '🔀 Mixed', description: 'Various privacy levels available' }
  ]
};

export type NoiseLevel = 'silent' | 'quiet' | 'moderate' | 'lively' | 'mixed';
export type BestFor = 'solo' | 'group';
export type Amenity = 'computers' | 'printer' | 'whiteboard' | 'microwave' | 'cafe' | 'lounge' | 'outlets';
export type BookableRoom = 'studyRoom' | 'conferenceRoom' | 'booth' | 'movementStudio' | 'creationStudio' | 'none';
export type EnclosedLevel = 'open' | 'semi' | 'enclosed' | 'mixed';
