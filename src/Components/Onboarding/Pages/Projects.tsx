import { Link } from "react-router-dom";
import Layout from "../Layout";
import Icon from "../../Global/Icon";
import Heading from "../../Global/Heading";
import Container from "../../Global/Container";
import { works } from "../../../Constants/data";

const Projects = () => {
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
              <Container works={works} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Projects;
