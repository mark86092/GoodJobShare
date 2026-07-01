export interface Reply {
  id: string;
  content: string;
  like_count: number;
  floor: number;
  created_at: string;
  liked: boolean | null;
}
