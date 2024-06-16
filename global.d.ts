interface Category {
  _id: string;
  _type: string;
  title: string;
}

interface Post {
  _id: string;
  _createdAt: Date;
  title: string;
  body: BlockContentProps;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      url: string
    }
  };
  categories: Category[];
  author: {
    name: string;
  }
}