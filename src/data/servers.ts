import { DiscordServer } from '../types';

export const discordServers: DiscordServer[] = [
  {
    id: '1',
    name: 'Reload Ta Pub',
    description: 'Serveur du fondateur AyviTV & Wayzen!',
    category: 'advertising',
    inviteLink: 'https://discord.gg/JQnhxUGxqr',
    iconUrl: 'https://media.discordapp.net/attachments/1372686113826934855/1375909100017160402/ReloadFrance.png?ex=683366b4&is=68321534&hm=d7ada5e5d94e8ccd693d3eff30d21c4e0e9a7e71f8be12b85f1b47865727b594&=&format=webp&quality=lossless',
    memberCount: 41,
    boostLevel: 2,
    promoted: true,
    promotionLevel: 'premium'
  },
  {
    id: '2',
    name: '#Soon',
    description: '',
    category: '',
    inviteLink: '',
    iconUrl: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=150',
    memberCount: 0,
    boostLevel: 0
  },
  {
    id: '3',
    name: '#Soon',
    description: '',
    category: '',
    inviteLink: '',
    iconUrl: 'https://images.pexels.com/photos/2755075/pexels-photo-2755075.jpeg?auto=compress&cs=tinysrgb&w=150',
    memberCount: 0,
    boostLevel: 0
  }
];

export const promotedServers: DiscordServer[] = [
  {
    id: 'promo1',
    name: 'Gaming Hub',
    description: 'The ultimate gaming community for all gamers! Join us for daily events, tournaments, and amazing prizes.',
    category: 'gaming',
    inviteLink: 'https://discord.gg/example',
    iconUrl: 'https://images.pexels.com/photos/2885014/pexels-photo-2885014.jpeg?auto=compress&cs=tinysrgb&w=150',
    memberCount: 15000,
    boostLevel: 3,
    promoted: true,
    promotionLevel: 'ultimate'
  },
  {
    id: 'promo2',
    name: 'Anime World',
    description: 'Your one-stop destination for all things anime! Discussion, watch parties, and fan art sharing.',
    category: 'community',
    inviteLink: 'https://discord.gg/example2',
    iconUrl: 'https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg?auto=compress&cs=tinysrgb&w=150',
    memberCount: 8000,
    boostLevel: 2,
    promoted: true,
    promotionLevel: 'premium'
  }
];

// Sort and rank servers based on member count and boost level
export const getRankedServers = () => {
  return discordServers
    .sort((a, b) => {
      // Calculate score based on member count and boost level
      const scoreA = a.memberCount + (a.boostLevel * 10);
      const scoreB = b.memberCount + (b.boostLevel * 10);
      return scoreB - scoreA;
    })
    .map((server, index) => ({
      ...server,
      ranking: index + 1
    }));
};