public class DifficultyStats
{
  public int Wins { get; set; }
  public int Draws { get; set; }
  public int Losses { get; set; } = default!;
  public double Winrate { get; set; } = default!;
  public int TotalGames { get; set; } = default!;
  public DifficultyStats(List<Match> matches)
  {
    TotalGames = matches.Count;
    Wins = matches.Count(m => m.Result == "win");
    Draws = matches.Count(m => m.Result == "draw");
    Losses = matches.Count(m => m.Result == "loss");
    Winrate = TotalGames > 0 ? ((double)Wins + 0.5*(double)Draws) / TotalGames : 0;
  }
}
