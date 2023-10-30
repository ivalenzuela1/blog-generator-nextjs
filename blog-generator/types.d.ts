type MenuItem = {
  text: string;
  icon: string;
  route: string;
};

type PostPrompt = {
  title: string;
  description: string;
  keywords: string;
  tone: string;
};

type Post = {
  title: string;
  content: string | string[];
  uid: string;
};

interface PostWithId extends Post {
  _id: string;
}

type Tone = {
  label: string;
  value: string;
};

type Profile = {
  credits: number;
  uid: string;
};
