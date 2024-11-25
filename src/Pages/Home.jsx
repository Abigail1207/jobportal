import Banner from "../components/Banner";
import { useEffect, useState } from "react";
import Jobs from "./Jobs";
import Card from "../components/Card";
import Sidebar from "../sidebar/Sidebar";
const Home = () => {
  const [SelectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
      });
  }, []);
  // handle input  change
  const [query, setquery] = useState("");
  const handleInputChange = (event) => {
    setquery(event.target.value);
  };
  console.log(query);
  // filter jobs by title - giving you arrays based on your terms
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // Radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // main function - jobs data / word that we type
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs; // based on job data
    // filtering Input items
    if (query) {
      filteredJobs = filteredItems; // data which filtered job
    }

    // category filtering
    if (selected) {
      // if you have selected any itmes
      filteredJobs = filteredJobs.filter(
        // based on query it gives you information!
        ({
          jobLocation,
          maxPRice,
          experienenceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPRice) === parseInt(selected) ||
          experienenceLevel === selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType === selected ||
          postingDate === selected
      );
      console.log(filteredJobs);
    }
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, SelectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content*/}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/*left side*/}
        <div className="bg-white p-4 rounded">
          <Sidebar />
        </div>

        {/* job cards */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          <Jobs result={result} />
        </div>

        {/* right side */}
        <div className="bg-white p-4 rounded">Right</div>
      </div>
    </div>
  );
};

export default Home;
