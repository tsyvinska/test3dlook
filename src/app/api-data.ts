export interface ApiData {
  total: number;
  totalHits: number;
  hits: [
    {
      pageURL: string;
      previewURL: string;
      largeImageURL: string;
      id: number;
      tags: string;
      userImageURL: string;
      user: string;
      likes: number;
      favorites: number;
      downloads: number;
    }
  ];
}
