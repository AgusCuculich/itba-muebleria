const IMAGE_URL = import.meta.env.VITE_IMAGE_URL || 'http://localhost:3000/images/';

export const FOUNDING_YEAR = 1960

export const HERO_CARDS = [
  {
    position: 'top', // Verde Salvia
    src: `${IMAGE_URL}sillon-copacabana.png`,
    alt: 'Sillón Copacabana',
  },
  {
    position: 'right', // Rosa Polvoriento
    src: `${IMAGE_URL}butaca-mendoza.png`,
    alt: 'Butaca Mendoza',
  },
  {
    position: 'bottom', // Vara de Oro
    src: `${IMAGE_URL}mesa-de-centro-araucaria.png`,
    alt: 'Mesa de Centro Araucaria',
  },
]

export const SPARKLES_COUNT = 4