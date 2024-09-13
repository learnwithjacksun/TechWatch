import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import toast from "react-hot-toast";
import { databases, storage } from "../Libs/appwriteConfig";
import { ID, Models } from "appwrite"; // Import Models for Appwrite types
import useData from "./useData";
import { useNavigate } from "react-router-dom";

// Define Project Type
interface Project {
  $createdAt($createdAt: any): import("react").ReactNode;
  $id: string;
  title: string;
  description: string;
  link: string;
  tools: string[];
  image: string;
  userid: string;
  name: string;
  role: string;
}

// Define File Response Type
interface FileResponse extends Models.File {
  $id: string;
}

// Define Appwrite Document Response
interface DocumentResponse extends Models.Document {
  $id: string;
}

const useProjects = () => {
  // State for projects
  const [project, setProject] = useState<Project[] | null>(null);
  const { data } = useData();

  // Get auth context
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw Error("useProject should exist under AuthProvider");
  }

  const navigate = useNavigate();
  const { user } = authContext;

  // Upload Project Function
  const uploadProject = async (
    title: string,
    description: string,
    link: string,
    tools: string[],
    image: File
  ): Promise<void> => {
    try {
      // Upload image file
      const file: FileResponse = await storage.createFile("images", ID.unique(), image);
      console.log(file);
      const fileid = file.$id;

      // Create project document in the database
      const res: DocumentResponse = await databases.createDocument(
        "twcdb",
        "projects",
        ID.unique(), // Use a unique ID for the project
        {
          title,
          description,
          link,
          tools,
          image: fileid,
          userid: user?.$id || "",
          name: data?.name || "",
          role: data?.role || "",
        }
      );
      console.log(res);
      navigate("/projects");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload project");
    }
  };

  // Fetch all projects
  const getProjects = async (): Promise<void> => {
    try {
      const res = await databases.listDocuments("twcdb", "projects");
        console.log(res);
        
      setProject(res.documents);
    } catch (error) {
      console.log(error);
      toast.error("Fail to retrieve project");
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return { uploadProject, project };
};

export default useProjects;
