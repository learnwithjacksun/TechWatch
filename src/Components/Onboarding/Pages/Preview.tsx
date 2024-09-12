import { useParams } from "react-router-dom";
import { works } from "../../../Constants/data";
import Layout from "../Layout";
import Heading from "../../Global/Heading";
import Icon from "../../Global/Icon";


const Preview = () => {
  const { id } = useParams<{ id: string }>();

  const project = works.find((work) => work.id === id);

  if (!project) {
    return <div>Project not found!</div>;
    }
    
    

  return (
      <>
          <Layout>
              <div className="my-8 main">
                  <Heading title="Preview" subtitle={`What is ${project.title} all about? 🤔`} />

                  <div className="my-6 flex flex-col md:flex-row gap-4 md:gap-8">
                      <div className="flex-1 rounded overflow-hidden">
                          <img src={project.image} alt="Project Image" />
                      </div>
                      <div className="flex-1 flex flex-col gap-6">
                          <div>
                              <h2 className="text-xl font-bold font-sora">{project.title}</h2>
                              <p className="text-sub text-sm font-medium">By Gift Jackson <span className="text-xs font-semibold bg-green-500/10 border-green-500  border px-2 rounded-full text-green-500 inline-flex">Developer</span></p>
                              <p className="text-sm">07/09/2024</p>
                          </div>

                          <div>
                              <h3 className="font-semibold text-sm">Description:</h3>
                              <p className="mt-2 text-display text-sm text-sub">{project.description}</p>
                          </div>

                          <div>
                              <h3 className="font-semibold text-sm">Tools/ Stack:</h3>
                              <ul className="flex flex-wrap gap-2 mt-2">
                                  {project.tools.map((x, y) => (
                                      <li key={y} className="text-sm px-4 py-2 rounded-full bg-light border border-line">
                                          {x}
                                      </li>
                                  ))}
                              </ul>
                          </div>

                          <a href={project.link} className="btn-primary w-[200px] h-10 rounded-lg">
                          <span>Project Link</span>
                          <Icon styles="text-[1.3em]">open_in_new</Icon>
                          </a>
                      </div>
                  </div>
              </div>
      </Layout>
      </>
  );
};

export default Preview;
