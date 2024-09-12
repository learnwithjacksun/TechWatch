import { useState } from "react";
import Heading from "../../Global/Heading";
import Layout from "../Layout";
import TagInput from "../UI/TagInput";
import Input from "../../Global/Input";
import TextArea from "../../Global/TextArea";
import ImageInput from "../../Global/ImageInput";
import Icon from "../../Global/Icon";
import toast from "react-hot-toast";

const Upload = () => {
  const [tools, setTools] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log({
      title,
      description,
      link,
      tools,
      image,
    });
      toast.success("Project added successfully!")
  };

  return (
    <>
      <Layout>
        <div className="main my-8">
          <div className="layout">
            <Heading
              title="Upload Project"
              subtitle="What have you been cooking? 💁‍♂️"
            />

            {/* Form submit handler */}
            <form
              className="flex flex-col gap-4 my-6 bg-light shadow-lg p-4 rounded-xl border border-line"
              onSubmit={handleSubmit}
            >
              {/* Project Title */}
              <Input
                id="title"
                label="Project Title"
                type="text"
                placeholder="What's the name of the project?"
                bg_color="bg-secondary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* Project Description */}
              <TextArea
                id="description"
                label="Project Description"
                placeholder="Briefly describe your project"
                bg_color="bg-secondary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Project Link */}
              <Input
                id="link"
                label="Project Link"
                type="text"
                placeholder="Live link or project location url"
                bg_color="bg-secondary"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              {/* Tools Input */}
              <TagInput tools={tools} setTools={setTools} />

              {/* Image Input */}
              <ImageInput handleImageChange={handleImageChange}>
                <div className="border-dashed bg-secondary border-line border flex-center p-6 rounded-lg">
                  <div className="flex flex-col items-center">
                    <Icon styles="text-sub">add_a_photo</Icon>
                    <div className="font-semibold text-sm text-sub">
                      Upload Image
                    </div>

                    {image?.name && (
                      <div className="font-semibold text-sm bg-lighter px-6 py-2 rounded-full border border-line mt-2">
                        {image?.name}
                      </div>
                    )}
                  </div>
                </div>
              </ImageInput>

              {/* Submit Button */}
              <button type="submit" className="btn-primary h-10 rounded-lg">
                Post
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Upload;
