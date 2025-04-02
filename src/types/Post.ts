export interface Post {
    _id: { $oid: string };
    name: string;
    status: string;
    desc: string;
    userId: { $oid: string };
  }