export type typeInputs = {
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
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

