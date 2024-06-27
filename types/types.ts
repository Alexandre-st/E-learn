export type typeInputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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
  }
};
