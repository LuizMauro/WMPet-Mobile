export interface IBasicAnimals {
  aniID: string;
  aniName: string;
  aniSpecies: boolean;
  racID: {
    racDescription: string;
  };
  photos: IPhotos[];
}

export interface IPhotos {
  picID: string;
  picPath: string;
  picStatus: string;
  picPrimary: boolean;
}
