import Filter from "../components/jobs/Filter";
import Job from "../components/jobs/Job";
import Searchbar from "../../src/components/layout/Searchbar";
import Sidebar from "../../src/components/layout/Sidebar";
import { useSidebar } from "../context/SidebarContext";

const jobs = [
  {
    title: "Frontend Developer Needed for Innovative Web Project",
    amount: "1 to 3 months, Less than 30 hrs/week",
    description:
      "We are seeking a talented Frontend Developer to join our dynamic team and contribute to an exciting web project. The ideal candidate should have a passion for creating responsive and engaging user interfaces. You will work closely with our design team to implement visually appealing and user-friendly web applications. If you have experience in HTML, CSS, and JavaScript, along with a strong understanding of modern frameworks, we want to hear from you!",
    posted_at: "6 minutes ago",
    type: "JAVASCRIPT",
    scrapped_at: "2024-12-30T21:09:53.573Z",
    tags: "Web developement@Frontend@HTML@CSS@JavaScript",
    client_rate: 4.3,
    client_location: "Cairo",
    payment_verfied: false,
    propsal_count: "20+ Proposals",
    client_spent: "$400",
  },
  {
    title: "Looking for a Java Full Stack Developer",
    amount: "More than 6 months, 30+ hrs/week",
    description:
      "Design and development of software systems following a micro services-based structure in scrum workflow. Architect and develop new features.\nDeliver features and performance tests and code reviews.\nInvolve in release planning and tracking product delivery.\nProactive problem-solver who is passionate about staying up to date with industry best practices and can contribute to a dynamic, collaborative development environment",
    posted_at: "9 minutes ago",
    type: "FULL STACK",
    scrapped_at: "2024-12-30T21:06:53.574Z",
    tags: "Web developement@Java@Spring@Backend",
    client_rate: 4.8,
    client_location: "Giza",
    payment_verfied: true,
    propsal_count: "5 - 10 Propsals",
    client_spent: "$+10k",
  },
  {
    title: "Backend Development for User Profile and Matchmaking System",
    amount: "More than 6 months, 30+ hrs/week",
    description:
      "We are seeking a skilled backend developer to create a user profile and matchmaking system using PostgreSQL, AWS EC2, S3, and MongoDB. The ideal candidate will also be responsible for API creation to facilitate seamless integration with our existing infrastructure. We have a Figma design that will guide the development process. This project aims to enhance user engagement and improve our matchmaking capabilities. If you have experience working with these technologies and a passion for building robust backend solutions, we want to hear from you!",
    posted_at: "19 minutes ago",
    type: "JAVASCRIPT",
    scrapped_at: "2024-12-30T20:56:53.574Z",
    tags: "Web developement@Backend@PostgreSQL@AWS@MongoDB",
    client_rate: 3.7,
    client_location: "Cairo",
    payment_verfied: true,
    propsal_count: "less than 5 Proposals",
    client_spent: "$+2k",
  },
  {
    title: "Looking for a Java Full Stack Developer",
    amount: "More than 6 months, 30+ hrs/week",
    description:
      "Design and development of software systems following a micro services-based structure in scrum workflow. Architect and develop new features.\nDeliver features and performance tests and code reviews.\nInvolve in release planning and tracking product delivery.\nProactive problem-solver who is passionate about staying up to date with industry best practices and can contribute to a dynamic, collaborative development environment",
    posted_at: "9 minutes ago",
    type: "FULL STACK",
    scrapped_at: "2024-12-30T21:06:53.574Z",
    tags: "Web developement@Java@Spring@Backend",
    client_rate: 4.8,
    client_location: "Giza",
    payment_verfied: true,
    propsal_count: "5 - 10 Propsals",
    client_spent: "$+10k",
  },
  {
    title: "Backend Development for User Profile and Matchmaking System",
    amount: "More than 6 months, 30+ hrs/week",
    description:
      "We are seeking a skilled backend developer to create a user profile and matchmaking system using PostgreSQL, AWS EC2, S3, and MongoDB. The ideal candidate will also be responsible for API creation to facilitate seamless integration with our existing infrastructure. We have a Figma design that will guide the development process. This project aims to enhance user engagement and improve our matchmaking capabilities. If you have experience working with these technologies and a passion for building robust backend solutions, we want to hear from you!",
    posted_at: "19 minutes ago",
    type: "JAVASCRIPT",
    scrapped_at: "2024-12-30T20:56:53.574Z",
    tags: "Web developement@Backend@PostgreSQL@AWS@MongoDB",
    client_rate: 3.7,
    client_location: "Cairo",
    payment_verfied: true,
    propsal_count: "less than 5 Proposals",
    client_spent: "$+2k",
  },
];
export function HomePage() {
  // const [selectedFilters, setSelectedFilters] = useState({
  //   query: "",
  //   priceRanges: [] as string[],
  //   proposalsRanges: [] as string[],
  //   isHourly: false,
  //   isFixedPrice: false,
  //   clientRating: 0,
  // });
  const { isCollapsed } = useSidebar();

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // setSelectedFilters((prev) => ({ ...prev, query }));
  };

  return (
    <div className="w-screen h-screen flex justify-start ">
      <div
        className={`h-full   ${isCollapsed ? "w-fit" : "w-[17%]"}  
       `}
      >
        <Sidebar></Sidebar>
      </div>

      <div
        className={`flex w-[83%] h-full p-5 flex-col overflow-y-scroll          ${
          isCollapsed ? "w-full" : "w-[83%]"
        }  
       `}
      >
        <div className=" w-full  flex flex-col  ">
          <div className="w-full  flex">
            {" "}
            <Searchbar onSearch={handleSearch}></Searchbar>
            <Filter />
          </div>
          <span className="h-[2px] w-full mb-4 bg-[#F3F4F6]"></span>
          {/* <div>filter</div> */}
        </div>

        <div className="grid grid-cols-3 gap-5 p-5 max-md:grid-cols-1">
          <div className="flex flex-col gap-4">
            {jobs.map((job, index) => {
              if (index % 3 === 0) {
                return <Job key={index} {...job} />;
              }
            })}
          </div>
          <div className="flex flex-col gap-4">
            {jobs.map((job, index) => {
              if (index % 3 === 1) {
                return <Job key={index} {...job} />;
              }
            })}
          </div>
          <div className="flex flex-col gap-4">
            {jobs.map((job, index) => {
              if (index % 3 === 2) {
                return <Job key={index} {...job} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
