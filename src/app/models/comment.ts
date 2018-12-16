export interface Comment {
  id: string;
  created: Date;
  updated: Date;
  comment: string;
}

export interface CommentDTO {
  comment: string;
}
