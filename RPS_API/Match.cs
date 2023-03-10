public class Match
{
    public int MatchId { get; set; }
    public int UserId { get; set; }
    public string CPUDifficulty { get; set; } = default!;
    public string UserOption { get; set; } = default!;
    public string CPUOption { get; set; } = default!;
    public string Result { get; set; } = default!;
    public DateTime MatchDate { get; set; } = DateTime.Now;
}