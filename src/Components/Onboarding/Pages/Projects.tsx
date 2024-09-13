import { Link } from "react-router-dom";
import Layout from "../Layout";
import Icon from "../../Global/Icon";
import Heading from "../../Global/Heading";
import useProjects from "../../../Hooks/useProjects";
import { storage } from "../../../Libs/appwriteConfig";

// Ensure the project interface is correctly typed
// interface Project {
//   $id: string;
//   title: string;
//   description: string;
//   link: string;
//   tools: string[];
//   image: string;
//   userid: string;
//   name: string;
//   role: string;
//   $createdAt: string; // Add this to store the creation date
// }

const Projects = () => {
  const { project } = useProjects(); // project is typed as Project[] or null
  
  // Function to format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Layout>
        <div className="main my-8">
          <div className="flex justify-end">
            <Link to="/upload" className="btn-primary h-10 px-6 rounded-xl">
              <Icon>add</Icon>
              <span>Upload Project</span>
            </Link>
          </div>

          <div className="my-6">
            <Heading
              title="All Projects"
              subtitle="Mummy see ooo...see what techies are cooking! 🔥"
            />

            <div className="my-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {project?.map((x) => (
                  <li key={x.$id} className="bg-light shadow border-line border rounded-2xl overflow-hidden">
                    <Link to={`/projects/${x.$id}`} className="flex flex-col gap-4">
                      <div className="h-52 overflow-hidden border-b border-line">
                        <img
                          src={x.image && storage.getFilePreview("images", x.image).href}
                          alt="Project Preview"
                          className="w-full object-cover"
                        />
                      </div>
                      <div className="px-2">
                        <h2 className="font-semibold uppercase font-sora">{x.title}</h2>
                        <p className="line-clamp-2 font-medium text-sm text-sub">
                          {x.description}
                        </p>
                      </div>
                      <div className="px-2">
                        {/* <div className="text-sm font-semibold">Tools/ Stack</div> */}
                        <div className="flex items-center gap-1 font-medium text-sub text-xs">
                          {x.tools.map((tool, index) => (
                            <span key={index} className="bg-lighter px-2 py-1 border border-line rounded-full">{tool}</span>
                          ))}
                        </div>
                      </div>
                      <div className="px-2 flex border-t border-line py-2">
                        <p className="text-sm flex-1">
                          {x.name}&nbsp;<span className="bg-green-500/10 border border-green-500 text-green-500 rounded-full px-2 font-medium text-xs">{x.role}</span>
                        </p>
                        <p className="text-xs text-sub my-1">{formatDate(x.$createdAt)}</p> {/* Format the date */}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Projects;
