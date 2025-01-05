export interface JwtPayload {
  sub: number;
  email: string;
}

export interface UserWithoutPassword {
  id: number;
  email: string;
  name: string;
}
