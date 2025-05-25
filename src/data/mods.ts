import { GameMod } from '../types';

export const gameMods: GameMod[] = [
  {
    id: '1',
    name: 'Reload Ta Pub',
    description: 'A high-performance FiveM server with custom scripts and regular events.',
    category: 'discord server',
    subcategory: 'gameserver',
    thumbnailUrl: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=300',
    downloadUrl: 'https://discord.gg/rz2eW6vucj',
    author: 'Reload Ta Pub',
    rating: 0.6,
    downloads: 9.9,
    dateAdded: new Date('2025-05-25'),
    requirements: ['Discord Publicitaire']
    tags: ['Discord server', 'active-community'],
    featured: true
  },
  {
    id: '2',
    name: 'Minecraft Survival Server',
    description: 'Join our active Minecraft community with custom plugins and regular events.',
    category: 'gameserver',
    subcategory: 'minecraft',
    thumbnailUrl: 'https://images.pexels.com/photos/2885014/pexels-photo-2885014.jpeg?auto=compress&cs=tinysrgb&w=300',
    downloadUrl: '#',
    author: 'Reload Gaming',
    rating: 4.6,
    downloads: 850,
    dateAdded: new Date('2024-03-10'),
    requirements: ['Minecraft Java Edition'],
    ],
    tags: ['survival', 'plugins', 'community'],
    featured: true
  }
];

export const getModsByCategory = (category: GameMod['category']) => {
  return gameMods.filter(mod => mod.category === category);
};

export const getFeaturedMods = () => {
  return gameMods.filter(mod => mod.featured);
};

export const searchMods = (query: string) => {
  const searchTerm = query.toLowerCase();
  return gameMods.filter(mod => 
    mod.name.toLowerCase().includes(searchTerm) ||
    mod.description.toLowerCase().includes(searchTerm) ||
    mod.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};