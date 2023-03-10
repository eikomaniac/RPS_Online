public class Stats
{
  public DifficultyStats? BeginnerStats { get; set; }
  public DifficultyStats? IntermediateStats { get; set; }
  public DifficultyStats? AdvancedStats { get; set; }

  public List<Match>? MatchHistory { get; set; }
}
