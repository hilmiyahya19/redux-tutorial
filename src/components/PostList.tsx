import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchPost } from "../slices/postSlice";

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.post.items);
  const status = useSelector((state: RootState) => state.post.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPost());
    }
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load posts</div>;
  }
  
  return (
    <div>
      <ul>
        {items.map((item: { id: number; title: string }) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
