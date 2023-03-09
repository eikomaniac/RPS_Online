public class Match
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string CPUDifficulty { get; set; } = default!;
    public string UserOption { get; set; } = default!;
    public string CPUOption { get; set; } = default!;
    public string Result { get; set; } = default!; // ? possibly redundant
}