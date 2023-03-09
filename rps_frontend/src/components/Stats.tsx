import StatsTable from "../components/StatsTable";

const Stats = () => {
  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h1 className="display-5 fw-bold mb-5">Player Statistics</h1>
      <h2>Stats vs. <b>Beginner</b></h2>
      <StatsTable wins={0} draws={0} losses={0} />
      <h2>Stats vs. <b>Intermediate</b></h2>
      <StatsTable wins={0} draws={0} losses={0} />
      <h2>Stats vs. <b>Advanced</b></h2>
      <StatsTable wins={0} draws={0} losses={0} />
    </div>
  );
}

export default Stats;
