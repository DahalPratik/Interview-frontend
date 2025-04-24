export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthFormProps {
  type: "login" | "signup";
}
