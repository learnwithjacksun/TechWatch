import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
interface Work {
  userid: string;
  name: string;
  role: string;
  image: string;
  title: string;
  description: string;
  tools: string[];
  link: string;
}

interface ContainerProps {
  works: Work[];
}

const Container: React.FC<ContainerProps> = ({ works }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {works.map((work) => (
        <li
          key={work.userid}
          className="flex flex-col gap-2 bg-lighter p-4 rounded-2xl"
        >
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  src="https://api.dicebear.com/9.x/lorelei/svg?seed=male"
                  alt="Avatar"
                  className="w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-sora font-semibold">{work.name}</h3>
                <p className="text-sub text-xs">{work.role}</p>
              </div>
            </div>

            <div className="overflow-hidden border border-line rounded-lg h-[200px]">
              <img src={work.image} alt="Project Image" className="w-full" />
            </div>

            <div>
              <h3 className="font-semibold font-sora">{work.title}</h3>
              <p className="text-sm text-sub custom-clamp">{work.description}</p>
            </div>

            <div className="text-xs flex flex-wrap gap-1 mb-3">
              {work.tools.map((tool, index) => (
                <span
                  key={index}
                  className="bg-mid border border-line text-sub px-2 py-1 rounded-full font-medium"
                >
                  {tool}
                </span>
              ))}
                  </div>
                  
                  <div className="flex gap-2">
                  <a href={work.link} target="_blank" className="bg-gradient-to-r from-blue-500 to-orange-500 text-white gap-2 font-semibold flex-center flex-1 rounded-lg h-9 text-sm ms-0 mt-auto">
                          <span>Project Link</span>
                          <Icon styles="text-[1.3em]">open_in_new</Icon>
                      </a>
                      <Link to={`/projects/${work.userid}`} className="bg-primary text-invert flex-1 gap-2 font-semibold flex-center rounded-lg h-9 text-sm ms-0 mt-auto">
                          <span>Preview</span>
                          <Icon styles="text-[1.3em]">visibility</Icon>
                      </Link>
                      
                  </div>
        </li>
      ))}
    </ul>
  );
};

export default Container;
