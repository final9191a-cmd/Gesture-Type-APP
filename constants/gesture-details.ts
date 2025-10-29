export interface Gesture {
  name: string;
  desc: string;
  emoji: string;
  char: string;
  isDefaultActive: boolean;
}

export const ALL_GESTURES: Gesture[] = [
  // The AI model can only recognize these 7 gestures. 
  // All are now active by default.
  { name: 'Thumb_Up', desc: 'Thumb up', emoji: '👍', char: 'A', isDefaultActive: true },
  { name: 'ILoveYou', desc: 'ILY sign', emoji: '🤟', char: 'E', isDefaultActive: true },
  { name: 'Pointing_Up', desc: 'Index finger pointing up', emoji: '☝️', char: 'I', isDefaultActive: true },
  { name: 'Victory', desc: 'Victory (peace sign)', emoji: '✌️', char: 'V', isDefaultActive: true },
  { name: 'Thumb_Down', desc: 'Thumb down', emoji: '👎', char: 'Y', isDefaultActive: true },
  { name: 'Open_Palm', desc: 'Delete Word', emoji: '🖐️', char: 'DELETE_WORD', isDefaultActive: true },
  { name: 'Closed_Fist', desc: 'Space', emoji: '👊', char: 'SPACE', isDefaultActive: true },
];
