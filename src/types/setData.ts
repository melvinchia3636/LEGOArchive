// Generated by https://quicktype.io

export interface SetData {
    status: string;
    matches: number;
    sets: Set[];
  }

export interface Set {
    setID: number;
    number: string;
    numberVariant: number;
    name: string;
    year: number;
    theme: string;
    themeGroup: ThemeGroup;
    subtheme?: string;
    category: Category;
    released: boolean;
    pieces?: number;
    minifigs?: number;
    image: Image;
    bricksetURL: string;
    collection: Collection;
    collections: Collections;
    LEGOCom: LEGOCOM;
    rating: number;
    reviewCount: number;
    packagingType: PackagingType;
    availability: Availability;
    instructionsCount: number;
    additionalImageCount: number;
    ageRange: AgeRange;
    dimensions: Dimensions;
    barcode: Barcode;
    extendedData: Collection;
    lastUpdated: string;
  }

export interface LEGOCOM {
    US: CA;
    UK: CA;
    CA: CA;
    DE: CA;
  }

export interface CA {
    retailPrice?: number;
    dateFirstAvailable?: string;
    dateLastAvailable?: string;
  }

export interface AgeRange {
    min?: number;
    max?: number;
  }

export enum Availability {
    LEGOExclusive = 'LEGO exclusive',
    NotSpecified = '{Not specified}',
    Retail = 'Retail',
    RetailLimited = 'Retail - limited',
  }

export interface Barcode {
    EAN?: string;
    UPC?: string;
  }

export enum Category {
    Collection = 'Collection',
    Normal = 'Normal',
    Other = 'Other',
  }

export interface Collection {
  }

export interface Collections {
    ownedBy: number;
    wantedBy: number;
  }

export interface Dimensions {
    height?: number;
    width?: number;
    depth?: number;
    weight?: number;
  }

export interface Image {
    thumbnailURL?: string;
    imageURL?: string;
  }

export enum PackagingType {
    Box = 'Box',
    BoxWithBackingCard = 'Box with backing card',
    Polybag = 'Polybag',
    ShrinkWrapped = 'Shrink-wrapped',
    Tag = 'Tag',
    Tub = 'Tub',
  }

export enum ThemeGroup {
    Basic = 'Basic',
    Licensed = 'Licensed',
    Miscellaneous = 'Miscellaneous',
    ModelMaking = 'Model making',
    ModernDay = 'Modern day',
    PreSchool = 'Pre-school',
  }
