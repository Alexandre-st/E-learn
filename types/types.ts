export type typeInputs = {
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  password: string;
  confirmPassword: string;
};

export type Inputs = {
  id: number;
  titre: string;
  description: string;
  cours_content: Content[];
  isPublic: boolean;
  user: number;
  imageUrl: string | null;
};

export type Content = {
  type: "text" | "video" | "quiz";
  title: string | null;
  value: string | Quiz;
};

export type Question = {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export type Quiz = {
  questions: Question[];
}

export type User = {
  id: number;
  role: string;
}


export type CoursProfesseurProps = {
  cours: Inputs;
  isPublished: boolean;
  publish: () => void;
  _onReady: (event: any) => void;
  extractYouTubeID: (url: string) => string | null;
}

export type CoursEleveProps = {
  cours: Inputs;
  userId: number | undefined;
  _onReady: (event: any) => void;
  extractYouTubeID: (url: string) => string | null;
}

export type CoursPreviewProps = {
  cours: Inputs;
}

export type NouveauCoursInputs = {
  title: string;
  description: string;
  contents: Content[];
  categorie: number;
}

export type typeCourses = {
  id: number;
  cours_content: string[];
  categories: string;
  moyenne: number;
  titre: string;
  description: string;
  isPublic: boolean;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    role: string;
  };
};

export type userClient = {
  id: number;
  role: string;
  email: string;
  user_id: string;
  created_at: string;
};

export type typeUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
};

export type categorieType = {
  id: number;
  nom: string;
  image: string;
  logo: string;
}[];
