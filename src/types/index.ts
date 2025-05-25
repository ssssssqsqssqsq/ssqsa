export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface DiscordServer {
  id: string;
  name: string;
  description: string;
  category: 'gaming' | 'community' | 'advertising' | 'other';
  inviteLink: string;
  iconUrl: string;
  memberCount: number;
  boostLevel: number;
  ranking?: number;
  promoted?: boolean;
  promotionLevel?: 'basic' | 'premium' | 'ultimate';
  promotionExpiry?: Date;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverArt?: string;
}