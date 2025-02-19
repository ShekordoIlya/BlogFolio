import { useState } from "react";
import ImageUploader from "../../Components/ImageUploader/ImageUploader";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/CreatePostSlice";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    image: null,
    text: "",
    lesson_num: "",
    title: "",
    description: "",
  });
  const [remove, setRemove] = useState(false);
  const dispatch = useDispatch();
  const inputHandlerChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageSelect = (imageFile) => {
    setFormData({ ...formData, image: imageFile });
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (formData.image) {
      data.append("image", formData.image[0].file);
      data.append("text", formData.text);
      data.append("lesson_num", formData.lesson_num);
      data.append("title", formData.title);
      data.append("description", formData.description);
    }
    console.log(formData.image);
    dispatch(createPost(data));
    setFormData({
      image: null,
      text: "",
      lesson_num: "",
      title: "",
      description: "",
    });
    setRemove(!remove);
  };
  console.log("formData", formData);
  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <div>
          <label>Image</label>
          <ImageUploader onImageSelect={handleImageSelect} remove={remove} />
        </div>
        <div>
          <label>Text</label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={inputHandlerChange}
          />
        </div>
        <div>
          <label>Lesson Num</label>
          <input
            type="number"
            name="lesson_num"
            value={formData.lesson_num}
            onChange={inputHandlerChange}
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={inputHandlerChange}
          />
        </div>
        <div>
          <label>description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={inputHandlerChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};
export default CreatePost;
