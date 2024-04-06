type MediaBase = {
  _id: number;
};

export type PhotoMedia = MediaBase & {
  media: {
    _type: "photo";
    image: { asset: string };
  };
};
export type VideoMedia = MediaBase & {
  media: {
    _type: "video";
    vimeoUrl: string;
    cloudinaryId: string;
    thumbnail: string;
  };
};

export type Media = PhotoMedia | VideoMedia;

export const imagesAndVimeoIds: Media[] = [
  {
    _id: 83654,
    media: {
      _type: "video",
      vimeoUrl: "https://vimeo.com/765321481",
      cloudinaryId:
        "https://res.cloudinary.com/michael-lawrence/video/upload/v1677722713/ML%20REEL/TATCHA/TATCHA_2_tyxmmz.mp4",
      thumbnail: "/placeholder.png",
    },
  },
  {
    _id: 78392,
    media: {
      _type: "photo",
      image: {
        asset:
          "https://fastly.picsum.photos/id/1/500/500.jpg?hmac=6vo7WkHURh9CWfdf144ASqEaPNcbj2PHJK3UgGH24lM",
      },
    },
  },
  {
    _id: 12493,
    media: {
      _type: "video",
      vimeoUrl: "https://vimeo.com/723877014",
      cloudinaryId:
        "https://res.cloudinary.com/michael-lawrence/video/upload/v1656172563/Citreon_6sec_gyeeaf.mp4",
      thumbnail: "/placeholder.png",
    },
  },
  {
    _id: 29742,
    media: {
      _type: "photo",
      image: {
        asset:
          "https://fastly.picsum.photos/id/13/500/500.jpg?hmac=oIMjG56df3J3cWXHmJTmMSVj1huozLkKwY4NAUXpxOw",
      },
    },
  },
  {
    _id: 39590,
    media: {
      _type: "video",
      vimeoUrl: "https://vimeo.com/804101717",
      cloudinaryId:
        "https://res.cloudinary.com/michael-lawrence/video/upload/v1678918546/ML%20REEL/AWS%20x%20NHL/AWS_NHL_no_sound_fhvzb8.mp4",
      thumbnail: "/placeholder.png",
    },
  },
  {
    _id: 34945,
    media: {
      _type: "photo",
      image: {
        asset:
          "https://fastly.picsum.photos/id/43/500/500.jpg?hmac=C2chTFYVJaRjRuU4mk-aFTE27GHmwp3P47U5Wi8IWvY",
      },
    },
  },
  {
    _id: 90485,
    media: {
      _type: "photo",
      image: {
        asset:
          "https://fastly.picsum.photos/id/73/500/500.jpg?hmac=42sXTo-mf9CXWQJSm_30y80yHZB63z7nyV1fuCUKcrw",
      },
    },
  },
];
