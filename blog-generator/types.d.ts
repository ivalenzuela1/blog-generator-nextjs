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

type Tone = {
  label: string;
  value: string;
};

type Profile = {
  credits: number;
  uid: string;
};
