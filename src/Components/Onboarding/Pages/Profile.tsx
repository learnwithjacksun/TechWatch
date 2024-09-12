import Heading from "../../Global/Heading";
import Layout from "../Layout";
import avatar from "../../../assets/avatar-1.avif";
import Icon from "../../Global/Icon";
import Container from "../../Global/Container";
import { works } from "../../../Constants/data";
import { Link } from "react-router-dom";
import Modal from "../../Global/Modal";
import TextArea from "../../Global/TextArea";
import ImageInput from "../../Global/ImageInput";
import { useState } from "react";
import useData from "../../../Hooks/useData";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { databases } from "../../../Libs/appwriteConfig";

const Profile = () => {
  const { data } = useData();
  const { user } = useAuth();
  
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);

  const [bio, setBio] = useState(data?.bio); // Initialize with current bio
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const updateBio = async (): Promise<void> => {
    if (!user?.$id) {
      toast.error("User ID is missing.");
      return;
    }

    toast.promise(
      databases.updateDocument("twcdb", "users", user.$id, {
        bio: bio,
      }),
      {
        loading: "Updating Bio...",
        success: "Bio updated successfully!",
        error: "Failed to update bio.",
      }
    );

    toggleModal()
    data!.bio = bio;
   
  };

  const updateImage = async (): Promise<void> => {
    if (!user?.$id) {
      toast.error("User ID is missing.");
      return;
    }
    
    if (!image) {
      toast.error("No image selected.");
      return;
    }

   

    // Logic to update profile image (you might need to upload to Appwrite's storage)
    // This is a placeholder, modify this based on how you handle file uploads
    // toast.promise(
    //   new Promise((resolve, reject) => {
    //     // You would need to add actual file upload logic here
    //     setTimeout(() => resolve("Image updated"), 2000); // Simulated success response
    //   }),
    //   {
    //     loading: "Uploading image...",
    //     success: "Profile image updated successfully!",
    //     error: "Failed to upload image.",
    //   }
    // );
  };

 

  return (
    <>
      <Layout>
        <div className="main my-8">
          <div className="layout">
            <Heading title="My Profile" subtitle="Some shits about me...🤔" />
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 my-8">
              <div className="h-32 w-32 overflow-hidden rounded-full p-2 bg-light shadow-lg">
                <img
                  src={avatar} // Replace with user's actual avatar if available
                  alt="Avatar"
                  className="w-full object-cover rounded-full"
                />
              </div>
              <div className="flex text-center md:text-left flex-col gap-1">
                <p className="font-semibold">{data?.name}</p>
                <p className="text-sub text-sm font-medium">{data?.email}</p>
                <span className="text-sm font-semibold rounded-full text-green-500 capitalize">{data?.role}</span>
                <p className="text-sub text-sm font-medium">{data?.gender}</p>
              </div>
            </div>

            <div className="border bg-light border-line text-sub rounded-lg p-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm font-sora">About Me:</h3>
                <button onClick={toggleModal} className="btn-primary rounded px-2 py-1">
                  <Icon styles="text-[1.4em]">edit</Icon>
                  <span>Edit Bio</span>
                </button>
              </div>
              <p className="text-display bg-secondary rounded p-2 text-sm">
                {data?.bio || "No bio available."}
              </p>
            </div>
          </div>

          <div className="my-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base font-sora">My Projects:</h3>
              <Link to="/upload" className="btn-primary rounded p-3">
                <Icon styles="text-[1.4em]">add</Icon>
                <span>Add Project</span>
              </Link>
            </div>
            <div className="my-4">
              <Container works={works} />
            </div>
          </div>
        </div>
      </Layout>

      {modal && (
        <Modal toggleModal={toggleModal} title="Edit Profile">
          <div className="flex flex-col gap-4">
            <div>
              <ImageInput handleImageChange={handleImageChange}>
                <div className="border-dashed bg-secondary border-line border flex-center p-6 rounded-lg">
                  <div className="flex flex-col items-center">
                    <Icon styles="text-sub">add_a_photo</Icon>
                    <div className="font-semibold text-sm text-sub">Profile Image</div>
                    {image?.name && (
                      <div className="font-semibold text-sm bg-lighter px-6 py-2 rounded-full border border-line mt-2">
                        {image?.name}
                      </div>
                    )}
                  </div>
                </div>
              </ImageInput>
              <div className="flex justify-end">
                <button onClick={updateImage} className="btn-primary mt-2 px-2 h-8 rounded">
                  Update Profile Image
                </button>
              </div>
            </div>

            <div>
              <TextArea
                label="Edit Bio"
                id="bio"
                placeholder="Update bio..."
                bg_color="bg-secondary"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <div className="flex justify-end">
                <button onClick={updateBio} className="btn-primary mt-2 px-2 h-8 rounded">
                  Update Bio
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Profile;
