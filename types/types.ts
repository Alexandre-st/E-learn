export type typeInputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Inputs = {
  titre: string;
  description: string;
  cours_content: Content[];
  isPublic: boolean;
  user: number;
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

export type CoursPreviewProps = {
  cours: Inputs;
  isPublished: boolean;
  user: User | undefined;
}

export type NouveauCoursInputs = {
  title: string;
  description: string;
  contents: Content[];
};
