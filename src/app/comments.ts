export interface Comments {
  id: number;
  idPost: number;
  idUser: number;
  body: string;
  authorname: string | undefined;
}
