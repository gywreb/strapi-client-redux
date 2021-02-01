export interface LayoutBanner {
  __component: string;
  title: string;
  description: string;
  image: {
    url: string;
  };
}

export interface LayoutThumbnail {
  __component: string;
  caption: string;
  path: string;
  image: {
    url: string;
  };
}
