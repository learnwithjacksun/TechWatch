import Heading from "../../Global/Heading";
import Container from "../../Global/Container";
import { works } from "../../../Constants/data";


const RecentWorks = () => {
  const recentWorks = works.slice(0, 3);
  return (
    <>
      <div className="main">
        <div className="py-8">
          <Heading
            title="Recent Works"
            subtitle="Here are some of what techies are cooking up! 🔥"
          />

          <div className="my-6">
            <Container works={recentWorks} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentWorks;
